import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { PiClockBold, PiQuotesFill, PiTag } from 'react-icons/pi'
import { css, cx } from 'styled-system/css'
import { Flex } from 'styled-system/jsx'

interface UseBooleanOutput {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}
export function useBoolean(defaultValue?: boolean): UseBooleanOutput {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = useCallback(() => setValue(true), [])
  const setFalse = useCallback(() => setValue(false), [])
  const toggle = useCallback(() => setValue((x) => !x), [])

  return { value, setValue, setTrue, setFalse, toggle }
}

type HeaderProps = { image: string; tags: string[]; title: string; subtitle: string; date: string }
function Header(props: HeaderProps) {
  const { image, tags, title, subtitle, date } = props
  const styles = css({
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: '#fff',
    padding: '3rem',
    borderRadius: '1rem',
    display: 'flex',
    flexDir: 'column',
    minHeight: '400px',
    justifyContent: 'space-between',

    '& h1': {
      fontSize: '3rem',
      fontWeight: 'bold',
      opacity: 0.9,
      marginY: '.75rem'
    },
    '& h2': {
      fontSize: '1rem',
      opacity: 0.8,
      width: '30rem'
    },
    '& h3': {},
    '& span': {
      fontSize: '1.125rem',
      fontWeight: 'bold',
      letterSpacing: '0.4rem',
      textTransform: 'uppercase',
      opacity: 0.9
    },
    '& time': {
      fontSize: '.75rem'
    },
    '& a': {
      '&:not(:empty):not(:last-child):after': { content: '", "' }
    }
  })

  return (
    <div className={styles} style={{ backgroundImage: `url("${image}")` }}>
      <Flex justify="space-between" align="center">
        <span>article</span>
        <Flex gap=".5rem" align="flex-end" justify="center" opacity={0.7}>
          <time>a year ago</time>
          <PiClockBold />
        </Flex>
      </Flex>
      <div>
        <Flex gap=".25rem" align="center" opacity=".8">
          <PiTag style={{ marginRight: '1rem' }} />
          {tags.map((tag) => (
            <a key={tag}>{tag}</a>
          ))}
        </Flex>
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
      </div>
    </div>
  )
}

type SummaryProps = { readingTime: number; views: number; date: string }
function Summary(props: SummaryProps) {
  const { readingTime, date, views } = props

  const styles = css({
    borderRadius: '1rem',
    border: '2px solid #ededed',
    justifyContent: 'space-between',
    display: 'flex',
    marginY: '3rem',
    padding: '2rem',
    '& h2': {
      fontSize: '1rem',
      fontWeight: 'bold',
      opacity: 0.4
    },
    '& h1': {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      opacity: 0.8
    }
  })

  return (
    <div className={styles}>
      <section>
        <h2>Reading Time</h2>
        <h1>{readingTime} mins</h1>
      </section>
      <section>
        <h2>Views</h2>
        <h1>{views} views</h1>
      </section>
      <section>
        <h2>Published Date</h2>
        <h1>{date}</h1>
      </section>
    </div>
  )
}

type Content =
  | { type: 'bq'; text: string }
  | { type: 'title'; text: string }
  | { type: 'p'; text: string[] }
  | { type: 'gallery'; text: string[] }

function Blockquote({ text }: { text: string }) {
  const styles = css({
    position: 'relative',
    margin: '40px 0',
    padding: '40px',
    backgroundColor: '#f8f8f8',
    borderRadius: '16px',
    '& i': {
      position: 'absolute',
      color: '#777',
      opacity: 0.5,
      _first: { top: '-4px', left: '-4px', transform: 'scale(3)' },
      _last: { bottom: '-4px', right: '-4px', transform: 'scale(3) rotate(180deg)' }
    }
  })

  return (
    <blockquote className={styles}>
      <i>
        <PiQuotesFill />
      </i>
      {text}
      <i>
        <PiQuotesFill />
      </i>
    </blockquote>
  )
}

function Paragraph({ text }: { text: string[] }) {
  const styles = css({
    marginBottom: '20px',
    color: '#777',
    fontSize: '1.125em',
    lineHeight: '1.75em'
  })
  return text.map((p, ind) => (
    <p key={ind} className={styles}>
      {p}
    </p>
  ))
}

type DispatchURL = Dispatch<SetStateAction<string | null>>
function GalleryItem({ url, setMaskUrl }: { url: string; setMaskUrl: DispatchURL }) {
  const styles = css({
    minHeight: '200px',
    minWidth: '200px',
    backgroundColor: '#eee',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '.5rem',
    _hover: {
      opacity: 0.9,
      cursor: 'pointer'
    }
  })
  return (
    <div
      className={styles}
      style={{ backgroundImage: `url("${url}")` }}
      onClick={() => setMaskUrl(url)}
    />
  )
}

function Gallery({ urls, setMaskUrl }: { urls: string[]; setMaskUrl: DispatchURL }) {
  const styles = css({
    display: 'grid',
    gridTemplateRows: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gridGap: '10px 10px'
  })
  return (
    <div className={styles}>
      {urls.map((url, ind) => (
        <GalleryItem url={url} key={ind} setMaskUrl={setMaskUrl} />
      ))}
    </div>
  )
}

function GalleryMask({ url, setMaskUrl }: { url: string; setMaskUrl: DispatchURL }) {
  const styles = css({
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1,
    width: '100vw',
    height: '100vh',
    padding: 40,
    backgroundColor: '#22222288',
    animation: 'fadein ease-in',
    animationFillMode: 'forwards',
    animationDuration: '250ms',
    '& img': {
      width: '100%',
      height: '100%',
      objectFit: 'contain'
    }
  })

  const transition = css({
    animation: 'fadeout ease-in',
    animationFillMode: 'forwards',
    animationDuration: '250ms'
  })

  const [isFading, setFading] = useState(false)

  return (
    <div
      className={cx(styles, isFading && transition)}
      onClick={() => {
        setFading(true)
        setTimeout(() => setMaskUrl(null), 300)
      }}>
      <img width="200" src={url} />
    </div>
  )
}

function Title({ text }: { text: string }) {
  const styles = css({
    marginTop: '60px',
    marginBottom: '20px',
    fontSize: '1.25em'
  })

  return <h1 className={styles}>{text}</h1>
}

export default function App() {
  const styles = css({
    margin: '4rem 6rem',
    fontFamily: 'jakarta'
  })

  // const { value: isMaskShowing, setTrue: showMask, setFalse: hideMask } = useBoolean(false)
  const [maskUrl, setMaskUrl] = useState<string | null>(null)

  const headerArgs = {
    image:
      'https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    tags: ['Nature', 'Animal', 'Stuff'],
    title: 'Birds, Birds, Birds!',
    subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Lorem ipsum dolor sit amet.`,
    date: 'a year ago'
  } satisfies HeaderProps

  const summaryArgs = {
    date: 'April 25, 2022',
    readingTime: 6,
    views: 1288
  } satisfies SummaryProps

  const contents: Content[] = [
    {
      type: 'title',
      text: 'You Gotta Love Birds'
    },
    {
      type: 'p',
      text: [
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet ut quam sit amet vehicula. Donec sit amet facilisis quam. Integer mollis, urna accumsan tempor hendrerit, risus neque tincidunt neque, in aliquam elit eros quis tortor. Sed id venenatis massa, ut malesuada sem. Nam lacinia sodales tellus nec efficitur. Vestibulum fringilla nisl ac iaculis ultricies. Sed commodo imperdiet metus vitae molestie. In laoreet rutrum pretium. Aenean a enim ac lacus tincidunt pellentesque ac a tellus.`,
        `Donec imperdiet efficitur risus in venenatis. Aenean ornare iaculis orci a condimentum. Praesent tincidunt, purus ac placerat posuere, lacus risus suscipit lacus, et sollicitudin turpis metus in enim. Vestibulum at imperdiet magna, ac vehicula magna. Praesent placerat sapien bibendum, faucibus lectus at, euismod elit. Nunc velit est, faucibus et faucibus eu, tempus non nisi. Fusce hendrerit auctor lectus non auctor. Vestibulum luctus metus eget sapien volutpat congue. Fusce eget augue mauris. Ut egestas mi et feugiat sagittis. Cras ac convallis elit.`,
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus imperdiet ut quam sit amet vehicula. Donec sit amet facilisis quam. Integer mollis, urna accumsan tempor hendrerit, risus neque tincidunt neque, in aliquam elit eros quis tortor. Sed id venenatis massa, ut malesuada sem. Nam lacinia sodales tellus nec efficitur. Vestibulum fringilla nisl ac iaculis ultricies. Sed commodo imperdiet metus vitae molestie. In laoreet rutrum pretium. Aenean a enim ac lacus tincidunt pellentesque ac a tellus.`
      ]
    },
    {
      type: 'bq',
      text: `"Be like the bird who, pausing in her flight awhile on boughs too slight, feels them give way beneath her, and yet sings, knowing she hath wings." — Victor Hugo`
    },
    {
      type: 'gallery',
      text: [
        'https://images.unsplash.com/photo-1551668231-6a07c2b7d544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1777&q=80',
        'https://images.unsplash.com/photo-1605092675701-0dafa674328e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80',
        'https://images.unsplash.com/photo-1604946591005-c481923435b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80',
        'https://images.unsplash.com/photo-1603741583823-e588bae552b2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80',
        'https://images.unsplash.com/photo-1618611157876-3517925c6285?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80'
      ]
    }
  ]

  return (
    <div className={styles}>
      {maskUrl && <GalleryMask url={maskUrl} setMaskUrl={setMaskUrl} />}
      <Header {...headerArgs} />
      <Summary {...summaryArgs} />
      {contents.map(({ type, text }, ind) => {
        switch (type) {
          case 'bq':
            return <Blockquote key={ind} text={text} />
          case 'gallery':
            return <Gallery key={ind} urls={text} setMaskUrl={setMaskUrl} />
          case 'p':
            return <Paragraph key={ind} text={text} />
          case 'title':
            return <Title key={ind} text={text} />
          default:
            return <></>
        }
      })}
    </div>
  )
}
