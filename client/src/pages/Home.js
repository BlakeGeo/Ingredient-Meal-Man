import React, {useState, useEffect } from 'react';
import { Box, Heading, Flex, VStack, HStack, Text, FormControl, Input, Button } from '@chakra-ui/react'

export default function Home() {
    return (
    <Box w='100%' px={4} py={20} bgGradient="linear(to-r, blue.100, cyan.300)">
        <Flex h='100vh' py={4}>
            <VStack w='full' h='full' p={4} spacing={10}>
                <Heading textAlign='center'>Welcome to Mini Muscles</Heading>
                <VStack spacing={3}>
                    <Text>Our mission here at Mini Muscles is to provide easy access to healthy meals for children.</Text>
                    <Text>Start by searching our meals below, and once logged in you will be able to save your favourite meals.</Text>
                </VStack>
                <HStack w='full'>
                    <FormControl borderColor='black' borderWidth={2} borderRadius={10} w='80%'>
                        <Input placeholder='Search recipes...'/>
                    </FormControl>
                    <Button size='md' w='20%'>Search</Button>
                </HStack>
            </VStack>
        </Flex>
    </Box>

    );
}
