import React, { useEffect, useState } from "react";
import HeaderIn from "../../Layouts/HeaderIn";
import SidebarAdmin from "../../Layouts/SidebarAdmin";
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
  useDisclosure,
} from "@chakra-ui/react";
import {
  DeleteIcon,
  EditIcon,
  PhoneIcon,
  SearchIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../../Config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";

const AdminPageLesson = () => {
  const location = useLocation();
  const { state } = location || {};
  console.log(state, "course");

  const [inputLesson, setInputLesson] = useState({
    title: "",
    description: "",
  });
  const [user1, setUser1] = useState({});
  const [data, setData] = useState("");
  const [lessons, setLessons] = useState([]);
  const [docLesson, setDocLesson] = useState(state?.course);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = auth.currentUser;

  const handleAddLesson = async (courseId) => {
    const lessonCollectionRef = collection(db, `course/${courseId}/lesson`);
    const docRef = await addDoc(lessonCollectionRef, {
      title: inputLesson.title,
      description: inputLesson.description,
      uid: user?.uid,
    });
    console.log(docRef, "first");
    onClose();
    setReload(!reload);
  };

  const getData = async () => {
    try {
      if (!user?.uid || !docLesson) return;

      const q = query(
        collection(db, `course/${docLesson}/lesson`),
        where("uid", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const p = [];
      const docRef = doc(db, "user", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data(), "this is data");
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }

      querySnapshot.forEach((doc) => {
        let newData = { id: doc.id };
        newData = { ...newData, ...doc.data() };
        p.push(newData);
      });

      console.log(docLesson, "doc");
      console.log(p, "wkwkwkwkw");
      setLessons(p);
    } catch (error) {
      console.log(error);
    }
    setReload(false);
  };

  const handleView = (lessonsId) => {
    navigate("/AdminPage/Courses/Lessons/Topics", {
      state: {
        lessons: lessonsId,
        course: docLesson,
      },
    });
  };

  const handleDelete = async (index) => {
    const deleteLessons = lessons[index];
    await deleteDoc(doc(db, `course/${docLesson}/lesson`, deleteLessons.id));
    setReload(!reload);
  };

  const handleEdit = () => {
    console.log("first");
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser1(user);
        getData();
      } else {
        setUser1(null);
      }
    });
  }, [user1, docLesson, reload]);

  return (
    <>
      <SidebarAdmin>
        <Box mx="30px">
          <Flex justifyContent="space-between" align="center">
            <Box>
              <Text fontSize="3xl">Lessons</Text>
              <Breadcrumb>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem isCurrentPage>
                  <BreadcrumbLink href="#">Lessons</BreadcrumbLink>
                </BreadcrumbItem>
              </Breadcrumb>
            </Box>
            <Button colorScheme="blue" onClick={onOpen}>
              Add Lesson
            </Button>
          </Flex>
          <Box py="20px">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input type="text" placeholder="Search" />
            </InputGroup>
          </Box>
          <Box>
            <Table variant="striped">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Title</Th>
                  <Th>Description</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {lessons.map((item, index) => (
                  <Tr key={item.id}>
                    <Td>{index + 1}</Td>
                    <Td>{item.title}</Td>
                    <Td>{item.description}</Td>
                    <Td>
                      <Flex>
                        <ViewIcon
                          color="F1D4E5"
                          size="sm"
                          mr={2}
                          onClick={() => handleView(item.id)}
                          cursor={"pointer"}
                        />
                        <DeleteIcon
                          color="73BBC9"
                          size="sm"
                          mr={2}
                          onClick={() => handleDelete(index)}
                          cursor={"pointer"}
                        />
                        <EditIcon
                          color="F1D4E5"
                          size="sm"
                          mr={2}
                          onClick={() => handleEdit(index, item.id)}
                          cursor={"pointer"}
                        />
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </SidebarAdmin>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Lesson</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4}>
              <Input
                placeholder="Title"
                value={inputLesson.title}
                onChange={(e) =>
                  setInputLesson({ ...inputLesson, title: e.target.value })
                }
              />
              <Input
                placeholder="Description"
                value={inputLesson.description}
                onChange={(e) =>
                  setInputLesson({
                    ...inputLesson,
                    description: e.target.value,
                  })
                }
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => handleAddLesson(state?.course)}
            >
              Add
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AdminPageLesson;
