import { animated, useTransition } from '@react-spring/web'
import { useState } from 'react'

export default function App() {
  const [toggle, set] = useState(false)
  const transition = useTransition(toggle, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }, // IMPORTANT: CHECK THIS VALUE
  })

  return (
    <div>
      <button type='button' onClick={() => set(!toggle)}>
        Toggle
      </button>
      {transition((style, item) =>
        item
          ? <animated.div style={style}>😄</animated.div>
          : <animated.div style={style}>🤪</animated.div>
      )}
    </div>
  )
}
