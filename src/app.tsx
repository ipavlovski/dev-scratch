import { css } from 'styled-system/css'
import MapNaturalEarth from './maps'

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background:
      'linear-gradient(to right top, #d16ba5, #c777b9, #ba83ca, #aa8fd8, #9a9ae1, #8aa7ec, #79b3f4, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)',
  })

  return (
    <div className={styles}>
      <MapNaturalEarth />
    </div>
  )
}
