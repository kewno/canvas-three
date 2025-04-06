import React from 'react'
import * as THREE from 'three'
import {getExitPoint} from "./helper";

type TArrow = {
    from: [number, number, number]
    to: [number, number, number]
    color: string
}
const Arrow = (props: TArrow) => {
    const {from, to, color} = props

    const boxSize = new THREE.Vector3(3, 1, 0.2)

    const direction = new THREE.Vector3().subVectors(
        new THREE.Vector3(...from),
        new THREE.Vector3(...to)
    ).normalize()

    const startPoint = getExitPoint(new THREE.Vector3(...from), direction.clone().negate(), boxSize)
    const endPoint = getExitPoint(new THREE.Vector3(...to), direction.clone(), boxSize)

    const arrowDirection = new THREE.Vector3().subVectors(startPoint, endPoint)
    const arrowLength = arrowDirection.length()
    const arrowDirectionNormalized = arrowDirection.normalize()

    return (
        <arrowHelper
            args={[
                arrowDirectionNormalized,
                endPoint,
                arrowLength,
                color,
                0.2,
                0.3
            ]}
        />
    )
}

export default Arrow