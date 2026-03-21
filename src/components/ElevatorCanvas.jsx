import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import { useTransform, useSpring } from 'framer-motion'
import * as THREE from 'three'

const ElevatorModel = ({ scrollY }) => {
  const meshRef = useRef()
  
  // scrollY is a MotionValue (0 to 1) representing the scroll progress of the entire page
  // We map this progress to a vertical position (Y axis) in 3D space.
  // Floor positions: Home (top) is at y=5, Contact (bottom) is at y=-15.
  const yPos = useTransform(scrollY, [0, 1], [5, -15])
  
  // useSpring provides a smooth 'inertia' effect, making the elevator feel heavy and premium
  const smoothY = useSpring(yPos, { stiffness: 50, damping: 20 })

  useFrame((state) => {
    if (meshRef.current) {
      // Update position on every frame for silky smooth movement
      meshRef.current.position.y = smoothY.get()
      // Gentle rotation based on scroll for extra dynamic feel
      meshRef.current.rotation.y = scrollY.get() * Math.PI * 0.1
    }
  })

  return (
    <group ref={meshRef}>
      {/* Main Elevator Box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 4, 3]} />
        <meshStandardMaterial 
          color="#0A1F44" 
          metalness={0.8} 
          roughness={0.2} 
          transparent 
          opacity={0.9}
        />
      </mesh>

      {/* Glass Panels */}
      <mesh position={[0, 0, 1.51]}>
        <planeGeometry args={[2.5, 3.5]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={1} 
          roughness={0.1} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Frame / Trim - Gold */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3.1, 4.1, 3.1]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          wireframe
          linewidth={2}
        />
      </mesh>

      {/* Indicator Light */}
      <mesh position={[0, 1.8, 1.52]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial 
          color="#FFD700" 
          emissive="#FFD700" 
          emissiveIntensity={2} 
        />
      </mesh>
    </group>
  )
}

const ElevatorCanvas = ({ scrollY }) => {
  return (
    <div className="w-full h-screen">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#D4AF37" />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 10, Math.PI / 10]}
          azimuth={[-Math.PI / 6, Math.PI / 6]}
        >
          <ElevatorModel scrollY={scrollY} />
        </PresentationControls>

        <ContactShadows 
          position={[0, -20, 0]} 
          opacity={0.4} 
          scale={20} 
          blur={2} 
          far={4.5} 
        />
        <Environment preset="city" />
      </Canvas>
    </div>
  )
}

export default ElevatorCanvas
