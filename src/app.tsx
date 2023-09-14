import { LuBird, LuShoppingCart } from 'react-icons/lu'
import { css } from 'styled-system/css'

function CartIcon() {
  const cartStyles = css({
    marginLeft: 'auto',
    marginRight: '1rem',
    _hover: {
      color: 'emerald.400',
      cursor: 'pointer'
    }
  })

  return (
    <div className={cartStyles} onClick={() => console.log('clicked!')}>
      <LuShoppingCart size="1.5rem" />
    </div>
  )
}

function Navbar() {
  const styles = css({
    padding: '.25rem',
    margin: '1rem',
    border: '2px solid',
    borderRadius: '2rem',
    borderColor: 'slate.200',
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontWeight: 'bold',
      fontSize: '1.25rem'
    }
  })

  const logoStyles = css({
    marginX: '1rem',
    _hover: {
      color: 'emerald.400',
      cursor: 'pointer'
    }
  })

  return (
    <div style={{ paddingTop: '1rem' }}>
      <div className={styles}>
        <LuBird size="2rem" className={logoStyles} />
        <span>LOGO</span>
        <CartIcon />
      </div>
    </div>
  )
}

export default function App() {
  const styles = css({
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    w: '100vw',
    h: '100vh',
    fontFamily: 'jakarta'
  })

  return (
    <div className={styles}>
      <Navbar />
    </div>
  )
}
