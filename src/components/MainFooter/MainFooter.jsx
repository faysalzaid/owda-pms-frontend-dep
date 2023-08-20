import React from 'react';
import { FaRocketchat } from 'react-icons/fa';



const Footer = () => {
  return (
    <footer className="text-gray-600 dark:text-white py-1">
      <div className="container px-1">
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <div className="flex items-center">
            <FaRocketchat className="h-5 w-5 mr-2" />
            <p className="text-sm">Cellutech     <span className='ml-4'>Copyright © 2023</span></p>
            
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
