import { css } from 'styled-system/css'
import { Center, VStack } from 'styled-system/jsx'

function DraggableItem({ item, ind }: { item: string; ind: number }) {
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

  return <div className={styles} style={{ top: ind * 50 }}>{item}</div>
}

function DraggableList({ items }: { items: string[] }) {
  const styles = css({
    position: 'relative',
    width: '200px',
    height: '100px',
  })

  return (
    <div className={styles} style={{ height: items.length * 50 }}>
      {items.map((item, ind) => <DraggableItem item={item} ind={ind} />)}
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
