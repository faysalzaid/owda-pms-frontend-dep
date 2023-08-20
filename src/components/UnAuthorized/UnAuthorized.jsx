import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FiLock } from "react-icons/fi";

// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Container,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'

function UnAuthorized(props) {



    return ( 
        <>
   
  
        <div>
    
        </div>
        
  
        <SectionTitle></SectionTitle>
        {/* Card Icons */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      </div> 



      <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="flex items-center justify-center mb-4">
        <FiLock className="text-red-500 text-4xl mr-2" />
        <h1 className="text-4xl font-bold text-red-500">Unauthorized</h1>
      </div>
      <p className="text-lg text-gray-700 mb-8">
        Sorry, you do not have permission to access this page.
      </p>
      <Button className="py-2 px-4 rounded-md bg-red-500 text-white hover:bg-red-600">
        Go Back
      </Button>
    </div>

    {/* End of Error Display */}
      </>
     );
}

export default UnAuthorized;