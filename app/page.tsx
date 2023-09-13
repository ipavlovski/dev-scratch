import Link from 'next/link'
import { css } from 'styled-system/css'
import { Center, Stack } from 'styled-system/jsx'

export default function Home() {
  const styles = css({
    fontSize: '3xl'
  })

  return (
    <Center height="calc(100vh - 4rem)">
      <div>This is the home page</div>
    </Center>
  )
}
