import { Dialog } from '@headlessui/react'
import { a, useSpring, useTransition } from '@react-spring/web'
import { useState } from 'react'
import { css } from 'styled-system/css'
import { styled } from '../styled-system/jsx'

type ToggleState = [boolean, React.Dispatch<React.SetStateAction<boolean>>]
function MyDialog({ toggle }: { toggle: ToggleState }) {
  const [isShowing, setShowing] = toggle

  const transition = useTransition(isShowing, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const styles = {
    dialog: css({
      position: 'relative',
      zIndex: 50,
    }),
    backdrop: css({
      pos: 'fixed',
      inset: '0',
      bg: '#020202e4',
    }),
    container: css({
      pos: 'fixed',
      width: '200px',
      height: '200px',
      left: '100px',
      top: '100px',
      background: 'gray.300',
    }),
    panel: css({
      width: '100%',
      height: '100%',
    }),
    title: css({
      fontSize: '1.5rem',
      fontWeight: 'extrabold',
    }),
  }

  const hide = () => setShowing(false)

  return (
    <>
      {transition(
        (style, item) =>
          item && (
            <Dialog open={isShowing} onClose={hide} style={style} className={styles.dialog} static
              as={a.div}>
              {/* The backdrop, rendered as a fixed sibling to the panel container */}
              <div className={styles.backdrop} aria-hidden='true' />

              {/* Full-screen container to center the panel */}
              <div className={styles.container}>
                {/* The actual dialog panel  */}
                <Dialog.Panel className={styles.panel}>
                  <Dialog.Title className={styles.title}>
                    Is this what you came here for?
                  </Dialog.Title>

                  <p>This is an item</p>
                </Dialog.Panel>
              </div>
            </Dialog>
          ),
      )}
    </>
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
    _hover: { bg: 'yellow.700' },
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
    justifyContent: 'center',
  })

  const toggle = useState(false)

  return (
    <div className={styles}>
      <Button toggle={toggle} />
      <MyDialog toggle={toggle} />
    </div>
  )
}
