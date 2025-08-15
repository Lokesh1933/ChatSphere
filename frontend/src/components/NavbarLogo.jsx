import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import './NavbarLogo.css';

const NavbarLogo = () => {
  return (
    <Box className="navbar-logo-container">
      {/* Professional Geometric Logo */}
      <div className="navbar-logo-icon">
        <svg viewBox="0 0 40 40" className="navbar-logo-svg">
          {/* Outer square with rounded corners */}
          <rect 
            x="2" y="2" width="36" height="36" 
            rx="8" ry="8"
            fill="none" 
            stroke="#00BCD4" 
            strokeWidth="2"
            className="outer-square"
          />
          
          {/* Inner cross/plus pattern */}
          <path 
            d="M12 12 L28 12 L28 16 L24 16 L24 28 L16 28 L16 16 L12 16 Z" 
            fill="#00BCD4" 
            className="cross-shape"
          />
          
          {/* Four corner dots */}
          <circle cx="8" cy="8" r="2" fill="#4DD0E1" className="corner-dot" />
          <circle cx="32" cy="8" r="2" fill="#4DD0E1" className="corner-dot" />
          <circle cx="8" cy="32" r="2" fill="#4DD0E1" className="corner-dot" />
          <circle cx="32" cy="32" r="2" fill="#4DD0E1" className="corner-dot" />
          
          {/* Center indicator */}
          <circle cx="20" cy="20" r="3" fill="#1A202C" stroke="#00BCD4" strokeWidth="1" />
        </svg>
      </div>
      
      {/* Chat-Sphere Text */}
      <Text className="navbar-logo-text">
        Chat-Sphere
      </Text>
    </Box>
  );
};

export default NavbarLogo;