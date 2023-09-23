import { animated, useScroll, useSpring } from '@react-spring/web'
import { css } from 'styled-system/css'
import { Center } from 'styled-system/jsx'

function MyComponent() {
  const { scrollYProgress } = useScroll()

  const styles = css({
    color: 'white',
    position: 'fixed',
    top: 10,
    left: 10,
  })

  // style={{ opacity: scrollYProgress }}
  return (
    <animated.div className={styles}>
      {scrollYProgress}
    </animated.div>
  )
}

function OtherComponent() {
  const styles = css({
    width: '100px',
    height: '100px',
    backgroundColor: 'pink.400',
    position: 'fixed',
    top: 200,
    left: 200,
  })

  const [spring, api] = useSpring(() => ({ x: 200 }))

  useScroll({
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.5) {
        api.start({ x: 200 })
      } else {
        api.start({ x: 600 })
      }
    },
  })

  return <animated.div className={styles} style={{ ...spring }}></animated.div>
}

export default function App() {
  return (
    <Center bg='slate.800' height='500vh' position='relative'>
      <MyComponent />
      <OtherComponent />
    </Center>
  )
}
