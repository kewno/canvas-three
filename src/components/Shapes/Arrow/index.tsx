import React, { useRef, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import { Text } from '@react-three/drei'

type TShape = {
    id: number
    name: string
    position: [number, number, number]
    color: string
}
const Rectangle = (props: any) => {
    const {shape} = props
    const meshRef = useRef<THREE.Mesh>(null)

    // useFrame(() => {
    //     if (meshRef.current) {
    //         meshRef.current.rotation.y += 0.01
    //     }
    // })

    return (
        <group position={shape.position}>
            {/* Прямоугольник (3D коробка) */}
            <mesh ref={meshRef}>
                <boxGeometry args={[3, 2, 0.2]} /> {/* Ширина, высота, глубина */}
                <meshStandardMaterial color={shape.color} />
            </mesh>

            {/* Текст на прямоугольнике */}
            <Text
                position={[0, 0, 0.11]} // Немного перед прямоугольником
                color="white"
                fontSize={0.5}
                anchorX="center"
                anchorY="middle"
            >
                {shape.name}
            </Text>
        </group>
    )
}

export default Rectangle