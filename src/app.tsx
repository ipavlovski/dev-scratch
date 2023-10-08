import { ReactNode } from 'react'
import { css } from 'styled-system/css'

function Preloader({ children }: { children: ReactNode }) {
  const styles = css({
    fontSize: 'calc(16px + (20 - 16) * (100vw - 320px) / (1280 - 320))',
    position: 'relative',
    width: '16em',
    height: '16em',
    borderRadius: '50%',
  })
  return (
    <div className={styles}>
      {children}
    </div>
  )
}

function OuterRing() {
  const styles = css({
    boxShadow: `
		0 -0.45em 0.375em hsla(0, 0%, 0%, 0.15),
		0 0.5em 0.75em hsla(0, 0%, 0%, 0.15) inset,
		0 0.25em 0.5em hsla(0, 0%, 100%, 0.4),
		0 -0.5em 0.75em hsla(0, 0%, 100%, 0.4) inset`,
    top: '0.75em',
    left: '0.75em',
    width: 'calc(100% - 1.5em)',
    height: 'calc(100% - 1.5em)',
    borderRadius: '50%',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function InnerRing() {
  const styles = css({
    boxShadow: `0 -0.25em 0.5em hsla(0, 0%, 100%, 0.4),
		0 0.5em 0.75em hsla(0, 0%, 100%, 0.4) inset,
		0 0.5em 0.375em hsla(0, 0%, 0%, 0.15),
		0 -0.5em 0.75em hsla(0, 0%, 0%, 0.15) inset`,
    top: '2.375em',
    left: '2.375em',
    width: 'calc(100% - 4.75em)',
    height: 'calc(100% - 4.75em)',
    borderRadius: '50%',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function TrackCover() {
  const styles = css({
    animation: 'trackCover 3s linear infinite',
    backgroundImage: 'conic-gradient(hsla(223, 90%, 95%, 1) 210deg, hsla(223, 90%, 95%, 0) 270deg)',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function Ball({ children }: { children: ReactNode }) {
  const styles = css({
    top: 'calc(50% - 1.25em)',
    left: 'calc(50% - 1.25em)',
    transform: 'rotate(0) translateY(-6.5em)',
    width: '2.5em',
    height: '2.5em',
    borderRadius: '50%',
    position: 'absolute',
    animation: 'ball 3s linear infinite',
  })
  return (
    <div className={styles}>
      {children}
    </div>
  )
}

function OuterShadow() {
  const styles = css({
    animation: 'ballOuterShadow 3s linear infinite',
    backgroundImage: 'linear-gradient(hsla(0, 0%, 0%, 0.15),hsla(0, 0%, 0%, 0))',
    borderRadius: '0 0 50% 50% / 0 0 100% 100%',
    filter: 'blur(2px)',
    top: '50%',
    left: 0,
    width: '100%',
    height: '250%',
    transform: 'rotate(20deg)',
    transformOrigin: '50% 0',
    zIndex: '-2',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function InnerShadow() {
  const styles = css({
    animationName: 'ballInnerShadow',
    boxShadow: ` 0 0.1em 0.2em hsla(0, 0%, 0%, 0.3),
      0 0 0.2em hsla(0, 0%, 0%, 0.1) inset,
      0 -1em 0.5em hsla(0, 0%, 0%, 0.15) inset`,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function SideShadows() {
  const styles = css({
    backgroundColor: 'hsla(0, 0%, 0%, 0.1)',
    filter: 'blur(2px)',
    width: '100%',
    height: '100%',
    transform: 'scale(0.75,1.1)',
    zIndex: '-1',
    borderRadius: '50%',
    position: 'absolute',
  })
  return (
    <div className={styles}>
    </div>
  )
}

function Texture() {
  const styles = css({
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    transform: 'translate3d(0,0,0)',
    position: 'absolute',
    borderRadius: '50%',
    '&:before': {
      animationName: 'ballTexture',
      animationDuration: '0.25s',
      background: 'url("https://assets.codepen.io/416221/snow.jpg") 0 0 / 50% 100%',
      content: '""',
      display: 'block',
      filter: 'brightness(1.05)',
      top: 0,
      right: 0,
      width: '200%',
      height: '100%',
      position: 'absolute',
    },
  })
  return (
    <div className={styles}>
    </div>
  )
}

export default function App() {
  const styles = css({
    backgroundColor: 'hsl(223, 90%, 95%)',
    font: '1em / 1.5 sans-serif',
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
  })

  return (
    <div className={styles}>
      <Preloader>
        <OuterRing />
        <InnerRing />
        <TrackCover />
        <Ball>
          <Texture />
          <OuterShadow />
          <InnerShadow />
          <SideShadows />
        </Ball>
      </Preloader>
    </div>
  )
}
