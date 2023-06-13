import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../Layouts/SidebarAdmin'
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, SearchIcon, ViewIcon } from '@chakra-ui/icons'
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../../Config/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const AdminPageCourses = () => {
  const [inputCourse, setInputCourse] = useState({
    title: '',
    description: ''
  })
  console.log(inputCourse,'put')
  const [user1, setUser1] = useState({})
  const [courses, setCourses] = useState([])
  const [data, setData] = useState("")
  const [reload, setReload] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate()
  
  const user = auth.currentUser
  console.log(user, 'ini user')

  const getData = async () => {
    const q = query(collection(db, "course"), where("uid", "==", user?.uid));
    try {
      const querySnapshot = await getDocs(q);
      const p = [];
      const docRef = doc(db, "user", user?.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data(), "this is data");
        setData(docSnap.data());
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      querySnapshot.forEach((doc) => {
        let newData = { id: doc.id };
        newData = { ...newData, ...doc.data() };
        p.push(newData);
      });
      console.log(p, "wkwkwkwkw");
      setCourses(p);
    } catch (error) {
      console.log(error);
    }
    setReload(false)
  };
  console.log(user?.uid, "haha");

  const handleAddCourse = async () => {
    const courseDocRef = doc(collection(db, `course`));
    const docRef = await addDoc(collection(db, `course`), {
      title: inputCourse.title,
      description: inputCourse.description,
      price: 'free',
      uid: user.uid,
      author : user.displayName
    });
    console.log(docRef, 'first');
    onClose();
    setReload(!reload)
  };

  const handleView = (courseId) => {
    navigate('/AdminPage/Courses/Lessons', 
      { state: { course: courseId } }
    )
  }

  const handleEdit = (index, courseId) => {
    const selectedcourses = courses[index];
    navigate("/AdminPageEdit", {
      state: {
        course: {course: courseId},
        title: selectedcourses.title,
        description: selectedcourses.description
      },
    });
  };

  const handleDelete = async (index) => {
    const courseDelete = courses[index]
    try {
      await deleteDoc(doc(db, "course", courseDelete.id));
    } catch (error) {
      console.log(error)
    }
  setReload(!reload)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1(user);
        getData()
      } else {
        setUser1(null);
      }
    });
  
  }, [user1, reload]);
  return (
    <>
      <SidebarAdmin>
        <Box mx='30px'>
          <Flex justifyContent={'space-between'} align={'center'}>
            <Box>
              <Text fontSize='3xl'>Courses</Text>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href='#'>Docs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href='#'>Breadcrumb</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Button colorScheme='messenger' onClick={onOpen}>+ Add</Button>
          </Flex>
          <Flex mt={10}>
            <Stack spacing={4} w={'25%'}>
              <InputGroup>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon color='gray.300' />
                </InputLeftElement>
                <Input type='tel' placeholder='Search' />
              </InputGroup>
            </Stack>
            <Select placeholder='Courses' w={'20%'} ml={5}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Lesson' w={'20%'} ml={5}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
            <Select placeholder='Topic' w={'20%'} ml={5}>
              <option value='option1'>Option 1</option>
              <option value='option2'>Option 2</option>
              <option value='option3'>Option 3</option>
            </Select>
          </Flex>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Tambah Course</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Input
                  placeholder="Title"
                  mb={2}
                  name="title"
                  onChange={(e) => setInputCourse({...inputCourse, title:e.target.value})}
                />
                <Input
                  placeholder="Description"
                  mb={2}
                  name="description"
                  onChange={(e) => setInputCourse({...inputCourse, description:e.target.value})}
                />
                <Select placeholder='Price'>
                  <option value='paid'>Paid</option>
                  <option value='free'>Free</option>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddCourse} >
                  Tambah
                </Button>
                <Button onClick={onClose}>Batal</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <Box mt={5}>
            <Table>
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Price</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
              {courses.map((item, index) => (
                    <Tr key={item.id}>
                      <Td>{index + 1}</Td>
                      <Td>{item.title}</Td>
                      <Td>{item.description}</Td>
                      <Td>{item.price}</Td>
                      <Td>
                        <Flex>
                        <ViewIcon color="F1D4E5" size="sm" mr={2} onClick={()=>handleView(item.id)} cursor={'pointer'}/>
                        <DeleteIcon color="73BBC9" size="sm" mr={2} onClick={()=>handleDelete(index)} cursor={'pointer'}/>
                        <EditIcon color="F1D4E5" size="sm" mr={2} onClick={()=>handleEdit(index, item.id)} cursor={'pointer'}/>
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </SidebarAdmin>
    </>
  )
}

export default AdminPageCourses