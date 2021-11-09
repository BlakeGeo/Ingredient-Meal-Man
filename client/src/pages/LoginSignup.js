import React from 'react';
import { Box, Flex, VStack, Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function LoginSignup() {

    return (
        <Box w='100%' minH='100vh' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)">
            <Flex py={10} justify='center'>
                <VStack w='90%' spacing={4} bg='#2E8BC0' h='70%' p={10} borderRadius={20} shadow='2xl'>
                    <Tabs variant='line' colorScheme='red' size='lg'>
                        <TabList>
                            <Tab boxShadow='none!important' w='50%'>Login</Tab>
                            <Tab boxShadow='none!important' w='50%'>Signup</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <Signup />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            </Flex>
        </Box>
    )
}