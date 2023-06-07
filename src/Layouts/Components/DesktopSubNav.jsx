import { ChevronRightIcon } from '@chakra-ui/icons';
import { Box, Flex, Icon, Link, Stack, Text } from '@chakra-ui/react';
import React from 'react';

const DesktopSubNav = ({ child, linkColor, linkHoverColor, popoverContentBgColor }) => {
    return (
        <>
            {child.map((x) => (
                <Link
                    key={x.label}
                    href={x.href ?? '#'}
                    role={'group'}
                    display={'block'}
                    p={2}
                    rounded={'md'}
                    _hover={{ bg: linkHoverColor }}
                >
                    <Stack direction={'row'} align={'center'}>
                        <Box>
                            <Text
                                transition={'all .3s ease'}
                                _groupHover={{ color: 'pink.400' }}
                                fontWeight={500}
                                color={linkColor}
                            >
                                {x.label}
                            </Text>
                            <Text fontSize={'sm'}>{x.subLabel}</Text>
                        </Box>
                        <Flex
                            transition={'all .3s ease'}
                            transform={'translateX(-10px)'}
                            opacity={0}
                            _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                            justify={'flex-end'}
                            align={'center'}
                            flex={1}
                        >
                            <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
                        </Flex>
                    </Stack>
                </Link>
            ))}
        </>
    );
};

export default DesktopSubNav;
