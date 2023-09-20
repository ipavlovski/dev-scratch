import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import { css } from 'styled-system/css'
// import styles from './styles.module.css'

// export default function App() {
//   return <h1 className={styles}>Hello world</h1>
// }

export default function App() {
  const styles = {
    background: css({
      background: 'linear-gradient(#e66465, #9198e5)',
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
    }),
    scrollText: css({
      fontSize: '1.5rem',
    }),
    card: css({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '1.25rem',
      height: '10rem',
      width: '25%',
      textAlign: 'center',
      borderRadius: 10,
    }),
    sticky: css({
      marginLeft: '15%',
      backgroundColor: '#ff6d6d',
    }),
    parallax: css({
      marginRight: '15%',
    }),
    purple: css({
      backgroundColor: '#9d65d0',
    }),
    blue: css({
      backgroundColor: '#5b65ad',
      color: 'white',
    }),
  }

  const alignCenter = { display: 'flex', alignItems: 'center' }
  return (
    <div>
      <div className={styles.background} />

      <Parallax pages={5}>
        <ParallaxLayer offset={0} speed={0.5} style={{ ...alignCenter, justifyContent: 'center' }}>
          <p className={styles.scrollText}>Scroll down</p>
        </ParallaxLayer>

        <ParallaxLayer sticky={{ start: 1, end: 3 }}
          style={{ ...alignCenter, justifyContent: 'flex-start' }}>
          <div className={`${styles.card} ${styles.sticky}`}>
            <p>I'm a sticky layer</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1.5} speed={1.5}
          style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>I'm not</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={2.5} speed={1.5}
          style={{ ...alignCenter, justifyContent: 'flex-end' }}>
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
            <p>Neither am I</p>
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  )
}
