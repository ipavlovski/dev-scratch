import Link from 'next/link'
import { css } from 'styled-system/css'
import { Stack } from 'styled-system/jsx'

export default function Home() {
  const styles = css({
    fontSize: '3xl',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    _hover: {
      background: 'emerald.500'
    }
  })

  return (
    <Stack height="100vh" background="slate.500" color="slate.100">
      <div className={styles}>Hello panda 🐼!</div>
      <h1>Some links</h1>
      <ul>
        <li>
          <Link href="/blog/123">BLOG 123</Link>
        </li>
        <li>
          <Link href="/about">ABOUT</Link>
        </li>
        <li>
          <Link href="/fetching">FETCHING</Link>
        </li>
      </ul>
    </Stack>
  )
}
