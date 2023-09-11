import { PiClockBold, PiTag } from 'react-icons/pi'
import { css } from 'styled-system/css'
import { Flex } from 'styled-system/jsx'

type HeaderProps = {
  image: string
  tags: string[]
  title: string
  subtitle: string
  date: string
}

function Header(props: HeaderProps) {
  const { image, tags, title, subtitle, date } = props
  const styles = css({
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: '#fff',
    padding: '3rem',
    borderRadius: '1rem',
    fontFamily: 'jakarta',
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
        <Flex gap='.25rem' align='center' opacity='.8'>
          <PiTag style={{marginRight: '1rem'}}/>
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

export default function App() {
  const styles = css({
    margin: '4rem 6rem'
  })

  const headerArgs: HeaderProps = {
    image:
      'https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80',
    tags: ['Nature', 'Animal', 'Stuff'],
    title: 'Birds, Birds, Birds!',
    subtitle: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Lorem ipsum dolor sit amet.`,
    date: 'a year ago'
  }

  return (
    <div className={styles}>
      <Header {...headerArgs} />
    </div>
  )
}
