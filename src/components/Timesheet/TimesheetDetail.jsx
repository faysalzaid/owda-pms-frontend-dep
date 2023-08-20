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
import { FiDownload } from 'react-icons/fi';
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

import { FaCloudUploadAlt, FaTrashAlt } from 'react-icons/fa'




const TimesheetDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [LeaveData,setLeaveData] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [timesheetForm,setTimesheetForm] = useState({date:"",EmployeeId:"",attachment:""})
    const [timesheetData,setTimeSheetData] = useState({})
    const [employeeData,setEmployeeData] = useState([])
  
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


            await axios.get(`${url}/timesheet/${id}`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
                setOpenError({open:true,message:true})
              }else{
                setTimeSheetData(resp.data)
                setTimesheetForm({date:resp.data.date,EmployeeId:resp.data.EmployeeId,attachment:resp.data.attachment})
              }
            })
          

            await axios.get(`${url}/employees`,{withCredentials:true}).then((resp)=>{
                setEmployeeData(resp.data)
              }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
                const data = resp.data
                setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
              })
        



        
        }

        getData()
    
    },[])

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        // console.log(timesheetForm);
        const formData = new FormData()
        formData.append('date',timesheetForm.date)
        formData.append('EmployeeId',timesheetForm.EmployeeId)
        formData.append('attachment',timesheetForm.attachment)
   
        await axios.put(`${url}/timesheet/${id}`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
            }else{
                // console.log(resp.data);
                setTimeSheetData((prev)=>resp.data) 
                setOpenSuccess({open:true,message:"Successfully Updated"})
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

      



  const handleEdit = (index) => {
    // Implement your own edit logic here   
    console.log(`Edit row ${index}`);
  };




  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}



  // Delete row
  const handleDelete = ()=>{
    axios.get(`${url}/timesheet/delete/${id}`,{withCredentials:true}).then((resp)=>{
        const data = LeaveData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setLeaveData(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        setTimeout(() => {
            props.history.goBack()
        }, 1000);
        
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
  
        <PageTitle>TimeSheets</PageTitle>
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
        <div className='flex'>
        <Button onClick={openModal}>Update Timesheet</Button>
        <FaTrashAlt className='m-2 text-3xl' style={{color:'red'}} onClick={()=>setIsDeleteOpen({open:true})}/>
        </div>
        
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register TimeSheet</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          
          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              value={timesheetForm.date}
              name="date"
              onChange={(e)=>setTimesheetForm({...timesheetForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Employee</span>
            <Select
              className="mt-1"
              value={timesheetForm.EmployeeId}
              name="EmployeeId"
              // value={formValues.ProjectId}
              onChange={(e)=>setTimesheetForm({...timesheetForm,EmployeeId:e.target.value})}
              required
            >
              <option value="" >Select Employee</option>
              {employeeData.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>

          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload File</span>
              </label>
              <input
                type="file"
                id="file"
                // value={timesheetForm.attachment}
                className="hidden"
                name="attach"
                onChange={(e)=>setTimesheetForm({...timesheetForm,attachment:e.target.files[0]})}
              />
              
              
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



    <div className="bg-white-100  py-8">
      <div className="max-w-8xl ">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{employeeData?.map((empl)=>empl.id==timesheetData?.EmployeeId?empl.name:"")}</h1>
          <p className="text-gray-600 mb-2">Date: {timesheetData?.date}</p>
          <Link to={timesheetData.attachment} target='_blank' className="flex items-center text-blue-500 underline" rel="noopener noreferrer">
            <FiDownload className="mr-1" />
            Download Attachment
          </Link>
        </div>
      </div>
    </div>
  
        


     

      </>
    )


   

}




export default TimesheetDetail