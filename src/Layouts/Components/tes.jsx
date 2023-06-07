// import {
//   Box,
//   Button,
//   ButtonGroup,
//   Container,
//   HStack,
//   IconButton,
//   useBreakpointValue,
// } from '@chakra-ui/react';
import { FiMenu } from 'react-icons/fi';
// import { Logo } from './Logo';
import {
  Box,
  Flex,
  HStack,
  useBreakpointValue,
  useColorModeValue as mode,
  IconButton,
  Image,
  useDisclosure,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Text,
  Tabs,
  TabList,
  Tab,
  Stack,
  TabPanel,
  TabPanels,
} from '@chakra-ui/react';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { MdOutlineStore } from 'react-icons/md';
import { RiHeartLine, RiShoppingCartLine } from 'react-icons/ri';
// import { CurrencySelect } from '../CurrencySelect';
// import { Logo } from './Logo';
import { CartCount } from './CartCount';
import { NavAction } from './NavAction';

import { SearchInput } from './SearchInput';

import { useLocation, useNavigate } from 'react-router-dom';

import Men from '../MenuDropdown/Men';
import Women from '../MenuDropdown/Women';
import Child from '../MenuDropdown/Child';
import Baby from '../MenuDropdown/Baby';
import Profile from '../MenuDropdown/Profile';
import { CloseIcon } from '@chakra-ui/icons';
import Footer from '../Footer/Footer';
import { UseAuthDispatch, UseAuthState } from '../../Context/Context';
import { LayoutHeader, WithHeader } from '../../Context/Actions';
import { useEffect } from 'react';
import MenuHeader from './MenuHeader';

const Header = () => {
  const navigate = useNavigate();
  const isDesktop = useBreakpointValue({
    base: false,
    lg: true,
  });
  const dispatch = UseAuthDispatch();
  const { layout } = UseAuthState();
  const location = useLocation();
  // console.log(location, 'ni locat');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const categories = [
    'new arrivals',
    'limited offer',
    'value buy',
    'coming soon',
    'featured news',
    'ut graphic t-shirt',
    'styling book',
    'about lifewear',
    'extra size',
    'pembelian jumlah besar',
    'kirim kado',
  ];
  const Load = () => {
    const loc = location.pathname;
    if (loc === '/login') {
      LayoutHeader(dispatch);
    } else if (loc === '/checkout' && isDesktop === false) {
      LayoutHeader(dispatch);
    } else if (loc.includes('/member') && isDesktop === false) {
      LayoutHeader(dispatch);
    } else {
      WithHeader(dispatch);
    }
    // console.log(location, 'ni loc');
  };
  console.log(location.pathname.includes('/s/'), 'ini loc');
  useEffect(() => {
    Load();
  }, [location.pathname, isDesktop]);
  return (
    <>
      {layout === false ? (
        <>
          <Flex
            bgColor="#f4f4f4"
            className="top-header"
            px={{ base: 5, md: 10, lg: 20 }}
            h="30px"
            align="center"
            justify="left"
            textTransform="uppercase"
            fontWeight="bold"
            fontSize="14px"
            display={{ base: 'none', lg: 'flex' }}
            w="100%"
            gap="5"
          >
            <Text onClick={() => navigate('/s/heritage')} cursor="pointer">
              Heritage
            </Text>
            <Text onClick={() => navigate('/s/signature')} cursor="pointer">
              Signature
            </Text>
            <Text onClick={() => navigate('/s/scarves')} cursor="pointer">
              Scarves
            </Text>
          </Flex>
          <Flex
            direction="column"
            pb="4.5rem"
            overflow="hidden"
            display={{
              base: 'none',
              lg: 'none',
            }}
          >
            {/* <Box px="3" py="3" borderBottomWidth="1px" overflow="auto">
          <Flex
            align="center"
            justify="space-between"
            mb="3"
            display={{
              base: 'flex',
              lg: 'none',
            }}
          >
            <HStack spacing="3">
              <Center w="8" h="8" as="button" type="button">
                <VisuallyHidden>Toggle Menu</VisuallyHidden>
                <Box as={MdMenu} fontSize="3xl" />
              </Center>

              <Image
                src="https://cdn.shopify.com/s/files/1/0608/6724/8340/files/Logo_klamby_baru_banget_140x@2x.png?v=1643345083"
                h="3"
              />
            </HStack>
          </Flex>
          <SearchInput />
        </Box> */}

            {/* <Flex flex="1" fontSize="sm" overflow="auto">
          <NavCategoryMenu.Mobile />
          <NavCategorySubmenu.Mobile />
        </Flex> */}
            {/* <MobileBottomNav /> */}
          </Flex>
          <Box
            px={{ base: 5, md: 10, lg: 20 }}
            bg={mode('white', 'gray.800')}
            position="sticky"
            w="100%"
            top="0"
            zIndex="999"
            borderBottom="1px solid rgb(204, 204, 204)"
          >
            <Flex
              height={{ base: '5rem', lg: '4.5rem' }}
              align="center"
              maxW="8xl"
              mx="auto"
            >
              <HStack flex="24rem" spacing="32px">
                {isDesktop ? (
                  <>
                    <Image
                      src="https://cdn.shopify.com/s/files/1/0608/6724/8340/files/Logo_klamby_baru_banget_140x@2x.png?v=1643345083"
                      onClick={() => navigate('/')}
                      cursor="pointer"
                      h="9"
                    />
                    {location.pathname.includes('/s/') ? (
                      <>
                        <MenuHeader />
                      </>
                    ) : (
                      <>
                        <Popover islazy trigger={'hover'}>
                          <PopoverTrigger>
                            <Box>
                              <Text
                                onClick={() => navigate('/women')}
                                size={'md'}
                                as={'Button'}
                                fontWeight="bold"
                              >
                                WANITA
                              </Text>
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent w="100%" borderRadius="0">
                            <PopoverBody padding={'25px'}>
                              <Women />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Popover islazy trigger={'hover'}>
                          <PopoverTrigger>
                            <Box>
                              <Text
                                onClick={() => navigate('/men')}
                                size={'md'}
                                as={'Button'}
                                fontWeight="bold"
                              >
                                PRIA
                              </Text>
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent w="100%" borderRadius="0">
                            <PopoverBody padding={'25px'}>
                              <Men />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Popover islazy trigger={'hover'}>
                          <PopoverTrigger>
                            <Box>
                              <Text
                                onClick={() => navigate('/child')}
                                size={'md'}
                                as={'Button'}
                                fontWeight="bold"
                              >
                                ANAK
                              </Text>
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent w="100%" borderRadius="0">
                            <PopoverArrow />
                            <PopoverBody padding={'25px'}>
                              <Child />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                        <Popover islazy trigger={'hover'}>
                          <PopoverTrigger>
                            <Box>
                              <Text
                                onClick={() => navigate('/baby')}
                                size={'md'}
                                as={'Button'}
                                fontWeight="bold"
                              >
                                BAYI
                              </Text>
                            </Box>
                          </PopoverTrigger>
                          <PopoverContent w="100%" borderRadius="0">
                            <PopoverBody padding={'25px'}>
                              <Baby />
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                  </>
                ) : (
                  // <ButtonGroup variant="link" spacing="5" size="sm">
                  //   {buttonArr.map((item, index) => (
                  //     <Button
                  //       onPointerEnter={onToggle}
                  //       onPointerLeave={onToggle}
                  //       onClick={() => navigate(item.route)}
                  //       textTransform="uppercase"
                  //     >
                  //       {item.name}
                  //     </Button>
                  //   ))}
                  // </ButtonGroup>
                  // <IconButton
                  //   variant="ghost"
                  //   icon={<FiMenu fontSize="1.25rem" />}
                  //   aria-label="Open Menu"
                  // />
                  <Image
                    src="https://cdn.shopify.com/s/files/1/0608/6724/8340/files/Logo_klamby_baru_banget_140x@2x.png?v=1643345083"
                    h="7"
                    onClick={() => navigate('/')}
                  />
                )}
              </HStack>

              <HStack spacing="5" flexShrink={0}>
                {!isDesktop ? (
                  <Box onClick={() => navigate('/search/shirt')}>
                    <AiOutlineSearch />
                  </Box>
                ) : (
                  <></>
                )}
                {isDesktop ? (
                  <>
                    <Box width="full" mx="8">
                      <SearchInput />
                    </Box>

                    <Popover islazy trigger={'hover'}>
                      <PopoverTrigger>
                        <Box>
                          <AiOutlineUser cursor="pointer" />
                        </Box>
                      </PopoverTrigger>
                      <PopoverContent width={'100%'} borderRadius="0">
                        <PopoverArrow />
                        <PopoverBody padding={'25px'}>
                          <Profile />
                        </PopoverBody>
                      </PopoverContent>
                    </Popover>
                  </>
                ) : (
                  <></>
                )}

                <NavAction.Desktop icon={RiHeartLine} href="/wishlist" />
                {/* <NavAction.Desktop icon={AiOutlineUser} href="/member/details" /> */}
                <Box position="relative">
                  <NavAction.Desktop icon={RiShoppingCartLine} href="/cart" />
                  <CartCount>1</CartCount>
                </Box>
                {!isDesktop ? (
                  <IconButton
                    variant="ghost"
                    icon={
                      isOpen ? (
                        <CloseIcon fontSize="1rem" />
                      ) : (
                        <FiMenu fontSize="1.25rem" />
                      )
                    }
                    aria-label="Open Menu"
                    onClick={isOpen ? onClose : onOpen}
                  />
                ) : (
                  <></>
                )}
              </HStack>
            </Flex>
          </Box>
          {isOpen && !isDesktop ? (
            <>
              <Box
                bgColor="white"
                position="fixed"
                zIndex={998}
                w="100%"
                top="20"
                h="100vh"
                overflowY="auto"
              >
                <Flex py="5" borderBottom="1px solid #dadada">
                  <Flex
                    align="center"
                    w="50%"
                    justify="center"
                    onClick={() => navigate('/member')}
                    gap="2"
                  >
                    <AiOutlineUser fontWeight="bold" />
                    <Text
                      fontWeight="bold"
                      fontSize="18px"
                      textTransform="uppercase"
                    >
                      keanggotaan
                    </Text>
                  </Flex>
                  <Flex align="center" w="50%" justify="center" gap="2">
                    <MdOutlineStore fontWeight="bold" />
                    <Text
                      fontWeight="bold"
                      fontSize="18px"
                      textTransform="uppercase"
                    >
                      toko
                    </Text>
                  </Flex>
                </Flex>
                <Box as="section" pt="5">
                  <Stack spacing="16">
                    <Tabs size="lg" variant="with-line">
                      <TabList>
                        <Flex align="center" w="25%" justify="center">
                          <Tab
                            textTransform="uppercase"
                            fontSize="15px"
                            fontWeight="bold"
                            w="100%"
                            textAlign="center"
                          >
                            <Text textAlign="center" w="100%">
                              wanita
                            </Text>
                          </Tab>
                        </Flex>
                        <Flex align="center" w="25%" justify="center">
                          <Tab
                            textTransform="uppercase"
                            fontSize="15px"
                            fontWeight="bold"
                            w="100%"
                            textAlign="center"
                          >
                            <Text textAlign="center" w="100%">
                              pria
                            </Text>
                          </Tab>
                        </Flex>
                        <Flex align="center" w="25%" justify="center">
                          <Tab
                            textTransform="uppercase"
                            fontSize="15px"
                            fontWeight="bold"
                            w="100%"
                            textAlign="center"
                          >
                            <Text textAlign="center" w="100%">
                              anak
                            </Text>
                          </Tab>
                        </Flex>
                        <Flex align="center" w="25%" justify="center">
                          <Tab
                            textTransform="uppercase"
                            fontSize="15px"
                            fontWeight="bold"
                            w="100%"
                            textAlign="center"
                          >
                            <Text textAlign="center" w="100%">
                              bayi
                            </Text>
                          </Tab>
                        </Flex>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          {categories.map((item, index) => (
                            <Box
                              key={index}
                              py="5"
                              borderBottom="1px solid #dadada"
                              onClick={() =>
                                navigate('/new arrivals/koleksi-kemeja')
                              }
                            >
                              <Text
                                fontSize="15px"
                                textTransform="uppercase"
                                fontWeight="bold"
                              >
                                {item}
                              </Text>
                            </Box>
                          ))}
                        </TabPanel>
                        <TabPanel>
                          {categories.map((item, index) => (
                            <Box
                              key={index}
                              py="5"
                              borderBottom="1px solid #dadada"
                              onClick={() =>
                                navigate('/new arrivals/koleksi-kemeja')
                              }
                            >
                              <Text
                                fontSize="15px"
                                textTransform="uppercase"
                                fontWeight="bold"
                              >
                                {item}
                              </Text>
                            </Box>
                          ))}
                        </TabPanel>
                        <TabPanel>
                          {categories.map((item, index) => (
                            <Box
                              key={index}
                              py="5"
                              borderBottom="1px solid #dadada"
                              onClick={() =>
                                navigate('/new arrivals/koleksi-kemeja')
                              }
                            >
                              <Text
                                fontSize="15px"
                                textTransform="uppercase"
                                fontWeight="bold"
                              >
                                {item}
                              </Text>
                            </Box>
                          ))}
                        </TabPanel>
                        <TabPanel>
                          {categories.map((item, index) => (
                            <Box
                              key={index}
                              py="5"
                              borderBottom="1px solid #dadada"
                              onClick={() =>
                                navigate('/new arrivals/koleksi-kemeja')
                              }
                            >
                              <Text
                                fontSize="15px"
                                textTransform="uppercase"
                                fontWeight="bold"
                              >
                                {item}
                              </Text>
                            </Box>
                          ))}
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </Stack>
                </Box>
                <Footer />
              </Box>
            </>
          ) : (
            <></>
          )}
          {/* {isOpen && isDesktop ? (
        <ResourcesSubmenu isOpen={isDesktop && isOpen} />
      ) : (
        <></>
      )} */}
        </>
      ) : null}
    </>
  );
};

export default Header;