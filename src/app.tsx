import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { css } from 'styled-system/css'
import { ACESFilmicToneMapping, type Mesh } from 'three'

function Cube() {
  const meshRef = useRef<Mesh>(null)

  useFrame(() => {
    if (!meshRef.current) {
      return
    }

    meshRef.current.rotation.x += 0.01
    meshRef.current.rotation.y += 0.01
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color={'blue'}/>
    </mesh>
  )
}

function R3fDemo() {
  const styles = css({
    width: '100vw',
    height: '100vh'
  })

  return (
    <Canvas>
      {/* <PerspectiveCamera makeDefault fov={75} position={[0, 1, 5]} /> */}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />

      <Cube />
      {/* <mesh>
        <PerspectiveCamera makeDefault fov={75} position={[0, 0, 5]}/>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh> */}
    </Canvas>
  )
}

export default function App() {
  // return <h1 className={styles}>Hello world</h1>
  return <R3fDemo />
}
