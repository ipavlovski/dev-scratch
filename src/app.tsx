import type { ForwardedRef, MutableRefObject, UIEventHandler } from 'react'
import { forwardRef, useCallback, useRef } from 'react'
import { css } from 'styled-system/css'

const Caption = forwardRef((props, ref: ForwardedRef<HTMLSpanElement>) => {
  const styles = css({
    pointerEvents: 'none',
    position: 'fixed',
    top: 10,
    right: 10,
    color: 'white',
    fontSize: '1rem'
  })

  return <span className={styles} ref={ref}>0.00</span>
})

type OverlayProps = { scroll: MutableRefObject<number> }
const Overlay = forwardRef<HTMLDivElement, OverlayProps>(({ scroll }, ref) => {
  const styles = css({
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    overflowY: 'auto',
  })

  const caption = useRef<HTMLSpanElement>(null!)

  const scrollHandler = useCallback<UIEventHandler>((e) => {
    const target = e.target as HTMLElement
    scroll.current = target.scrollTop / (target.scrollHeight - window.innerHeight)
    console.log(scroll.current)
    caption.current.innerText = scroll.current.toFixed(2)
  }, [])

  return (
    <div ref={ref} onScroll={scrollHandler} className={styles}>
      <div style={{ height: '500vh' }}></div>
      <Caption ref={caption} />
    </div>
  )
})

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: 'radial-gradient(circle at bottom center, #212121 0%, #101010 80%)',
  })

  const overlay = useRef<HTMLDivElement>(null!)
  const scroll = useRef(0)

  return (
    <div className={styles}>
      <Overlay ref={overlay} scroll={scroll} />
    </div>
  )
}
