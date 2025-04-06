import * as THREE from "three";

const margin = 0.1

export const getExitPoint = (center: THREE.Vector3, direction: THREE.Vector3, boxSize: THREE.Vector3) => {
    const absDirection = new THREE.Vector3(
        Math.abs(direction.x),
        Math.abs(direction.y),
        Math.abs(direction.z)
    )

    const scale = Math.max(
        absDirection.x / (boxSize.x/2),
        absDirection.y / (boxSize.y/2),
        absDirection.z / (boxSize.z/2)
    )

    return new THREE.Vector3(
        center.x + direction.x / scale * (1 - margin),
        center.y + direction.y / scale * (1 - margin),
        center.z + direction.z / scale * (1 - margin)
    )
}