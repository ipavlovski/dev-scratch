import { Environment, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, GroupProps } from '@react-three/fiber'
import { Suspense, useRef } from 'react'
import { css } from 'styled-system/css'

function Model(props: GroupProps) {
  const groupRef = useRef(null!)
  const beech = useGLTF('/beech-tree.glb')
  const elm = useGLTF('/elm-tree.glb')
  return (
    <group ref={groupRef} {...props} dispose={null}>
      <primitive object={beech.scene} position={[-1.2, 0, 0]} />
      <primitive object={elm.scene} position={[20, 0, 0]} />
    </group>
  )
}

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: '#f0f0f0'
  })

  return (
    <div className={styles}>
      <Canvas camera={{ position: [0, 0, 7.5] }}>
        <Suspense fallback={null}>
          <Model />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
