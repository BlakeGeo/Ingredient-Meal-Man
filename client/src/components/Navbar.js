import React, { useEffect } from 'react';
import { Link as ReactLink} from 'react-router-dom';
import { Link, Image } from '@chakra-ui/react';

import Auth from '../utils/auth';

export default function Navbar() {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

  useEffect(() => {
    // useEffect to ensure it loads after the DOM
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector("#navBar");
    const navLink = document.querySelectorAll("#link-navbar");
      
    hamburger.addEventListener("click", mobileMenu);
    navLink.forEach(n => n.addEventListener("click", closeMenu));
      
    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }
      
    function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }
  });    
  
  return (
    <header>
      <Image id='logo' src='https://images.all-free-download.com/images/graphiclarge/cartoon_cook_cute_design_vector_541584.jpg' borderRadius={50} alt='cartoon chef' />
      <div id="navBar">
        {/* if user is logged in, show profile, logout */}
        {Auth.loggedIn() ? (
            <>
                <Link id="link-navbar" boxShadow='none!important' as={ReactLink} to="/">Home</Link>
                <Link id="link-navbar" boxShadow='none!important' as={ReactLink} to="/recipes">{Auth.getProfile().data.username}'s Recipes</Link>
                <Link id="link-navbar" boxShadow='none!important' onClick={logout}>Logout</Link>
            </>
        ) : (
            <>
                <Link id="link-navbar" boxShadow='none!important' as={ReactLink} to="/">Home</Link>
                <Link id="link-navbar" boxShadow='none!important' as={ReactLink} to="/loginsignup">Login/Signup</Link>
            </>
        )}

      </div>

      <div class="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>
    </header>
  );
}