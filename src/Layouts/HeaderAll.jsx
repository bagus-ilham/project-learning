import React, { useEffect } from 'react';
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Image
} from '@chakra-ui/react';
import DesktopNav from './Components/DesktopNav';
// import { useAuthDispatch, useAuthState } from '../Context/Context';
import { useLocation, useNavigate } from 'react-router-dom';
// import { LayoutHeader, WithHeader } from '../Context/Action';
import ButtonNav from './Components/ButtonNav';

const HeaderAll = () => {
  // const dispatch = useAuthDispatch()
  // const { layout } = useAuthState()
  // const location = useLocation()
  // const Load = () => {
  //   const loc = location.pathname
  //   if (loc === '/Login' && '/SignUp') {
  //     LayoutHeader(dispatch)
  //   } else {
  //     WithHeader(dispatch)
  //   }
  // }

  const navigate = useNavigate()
  const handleLogin = () => {
    navigate('/Login')
  }
  const handleSignUp = () => {
    navigate('/SignUp')
  }
  const handleBack = () => {
    navigate('/')
  }

  // useEffect(() => {
  //   Load()
  // }, [location.pathname])
  return (
    <>
      {/* {layout === false} */}
      {/* <> */}
        <Box>
          <Flex
            bg={useColorModeValue('white', 'gray.800')}
            color={useColorModeValue('gray.600', 'white')}
            minH={'60px'}
            py={{ base: 2 }}
            px={{ base: 4 }}
            borderBottom={1}
            borderStyle={'solid'}
            borderColor={useColorModeValue('gray.200', 'gray.900')}
            align={'center'}
            justifyContent={'space-between'}
            mt={3}
            mx={10}>
            <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
              <Image
                maxHeight={32.16}
                maxWidth={200}
                src='https://www.learndash.com/wp-content/uploads/LearnDash-logo-black.png.webp'
                onClick={handleBack} />
              <Flex display={{ base: 'center', md: 'center' }} ml={'20%'}>
                <DesktopNav />
              </Flex>
            </Flex>

            <Stack direction='row' spacing={4}>
              <ButtonNav
                colorScheme='messenger'
                variant='solid'
                text='Login'
                onClick={handleLogin}
              />
              <ButtonNav
                colorScheme='messenger'
                variant='outline'
                text='SignUp'
                onClick={handleSignUp}
              />
            </Stack>
          </Flex>
        </Box>
      {/* </> */}
    </>
  )
}

export default HeaderAll