import React, { useState} from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Box, FormControl, Input, Button, Link, Text } from '@chakra-ui/react';

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
        <Box>
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
              ) : (
                <form className='Forms' onSubmit={handleFormSubmit}>                    
                    <FormControl isRequired borderColor='black' borderWidth={2} borderRadius={10} my={2}>
                        <Input 
                            placeholder='Username'
                            name='username'
                            type='text'
                            value={formState.name}
                            onChange={handleChange}                            
                        />
                    </FormControl>
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
                      Signup
                    </Button>
                </form>
                )}
                {error && (
                    <Text p={3} bg='red.500' color='white'>
                        {error.message}
                    </Text>
                )}          
        </Box>
    );
}