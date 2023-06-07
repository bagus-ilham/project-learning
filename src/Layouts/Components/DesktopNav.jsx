import React from 'react';
import DesktopSubNav from './DesktopSubNav';
import { data } from '../../Data/data';
import { Box, Link, Popover, PopoverContent, PopoverTrigger, Stack } from '@chakra-ui/react';

const DesktopNav = () => {
    const linkColor = 'gray.600';
    const linkHoverColor = 'gray.800';
    const popoverContentBgColor = 'white';

    return (
        <Stack direction={'row'} spacing={12}>
            {data.map((navItem) => (
                <Box key={navItem.label}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={2}
                                href={navItem.href ?? '#'}
                                fontSize={'lg'}
                                fontWeight={500}
                                color={linkColor}
                                _hover={{
                                    textDecoration: 'none',
                                    color: linkHoverColor,
                                }}>
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem?.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}>
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav
                                            key={child.title}
                                            child={child.items}
                                            linkColor={linkColor}
                                            linkHoverColor={linkHoverColor}
                                            popoverContentBgColor={popoverContentBgColor}
                                        />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

export default DesktopNav;
