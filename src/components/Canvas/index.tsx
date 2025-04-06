import React, {useState} from 'react'
import {Canvas} from '@react-three/fiber'
import Rectangle from "../Shapes/Rectangle"
import Arrow from "../Shapes/Arrow"
import Navigation from "../Navigation"

export type TShape = {
    id: number
    name: string
    position: [number, number, number]
    color: string
}

const CanvasElem = () => {
    const [shapes, setShapes] = useState<TShape[]>([])
    const [nextId, setNextId] = useState(1)

    const [activeShapeId, setActiveShapeId] = useState<number | null>(null)
    //TODO подумать насчет shape, точно ли фигуры а не rectangle (прямоугольник)
    const handleSetActiveShapeId = (id: number) => {
        setActiveShapeId(id)
    }

    // Функция добавления новой фигуры
    const handleAddShape = () => {
        const newShape: TShape = {
            id: nextId,
            name: `Shape${nextId}`,
            position: [
                Math.random() * 10 - 5, // X: от -5 до 5
                Math.random() * 10 - 5, // Y: от -5 до 5
                0                        // Z: 0 (плоскость)
            ],
            color: `#${Math.floor(Math.random() * 16777215).toString(16)}` // Случайный цвет
        }
        setShapes([...shapes, newShape])
        setNextId(nextId + 1)
    }

    // Функция удаления последней фигуры
    const handleDeleteShape = () => {
        if (activeShapeId) {
            const newShapes = shapes.filter(x => x.id !== activeShapeId)
            setShapes(newShapes)
            setNextId(nextId > 1 ? nextId - 1 : 1) // todo нужно ли это
            setActiveShapeId(null)
        }
    }

    return (
        <div style={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navigation {...{handleAddShape, handleDeleteShape, disabledDelete: !activeShapeId}}/>

            {/* 3D холст */}
            <div style={{ flex: 1 }}>
                <Canvas camera={{ position: [0, 0, 15], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {shapes.map((shape, index) => (
                        <>
                            <Rectangle key={shape?.id} {...{shape, activeShapeId, handleSetActiveShapeId}} />
                            {index < shapes.length - 1 && (
                                <Arrow
                                    from={shape.position}
                                    to={shapes[index + 1].position}
                                    color="black"
                                />
                            )}
                        </>

                    ))}
                </Canvas>
            </div>
        </div>
    )
}

export default CanvasElem