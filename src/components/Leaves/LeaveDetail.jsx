
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




const LeaveDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [LeaveData,setLeaveData] = useState({})
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [leaveTypeForm,setLeaveTypeForm] = useState({type:""})
    const [leaveFormData,setLeaveFormData] = useState({date:"",numberOfDays:"",startDate:"",endDate:"",comments:"",createdBy:"",status:"",employeeId:"",checkedBy:"",approvedBy:"",LeaveTypeId:""})
    const [leaveType,setLeaveType] = useState([])
    const [users, setUsers] = useState([])
    const [userCheckedBy, setUserCheckedBy] = useState([])
    const [approvedBy, setApprovedBy] = useState([])
  

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
            await axios.get(`${url}/leave/${id}`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
                setOpenError({open:true,message:true})
              }else{
                setLeaveData(resp.data)
                setLeaveFormData(resp.data)
              }
            })
          
            await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error){
        
                }else{
                  const filteredClients = resp.data.filter((cl)=>cl.role==="client")
                  setUsers(filteredClients)
                  setUserCheckedBy(resp.data)
                  setApprovedBy(resp.data)
                }
              })
        
              await axios.get(`${url}/leavetype`,{withCredentials:true}).then((resp)=>{
                 setLeaveType(resp.data)
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
        // console.log(leaveTypeForm);
        const request ={
          date:leaveFormData.date,
          numberOfDays:leaveFormData.numberOfDays,
          startDate:leaveFormData.startDate,
          endDate:leaveFormData.endDate,
          comments:leaveFormData.comments,
          createdBy:authState.username,
          status:leaveFormData.status,
          employeeId:leaveFormData.employeeId,
          checkedBy:leaveFormData.checkedBy,
          approvedBy:leaveFormData.approvedBy,
          LeaveTypeId:leaveFormData.LeaveTypeId
        }
        console.log(request);
      
        await axios.put(`${url}/leave/${id}`,request,{withCredentials:true}).then((resp)=>{
        //   console.log(resp.data);
        console.log(resp.data);
            setLeaveData((prev)=>resp.data)
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeModal();

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })
        // // handle form submission here
        // // e.g. make an API call to save the form data
       
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
    axios.delete(`${url}/leave/${id}`,{withCredentials:true}).then((resp)=>{
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
  
        <PageTitle>Leave Types</PageTitle>
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
        <Button className="text-sm" onClick={openModal}>Edit Leave Request</Button>
        <FaTrashAlt className='m-2 text-3xl' style={{color:'red'}} onClick={()=>setIsDeleteOpen({open:true})}/>
        </div>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Leave</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              value={leaveFormData.date}
              onChange={(e)=>setLeaveFormData({...leaveFormData,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Number of Days</span>
            <Input
              type="number"
              className="mt-1"
              name="numberOfDays"
              value={leaveFormData.numberOfDays}
              onChange={(e)=>setLeaveFormData({...leaveFormData,numberOfDays:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Employee</span>
            <Select
              className="mt-1"
              name="employeeId"
              // value={formValues.ProjectId}
              value={leaveFormData.employeeId}
              onChange={(e)=>setLeaveFormData({...leaveFormData,employeeId:e.target.value})}
              required
            >
              <option value="" >Select Employee</option>
              {users.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>


          <Label>
            <span>Checked By</span>
            <Select
              className="mt-1"
              name="checkedBy"
              // value={formValues.ProjectId}
              value={leaveFormData.checkedBy}
              onChange={(e)=>setLeaveFormData({...leaveFormData,checkedBy:e.target.value})}
              required
            >
              <option value="" >Select </option>
              {users.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>

          <Label>
            <span>Approved By</span>
            <Select
              className="mt-1"
              name="approvedBy"
            
              value={leaveFormData.approvedBy}
              onChange={(e)=>setLeaveFormData({...leaveFormData,approvedBy:e.target.value})}
              required
            >
              <option value="" >Select </option>
              {users.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
            </Select>
          </Label>

          <Label>
            <span>Start Date</span>
            <Input
              type="date"
              className="mt-1"
              name="startDate"
              value={leaveFormData.startDate}
              onChange={(e)=>setLeaveFormData({...leaveFormData,startDate:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>End Date</span>
            <Input
              type="date"
              className="mt-1"
              name="endDate"
              value={leaveFormData.endDate}
              onChange={(e)=>setLeaveFormData({...leaveFormData,endDate:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Leave Type</span>
            <Select
              className="mt-1"
              name="approvedBy"
              // value={formValues.ProjectId}
              value={leaveFormData.LeaveTypeId}
              onChange={(e)=>setLeaveFormData({...leaveFormData,LeaveTypeId:e.target.value})}
              required
            >
              <option value="" >Select Leave Type</option>
              {leaveType.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.type}</option>
              ))}
            </Select>
          </Label>


          <Label>
            <span>Status</span>
            <Select
              className="mt-1"
              name="approvedBy"
              // value={formValues.ProjectId}
              value={leaveFormData.status}
              onChange={(e)=>setLeaveFormData({...leaveFormData,status:e.target.value})}
              required
            >
              <option value="" >Status</option>
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
            
            </Select>
          </Label>


          <Label>
            <span>Comment</span>
            <Textarea
              className="mt-1"
              name="comments"
              value={leaveFormData.comments}
              onChange={(e)=>setLeaveFormData({...leaveFormData,comments:e.target.value})}
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


  
        
{/* 

<div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Leave Request Details</h2>
        <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
            <p className="text-gray-600">Date:</p>
            <p className="font-bold">{LeaveData.date}</p>
            </div>
            <div>
            <p className="text-gray-600">Number of Leave Days:</p>
            <p className="font-bold">{LeaveData.numberOfDays}</p>
            </div>
            <div>
            <p className="text-gray-600">Start Date:</p>
            <p className="font-bold">{LeaveData.startDate}</p>
            </div>
            <div>
            <p className="text-gray-600">End Date:</p>
            <p className="font-bold">{LeaveData.endDate}</p>
            </div>
        </div>
        <div className="grid grid-cols-3 gap-6 mb-6">
            <div>
            <p className="text-gray-600">Created By:</p>
            <p className="font-bold">{LeaveData.createdBy}</p>
            </div>
            <div>
            <p className="text-gray-600">Checked By:</p>
            <p className="font-bold">{users.map((usr)=>usr.id===LeaveData.checkedBy?usr.name:"")}</p>
            </div>
            <div>
            <p className="text-gray-600">Approved By:</p>
            <p className="font-bold">{users.map((usr)=>usr.id===LeaveData.approvedBy?usr.name:"")}</p>
            </div>
        </div>
        <div className="mb-6">
            <p className="text-gray-600">Status:</p>
            <p className="font-bold text-green-500">{LeaveData.status}</p>
        </div>
        <div className="mb-6">
            <p className="text-gray-600">Comments:</p>
            <p className="font-bold">{LeaveData.comments}!</p>
        </div>
       
</div> */}
<div className="mt-3  bg-white rounded-md overflow-hidden shadow-md">
  <div className="px-6 py-4" style={{background:'#7e3af2'}}>
    <h2 className="text-xl font-bold text-white">Leave Request Details</h2>
  </div>
  <div className="p-6">
    <div className="grid grid-cols-2 gap-6 mb-6">
      <div>
      <p className="text-gray-600">Date:</p>
            <p className="font-bold">{LeaveData.date}</p>
      </div>
      <div>
      <p className="text-gray-600">Number of Leave Days:</p>
        <p className="font-bold">{LeaveData.numberOfDays}</p>
      </div>
      <div>
      <p className="text-gray-600">Start Date:</p>
        <p className="font-bold">{LeaveData.startDate}</p>
      </div>
      <div>
      <p className="text-gray-600">End Date:</p>
        <p className="font-bold">{LeaveData.endDate}</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div>
      <p className="text-gray-600">Created By:</p>
            <p className="font-bold">{LeaveData.createdBy}</p>
      </div>
      <div>
      <p className="text-gray-600">Checked By:</p>
        <p className="font-bold">{users.map((usr)=>usr.id===LeaveData.checkedBy?usr.name:"")}</p>
      </div>
      <div>
      <p className="text-gray-600">Approved By:</p>
            <p className="font-bold">{users.map((usr)=>usr.id===LeaveData.approvedBy?usr.name:"")}</p>
      </div>
    </div>
    <div className="mb-6">
    <p className="text-gray-600">Status:</p>
            <p className="font-bold text-green-500">{LeaveData.status}</p>
    </div>
    <div className="mb-6">
    <p className="text-gray-600">Comments:</p>
    <p className="font-bold">{LeaveData.comments}!</p>
    </div>
    {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
      Edit Request
    </button> */}
  </div>
</div>




      </>
    )


   

}




export default LeaveDetail