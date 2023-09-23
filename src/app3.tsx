import { animated, useSpring } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { css } from 'styled-system/css'
import { Center } from 'styled-system/jsx'

function PullRelease() {

  const styles = css({
    width: '100px',
    height: '100px',
    backgroundColor: 'slate.500',
    position: 'absolute',
  })

  const [{ x, y }, api] = useSpring(() => ({ x: 0, y: 0 }))

  // Set the drag hook and define component movement based on gesture data

  // const bind = useDrag(({ offset: [x, y] }) => api.start({ x, y }))

  const bind = useDrag(({ down, movement: [mx, my], xy: [x, y], offset: [ox, oy] }) => {
    // api.start({ x: down ? mx : 0, y: down ? my : 0, immediate: down })
    // console.log(mx, my)

    // it will throw it off RELATIVE to the 0 points
    api.start({ x: ox, y: oy })
  })

  // Bind it to a component ->
  return <animated.div className={styles}  {...bind()} style={{ x, y }} />
}

export default function App() {
  const styles = css({
    position: 'relative',
    height: '100vh'

  })
  return (
    <Center className={styles} >
      <h1>LOL</h1>
      <PullRelease />
    </Center>
  )
}
