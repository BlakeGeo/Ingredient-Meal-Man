import React from "react";
import { FaGithub } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';

const Footer = () => (
  <footer>
      <h3>&copy; 2021 Blake Georgeff | Ingredient Meal Man
        <IconButton 
          as='a'
          href='https://github.com/BlakeGeo/Ingredient-Meal-Man' 
          aria-label='github repo'
          icon={<FaGithub/>} 
          bgColor='cyan.300' 
          boxShadow='none!important'
        />
      </h3>
  </footer>
);

export default Footer;