/* eslint-disable no-unused-vars */

import { Button } from '@mui/material'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig'
import React from 'react'
import { useState } from 'react'
import { FaCloudUploadAlt,FaPlusCircle } from 'react-icons/fa'
import { RiDeleteBin6Fill,RiDeleteBin6Line, RiRedPacketFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'

export const TimesheetSection = ({medicalFile,handleMedicalDelete,mtimesheet}) => {

  return (

    <div>


{/* Files LIst section */}
              <div className='mt-4 mr-1 bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300'>
                <Link to={'/app/timesheet'}>
                <FaPlusCircle className='ml-auto'/>    
                </Link>
                
              </div>
          
{mtimesheet?
<div className="flex flex-col gap-4 mt-4">
       

        { mtimesheet.map((md,index)=>
           <div key={index} className="relative flex justify-between items-centerbg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300rounded-md p-4 shadow-md">
           <>
            <div className="flex-1 truncate"><Link to={`${md.attachment}`} target='_blank'>Timesheet File</Link><p className='text-bold'>Date | <span className='text-sm text-purple-500'>{md.date}</span></p></div>  
              <button className="text-red-500 hover:text-red-600"> 
                <RiRedPacketFill />
              </button>
           </>
         
            </div>  
            )}
        </div>
         :<p className='relative flex justify-between items-center bg-white rounded-md p-4 shadow-md'>No Medical file choosen</p>}

  {/* End Files List */}

    </div>
  )
}
