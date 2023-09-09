import {
  CameraShake,
  ContactShadows,
  Environment,
  OrbitControls,
  Stage,
  useAnimations,
  useGLTF
} from '@react-three/drei'
import { Canvas, PrimitiveProps, ThreeElements } from '@react-three/fiber'
import { Suspense, forwardRef, useEffect, useRef } from 'react'
import { css } from 'styled-system/css'
import * as THREE from 'three'
import Model from './model'
import Overlay from './overlay'

// function Model() {
//   const { scene, animations } = useGLTF('/robot-draco.glb')
//   return <primitive object={scene} />
// }

import './styles.css'

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: '#101010'
  })

  const overlay = useRef()
  const caption = useRef()
  const scroll = useRef(0)

  return (
    <div className={styles}>
      {/* @ts-ignore */}
      <Canvas
        legacy={false}
        shadows
        // @ts-ignore
        eventSource={document.getElementById('root')}
        eventPrefix="client"
        gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}>
        {/* <ambientLight intensity={10} /> */}
        <directionalLight position={[10, 10, 5]} intensity={5} />
        <directionalLight position={[-10, -10, -5]} intensity={1} />
        <Suspense fallback={null}>
          <Model scroll={scroll} />
          <Environment preset="city" />
        </Suspense>
      </Canvas>
      {/* @ts-ignore */}
      <Overlay ref={overlay} caption={caption} scroll={scroll} />
    </div>
  )
}
