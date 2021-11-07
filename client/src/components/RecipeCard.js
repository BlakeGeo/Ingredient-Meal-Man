import React from "react";
import { v4 as uuidv4 } from 'uuid';
import { Flex, Image, Text, VStack, Link, IconButton, HStack } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';

export default function RecipeCard({recipe}) {
    return (
        recipe['recipe']['image'].match(/\.(jpeg|jpg|gif|png)$/) !== null && (
            <Flex className='recipeCard' >
                <VStack w='full' h='full' spacing={4} px={5}>
                    <Image src={recipe['recipe']['image']} />
                    <HStack spacing={4}>
                        <VStack spacing={0}>
                            <Text fontSize='md' fontWeight='bold' key={uuidv4()}>{recipe['recipe']['label']}</Text>
                            <Link onClick={() => window.open(recipe['recipe']['url'])}>Recipe</Link>
                        </VStack>
                        <IconButton
                            variant='outline'
                            colorScheme='green'
                            aria-label='save recipe'
                            icon={<CheckCircleIcon/>}
                        />
                    </HStack>
                </VStack>

            </Flex>
        )
    )
}