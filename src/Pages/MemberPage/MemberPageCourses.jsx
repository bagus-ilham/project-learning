import React, { useEffect, useState } from 'react';
import SidebarMember from './layout/SidebarMember';
import BackButton from './component/BackButton';
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Button, Flex, Text } from '@chakra-ui/react';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../../Config/firebase';
import CardComponent from './component/CardComponent';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const MemberPageCourses = () => {
  const location = useLocation();
  const { state } = location || {};
  const [lessonsData, setLessonsData] = useState([]);
  const navigate = useNavigate()

  const getDataLesson = async () => {
    const lessonsQuerySnapshot = await getDocs(collection(db, `course/${state.courseData.id}/lesson`));
    const lessonsData = lessonsQuerySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setLessonsData(lessonsData);
  }
  
  const handleTopics = (lessonId) => {
    navigate('/MemberPageTopics', 
    {
      state: { 
        lessons: lessonId,
        course: state.courseData.id
      }
    }
    )
  }

  useEffect(() => {
    getDataLesson()
  }, []);


  return (
    <>
      <SidebarMember>
        <Box m={5}>
          <BackButton text="All Courses" />
          <Text fontSize="3xl" ml={9}>
            {state.courseData.title}
          </Text>
          <Text fontSize="l" ml={9}>
            {state.courseData.description}
          </Text>

        </Box>
        <Text fontSize="l" ml={9}>
          Courses Content
        </Text>
        {lessonsData.map((lesson) => (
          <Accordion defaultIndex={[0]} allowMultiple m={5}>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    {lesson.title}
                  </Box>
                  <AccordionIcon />

                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Flex justifyContent={'space-between'}>
                <Text fontSize='m'>{lesson.description}</Text>
                <Button onClick={()=>handleTopics(lesson)}> Learn this Section</Button>
                </Flex>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        ))}
      </SidebarMember>
    </>
  );
};

export default MemberPageCourses;
