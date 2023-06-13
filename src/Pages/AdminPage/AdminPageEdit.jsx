import React, { useState } from 'react'
import SidebarAdmin from '../../Layouts/SidebarAdmin'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Config/firebase'
import { Button, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react'

const AdminPageEdit = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const { course, title, description } = location.state || {}
    const [updatedTitle, setUpdatedTitle] = useState(title)
    const [updatedDescription, setUpdatedDescription] = useState(description)
    console.log(course, 'state')

    const handleConfirm = async () => {
        try {
            // Membuat objek data yang akan diperbarui
            const updatedData = {
                title: updatedTitle,
                description: updatedDescription
            };

            // Memperbarui data di Firebase
            await updateDoc(doc(db, "course", course.id), updatedData)
            navigate('/AdminPageCourses')

            console.log("Data berhasil diperbarui di Firebase")
        } catch {
            console.log("Terjadi kesalahan saat memperbarui data di Firebase:")
        }
    }

    return (
        <>
        <SidebarAdmin>
            <FormControl>
                <FormLabel>Title</FormLabel>
                <Input type='email' value={updatedTitle} onChange={(e) => setUpdatedTitle(e.target.value)} />
                <FormLabel>Description</FormLabel>
                <Textarea type='email' value={updatedDescription} onChange={(e) => setUpdatedDescription(e.target.value)} />
                <Button colorScheme="blue" m={3} onClick={handleConfirm}>
                    Sumbmit
                </Button>
            </FormControl>
            </SidebarAdmin>
        </>
    )
}

export default AdminPageEdit