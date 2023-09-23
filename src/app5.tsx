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
const to = (i: number) => ({
  x: 0,
  y: i * -4,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})
const from = (_i: number) => ({
  x: 0,
  y: -1000,
  scale: 1.5,
  rot: 0,
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

  const [props, api] = useSprings(cards.length, i => ({ ...to(i), from: from(i) }))
  return (
    <>
      {props.map(({rot, scale, }, ind) => (
        <animated.div className={styles} key={ind}>
          <animated.div style={{
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
