import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { LuBird, LuShoppingCart, LuXSquare } from 'react-icons/lu'
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
    <>
      <div className={cartStyles}>
        <LuShoppingCart size="1.5rem" onClick={setOpen} />
      </div>
    </>
  )
}

function SideDialog() {
  const { isOpen, setClosed } = useDialogStore()

  const styles = {
    dialog: css({
      pos: 'relative',
      zIndex: '50'
    }),
    div: css({
      pos: 'fixed',
      inset: '0',
      display: 'flex',
      w: 'screen',
      alignItems: 'center',
      justifyContent: 'center',
      p: '4'
    }),
    panel: css({
      w: 'full',
      maxW: 'sm',
      rounded: 'rounded',
      bgColor: 'white'
    })
  }

  return (
    <Dialog open={isOpen} onClose={setClosed} className={styles.dialog}>
      <div className={styles.div}>
        <Dialog.Panel className={styles.panel}>
          <Dialog.Title>Deactivate account</Dialog.Title>
          <Dialog.Description>This will permanently deactivate your account</Dialog.Description>
          <p>
            Are you sure you want to deactivate your account? All of your data will be permanently
            removed. This action cannot be undone.
          </p>

          <button onClick={setClosed}>Deactivate</button>
          <button onClick={setClosed}>Cancel</button>
        </Dialog.Panel>
      </div>
    </Dialog>
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
