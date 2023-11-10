
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

import { FaTrash, FaTrashAlt } from 'react-icons/fa'
import { Fade } from '@mui/material'
import { areDayPropsEqual } from '@mui/x-date-pickers/PickersDay/PickersDay'




const PayrollDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [LeaveData,setLeaveData] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [payrollData,setPayrollData] = useState([])
    const [employeeData,setEmployeeData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [payrolForm,setPayrolForm] = useState({date:"",EmployeeId:"",DepartmentId:"",basicSalary:"",staffAdvance:"",position:""})
  

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
            await axios.get(`${url}/payrol/${id}`,{withCredentials:true}).then((resp)=>{
                setPayrollData(resp.data)
                setPayrolForm({
                  date:resp.data.date,
                  EmployeeId:resp.data.EmployeeId,
                  DepartmentId:resp.data.DepartmentId,
                  basicSalary:resp.data.basicSalary,
                  staffAdvance:resp.data.staffAdvance,
                  position:resp.data.position
                })
              
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
            await axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
                setDepartmentData(resp.data)
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
       
      
      const request ={
        date:payrolForm.date,
        position:payrolForm.position,
        EmployeeId:payrolForm.EmployeeId,
        DepartmentId:payrolForm.DepartmentId,
        basicSalary:parseInt(payrolForm.basicSalary),
        staffAdvance:parseInt(payrolForm.staffAdvance),
      }
      // console.log(request);
        await axios.put(`${url}/payrol/${id}`,request,{withCredentials:true}).then((resp)=>{
        //   console.log(resp.data);
            setPayrollData(resp.data)
            setOpenSuccess({open:true,message:"Successfully Updated"})
            closeModal();

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
    await axios.delete(`${url}/payrol/delete/${id}`,{withCredentials:true}).then((resp)=>{
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
  
        <PageTitle>Payroll</PageTitle>
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
        {/* <Button className="text-sm" onClick={openModal}>Update Payroll</Button> */}
        {/* <FaTrashAlt className='m-2 text-3xl' style={{color:'red'}} onClick={()=>setIsDeleteOpen({open:true})}/> */}
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
              value={payrolForm.date}
              name="date"
              onChange={(e)=>setPayrolForm({...payrolForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Position</span>
            <Input
            //   type="number"
              className="mt-1"
              value={payrolForm.position}
              name="position"
              onChange={(e)=>setPayrolForm({...payrolForm,position:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Employee</span>
            <Select
              className="mt-1"
              value={payrolForm.EmployeeId}
              name="EmployeeId"
              // value={formValues.ProjectId}
              onChange={(e)=>setPayrolForm({...payrolForm,EmployeeId:e.target.value})}
              required
            >
              <option value="" >Select Employee</option>
              {employeeData.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>


          <Label>
            <span>Department</span>
            <Select
              className="mt-1"
              value={payrolForm.DepartmentId}
              name="DepartmentId"
              // value={formValues.ProjectId}
              onChange={(e)=>setPayrolForm({...payrolForm,DepartmentId:e.target.value})}
              required
            >
              <option value="" >Select </option>
              {departmentData.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>

       

          <Label>
            <span>Basic Salary</span>
            <Input
            type="number"
              className="mt-1"
              value={payrolForm.basicSalary}
              name="basicSalary"
              onChange={(e)=>setPayrolForm({...payrolForm,basicSalary:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Staff Advance</span>
            <Input
            type="number"
              className="mt-1"
              value={payrolForm.staffAdvance}
              name="staffAdvance"
              onChange={(e)=>setPayrolForm({...payrolForm,staffAdvance:e.target.value})}
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


  
        


      

    <div className="container  my-8 p-9">
  <h1 className="text-3xl font-bold mb-4 dark:text-gray-300 font-semibold">Payroll Detail</h1>
  <div className="dark:bg-gray-800 text-dark-900 dark:text-gray-300 font-semibold shadow overflow-hidden sm:rounded-lg">
    <div className="px-4 py-5 sm:px-6">
      <h2 className="text-lg font-medium leading-6 text-gray-900 dark:text-gray-300 font-semibold">Employee Payroll Information</h2>
      <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300 font-semibold">Basic information about the employee.</p>
    </div>
    <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
      <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-3">
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Name</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">{employeeData.map((empl)=>empl.id===payrollData?.EmployeeId?empl.name:"")}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Date</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">{payrollData?.date}</dd>
        </div>
     
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Taxable Amount</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.taxableAmount)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Medical Allowance</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.medicalAllowance)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Hardship Allowance</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.hardshipAllowance)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Income Tax</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.incomeTax)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">Staff Advance</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {payrollData?.staffAdvance?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">PF/Pension 5/7%</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.pfPension57)?.toLocaleString()}</dd>
        </div>
        <div>
          <dt className="mt-2 text-sm-bold font-medium text-gray-900 font-bold dark:text-gray-100">PF/Pension 10/11%</dt>
          <dd className=" text-sm text-gray-900 dark:text-gray-300 font-semibold">ETB {parseFloat(payrollData?.pfPension1011)?.toLocaleString()}</dd>
          </div>
        </dl>
      </div>
    </div>
  </div>


      </>
    )


   

}




export default PayrollDetail