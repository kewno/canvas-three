import React, {useState} from 'react'
import css from './Canvas.module.scss'
import {Canvas as CanvasThree} from '@react-three/fiber'
import Rectangle from "../Shapes/Rectangle"
import Arrow from "../Shapes/Arrow"
import Navigation from "../Navigation"

export type TShape = {
    id: number
    name: string
    position: [number, number, number]
}

const Canvas = () => {
    const [shapes, setShapes] = useState<TShape[]>([])
    const [nextId, setNextId] = useState(1)

    const [activeShapeId, setActiveShapeId] = useState<number | null>(null)

    const handleSetActiveShapeId = (id: number) => {
        setActiveShapeId(id)
    }

    const handleAddShape = () => {
        const newShape: TShape = {
            id: nextId,
            name: `Shape${nextId}`,
            position: [Math.random() * 10 - 5, Math.random() * 10 - 5, 0],
        }
        setShapes([...shapes, newShape])
        setNextId(nextId + 1)
    }

    const handleDeleteShape = () => {
        if (activeShapeId) {
            const newShapes = shapes.filter(x => x.id !== activeShapeId)
            setShapes(newShapes)

            const lastId = nextId > 1 ? (newShapes[newShapes.length - 1]?.id || 0) + 1 : 1
            setNextId(lastId)

            setActiveShapeId(null)
        }
    }

    return (
        <div className={css.canvas}>
            <Navigation {...{handleAddShape, handleDeleteShape, disabledDelete: !activeShapeId}}/>
            <div className={css.containerCanvasThree}>
                <CanvasThree camera={{ position: [0, 0, 15], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    {shapes.map((shape, index) => (
                        <React.Fragment key={shape.id}>
                            <Rectangle {...{shape, activeShapeId, handleSetActiveShapeId}} />
                            {index < shapes.length - 1 && (
                                <Arrow
                                    from={shape.position}
                                    to={shapes[index + 1].position}
                                    color="black"
                                />
                            )}
                        </React.Fragment>
                    ))}
                </CanvasThree>
            </div>
        </div>
    )
}

export default Canvas