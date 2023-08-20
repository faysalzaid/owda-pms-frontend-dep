/* eslint-disable no-unused-vars */

import React, { useState, useEffect,Fragment } from 'react';import CountsSection from 'components/Counts/Counts' 

import CTA from '../../components/CTA'
import InfoCard from '../../components/Cards/InfoCard'
import ChartCard from '../../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../../components/Chart/ChartLegend'
import PageTitle from '../../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'


import {
  TableBody,
  TableContainer, 
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
  Button,
} from '@windmill/react-ui'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaTrashAlt } from 'react-icons/fa'




const CandidateDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [candidateData,setCandidateData] = useState({})
    const [candidateForm,setCandidateForm] = useState({date:"",name:"",
        qualification:"",
        yearsOfExperience:"",
        organizationWorkedBefore:"",
        address:"",
        location:"",
        vacancy:"",
        status:""

    })

    const {id} = useParams()
    // Notifications
    const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });

    const handleCloseSuccess = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenSuccess({ open: false, message: "" });
    };
  
    const [openError, setOpenError] = useState({ open: false, message: "" });
  
    const handleCloseError = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenError({ open: false, message: "" });
    };

    // End of notifications
    const [isOpen,setIsOpen] = useState(false)
    function closeModal(){
        setIsOpen(false)
    }
    function openModal(){
        setIsOpen(true)
    }



      useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${url}/candidates/${id}`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
                if(resp.data.error){
                    
                }else{
                    setCandidateData(resp.data)
                    setCandidateForm({
                            date:resp.data.date,
                            name:resp.data.name,
                            qualification:resp.data.qualification,
                            yearsOfExperience:resp.data.yearsOfExperience,
                            organizationWorkedBefore:resp.data.organizationWorkedBefore,
                            address:resp.data.address,
                            location:resp.data.location,
                            vacancy:resp.data.vacancy,
                            status:resp.data.status
    
                        })
                }
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
        
      
           

          
            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
              const data = resp.data
            //   console.log(resp.data);
              setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
        
        }

        getData()
    
    },[])

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
       
        // console.log(candidateForm);
        await axios.put(`${url}/candidates/${id}`,candidateForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
            // console.log(resp.data);
          }else{
            // console.log(resp.data);
            setCandidateData(resp.data)
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeModal();   
          }

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })

       
      };

      







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/candidates/${id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
        }else{
            setOpenSuccess({open:true,message:"deleted Successfully"})
            closeDelete()
            setTimeout(() => {
                props.history.goBack()
            }, 1000);
         }
       
        
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}



  
    return (
      <>
  
        <PageTitle>Candidate | {candidateData.name}</PageTitle>
        <TitleChange name={`${settings.name} | Dashboard`}/><ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />

  
        {/* <CTA /> */}
        
        {/* <!-- Cards --> */}
     <CountsSection/>
  



        <TableContainer>
      {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}

        <Button onClick={openModal}>Update Candidate</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Candidate</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>Date</span>
            <Input
              type="date"
              value={candidateForm.date}
              className="mt-1"
              name="date"
              onChange={(e)=>setCandidateForm({...candidateForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Full Name</span>
            <Input
            //   type="number"
            value={candidateForm.name}  
            className="mt-1"
              name="name"
              onChange={(e)=>setCandidateForm({...candidateForm,name:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>status</span>
            <Select
              value={candidateForm.status}
              className="mt-1"
              name="status"
              // value={formValues.ProjectId}
              onChange={(e)=>setCandidateForm({...candidateForm,status:e.target.value})}
              required
            >
              <option value="" >Status</option>
          
                <option>pending</option>
                <option>shortlisted</option>
                <option>selected</option>
                <option>rejected</option>
              
            </Select>
          </Label>


          <Label>
            <span>Qualification</span>
            <Input
            // type="number"
            value={candidateForm.qualification}  
            className="mt-1"
              name="qualification"
              onChange={(e)=>setCandidateForm({...candidateForm,qualification:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Years Of Experience</span>
            <Input
            type="number"
            value={candidateForm.yearsOfExperience}  
            className="mt-1"
              name="yearsOfExperience"
              onChange={(e)=>setCandidateForm({...candidateForm,yearsOfExperience:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Organization Worked Before</span>
            <Input
            // type="number"
            value={candidateForm.organizationWorkedBefore}  
            className="mt-1"
              name="organizationWorkedBefore"
              onChange={(e)=>setCandidateForm({...candidateForm,organizationWorkedBefore:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Adress</span>
            <Input
            // type="number"
            value={candidateForm.address}  
            className="mt-1"
              name="address"
              onChange={(e)=>setCandidateForm({...candidateForm,address:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Location</span>
            <Input
            // type="number"
            value={candidateForm.location}  
            className="mt-1"
              name="location"
              onChange={(e)=>setCandidateForm({...candidateForm,location:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Vacancy</span>
            <Input
            // type="number"
            value={candidateForm.vacancy}  
            className="mt-1"
              name="vacancy"
              onChange={(e)=>setCandidateForm({...candidateForm,vacancy:e.target.value})}
              required
            />
          </Label>



        </div>
        <div className="hidden sm:block">

         <Button className="mt-6 custom-button" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
<Button block size="large" type="submit" className="custom-button">
              Accept
            </Button>
          </div>
      
        </form>
      </ModalBody>
      <ModalFooter>
      <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>

          {/* <div className="block w-full sm:hidden">
<Button block size="large" type="submit" className="custom-button">
              Accept
            </Button>
          </div> */}
      </ModalFooter>
    </Modal>






<div className="dark:bg-gray-800 text-dark-900 dark:text-gray-300 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
    <div className="dark:bg-gray-800 text-dark-900 dark:text-gray-300 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{ candidateData.name }</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="qualification">
            Qualification:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.qualification}</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="experience">
            Experience:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.yearsOfExperience}</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="worked-before">
            Worked Before:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.organizationWorkedBefore}</Badge></p>
        </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="address">
            Address:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.address}</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="location">
            Location:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.location}</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="vacancy">
            Vacancy:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.vacancy}</Badge></p>
        </div>
        <div className="mb-4 flex">
          <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2" htmlFor="status">
            Status:
          </label>
          <p className="text-gray-900 font-semibold"><Badge>{candidateData.status}</Badge></p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between">
        <span className=" text-white font-bold py-2 px-4 rounded" href="#"></span>
        <Link className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded" ><FaTrashAlt onClick={()=>setIsDeleteOpen({open:true})}/></Link>
      </div>
    </div>
  </div>
</div>





      </>
    )


   

}




export default CandidateDetail