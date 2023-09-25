import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { Center } from 'styled-system/jsx'

const cards = [
  'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
]

// TO and FROM
const from = (_i: number) => ({
  x: 0,
  y: -1000,
  scale: 1.5,
  rot: 0,
})

const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const transform = (r: number, s: number) =>
  `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

function Deck() {
  const styles = css({
    position: 'absolute',
    width: '300px',
    height: '200px',
    willChange: 'transform',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    touchAction: 'none',
    '& > div': {
      touchAction: 'none',
      backgroundColor: 'white',
      backgroundSize: 'auto 85%',

      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      width: '45vh',
      maxWidth: 300,
      height: '85vh',
      maxHeight: 570,
      willChange: 'transform',
      borderRadius: 10,
      boxShadow:
        '0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3)',
    },
  })

  const [gone] = useState(() => new Set<number>())
  const [props, api] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }))

  const bind = useDrag(
    ({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
      // The set flags all the cards that are flicked out
      const trigger = vx > 0.2 // If you flick hard enough it should trigger the card to fly out
      // if NOT acttive and has trigger velocity, make the card 'fly-out'
      if (!active && trigger) gone.add(index)

      api.start(i => {
        // We're only interested in changing spring-data for the current spring
        if (index !== i) return 
        const isGone = gone.has(index)
        const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0 // When a card is gone it flys out left or right, otherwise goes back to zero
        const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0) // How much the card tilts, flicking it harder makes it rotate faster
        const scale = active ? 1.1 : 1 // Active cards lift up a bit
        return {
          x,
          rot,
          scale,
          delay: undefined,
          config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
        }
      })

      if (!active && gone.size === cards.length) {
        setTimeout(() => {
          gone.clear()
          api.start(i => to(i))
        }, 600)
      }
    },
  )

  return (
    <>
      {props.map(({ rot, scale, x, y }, ind) => (
        <animated.div className={styles} key={ind} style={{x, y}}>
          <animated.div {...bind(ind)} style={{
            transform: interpolate([rot, scale], transform),
            backgroundImage: `url(${cards[ind]})`,
          }}>
          </animated.div>
        </animated.div>
      ))}
    </>
  )
}

export default function App() {
  return (
    <Center height='100vh' bg='slate.400'>
      <Deck />
    </Center>
  )
}
