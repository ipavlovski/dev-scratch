import { ForwardedRef, MutableRefObject, UIEventHandler, forwardRef, useCallback } from 'react'
import { css } from 'styled-system/css'

type TEntryItem = { height: string; header: string; text: string }
const entries: TEntryItem[] = [
  {
    height: '400vh',
    header: 'headset',
    text: `Virtual reality (VR) is a simulated experience that can be similar to or completely
    different from the real world.`
  },
  {
    height: '200vh',
    header: 'headphone',
    text: `Headphones are a pair of small loudspeaker drivers worn on or around the head over a
    users ears.`
  },
  {
    height: '200vh',
    header: 'rocket',
    text: `A rocket (from Italian: rocchetto, lit.'bobbin/spool')[nb 1][1] is a
    projectile that spacecraft, aircraft or other vehicle use to obtain thrust from a rocket
    engine.`
  },
  {
    height: '200vh',
    header: 'turbine',
    text: `A turbine (/ˈtɜːrbaɪn/ or /ˈtɜːrbɪn/) (from the Greek τύρβη, tyrbē, or
      Latin turbo, meaning vortex)[1][2] is a rotary mechanical device that extracts energy
      from a fluid flow and converts it into useful work.`
  },
  {
    height: '200vh',
    header: 'table',
    text: `A table is an item of furniture with a flat top and one or more legs, used
    as a surface for working at, eating from or on which to place things.[1][2]`
  },
  {
    height: '200vh',
    header: 'laptop',
    text: `A laptop, laptop computer, or notebook computer is a small, portable
    personal computer (PC) with a screen and alphanumeric keyboard.`
  },
  {
    height: '200vh',
    header: 'zeppelin',
    text: `A Zeppelin is a type of rigid airship named after the German inventor
    Count Ferdinand von Zeppelin (German pronunciation: [ˈt͡sɛpəliːn]) who pioneered rigid
    airship development at the beginning of the 20th century.`
  }
]

function EntryItem({ height, header, text }: { height: string; header: string; text: string }) {
  const styles = css({
    pointerEvents: 'none',
    position: 'sticky',
    top: 0,
    display: 'inline-block',
    maxWidth: 600,
    padding: 10,
    color: '#a0a0a0',
    lineHeight: '1.6em',
    fontSize: 15,
    letterSpacing: 1.5,
    '& > h1': {
      pointerEvents: 'none',
      color: 'white',
      fontSize: '5em',
      fontWeight: 100,
      lineHeight: '1em',
      margin: 0,
      marginBottom: '0.25em'
    }
  })

  return (
    <div style={{ height: height }}>
      <div className={styles}>
        <h1>{header}</h1>
        {text}
      </div>
    </div>
  )
}

const Caption = forwardRef((props, ref: ForwardedRef<HTMLSpanElement>) => {
  const styles = css({
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    right: 0,
    margin: 20,
    color: 'white',
    fontWeight: 100,
    lineHeight: '1em',
    fontVariantNumeric: 'tabular-nums'
  })

  return (
    <span className={styles} ref={ref}>
      0.00
    </span>
  )
})

type OverlayProps = {
  caption: MutableRefObject<HTMLSpanElement>
  scroll: MutableRefObject<number>
}
const Overlay = forwardRef(
  ({ caption, scroll }: OverlayProps, ref: ForwardedRef<HTMLDivElement>) => {
    const styles = css({
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
      overflowY: 'auto',
      scrollSnapType: 'y proximity',
      '& > div': {
        scrollSnapAlign: 'start'
      }
    })

    const scrollHandler = useCallback<UIEventHandler>((e) => {
      const target = e.target as HTMLElement
      scroll.current = target.scrollTop / (target.scrollHeight - window.innerHeight)
      caption.current.innerText = scroll.current.toFixed(2)
    }, [])

    return (
      <div ref={ref} onScroll={scrollHandler} className={styles}>
        {entries.map((entry, ind) => (
          <EntryItem key={ind} {...entry} />
        ))}

        <Caption ref={caption} />
      </div>
    )
  }
)

export default Overlay
