import { Environment } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { css } from 'styled-system/css'
import * as THREE from 'three'
import Model from './model'
import Overlay from './overlay'

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    overscrollBehaviorY: 'none',
    backgroundColor: '#101010',
    background: 'radial-gradient(circle at bottom center, #212121 0%, #101010 80%)'
  })

  const overlay = useRef<HTMLDivElement>(null!)
  const caption = useRef<HTMLSpanElement>(null!)
  const scroll = useRef(0)

  return (
    <div className={styles}>
      <Canvas
        legacy={false}
        shadows
        eventSource={document.getElementById('root')!}
        eventPrefix="client"
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
        <directionalLight position={[10, 10, 5]} intensity={5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </div>
  )
}
