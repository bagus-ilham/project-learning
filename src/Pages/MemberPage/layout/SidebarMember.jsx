import React, { ReactNode } from 'react';
import {
  Box,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
  Link,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
} from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HeaderIn from '../../../Layouts/HeaderIn';

const LinkItems = [
  { name: 'Home', icon: FiHome, link : "/MemberPage" },
  { name: 'Courses', icon: FiTrendingUp, link : "/MemberPageCourses" }
];

const SidebarContent = ({ onClose, ...rest }) => {
  const navigate = useNavigate()
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} onClick={() => navigate(`${link.link}`)} >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const SidebarMember = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
    <HeaderIn/>
      <SidebarContent onClose={onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
    </>
  );
};

export default SidebarMember;