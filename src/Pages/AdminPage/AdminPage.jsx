import React from 'react'
import HeaderIn from '../../Layouts/HeaderIn'
import SidebarAdmin from '../../Layouts/SidebarAdmin'
import { Box, Text } from '@chakra-ui/react'

const AdminPage = () => {


  return (
    <>
    <SidebarAdmin>
      <Box>
        <Text>Admin</Text>
      </Box>
    </SidebarAdmin>
    </>
  )
}

export default AdminPage