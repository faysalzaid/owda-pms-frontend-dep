import { Button } from '@mui/material'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig'
import React from 'react'
import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiDeleteBin6Fill,RiDeleteBin6Line } from 'react-icons/ri'
import { Link } from "react-router-dom";

export const MedicalAllowanceSection = ({medicalFile,setMedicalFile,handleMedicalDelete,setOpenError,setOpenSuccess,id}) => {
  const [getFile,setGetFile] = useState({file:""})
  const[ agreementId,setAgreementId] = useState({id:""})
  const handleFileSubmit = async(e)=>{
    e.preventDefault()
    const formData = new FormData()
    formData.append('file',getFile.file)
    formData.append('EmployeeId',id)

    // console.log(formData);
    await axios.post(`${url}/medical`,formData,{withCredentials:true}).then((resp)=>{
      console.log('from resp.data',resp.data);
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        console.log(resp.data);
        setMedicalFile({files:[...medicalFile.files,resp.data],status:true})
        setOpenSuccess({open:true,message:"Successfully Added"})
        
      }
    }).catch((error)=>{
      // console.log(error.response);
      setOpenError({open:true,message:`${error}`})
    })
  }
  return (

    <div>


{/* Files LIst section */}

<div className="flex flex-col gap-4 mt-4">
{medicalFile.files?       

        (medicalFile.files.map((md,index)=>
           <div key={index} className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
           <>
            <div className="flex-1 truncate"><Link to={`${md.file}`} target='_blank'>Medical File</Link><p className='text-bold'>Date | <span className='text-sm text-purple-500'>{md.createdAt?.slice(0,10)}</span></p></div>  
              <button onClick={() => handleMedicalDelete(md.id)} className="text-red-500 hover:text-red-600"> 
                <RiDeleteBin6Line />
              </button>
           </>
         
            </div>  
            ))
            :<p className='relative flex justify-between items-center bg-white rounded-md p-4 shadow-md'>No Medical file choosen</p>}
        </div>
        

  {/* End Files List */}

<form onSubmit={handleFileSubmit} className="flex flex-col items-center mt-2">
              <label htmlFor="file" className="w-full max-w-xs p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300 bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300">
                <FaCloudUploadAlt className=" mx-auto mb-2" />
                <span className="text-sm font-semibold">Upload Doc</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setGetFile({file:e.target.files[0]})}
              />
              {getFile.file && (
                <div className="w-full max-w-xs p-2 mt-4 rounded-lg shadow-lg bg-white text-center">
                  <p className="text-gray-600">{getFile.file.name}</p>
                </div>
              )}
              <Button
                type="submit"
                className="mt-4 mb-6 px-6 py-2 rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 transition duration-300"
                disabled={!getFile.file}
              >
                Submit
              </Button>
    </form>
    </div>
  )
}
