import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas, PrimitiveProps, ThreeElements, useFrame } from '@react-three/fiber'
import { useControls } from 'leva'
import { useRef, useState } from 'react'
import { css } from 'styled-system/css'
import { type Mesh } from 'three'

function Box(props: ThreeElements['mesh']) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef<THREE.Mesh>(null!)
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false)
  const [clicked, click] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += delta))
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => (event.stopPropagation(), hover(true))}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}
function BoxApp() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: '#f0f0f0'
  })
  return (
    <div className={styles}>
      <Canvas>
        <ambientLight intensity={2} />
        {/* position={[10, 10, 10]} angle={0.15} penumbra={1}  */}
        <spotLight position={[1, 1, 1]} />
        {/* <pointLight position={[-10, -10, -10]} /> */}
        <pointLight position={[0, 0, 0]} />
        <Box position={[-1.5, 0, 0]} />
        <Box position={[1.5, 0, 0]} />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

const MODELS: { [n: string]: string } = {
  Beech:
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-beech/model.gltf',
  Lime: 'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-lime/model.gltf',
  Spruce:
    'https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/tree-spruce/model.gltf'
}

export default function App() {
  const styles = css({
    width: '100vw',
    height: '100vh',
    background: '#f0f0f0'
  })
  const { model } = useControls({ model: { value: 'Beech', options: Object.keys(MODELS) } })
  return (
    <div className={styles}>
      <header>This is a {model.toLowerCase()} tree.</header>
      <Canvas camera={{ position: [-10, 10, 40], fov: 50 }}>
        {/* color="white" groundColor="blue" intensity={0.75} */}
        <hemisphereLight intensity={10} color="green" groundColor="white" />

        {/*  position={[50, 50, 10]} angle={0.15} penumbra={1} */}
        <spotLight position={[50, 50, 10]} intensity={2} angle={1.15} penumbra={3} />

        <group position={[0, -10, 0]}>
          <Model position={[0, 0.25, 0]} url={MODELS[model]} />
          <ContactShadows scale={20} blur={10} far={20} />
        </group>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

function Model({ url, ...props }: Omit<PrimitiveProps, 'object'> & { url: string }) {
  const { scene } = useGLTF(url)
  // <primitive object={...} mounts an already existing object
  return <primitive object={scene} {...props} />
}

// Silently pre-load all models
Object.values(MODELS).forEach((str) => useGLTF.preload(str))
