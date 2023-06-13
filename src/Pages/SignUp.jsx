import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    Link,
    Radio,
    RadioGroup,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import HeaderAll from '../Layouts/HeaderAll';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../Config/firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        role: '2',
        password: '',
        confirmPassword: ''
    })
    const { firstName, lastName, email, role, password, confirmPassword } = userData
    const displayName = `${firstName} ${lastName}`
    const navigate = useNavigate()

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                if (user) {
                    updateProfile(auth.currentUser, {
                        displayName: displayName,
                        email: auth.currentUser.email,
                        role: userData.role
                    },
                        console.log(auth.currentUser, 'auth.currentuser'),
                        console.log(user, 'ini user')
                    )
                    const useRef = doc(db, 'user', user.uid)
                    setDoc(useRef, {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        role: role,
                        uid: user.uid
                    })
                        .then(() => {
                            console.log(user.role, 'role')
                            if (user.role === '2') {
                                navigate('/MemberPage')
                            } else if (user.role === '1') {
                                navigate('/AdminPage')
                            }
                            
                        })
                        .catch((error) => {
                            const errorMessage = error.message
                        })
                }
            })
    }

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
                        <Heading fontSize={'4xl'} textAlign={'center'}>
                            Sign up
                        </Heading>
                        <Text fontSize={'lg'} color={'gray.600'}>
                            to enjoy all of our cool features ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={8}>
                        <Stack spacing={4}>
                            <HStack>

                                <Box>
                                    <FormControl id="firstName" isRequired>
                                        <FormLabel>First Name</FormLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setUserData({ ...userData, firstName : e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                                <Box>
                                    <FormControl id="lastName">
                                        <FormLabel>Last Name</FormLabel>
                                        <Input
                                            type="text"
                                            onChange={(e) => setUserData({ ...userData, lastName : e.target.value })}
                                        />
                                    </FormControl>
                                </Box>
                            </HStack>

                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    onChange={(e) => setUserData({ ...userData, email : e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="role">
                                <Flex>
                                    <FormLabel textAlign={'center'}>Role</FormLabel>
                                    <RadioGroup value={role} onChange={(value) => setUserData({ ...userData, role: value })}>
                                        <Stack direction="row" justifyContent={'center'} marginLeft={'10'}>
                                            <Radio value="1" marginLeft={'5'}>
                                                Admin
                                            </Radio>
                                            <Radio value="2" marginLeft={'5'}>
                                                Member
                                            </Radio>
                                        </Stack>
                                    </RadioGroup>
                                </Flex>
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(e) => setUserData({ ...userData, password : e.target.value })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="confirmPassword" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup>
                                    <Input
                                    type={showPassword ? 'text' : 'password'} 
                                    onChange={(e) => setUserData({ ...userData, confirmPassword : e.target.value })}
                                    />
                                    <InputRightElement h={'full'}>
                                        <Button
                                            variant={'ghost'}
                                            onClick={() =>
                                                setShowPassword((showPassword) => !showPassword)
                                            }>
                                            {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>

                            <Stack spacing={10} pt={2}>
                                <Button
                                    loadingText="Submitting"
                                    size="lg"
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{ bg: 'blue.500' }}
                                    onClick={handleSignUp}
                                    >
                                    Sign up
                                </Button>
                            </Stack>
                            <Stack pt={6}>
                                <Text align={'center'}>
                                    Already a user? <Link color={'blue.400'}>Login</Link>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </>
    );
}

export default SignUp