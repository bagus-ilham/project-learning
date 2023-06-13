import React, { useState } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Image,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { auth } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const HeaderIn = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

const handleBack = () => {
    console.log('first')
}

const user = auth.currentUser
  const navigate = useNavigate();
  function onSignOut() {
    signOut(auth)
      .then(() => {
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  }

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.800')} px={4} position={'sticky'} zIndex={99999}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Image
                maxHeight={32.16}
                maxWidth={200}
                src='https://www.learndash.com/wp-content/uploads/LearnDash-logo-black.png.webp'
                onClick={handleBack} />

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu  >
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}
                >
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>{`${user?.displayName ?? user?.email}`}</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem onClick={onSignOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}

export default HeaderIn