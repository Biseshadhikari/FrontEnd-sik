// src/components/Navbar.js
import React, { useState } from 'react';
import { useLoginContext } from '../context/UserContext';
import { Link } from 'react-router-dom';
import sikImage from '/home/bisesh/Desktop/Sikshyashala/frontend-sikshyashala/src/resources/sik.png';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const [isNavOpen, setNavOpen] = useState(false);
  const { logout, isAuth } = useLoginContext();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  const handleLogout = () => {
    logout();
    setNavOpen(false);
  };

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-[200px]">
          <Link to="/">
            <img src={sikImage} className="w-full h-full" alt="logo" />
          </Link>
        </div>

        {isMobile ? (
          <div className="md:hidden">
            <button className="text-white focus:outline-none" onClick={toggleNav}>
              {isNavOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        ) : null}

        <div className={`md:flex space-x-4 ${isMobile && isNavOpen ? 'flex' : 'hidden'}`}>
          <Link to="/" className="text-white">
            Home
          </Link>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Services
          </a>
          {isAuth ? (
            <button className="text-white" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
