import React, { useEffect } from 'react';
import { Link as ReactLink} from 'react-router-dom';
import { Link } from '@chakra-ui/react';

import Auth from '../utils/auth';

export default function Navbar() {

  useEffect(() => {

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
      <div>MM</div>
      <div id="navBar" className="mdl-navigation">
        {/* if user is logged in, show profile, logout */}
        {Auth.loggedIn() ? (
            <>
                <Link id="link-navbar" as={ReactLink} to="/">Home</Link>
                <Link id="link-navbar" as={ReactLink} to="/profile">Profile</Link>
                <Link id="link-navbar" onClick={Auth.logout}>Logout</Link>
            </>
        ) : (
            <>
                <Link id="link-navbar" as={ReactLink} to="/">Home</Link>
                <Link id="link-navbar" as={ReactLink} to="/login">Login</Link>
                <Link id="link-navbar" as={ReactLink} to="/signup">Signup</Link>
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