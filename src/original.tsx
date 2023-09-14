import { ReactNode } from 'react'
import { css } from 'styled-system/css'

////////////// CONSTS

const TAGS = [
  'HTML',
  'CSS',
  'JavaScript',
  'Typescript',
  'Tailwind',
  'React',
  'Next.js',
  'Gatsby',
  'UI/UX',
  'SVG',
  'animation',
  'webdev'
]
const DURATION = 15000
const ROWS = 5
const TAGS_PER_ROW = 5

// utils
const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min
const shuffle = (arr: string[]) => [...arr].sort(() => 0.5 - Math.random())

function InfiniteLoopSlider(props: { children: ReactNode; duration: number; reverse?: number }) {
  const { children, duration, reverse = 0 } = props

  const styles = css({
    display: 'flex',
    width: 'fit-content',
    animationName: 'loop',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'var(--direction)',
    animationDuration: 'var(--duration)'
  })
  return (
    <div
      className="loop-slider"
      style={{
        // @ts-ignore
        '--duration': `${duration}ms`,
        '--direction': reverse ? 'reverse' : 'normal'
      }}>
      <div className={styles}>
        {children}
        {children}
      </div>
    </div>
  )
}

function Tag({ text }: { text: string | number }) {
  // Must used margin-right instead of gap for the loop to be smooth
  const styles = css({
    display: 'flex',
    alignItems: 'center',
    gap: '0 0.2rem',
    color: '#e2e8f0',
    fontSize: '0.9rem',
    backgroundColor: '#334155',
    borderRadius: '0.4rem',
    padding: '0.7rem 1rem',
    marginRight: '1rem',
    boxShadow: '0 0.1rem 0.2rem rgb(0 0 0 / 20%), 0 0.1rem 0.5rem rgb(0 0 0 / 30%), 0 0.2rem 1.5rem rgb(0 0 0 / 40%)',
    '& > span': {
      fontSize: '1.2rem',
      color: '#64748b',
    }
  })

  return (
    <div className={styles}>
      <span>#</span> {text}
    </div>
  )
}

export default function App() {
  const styles = css({
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontFamily: 'jakarta',
    background: '#1e293b',
    color: '#f8fafc'
  })

  const headerStyles = css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '1rem',
    textAlign: 'center',
    '& > h1': {
      fontWeight: 'bold',
      fontSize: '3rem',
      marginBottom: '0.5rem'
    },
    '& > p': {
      color: '#94a3b8'
    }
  })

  const tagListTyles = css({
    // width: '60vw',
    width: '30rem',
    maxWidth: '90vw',
    display: 'flex',
    flexShrink: 0,
    flexDirection: 'column',
    gap: '1rem',
    position: 'relative',
    padding: '1.5rem 0',
    overflow: 'hidden'
  })

  const fadeStyles = css({
    pointerEvents: 'none',
    background: 'linear-gradient(90deg, #1e293b, transparent 30%, transparent 70%, #1e293b)',
    position: 'absolute',
    inset: 0
  })

  return (
    <div className={styles}>
      <header className={headerStyles}>
        <h1>Infinite Scroll Animation</h1>
        <p>CSS only, content independent, bi-directional, customizable</p>
      </header>
      <div className={tagListTyles}>
        {[...new Array(ROWS)].map((_, i) => (
          <InfiniteLoopSlider
            key={i}
            duration={random(DURATION - 5000, DURATION + 5000)}
            reverse={i % 2}>
            {shuffle(TAGS)
              .slice(0, TAGS_PER_ROW)
              .map((tag) => (
                <Tag text={tag} key={tag} />
              ))}
          </InfiniteLoopSlider>
        ))}
        <div className={fadeStyles} />
      </div>
    </div>
  )
}
