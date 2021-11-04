import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Box, Flex, FormControl, Input, VStack, Heading, Button, Link, Text } from '@chakra-ui/react';

export default function Signup() {
    // set initial form state
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
        }
      };

    return (
        <Box w='100%' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)" >
            <Flex h='100vh' py={10}>
                <VStack onSubmit={handleFormSubmit} w='full' spacing={4} bg='blue.500' h='75%' p={4} borderRadius={20}>
                    <Heading>Signup</Heading>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input 
                            placeholder='Username'
                            name='username'
                            type='text'
                            value={formState.name}
                            onChange={handleChange}                            
                            />
                    </FormControl>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input 
                            placeholder='Email'
                            name='email'
                            type='email'
                            value={formState.email}
                            onChange={handleChange}
                            />
                    </FormControl>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input
                            placeholder='Password'
                            name='password'
                            type='password'
                            value={formState.password}
                            onChange={handleChange}
                            />
                    </FormControl>
                    <Button
                        size='md' w='80%' 
                        type='submit'
                    > 
                        Signup
                    </Button>
                    {error && (
                        <Text p={5} bg='red.500' color='white'>
                            {error.message}
                        </Text>
                    )}
                    <Link href='/login'>Already have an account? Login here!</Link>
                </VStack>
            </Flex>
        </Box>

    );
}