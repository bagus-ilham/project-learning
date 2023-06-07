import { Box, Button, Flex, Image, Stack, Text } from '@chakra-ui/react'
import React from 'react'

const Home = () => {
  return (
    <Box mt={20}>
      <Flex mx={5}>
        <Flex direction={'column'} mr={10}>
          <Text fontSize='5xl' m={10}>The most powerful learning management system for WordPress </Text>
          <Text fontSize='2xl' ml={10}>Create professional, engaging courses in just a few clicks.</Text>
          <Stack direction='row' spacing={4} m={10}>
            <Button colorScheme='messenger' variant='solid' h='50px' w='100px' borderRadius='50px'>
              Demo
            </Button>
            <Button colorScheme='messenger' variant='outline' h='50px' w='100px' borderRadius='50px'>
              Pricing
            </Button>
          </Stack>
        </Flex>

        <Image
          src='https://www.learndash.com/wp-content/uploads/learndash-home-hero.png.webp'
          h={'auto'}
          maxW={700}
        />
      </Flex>
    </Box>
  )
}

export default Home