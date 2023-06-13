import React from 'react';
import { Card, CardBody, CardFooter, Stack, Image, Heading, Text, Button, Flex } from '@chakra-ui/react';

const CardComponent = ({data, onClick, buttonText}) => {
  return (
    <Card direction={{ base: 'column', sm: 'row' }} overflow='hidden' variant='outline'>
      <Image
        objectFit='cover'
        maxW={{ base: '100%', sm: '200px' }}
        src='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'
        alt='Caffe Latte'
      />

      <Stack>
        <CardBody>
          <Heading size='md'>{data.title}</Heading>
          <Text py='2'>{data.description}</Text>
          <Flex justifyContent={'space-between'}>
          <Text py='2'>Author : {data.author}</Text>
          <Text py='2'>Price : {data.price}</Text>
          </Flex>
        </CardBody>

        <CardFooter>
          <Button variant='solid' colorScheme='blue' onClick={onClick}>
            {buttonText}
          </Button>
        </CardFooter>
      </Stack>
    </Card>
  );
};

export default CardComponent;
