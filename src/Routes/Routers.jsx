import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
import SignUp from '../Pages/SignUp'
import Profile from '../Pages/Profile'
import MemberPage from '../Pages/MemberPage/MemberPage'
import AdminPageCourses from '../Pages/AdminPage/AdminPageCourses'
import AdminPage from '../Pages/AdminPage/AdminPage'
import AdminPageLesson from '../Pages/AdminPage/AdminPageLessons'
import AdminPageTopics from '../Pages/AdminPage/AdminPageTopics'
import MemberPageCourses from '../Pages/MemberPage/MemberPageCourses'
import AdminPageTopicsAdd from '../Pages/AdminPage/AdminPageTopicsAdd'
import MemberPageTopics from '../Pages/MemberPage/MemberPageTopics'
import AdminPageEdit from '../Pages/AdminPage/AdminPageEdit'
import MemberPageTopicsDisplay from '../Pages/MemberPage/MemberPageTopicsDisplay'

const Routers = () => {
    return (
        <Routes >
            < Route exact path='/' element={<Home />} />
            <Route path='/Login' element={<Login />} />
            <Route path='/SignUp' element={<SignUp />} />
            <Route path='/Profile' element={<Profile />} />
            <Route path='/AdminPage' element={<AdminPage />} />
            <Route path='/AdminPage/Courses' element={<AdminPageCourses />} />
            <Route path='/AdminPage/Courses/Lessons' element={<AdminPageLesson />} />
            <Route path='/AdminPage/Courses/Lessons/Topics' element={<AdminPageTopics />} />
            <Route path='/AdminPage/Courses/Lessons/Topics/Add' element={<AdminPageTopicsAdd />} />
            <Route path='/AdminPageEdit' element={<AdminPageEdit />} />
            <Route path='/MemberPage' element={<MemberPage />} />
            <Route path='/MemberPage/Courses' element={<MemberPageCourses />} />
            <Route path='/MemberPage/Courses/Topics' element={<MemberPageTopics />} />
            <Route path='/MemberPageTopicsDisplay' element={<MemberPageTopicsDisplay />} />
        </Routes>
    )
}

export default Routers