import { AspectRatio, Box, Heading, Text, useMenuOptionGroup } from '@chakra-ui/react';
import React from 'react'
import { useLocation } from 'react-router-dom';
import SidebarAdmin from '../../Layouts/SidebarAdmin';
import BackButton from './component/BackButton';
import ReactPlayer from 'react-player';

const MemberPageTopicsDisplay = () => {
  const location = useLocation();
  const { state } = location || {};
  console.log(state, 'wkwo')
  console.log(state.topic.vidio, 'tes')
  return (
    <>
      <SidebarAdmin>
        <Box>
        <Heading>{state.topic.title}</Heading>
        <Box>
        <AspectRatio maxW='560px' ratio={1}>
          <ReactPlayer
            url={state.topic.vidio}
          /> 
        </AspectRatio>
        <Text>About this Topics</Text>
        <Text>{state.topic.description}</Text>
        </Box>
        <BackButton text={'Back to section'}/>
        </Box>
      </SidebarAdmin>
    </>
  )
}

export default MemberPageTopicsDisplay





