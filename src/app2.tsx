import { Dialog } from '@headlessui/react'
import { a, useSpring, useTransition } from '@react-spring/web'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { styled } from '../styled-system/jsx'

type ToggleState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]

function MyDialog({ toggle }: { toggle: ToggleState }) {
  const [isShowing, setShowing] = toggle

  const styles = {
    dialog: css({
      position: 'absolute',
      width: '200px',
      height: '200px',
      left: '100px',
      top: '100px',
      background: 'gray.300'
    }),
    backdrop: css({}),
    container: css({}),
    panel: css({}),
    title: css({})
  }

  return (
    <Dialog open={isShowing} onClose={() => setShowing(false)} className={styles.dialog}>
      {/* The backdrop, rendered as a fixed sibling to the panel container */}
      <div className={styles.backdrop} aria-hidden="true" />

      {/* Full-screen container to center the panel */}
      <div className={styles.container}>
        {/* The actual dialog panel  */}
        <Dialog.Panel className={styles.panel}>
          <Dialog.Title>Complete your order</Dialog.Title>

          <p>This is an item</p>
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}

function Button({ toggle }: { toggle: ToggleState }) {
  const [isShowing, setShowing] = toggle

  const styles = css({
    color: 'slate.100',
    cursor: 'pointer',
    backgroundColor: 'yellow.800',
    padding: '.5em',
    rounded: 'xl',
    textTransform: 'uppercase',
    _hover: { bg: 'yellow.700' }
  })

  return (
    <button onClick={() => setShowing(!isShowing)} className={styles}>
      {isShowing ? 'hide' : 'show'}
    </button>
  )
}

export default function App() {
  const styles = css({
    bg: 'slate.800',
    color: 'slate.100',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  })

  const toggle = useState(false)

  return (
    <div className={styles}>
      <Button toggle={toggle} />
      <MyDialog toggle={toggle} />
    </div>
  )
}
