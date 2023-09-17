import { a, useSpring } from '@react-spring/web'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { styled } from '../styled-system/jsx'

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
    from: { x: 150 }
    // x: 300
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


function Drawer({ show }: { show: boolean }) {
  const props = useSpring({
    left: show ? window.innerWidth - 300 : window.innerWidth,
    top: 0,
    backgroundColor: '#806290',
    height: '100vh',
    width: '300px'
  })

  return (
    <a.div style={{ position: 'absolute', ...props }}>
      <div className="drawer">Animated Drawer!</div>
    </a.div>
  )
}

type ToggleState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

function Button({ props: [isShowing, setter] }: { props: ToggleState }) {
  const styles = css({
    backgroundColor: '#719c70',
    color: 'white',
    padding: '10px 15px',
    fontSize: 20,
    borderRadius: 8,
    border: 'none',
    cursor: 'pointer'
  })

  return (
    <button className={styles} onClick={() => setter(!isShowing)}>
      {isShowing ? 'Close' : 'Open'}
    </button>
  )
}

// SIMPLEST DRAWER EXAMPLE FROM ADRIANO TRIANA
// https://medium.com/geekculture/building-an-animated-slide-in-drawer-with-react-spring-22a6a54bc4cd
export default function App() {
  const styles = css({
    background: 'slate.800',
    width: '100vw',
    height: '100vh'
  })

  const [isShowing, setShowing] = useState(false)

  return (
    <div className={styles}>
      <Button props={[isShowing, setShowing]} />
      <Drawer show={isShowing} />
    </div>
  )
}
