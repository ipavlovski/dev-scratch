import { animated, useSpring } from '@react-spring/web'
import { useCallback, useState } from 'react'
import { css, cx } from 'styled-system/css'
import { Box, Center, HStack, VStack } from 'styled-system/jsx'

function Button() {
  const [isFull, toggle] = useState(false)

  const styles = css({
    cursor: 'pointer',
    width: '20ch',
    textAlign: 'center',
    border: '2px solid #fefefe',
    color: '#fefefe',
    padding: '.75rem',
    rounded: '2xl',
  })

  const vanillaShort = css({
    width: '20ch',
    transition: 'all 400ms',
  })

  const vanillaLong = css({
    width: '40ch',
    transition: 'all 400ms',
  })

  // const clickHandler = useCallback(() => toggle(!isFull), [isFull])
  const clickHandler = () => toggle(!isFull)
  const props = useSpring({ width: isFull ? '20ch' : '40ch' })
  // const props = useSpring({ asdf: isFull ? 100 : 1200 })

  const [springs, api] = useSpring(() => ({
    from: { width: '20ch' },
    to: { width: '40ch' },
  }))
  const clickHandler2 = () => api.start({ from: { width: '20ch' }, to: { width: '40ch' } })


  return (
    <VStack>
      <animated.div className={styles} style={{ ...props }} onClick={clickHandler}>
        click here
        {/* {props.width.to(value => parseFloat(value).toFixed(2))} */}
      </animated.div>

      <animated.div style={{ color: 'white' }}>
        {props.width.to(v => v)}
        {/* {props.asdf.to(v => v)} */}
      </animated.div>

      <div className={cx(styles, isFull ? vanillaShort : vanillaLong)}>
        Some value...
      </div>

      <animated.div className={styles} style={{ ...springs }} onClick={clickHandler2}>
        API based
        {/* {props.width.to(value => parseFloat(value).toFixed(2))} */}
      </animated.div>
    </VStack>
  )
}

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(circle at bottom center, #212121 0%, #101010 80%)',
    '& h1': { color: 'white' },
  })

  return (
    <div className={styles}>
      <Center h='full'>
        <Button />
      </Center>
    </div>
  )
}
