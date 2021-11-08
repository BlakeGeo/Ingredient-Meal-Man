import React, {useState, useEffect } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { SAVE_MEAL } from "../utils/mutations";
import Auth from '../utils/auth';
import { saveMealIds, getSavedMealIds } from "../utils/localStorage";
import { Select, 
        SimpleGrid, 
        Box, 
        Heading, 
        Flex, 
        VStack, 
        HStack, 
        Text, 
        FormControl, 
        Input, 
        Button, 
        Link, 
        Image, 
        IconButton } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useMutation } from '@apollo/client';


export default function Home() {
    // set states for all
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [healthLabel, setHealthLabel] = useState('alcohol-free');
    const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());

    useEffect(() => {
        return () => {
            saveMealIds(savedMealIds);
        };
    });

    const [saveMeal, { error }] = useMutation(SAVE_MEAL);

    const APP_ID = 'f9382f9a';
    const APP_KEY = 'e956104a103ceb2c521c3b461beb2f14';

    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=4&health=${healthLabel}`;

    // fetch data from api
    const getRecipeInfo = async () => {
        const result = await Axios.get(url);

        const mealData = result.data.hits.map((meal) => ({
            mealId: uuidv4(),
            label: meal.recipe.label,
            imageURL: meal.recipe.image,
            mealURL: meal.recipe.url,
        }));

        setRecipes(mealData);
        setQuery('');

        console.log(result.data.hits);
        console.log(url);
    };

    // submit form with user query
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        getRecipeInfo();
    };
    // handles the select menu
    const handleHealth = (e) => {
        setHealthLabel(e.target.value);
    };

    // save meal to profile
    const handleSaveMeal = async(mealId) => {
        const mealToSave = recipes.find((meal) => meal.mealId === mealId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if(!token) {
            return false;
        }
        try {
            const response = await saveMeal({
                variables: {
                    input: mealToSave,
                },
            });
            if (!response) {
                throw new Error('Something went wrong!')
            }
            // if meal succesfully saves to profile, save meal id to state
            setSavedMealIds([...savedMealIds, mealToSave.mealId]);
        } catch (err) {
            console.error(error);
        }
    };

    return (
    <Box w='100%' minH='100vh' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)">
        <Flex py={10}>
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
                        <Select maxW={40} bg='white'
                                value={healthLabel}
                                onChange={handleHealth}
                        >
                            <option value='alcohol-free'>Alcohol free</option>
                            <option value='vegan'>Vegan</option>
                            <option value='vegetarian'>Vegetarian</option>
                            <option value='paleo'>Paleo</option>
                            <option value='dairy-free'>Dairy free</option>
                            <option value='gluten-free'>Gluten free</option>
                            <option value='wheat-free'>Wheat free</option>
                            <option value='egg-free'>Egg free</option>
                            <option value='peanut-free'>Peanut free</option>
                            <option value='fish-free'>Fish free</option>
                        </Select>
                    </HStack>
                </form>

                <Text align='left' fontSize='xl' fontWeight='bold'>
                    {recipes.length
                    ? `Viewing ${recipes.length} ${query} results:`
                    : 'Search for an ingredient or meal to begin'}
                </Text>
                <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={10}>
                    {recipes.map((meal) => {
                        return (
                            <Flex key={uuidv4()} className='recipeCard' >
                                <VStack w='full' h='full' spacing={4} px={5}>
                                    <Image src={meal.imageURL}
                                            alt={`Photo of ${meal.label}`}
                                        />
                                    <HStack spacing={4}>
                                        <VStack spacing={0}>
                                            <Text fontSize='md' fontWeight='bold' textAlign='center'>{meal.label}</Text>
                                            <Link onClick={() => window.open(meal.mealURL)}>Recipe</Link>                                                
                                        </VStack>
                                        {Auth.loggedIn() && (
                                            <IconButton
                                                colorScheme='green'
                                                aria-label='save recipe'
                                                icon={<CheckCircleIcon/>}
                                                disabled={savedMealIds?.some(
                                                    (savedMealId) => savedMealId === meal.mealId
                                                )}
                                                onClick={() => handleSaveMeal(meal.mealId)}
                                                >
                                                {savedMealIds?.some(
                                                    (savedMealId) => savedMealId === meal.mealId
                                                    )
                                                    ? 'solid'
                                                    : 'outline'
                                                }
                                            </IconButton>
                                        )}
                                    </HStack>
                                </VStack>
                            </Flex>
                        )
                    })}                  
                </SimpleGrid>
            </VStack>
        </Flex>
    </Box>
    );
};