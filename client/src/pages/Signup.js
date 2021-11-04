import React from 'react';
import { Box, Flex, FormControl, Input, VStack, Heading, Button, Link } from '@chakra-ui/react';

export default function Login() {
    return (
        <Box w='100%' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)" >
            <Flex h='100vh' py={10}>
                <VStack w='full' spacing={4} bg='blue.500' h='75%' p={4} borderRadius={20}>
                    <Heading>Signup</Heading>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input placeholder='Username'/>
                    </FormControl>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input type='email' placeholder='Email'/>
                    </FormControl>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input type='password' placeholder='Password'/>
                    </FormControl>
                    <Button size='md' w='80%' >Login</Button>
                    <Link href='/login'>Already have an account? Login here!</Link>
                </VStack>
            </Flex>
        </Box>

    );
}