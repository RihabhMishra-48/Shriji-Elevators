import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float, PresentationControls, ContactShadows } from '@react-three/drei'
import { useTransform, useSpring } from 'framer-motion'
import * as THREE from 'three'

const ElevatorModel = ({ scrollY }) => {
  const meshRef = useRef()
  const leftDoorRef = useRef()
  const rightDoorRef = useRef()
  const personRef = useRef()
  
  // scrollY is a MotionValue (0 to 1) representing the scroll progress of the entire page
  // We map this progress to a vertical position (Y axis) in 3D space.
  // Floor positions: map progress to vertical position so it stays in camera view
  // Camera Y is 0. If it ends at y=0 it stays centered when doors open.
  const yPos = useTransform(scrollY, [0, 1], [3, 0])
  
  // useSpring provides a smooth 'inertia' effect, making the elevator feel heavy and premium
  const smoothY = useSpring(yPos, { stiffness: 50, damping: 20 })

  // Door animation: start opening at 0.85, fully open at 0.95
  const doorOpenProgress = useTransform(scrollY, [0.85, 0.95], [0, 1])
  
  // Person walking animation: start walking at 0.9, fully out at 1.0
  const personWalkZ = useTransform(scrollY, [0.9, 1.0], [0, 4.5])
  // Person fades out slightly at the very end
  const personOpacity = useTransform(scrollY, [0.95, 1.0], [1, 0])

  const bodyMatRef = useRef()
  const headMatRef = useRef()

  useFrame((state) => {
    // Safety check just in case scrollY is ever undefined
    if (!scrollY) return;

    if (meshRef.current) {
      meshRef.current.position.y = smoothY.get()
      meshRef.current.rotation.y = scrollY.get() * Math.PI * 0.1
    }

    // Animate doors
    if (leftDoorRef.current && rightDoorRef.current) {
      const openAmount = doorOpenProgress.get() * 1.25
      leftDoorRef.current.position.x = -0.625 - openAmount
      rightDoorRef.current.position.x = 0.625 + openAmount
    }

    // Animate person
    if (personRef.current) {
      personRef.current.position.z = personWalkZ.get()
      
      const targetOpacity = personOpacity.get()
      const isVisible = targetOpacity > 0.01
      
      personRef.current.visible = isVisible
      if (bodyMatRef.current) bodyMatRef.current.opacity = targetOpacity
      if (headMatRef.current) headMatRef.current.opacity = targetOpacity
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

      {/* Left Glass Panel Door */}
      <mesh ref={leftDoorRef} position={[-0.625, 0, 1.51]}>
        <planeGeometry args={[1.25, 3.5]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={1} 
          roughness={0.1} 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Right Glass Panel Door */}
      <mesh ref={rightDoorRef} position={[0.625, 0, 1.51]}>
        <planeGeometry args={[1.25, 3.5]} />
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

      {/* 3D Person Silhouette */}
      <group ref={personRef} position={[0, -0.6, 0]}>
        {/* Body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 1.5, 16]} />
          <meshStandardMaterial 
            ref={bodyMatRef}
            color="#FFD700" 
            metalness={0.8} 
            roughness={0.2} 
            emissive="#FFD700"
            emissiveIntensity={0.3}
            transparent
            opacity={1}
          />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.25, 16, 16]} />
          <meshStandardMaterial 
            ref={headMatRef}
            color="#FFD700" 
            metalness={0.8} 
            roughness={0.2} 
            emissive="#FFD700"
            emissiveIntensity={0.3}
            transparent
            opacity={1}
          />
        </mesh>
      </group>
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

        {/* Removed ContactShadows and Environment preset="city" to prevent WebGL Context Lost from blocked CDNs and performance crashes */}
      </Canvas>
    </div>
  )
}

export default ElevatorCanvas
