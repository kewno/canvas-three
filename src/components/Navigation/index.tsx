import React from 'react';

const NavBar = (props: any) => {
    const {shapes, addShape, deleteShape} = props

    return (
        <div style={{ padding: '10px', backgroundColor: '#fff' }}>
            <button onClick={addShape} style={{ marginRight: '10px' }}>Add</button>
            <button onClick={deleteShape}>Delete</button>
            <span style={{ marginLeft: '20px' }}>Фигур: {shapes.length}</span>
        </div>
    )
}

export default NavBar