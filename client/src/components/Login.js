import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Text, Box, FormControl, Input, Button, Link } from '@chakra-ui/react';
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
        </Box>
    );
}