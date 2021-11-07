import React, {useState, useEffect } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { SAVE_MEAL } from '../utils/mutations';
import Axios from 'axios';
import RecipeCard from '../components/RecipeCard';
import { Select, SimpleGrid, Box, Heading, Flex, VStack, HStack, Text, FormControl, Input, Button } from '@chakra-ui/react'

export default function Home() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [healthLabel, setHealthLabel] = useState('vegan');

    const APP_ID = 'f9382f9a';
    const APP_KEY = 'e956104a103ceb2c521c3b461beb2f14';

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&health=${healthLabel}`;

    const getRecipeInfo = async () => {
        const result = await Axios.get(url);
        setRecipes(result.data.hits);
        console.log(result.data.hits);
        console.log(url);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        getRecipeInfo();
    };

    return (
    <Box w='100%' h='100%' px={4} py={20} bgGradient="linear(to-r, blue.100, cyan.300)">
        <Flex h='100%' py={4}>
            <VStack w='full' h='full' p={4} spacing={10}>
                <Heading textAlign='center'>Welcome to Mini Muscles</Heading>
                <VStack spacing={3}>
                    <Text>Our mission here at Mini Muscles is to provide easy access to healthy meals for children.</Text>
                    <Text>Start by searching our meals below, and once logged in you will be able to save your favourite meals.</Text>
                </VStack>
                <form className='Forms' onSubmit={handleSearchSubmit}>
                    <HStack w='full'>
                        <FormControl isRequired borderColor='black' borderWidth={2} borderRadius={10}>
                            <Input
                            name='search'
                            type='text'
                            autoComplete='off'
                            value={query}
                            placeholder='Search recipes...'
                            onChange={(e) => setQuery(e.target.value)}                        
                            />
                        </FormControl>
                        <Button
                        size='md'
                        type='submit'
                        >
                            Search
                        </Button>
                        <Select maxW={40} bg='white'>
                            <option onClick={() => setHealthLabel('vegan')}>Vegan</option>
                            <option onClick={() => setHealthLabel('vegetarian')} value='vegetarian'>Vegetarian</option>
                            <option onClick={() => setHealthLabel('paleo')}>Paleo</option>
                            <option onClick={() => setHealthLabel('dairy-free')}>Dairy free</option>
                            <option onClick={() => setHealthLabel('gluten-free')}>Gluten free</option>
                            <option onClick={() => setHealthLabel('wheat-free')}>Wheat free</option>
                            <option onClick={() => setHealthLabel('fat-free')}>Fat free</option>
                            <option onClick={() => setHealthLabel('egg-free')}>Egg free</option>
                            <option onClick={() => setHealthLabel('peanut-free')}>Peanut free</option>
                            <option onClick={() => setHealthLabel('fish-free')}>Fish free</option>
                        </Select>
                    </HStack>
                </form>
                <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={10}>
                    {recipes !== [] &&
                    recipes.map((recipe) => {
                        return <RecipeCard recipe={recipe} />;
                })}
                </SimpleGrid>
            </VStack>
        </Flex>

    </Box>

    );
}
