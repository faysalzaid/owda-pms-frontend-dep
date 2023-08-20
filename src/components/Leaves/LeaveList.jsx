
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";





const LeaveList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [LeaveData,setLeaveData] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [leaveTypeForm,setLeaveTypeForm] = useState({type:""})
    const [leaveFormData,setLeaveFormData] = useState({date:"",numberOfDays:"",startDate:"",endDate:"",comments:"",createdBy:"",status:"",EmployeeId:"",checkedBy:"",approvedBy:"",LeaveTypeId:""})
    const [leaveType,setLeaveType] = useState([])
    const [users, setUsers] = useState([])
    const [userCheckedBy, setUserCheckedBy] = useState([])
    const [approvedBy, setApprovedBy] = useState([])
    const [employeeData,setEmployeeData] = useState([])
  


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
            await axios.get(`${url}/leave`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
              if(resp.data.error){
                setOpenError({open:true,message:true})
              }else{
                setLeaveData(resp.data)
              }
            })
          
            await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
                
                  const filteredClients = resp.data.filter((cl)=>cl.role==="client")
                  setUsers(filteredClients)
                  setUserCheckedBy(resp.data)
                  setApprovedBy(resp.data)
              }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
        
              await axios.get(`${url}/leavetype`,{withCredentials:true}).then((resp)=>{
                 setLeaveType(resp.data)
              }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
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
        // console.log(leaveTypeForm);
        const request ={
          date:leaveFormData.date,
          numberOfDays:leaveFormData.numberOfDays,
          startDate:leaveFormData.startDate,
          endDate:leaveFormData.endDate,
          comments:leaveFormData.comments,
          createdBy:authState.username,
          status:leaveFormData.status,
          EmployeeId:leaveFormData.EmployeeId,
          checkedBy:leaveFormData.checkedBy,
          approvedBy:leaveFormData.approvedBy,
          LeaveTypeId:leaveFormData.LeaveTypeId
        }
        console.log(request);
      
        await axios.post(`${url}/leave`,request,{withCredentials:true}).then((resp)=>{
        //   console.log(resp.data);
            setLeaveData((prev)=>[...prev,resp.data])
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
    axios.delete(`${url}/leave/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = LeaveData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setLeaveData(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        
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
  
        <PageTitle>Leaves</PageTitle>
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

        <Button onClick={openModal}>New Leave</Button>
  
      
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
              onChange={(e)=>setLeaveFormData({...leaveFormData,numberOfDays:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Employee</span>
            <Select
              className="mt-1"
              name="ProjectId"
              // value={formValues.ProjectId}
              onChange={(e)=>setLeaveFormData({...leaveFormData,EmployeeId:e.target.value})}
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
              // value={formValues.ProjectId}
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


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Type</TableCell>
            <TableCell className="font-semibold">No of Days</TableCell>
            <TableCell className="font-semibold">Employee</TableCell>
            <TableCell className="font-semibold">Start date</TableCell>
            <TableCell className="font-semibold">End Date</TableCell>
            <TableCell className="font-semibold">status</TableCell>
            <TableCell className="font-semibold">Checked By</TableCell>
            <TableCell className="font-semibold">Approved By</TableCell>
            <TableCell className="font-semibold">Created By</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {LeaveData?LeaveData.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.numberOfDays}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{users.map((usr)=>usr.id===row.EmployeeId?usr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.startDate}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.endDate}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.status}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{users.map((usr)=>usr.id===row.checkedBy?usr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{users.map((usr)=>usr.id===row.approvedBy?usr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.createdBy}</span></TableCell>

                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/leave/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                  <Button layout="link" size="small" onClick={() => openDelete(row.id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>

      </>
    )


   

}




export default LeaveList