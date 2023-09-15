import { Dialog } from '@headlessui/react'
import { animated, useTransition } from '@react-spring/web'
import { LuBird, LuShoppingCart } from 'react-icons/lu'
import { css } from 'styled-system/css'
import { create } from 'zustand'

interface DialogState {
  isOpen: boolean
  setOpen: () => void
  setClosed: () => void
}

const useDialogStore = create<DialogState>()((set) => ({
  isOpen: false,
  setOpen: () => set(() => ({ isOpen: true })),
  setClosed: () => set(() => ({ isOpen: false }))
}))

function CartIcon() {
  const cartStyles = css({
    marginLeft: 'auto',
    marginRight: '1rem',
    _hover: {
      color: 'emerald.400',
      cursor: 'pointer'
    }
  })

  const { setOpen } = useDialogStore()

  return (
    <div className={cartStyles}>
      <LuShoppingCart size="1.5rem" onClick={setOpen} />
    </div>
  )
}

function SideDialog() {
  const { isOpen, setClosed } = useDialogStore()

  const styles = {
    dialog: css({
      pos: 'relative',
      zIndex: '50'
    }),
    container: css({
      pos: 'fixed',
      inset: '0',
      display: 'flex',
      w: 'screen',
      alignItems: 'center',
      justifyContent: 'center',
      p: '4'
    }),
    panel: css({
      w: '60vw',
      padding: '1rem',
      borderRadius: '1rem',
      bgColor: 'white'
    }),
    backdrop: css({ pos: 'fixed', inset: '0', bgColor: 'hsla(0, 0%, 0%, 0.5)' }),
    title: css({
      textTransform: 'uppercase',
      fontSize: '1.2rem',
      fontWeight: 'bolder',
      color: 'orange.800'
    }),
    description: css({
      marginBottom: '1rem',
      color: 'gray.800',
      fontSize: '.9rem'
    }),
    button: css({
      textTransform: 'uppercase',
      fontSize: '1rem',
      padding: '.125em .5em',
      border: '2px solid',
      borderRadius: 'lg',
      margin: '.25em',
      _hover: { bg: 'slate.200', cursor: 'pointer' },
      _firstOfType: { color: 'red.300', borderColor: 'red.300' },
      _lastOfType: { color: 'blue.300', borderColor: 'blue.300' }
    })
  }

  // todo: try-out a { opacity: 0, transform: 'translateY(40px)' } transform
  const transitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 100 }
  })

  return transitions(
    (style, item) =>
      item && (
        <Dialog
          onClose={setClosed} open={item} className={styles.dialog} static as={animated.div} style={style}>
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className={styles.backdrop} aria-hidden="true" />

          {/* Full-screen container to center the panel */}
          <div className={styles.container}>
            {/* The actual dialog panel  */}
            <Dialog.Panel className={styles.panel}>
              <Dialog.Title className={styles.title}>Deactivate account</Dialog.Title>
              <Dialog.Description className={styles.description}>
                This will permanently deactivate your account
              </Dialog.Description>
              <p>
                Are you sure you want to deactivate your account? All of your data will be
                permanently removed. This action cannot be undone.
              </p>

              <button onClick={setClosed} className={styles.button}>
                Deactivate
              </button>
              <button onClick={setClosed} className={styles.button}>
                Cancel
              </button>
            </Dialog.Panel>
          </div>
        </Dialog>
      )
  )
}

function Navbar() {
  const styles = css({
    padding: '.25rem',
    margin: '1rem',
    border: '2px solid',
    borderRadius: '2rem',
    borderColor: 'slate.200',
    display: 'flex',
    alignItems: 'center',
    '& > span': {
      fontWeight: 'bold',
      fontSize: '1.25rem',
      letterSpacing: 'wider',
      marginX: '.5rem'
    }
  })

  const birdStyles = css({
    marginX: '1rem',
    _hover: {
      color: 'emerald.400',
      cursor: 'pointer'
    }
  })

  return (
    <div style={{ paddingTop: '1rem' }}>
      <div className={styles}>
        <LuBird size="2rem" className={birdStyles} />
        <span>LOGO</span>
        <CartIcon />
      </div>
    </div>
  )
}

export default function App() {
  const styles = css({
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    w: '100vw',
    h: '100vh',
    fontFamily: 'jakarta'
  })

  return (
    <div className={styles}>
      <Navbar />
      <SideDialog />
    </div>
  )
}
