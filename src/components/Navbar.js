import React from 'react';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.png'; // Replace with the path to your logo

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-0 text-[#d8e2e1] py-10 px-4 md:px-32 mb-10 md:pb-10 top-0">
      <HashLink smooth to="/#hero">
        <img src={logo} alt="Logo" className="h-12 w-auto" /> {/* Adjust height and width as needed */}
      </HashLink>
    </nav>
  );
};

export default Navbar;
