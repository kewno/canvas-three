import React, {useRef} from 'react'
import * as THREE from 'three'
import {Text} from '@react-three/drei'
import {TShape} from "../../Canvas"

interface IRectangle {
    shape: TShape
    handleSetActiveShapeId: (id: number) => void
    activeShapeId: number | null
}

const Rectangle = (props: IRectangle) => {
    const {shape, handleSetActiveShapeId, activeShapeId} = props
    const meshRef = useRef<THREE.Mesh>(null)

    const showBorder = activeShapeId === shape.id

    return (
        <group position={shape.position} onClick={() => handleSetActiveShapeId(shape.id)}>
            {showBorder && (
                <mesh>
                    <boxGeometry args={[3.1, 1.1, 0.19]} />
                    <meshStandardMaterial
                        color="#000"
                        opacity={1}
                        emissive="#000"
                    />
                </mesh>
            )}

            <mesh ref={meshRef}>
                <boxGeometry args={[3, 1, 0.2]} />
            </mesh>

            <Text
                position={[0, 0, 0.11]}
                color="black"
                fontSize={0.35}
                anchorX="center"
                anchorY="middle"
            >
                {shape.name}
            </Text>
        </group>
    )
}

export default Rectangle