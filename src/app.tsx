import { CSSProperties, ReactNode } from 'react'
import { css } from 'styled-system/css'

////////////// CONSTS

const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Typescript',
  'Tailwind',
  'React',
  'Next.js',
  'Gatsby',
  'UI/UX',
  'SVG',
  'animation',
  'webdev'
]
const DURATION = 15000
const ROWS = 5
const TAGS_PER_ROW = 5

// utils
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
const shuffle = (arr: string[]) => [...arr].sort(() => 0.5 - Math.random())

function Header() {
  const styles = css({
    textAlign: 'center',
    '& > h1': {
      fontSize: '3rem',
      fontWeight: 'bold'
    },
    '& > h2': {
      fontSize: '.9rem',
      color: '#94a3b8',
      marginBottom: '1rem'
    }
  })
  return (
    <header className={styles}>
      <h1>Infinite Scroll Animation</h1>
      <h2>CSS only, content independent, bi-directional, customizable</h2>
    </header>
  )
}

function Tag({ text }: { text: string }) {
  const styles = css({
    color: '#e2e8f0',
    backgroundColor: '#334155',
    fontSize: '0.9rem',
    padding: '.7rem 1rem',
    borderRadius: '.4rem',
    marginRight: '1rem',
    gap: '0 0.2rem',
    boxShadow:
      '0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)',
    '& > span': {
      fontSize: '1rem',
      paddingRight: '.125em',
      color: '#64748b'
    }
  })
  return (
    <div className={styles}>
      <span>#</span>
      {text}
    </div>
  )
}

// template literal types, source: https://stackoverflow.com/questions/52005083
type CustomCSSProperties = CSSProperties & Record<`--${string}`, number | string>
function InfiniteSlider({ reverse, tags: rawTags }: { reverse: number; tags: string[] }) {
  const styles = css({
    display: 'flex',
    width: 'fit-content',
    animationName: 'loop',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'var(--direction)',
    animationDuration: 'var(--duration)'
  })

  const duration = random(DURATION - 5000, DURATION + 5000)

  const tags = rawTags.map((tag) => <Tag text={tag} />)

  return (
    <div
      style={{
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal'
      } as CustomCSSProperties}>
      <div className={styles}>
        {tags}
        {tags}
      </div>
    </div>
  )
}

function Main() {
  const styles = css({
    display: 'flex',
    flexDir: 'column',
    width: '66vw',
    position: 'relative',
    overflow: 'hidden',
    padding: '1.5rem 0',
    gap: '1rem'
  })

  const fadeStyles = css({
    background: 'linear-gradient(90deg, #1e293b, transparent 30%, transparent 70%, #1e293b)',
    position: 'absolute',
    inset: 0,
    pointerEvents: 'none'
  })

  const rows = Array.from({ length: ROWS }, () => shuffle(TAGS).slice(0, TAGS_PER_ROW))

  return (
    <main className={styles}>
      {rows.map((tags, ind) => (
        <InfiniteSlider key={ind} reverse={ind % 2} tags={tags} />
      ))}
      <div className={fadeStyles} />
    </main>
  )
}

export default function App() {
  const styles = css({
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    fontFamily: 'jakarta',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDir: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  })

  return (
    <div className={styles}>
      <Header />
      <Main />
    </div>
  )
}
