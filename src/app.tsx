import { PerspectiveCamera } from '@react-three/drei'
import { Canvas, ThreeElements, useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'
import { ACESFilmicToneMapping, type Mesh } from 'three'

function Box(props: ThreeElements['mesh']) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<Mesh>(null)

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta
  })

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

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
      <meshStandardMaterial color={'blue'} />
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
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </Canvas>
  )
}

export default function App() {
  // return <h1 className={styles}>Hello world</h1>
  return <R3fDemo />
}
