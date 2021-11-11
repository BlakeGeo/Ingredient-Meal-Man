import React from 'react';
import { REMOVE_MEAL } from "../utils/mutations";
import { GET_ME } from '../utils/queries';
import Auth from '../utils/auth';
import { removeMealId, saveMealIds } from "../utils/localStorage";
import { useMutation, useQuery } from '@apollo/client';
import { SimpleGrid, 
        Box, 
        Heading, 
        Flex, 
        VStack, 
        HStack, 
        Text, 
        Link, 
        Image, 
        IconButton } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import Rating from '../components/Rating';

export default function Recipes() {
    const { loading, data } = useQuery(GET_ME);
    const userData = data?.me || [];

    const [removeMeal, { error }] = useMutation(REMOVE_MEAL);
    
    const handleDeleteMeal = async (mealId) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        if(!token) {
            return false;
        }
        try {
            const response = await removeMeal({
                variables: { mealId: mealId },
            });

            if (!response) {
                throw new Error('Something went wrong!');
            }
            removeMealId(mealId);
        } catch (err) {
            console.error(error);
        }
    };

    if(loading) {
        return <Heading>LOADING...</Heading>
    };

    const savedMealIds = userData.savedMeals.map((meal) => meal.mealId);
    saveMealIds(savedMealIds);

    return (
        <Box w='100%' minH='100vh' px={10} py={20} bgGradient="linear(to-r, blue.100, cyan.300)">
            <Flex py={10}>
                <VStack w='full' h='full' p={4} spacing={10}>
                    <Text align='left' fontSize='xl' fontWeight='bold'>
                        {userData.savedMeals.length
                        ? `Viewing ${userData.savedMeals.length} saved ${userData.savedMeals.length === 1 ? 'meal' : 'meals'}:`
                        : 'You have no meals saved!'}
                    </Text>
                <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={10}>
                    {userData.savedMeals.map((meal) => {
                        return (
                            <Flex key={meal.mealId}>
                                <VStack w='full' h='full' spacing={4} px={5}>
                                    <Image src={meal.imageURL}
                                            alt={`Photo of ${meal.label}`}
                                        />
                                    <HStack borderBottom='outset' pb={4} spacing={4}>
                                        <VStack spacing={2}>
                                            <Text fontSize='md' fontWeight='bold' textAlign='center'>{meal.label}</Text>
                                            <Rating />
                                            <Link onClick={() => window.open(meal.mealURL)}>Recipe</Link>                                                
                                        </VStack>
                                            <IconButton
                                                colorScheme='red'
                                                aria-label='delete recipe'
                                                icon={<DeleteIcon/>}
                                                onClick={() => handleDeleteMeal(meal.mealId)}
                                            />
                                    </HStack>
                                </VStack>
                            </Flex>
                        )
                    })}                  
                </SimpleGrid>
                </VStack>
            </Flex>
        </Box>
    )



}