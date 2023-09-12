import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Testing 1-2-3',
  description: 'Not actually generated  by next-create-app'
}

type Time = {
  datetime: string
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const res = await fetch('http://worldtimeapi.org/api/timezone/America/Chicago', {
    // on every request bypass caching, get new data
    // cache: 'no-store'
    next: {
      revalidate: 5
    }
  })
  const data: Time = await res.json()

  return (
    <html lang="en">
      <body className={inter.className}>
        <h1>data: {data.datetime}</h1>
        {children}
      </body>
    </html>
  )
}
