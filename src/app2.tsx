import { animated, SpringValue, useSprings } from '@react-spring/web'
import { css } from 'styled-system/css'
import { Center, VStack } from 'styled-system/jsx'

type Spring = { opacity: SpringValue<number>}
function DraggableItem({ item, ind, spring }: { item: string; ind: number; spring: Spring }) {
  const styles = css({
    position: 'absolute',
    width: '200px',
    height: '40px',
    textTransform: 'uppercase',
    fontWeight: 'normal',
    lineHeight: '2.5rem',
    color: 'white',
    paddingX: '2rem',
    letterSpacing: 'wider',
    borderRadius: 'md',

    '&:nth-child(1)': {
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
    },
    '&:nth-child(2)': {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    '&:nth-child(3)': {
      background: 'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
    },
    '&:nth-child(4)': {
      background: 'linear-gradient(135deg, #c3cfe2 0%, #c3cfe2 100%)',
    },
  })

  return <animated.div className={styles} style={{ top: ind * 50, ...spring }}>{item}</animated.div>
}

function DraggableList({ items }: { items: string[] }) {
  const styles = css({
    position: 'relative',
    width: '200px',
    height: '100px',
  })

  const [springs, api] = useSprings(items.length, (ind) => {
    return {
      from: { opacity: 0 },
      to: { opacity: 1 },
    }
  })

  return (
    <div className={styles} style={{ height: items.length * 50 }}>
      {springs.map((spring, ind) => <DraggableItem item={items[ind]} ind={ind} spring={spring} />)}
    </div>
  )
}

export default function App() {
  const items = ['Lorem', 'ipsum', 'dolor', 'sit']

  return (
    <Center height='100vh' bg='stone.100'>
      <DraggableList items={items} />
    </Center>
  )
}
