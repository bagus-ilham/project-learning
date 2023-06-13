import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'
import { useEffect, useState } from 'react';
import { auth, db } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';
import HeaderAll from '../Layouts/HeaderAll';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import ToastComponent from '../Layouts/Components/ToastComponent';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [data, setData] = useState('')
    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const toast = useToast()

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const users = userCredential.user
                const getData = async () => {
                    const q = query(collection(db, "user"), where("uid", "==", users.uid))

                    const querySnapshot = await getDocs(q)
                    querySnapshot.forEach((doc) => {
                        setData(doc.data())
                        console.log(doc.data())
                    });
                    console.log(data, 'ni user')
                    if (data.role === '2') {
                        navigate('/MemberPage')
                        console.log('first')
                    } else if (data.role === '1') {
                        navigate('/AdminPage')
                    }
                }
                getData()

            })
            .catch((error) => {
                // toast({
                //     title: 'An error occurred.',
                //     description: 'Wrong Password.',
                //     status: 'error',
                //     duration: 9000,
                //     isClosable: true,
                // })
                console.log(error)
            })
    }
    // console.log(user, 'ni user')
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);

            } else {
                setUser(null);
            }
        });
    }, [data]);

    return (
        <>
            <HeaderAll />
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}>
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <FormControl id="email">
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    placeholder='email'
                                    onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    placeholder='password'
                                    onChange={(e) => setPassword(e.target.value)} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Link color={'blue.400'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleLogin}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}

export default Login