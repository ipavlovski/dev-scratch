import { Inter } from 'next/font/google'
import { FaCanadianMapleLeaf } from 'react-icons/fa'
import { TbBrandNextjs, TbShoppingCart } from 'react-icons/tb'
import { css, cx } from 'styled-system/css'
import { HStack } from 'styled-system/jsx'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Testing 1-2-3',
  description: 'Not actually generated  by next-create-app'
}

function Navbar() {
  const linkStyles = css({
    display: 'flex',
    gap: '1rem',
    margin: '.75rem',
    flex: '1',
    '& li': {
      fontSize: '.825rem'
    }
  })

  const logoStyles = css({
    marginLeft: '.5rem'
  })
  const titleStyles = css({
    textTransform: 'uppercase',
    fontWeight: 'bold'
  })

  const shoppingCartStyles = css({
    border: '2px solid',
    borderColor: 'slate.200',
    padding: '.5rem',
    borderRadius: '.75rem',
    margin: '.5rem 1rem'
  })

  return (
    <HStack height="4rem">
      <div>
        <HStack mr={'2rem'}>
          <TbBrandNextjs size={'2rem'} className={logoStyles} />
          <h1 className={titleStyles}>Acme Store</h1>
        </HStack>
      </div>
      <ul className={linkStyles}>
        <li>All</li>
        <li>Shirts</li>
        <li>Stickers</li>
      </ul>

      <div className={shoppingCartStyles}>
        <TbShoppingCart />
      </div>
    </HStack>
  )
}

function Footer() {
  const footerStyles = css({
    background: 'slate.900',
    paddingTop: '1rem'
  })

  const upperFooterStyles = css({
    margin: '2rem',
    '& li': {
      paddingY: '.25rem'
    }
  })

  const lowerFooterStyles = css({
    padding: '.5rem 1rem',
    borderTop: '2px solid',
    fontSize: '.75rem',
    display: 'flex',
    gap: '.25rem',
    alignItems: 'center'
  })

  const iconStyles = css({
    _hover: {
      transition: 'color 250ms ease',
      color: 'red.700'
    }
  })

  return (
    <div className={footerStyles}>
      <div className={upperFooterStyles}>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Terms & Conditions</li>
          <li>Shipping & Return Policy</li>
          <li>Privacy Policy</li>
          <li>FAQ</li>
        </ul>
      </div>
      <div className={lowerFooterStyles}>
        <p>© 2023 OceanSplash. All rights reserved | Designed and developed in Nova Scotia</p>
        <FaCanadianMapleLeaf className={iconStyles} size={'.875rem'} />
      </div>
    </div>
  )
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const styles = css({
    background: 'slate.800',
    color: 'slate.200'
  })
  return (
    <html lang="en">
      <body className={cx(inter.className, styles)}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
