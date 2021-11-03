import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

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
      <div>
          <p>Mini</p>
          <p>Muscles</p>
      </div>
      <div id="navBar" className="mdl-navigation">
        <NavLink id="link-navbar" to="/React-Portfolio">Home</NavLink>
        <NavLink id="link-navbar" to="/about">About</NavLink>
        <NavLink id="link-navbar" to="/projects">Projects</NavLink>
        <NavLink id="link-navbar" to="/curriculumvitae">CV</NavLink>
        <NavLink id="link-navbar" to="/contact">Contact</NavLink>
      </div>
      <div class="hamburger">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
    </div>
    </header>
  );
}