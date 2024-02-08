import React, { useState } from 'react';
import { registration } from '../../service/api';
import {useNavigate} from 'react-router-dom'
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';

const Signup = () => {
  const toast = useToast();
  const navigate = useNavigate();

  // password hide/show
  const [pshow, setPshow] = useState(false);
  const handlePassword = () => setPshow(!pshow);

  //  confirm password hide/show
  const [cpshow, setCpshow] = useState(false);
  const handleCpassword = () => setCpshow(!cpshow);

  //get signup data
  const [signup, setSignup] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
    pic: '',
  });

  // loading state
  const [loading, setLoading] = useState(false);

  //upload file on cloudnary
  const postDetails = async (pics) => {
    try {
      setLoading(true);
      if (pics === undefined) {
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
      } else if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
        const data = new FormData();
        data.append('file', pics);
        data.append('upload_preset', 'chat-app');
        data.append('cloud_name', 'dxo97hn5c');
        const respones = await fetch(
          'https://api.cloudinary.com/v1_1/dxo97hn5c/image/upload',
          {
            method: 'post',
            body: data,
          }
        );
        const resData = await respones.json();
        const imageUrl = resData.secure_url;
        setSignup({ ...signup, pic: imageUrl });
        setLoading(false);
      } else {
        toast({
          title: 'Please Select an Image!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (
      !signup.name ||
      !signup.email ||
      !signup.password ||
      !signup.cpassword
    ) {
      toast({
        title: 'Please Fill all the fields',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    } else if (signup.password !== signup.cpassword) {
      toast({
        title: 'Password Does Not Match',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    } else {
      const res = registration(signup);
      if(res.status === 201)
      {
        toast({
          title: 'Registration Successful :)',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setSignup({
          name: '',
          email: '',
          password: '',
          cpassword: '',
          pic: '',
        });
        setLoading(false);
        navigate('chat');
      }else{
        toast({
          title: 'Failed To Register !',
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setLoading(false);
      }
      
    }
  };

  return (
    <VStack>
      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Name</FormLabel>
        <Input
          type="string"
          placeholder="Enter Your Name"
          name="name"
          value={signup.name}
          color={'white'}
          bg={'black'}
          onChange={(e) =>
            setSignup({ ...signup, [e.target.name]: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          value={signup.email}
          color={'white'}
          bg={'black'}
          onChange={(e) =>
            setSignup({ ...signup, [e.target.name]: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Password</FormLabel>
        <InputGroup>
          <Input
            type={pshow ? 'text' : 'password'}
            placeholder="Enter Password"
            name="password"
            value={signup.password}
            color={'white'}
            bg={'black'}
            onChange={(e) =>
              setSignup({ ...signup, [e.target.name]: e.target.value })
            }
          />
          <InputRightElement>
            <Button
              color={'white'}
              p={'0 10px 0 0'}
              bg={'none'}
              _hover={{ bg: 'none' }}
              onClick={handlePassword}
            >
              {pshow ? 'Hide' : 'show'}{' '}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Confirm</FormLabel>
        <InputGroup>
          <Input
            type={cpshow ? 'text' : 'password'}
            placeholder="Enter Password"
            name="cpassword"
            value={signup.cpassword}
            color={'white'}
            bg={'black'}
            onChange={(e) =>
              setSignup({ ...signup, [e.target.name]: e.target.value })
            }
          />
          <InputRightElement>
            <Button
              color={'white'}
              p={'0 10px 0 0'}
              bg={'none'}
              _hover={{ bg: 'none' }}
              onClick={handleCpassword}
            >
              {cpshow ? 'Hide' : 'show'}{' '}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl mb={'10px'}>
        <FormLabel color={'white'}>Avatar</FormLabel>
        <Input
          type="file"
          p={'1.5'}
          accept="image/*"
          placeholder="upload image"
          name="pic"
          color={'white'}
          bg={'black'}
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="white"
        bg={'whiteAlpha.400'}
        width={'100%'}
        color="white"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
