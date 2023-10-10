import { ReactNode, Suspense, useTransition } from 'react'
import { css, cx } from 'styled-system/css'
import { Link, Redirect, Route, Router, Switch, useRoute } from 'wouter'
import useLocation, { BaseLocationHook } from 'wouter/use-location'

import { createContext, useContext } from 'react'

const DelayedCacheCtx = createContext({})

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const promisedResource = (promise: Promise<any> | null) => {
  let result = promise
  promise?.then(() => (result = null)).catch((error) => (result = error))

  return {
    read: () => {
      if (result) throw result
      return null
    },
  }
}

function DelayedCont({ resource, children }: { resource: any; children: ReactNode }) {
  resource.read()
  return children
}

function Delayed({ ms, id, children }: { ms: number; id: string; children: ReactNode }) {
  const ctx = useContext<any>(DelayedCacheCtx)
  const resource = ctx[id] || (ctx[id] = promisedResource(wait(ms)))

  return <DelayedCont resource={resource}>{children}</DelayedCont>
}

function ActiveLink({ href, children }: { href: string; children: ReactNode }) {
  const [isActive] = useRoute(href)

  const styles = css({
    color: '#bbb',
    textDecoration: 'none',
    margin: '0 15px',
    _hover: {
      color: 'white',
    },
  })

  const active = css({
    color: 'white',
    textDecoration: 'underline',
  })

  return (
    <Link href={href}>
      <a className={cx(styles, isActive && active)}>{children}</a>
    </Link>
  )
}

function IndexRoute() {
  return <Delayed ms={1000} id={'test2'}>"This example uses hash-based routing."</Delayed>
}

function AboutRoute() {
  return (
    <article>
      <h1>Wouter API</h1>
      <p>test 1 2 3</p>
      <Delayed ms={2000} id={'about'}>
        Loaded!
      </Delayed>
    </article>
  )
}

const useLocationWithTransition: BaseLocationHook = () => {
  const [location, setLocation] = useLocation()
  const [, startTransition] = useTransition()

  return [location, (to: string) => startTransition(() => setLocation(to))]
}

export default function App() {
  const styles = {
    main: css({
      padding: '30px 0',
    }),
    nav: css({
      borderBottom: '1px solid #999',
      padding: '20px 0px',
      _before: {
        content: '"▲●"',
        fontSize: 16,
        marginRight: 20,
      },
    }),
    body: css({
      width: '100vw',
      height: '100vh',
      padding: '1rem 10rem',
      background: 'black',
      color: 'white',
    }),
  }

  return (
    <div className={styles.body}>
      <Suspense fallback={'global app loading...'}>
        <Router hook={useLocationWithTransition}>
          <div className='App'>
            <nav className={styles.nav}>
              <ActiveLink href='/'>Home</ActiveLink>
              <ActiveLink href='/about'>What is Wouter</ActiveLink>
              <ActiveLink href='/test'>Test</ActiveLink>
              <ActiveLink href='/faq'>FAQ</ActiveLink>
              <ActiveLink href='/info'>More (redirect)</ActiveLink>
            </nav>
            <main className={styles.main}>
              <Switch>
                <Route path='/'>
                  <IndexRoute />
                </Route>
                <Route path='/about'>
                  <AboutRoute />
                </Route>
                <Route path='/info'>
                  <Redirect to='/about' />
                </Route>
                <Route path='/:anything*'>
                  <center>
                    <b>404:</b> Sorry, this page isn't ready yet!
                  </center>
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </Suspense>
    </div>
  )
}
