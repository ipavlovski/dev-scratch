import { a, useSpring } from '@react-spring/web'
import { css } from 'styled-system/css'

// function Stuff() {
//   return <div style={{backgr}}></div>
// }

function AnimatedSmth() {
  // const springs = useSpring({
  //   from: { x: 0 },
  //   to: { x: 500 },
  //   // loop: true
  // })

  const [springs, api] = useSpring(() => ({
    x: 100
    // from: { x: 300 },
    // backgroundColor: '#ff',
    // scale: [1, 1, 1],
    // config: {
    //   duration: 150
    // }
  }))

  const handleClick = () => {
    api.start({
      from: {
        x: 0
      },
      to: {
        x: 500
      }
    })
  }

  return (
    <a.div
      onClick={handleClick}
      style={{
        width: 80,
        height: 80,
        background: 'hsl(0, 100%, 71%)',
        borderRadius: 8,
        ...springs
      }}></a.div>
  )
}

export default function App() {
  const styles = css({
    background: 'slate.800',
    width: '100vw',
    height: '100vh'
  })

  return (
    <div className={styles}>
      <AnimatedSmth />
    </div>
  )
}
