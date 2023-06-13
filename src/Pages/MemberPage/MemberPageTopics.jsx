import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Text } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../Config/firebase';
import SidebarMember from './layout/SidebarMember';
import BackButton from './component/BackButton';

const MemberPageTopics = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { state } = location || {}; 
  console.log(state, 'ini')
  const [topicsData, setTopicsData] = useState([]);


  const getData = async () => {
    const topicsQuerySnapshot = await getDocs(collection(db, `course/${state?.course}/lesson/${state?.lessons.id}/topics`));
    const topicsData = topicsQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTopicsData(topicsData);
  }
  console.log(topicsData, 'topic')
  
  const handleView = (topic) => {
    navigate('/MemberPageTopicsDisplay', {
      state: { topic : topic }
      
    })
    console.log(topic, 'tes')
  }

  useEffect(() => {
    getData()
  }, []);

  return (
    <>
      <SidebarMember>
        <Box m={5}>
          <BackButton text="Courses" />
          <Text fontSize="3xl" ml={9}>
            {topicsData.title}
          </Text>
          <Text fontSize="l" ml={9}>
            {topicsData.description}
          </Text>

        </Box>
        <Text fontSize="l" ml={9}>
          Courses Content
        </Text>
        {topicsData.map((topic) => (
          <Accordion defaultIndex={[0]} allowMultiple m={5}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {topic?.title}
                  </Box>
                  <AccordionIcon />

                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex justifyContent={'space-between'}>
                <Text fontSize='m'>{topic?.description}</Text>
                <Button onClick={()=>handleView(topic)} > Learn this Section</Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </SidebarMember>
    </>
  )
}

export default MemberPageTopics