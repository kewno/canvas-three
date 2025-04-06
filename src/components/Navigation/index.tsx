import React from 'react';
import css from './Navigation.module.scss'

interface INavigation {
    handleAddShape: () => void
    handleDeleteShape: () => void
    disabledDelete: boolean
}

const Navigation = (props: INavigation) => {
    const {handleAddShape, handleDeleteShape, disabledDelete} = props

    return (
        <div className={css.navigation}>
            <button className={css.navigationButtonAdd} onClick={handleAddShape}>Add</button>
            <button onClick={handleDeleteShape} disabled={disabledDelete}>Delete</button>
        </div>
    )
}

export default Navigation