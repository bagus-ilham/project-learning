import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import HeaderAll from '../Layouts/HeaderAll'

const Routers = () => {
    return (
        <Routes >
            <Route
                exact
                path='/'
                element={<Home />}
            />
        </Routes>
    )
}

export default Routers