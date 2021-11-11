import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { Input, HStack } from '@chakra-ui/react';

export default function Rating() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);


    return (
        <HStack spacing={1}>
            {[ ...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label>
                        <Input
                            type='radio'
                            name='rating'
                            value={ratingValue}
                            onClick={() => setRating(ratingValue)}
                            />
                        <FaStar
                            className='star' 
                            color={ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9'}
                            onMouseEnter={() => setHover(ratingValue)}
                            onMouseLeave={() => setHover(null)}
                        />
                    </label>
                )
            })}
        </HStack>
    )
}