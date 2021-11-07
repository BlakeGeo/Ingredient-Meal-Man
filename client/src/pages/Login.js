import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Box, Flex, FormControl, Input, VStack, Heading, Button, Link } from '@chakra-ui/react';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {
    const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };
    
    
    return (
        <Box w='100%' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)" >
            <Flex h='100vh' py={10} justify='center'>
                <VStack w='70%' spacing={4} bg='blue.500' h='70%' p={10} borderRadius={20} shadow='2xl'>
                    <Heading>Login</Heading>
                    {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
                    <form className='Forms' onSubmit={handleFormSubmit}>                    
                        <FormControl isRequired borderColor='black' borderWidth={2} borderRadius={10} my={2}>
                            <Input 
                                placeholder='Email'
                                name='email'
                                type='email'
                                value={formState.email}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <FormControl isRequired borderColor='black' borderWidth={2} borderRadius={10} my={2}>
                            <Input
                                placeholder='Password'
                                name='password'
                                type='password'
                                value={formState.password}
                                onChange={handleChange}
                            />
                        </FormControl>
                        <Button
                            size='md' w='100%' 
                            type='submit'
                        > 
                            Login
                        </Button>
                    </form>
            )}
                        {error && (
                            <Text p={3} bg='red.500' color='white'>
                                {error.message}
                            </Text>
                        )}
                    <Link href='/signup'>Don't already have an account? Signup here!</Link>
                </VStack>
            </Flex>
        </Box>

    );
}