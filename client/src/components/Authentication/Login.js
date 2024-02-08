import React, { useState } from 'react';
import { loginApi } from '../../service/api';
import { useNavigate } from 'react-router-dom';
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

const data = {
  email: '',
  password: '',
};

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  // password hide/show
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //get login data
  const [login, setLogin] = useState({data} );

  // loading state
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    setLoading(true);
    if (!login.email || !login.password) {
      toast({
        title: 'Please Fill all the fields',
        status: 'warning',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
    } else {
      const res = await loginApi(login);
      if (res.status === 200) {
        toast({
          title: 'Login Successful :)',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setLogin({
          email: '',
          password: '',
        });
        localStorage.setItem('userInfo', JSON.stringify(res));
        setLoading(false);
        navigate('/chat');
      } else {
        toast({
          title: 'Email and Password does not match !',
          status: 'warning',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
        setLogin({
          email: '',
          password: '',
        });
        setLoading(false);
      }
    }
  };

  return (
    <VStack spacing={'20px'}>
      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Email</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          color={'white'}
          bg={'black'}
          onChange={(e) =>
            setLogin({ ...login, [e.target.name]: e.target.value })
          }
        />
      </FormControl>

      <FormControl isRequired mb={'10px'}>
        <FormLabel color={'white'}>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter Password"
            name="password"
            color={'white'}
            bg={'black'}
            onChange={(e) =>
              setLogin({ ...login, [e.target.name]: e.target.value })
            }
          />
          <InputRightElement>
            <Button
              size={'sm'}
              bg={'none'}
              color={'white'}
              p={'0 10px 0 0'}
              _hover={{ bg: 'none' }}
              onClick={handleClick}
            >
              {show ? 'Hide' : 'Show'}{' '}
            </Button>
          </InputRightElement>
        </InputGroup>
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
        Sign In
      </Button>
    </VStack>
  );
};

export default Login;
