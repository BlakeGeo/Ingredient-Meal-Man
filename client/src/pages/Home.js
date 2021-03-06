import React, {useState, useEffect } from 'react';
import Axios from 'axios';
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
import Rating from '../components/Rating';


export default function Home() {
    // set states for all
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [healthLabel, setHealthLabel] = useState('alcohol-free');
    const [number, setNumber] = useState('10');
    const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());

    useEffect(() => {
        return () => {
            saveMealIds(savedMealIds);
        };
    });

    const [saveMeal, { error }] = useMutation(SAVE_MEAL);

    const {REACT_APP_API_KEY, REACT_APP_ID} = process.env;

    const url = `https://api.edamam.com/search?q=${query}&app_id=${REACT_APP_ID}&app_key=${REACT_APP_API_KEY}&from=0&to=${number}&health=${healthLabel}`;

    // fetch data from api
    const getRecipeInfo = async () => {
        const result = await Axios.get(url);

        const mealData = result.data.hits.map((meal) => ({
            // no given id so using recipe calories instead
            mealId: Math.floor(meal.recipe.calories),
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
    // handles the health select menu
    const handleHealth = (e) => {
        setHealthLabel(e.target.value);
    };

    // handles the number select menu
    const handleNumber = (e) => {
        setNumber(e.target.value);
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
                <Heading textAlign='center'>Welcome to Ingredient Meal Man</Heading>
                <VStack textAlign='center' spacing={3}>
                    <Text>Here at Ingredient Meal Man we strive to achieve zero waste pantries. Don't let those odd ingredients go to waste!</Text>
                    <Text>Start by searching your ingredient below and be specific if you want to. Once logged in you will be able to save your favourite meals.</Text>
                </VStack>
                <form className='Forms' onSubmit={handleSearchSubmit}>
                    <HStack w='full' justifyContent='center'>
                        <FormControl isRequired w='50%' borderColor='black' borderWidth={2} borderRadius={10}>
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
                        <Select maxW={20} bg='white'
                                value={number}
                                onChange={handleNumber}
                                placeholder='Number of results'
                        >
                            <option value='10'>10</option>
                            <option value='20'>20</option>
                            <option value='50'>50</option>
                            <option value='100'>100</option>
                        </Select>
                    </HStack>
                </form>

                <Text align='left' fontSize='xl' fontWeight='bold'>
                    {recipes.length
                    ? `Viewing ${recipes.length} results.`
                    : 'Search for an ingredient or meal to begin'}
                </Text>
                <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={10}>
                    {recipes.map((meal) => {
                        return (
                            <Flex key={meal.mealId} className='recipeCard' >
                                <VStack w='full' h='full' spacing={4} px={5}>
                                    <Image src={meal.imageURL}
                                            alt={`Photo of ${meal.label}`}
                                        />
                                    <HStack borderBottom='outset' w='full' justifyContent='center' pb={4} spacing={4}>
                                        <VStack spacing={2}>
                                            <Text fontSize='md' fontWeight='bold' textAlign='center'>{meal.label}</Text>
                                            <Rating />
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
                                                    (savedMealId) => savedMealId === meal.mealId)
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