
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
import "config/custom-button.css"
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





const PayrollList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [payrollData,setPayrollData] = useState([])
    const [employeeData,setEmployeeData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [payrolForm,setPayrolForm] = useState({date:"",EmployeeId:"",DepartmentId:"",basicSalary:"",staffAdvance:"",position:""})
  


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
            await axios.get(`${url}/payrol`,{withCredentials:true}).then((resp)=>{
              console.log(resp.data);
              if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                setPayrollData(resp.data)
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

      
    useEffect(()=>{
      setFetchedResult(searchTerm.length<1?payrollData:searchResult)
    },[payrollData,searchTerm])


  const searchHandler = async(search)=>{
    setSearchTerm(search)
    if(search!==0){
      const newPayroll = payrollData?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newPayroll)
    }else{
      setSearchResult(payrollData)
    }
  }




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
        await axios.post(`${url}/payrol`,request,{withCredentials:true}).then((resp)=>{
        //   console.log(resp.data);
            setPayrollData((prev)=>[...prev,resp.data])
            setOpenSuccess({open:true,message:"Successfully Added"})
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
    await axios.delete(`${url}/payrol/delete/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = payrollData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setPayrollData(data)
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

          {/* Search section */}
            <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search dates(2023-11-01), Total Earnings..." required />
        </div>
            
        </div>
        {/* End of search List */}


  
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

        {/* <Button onClick={openModal} className="custom-button">New Payroll</Button> */}
  
      
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
              onChange={(e)=>setPayrolForm({...payrolForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Position</span>
            <Input
            //   type="number"
              className="mt-1"
              name="position"
              onChange={(e)=>setPayrolForm({...payrolForm,position:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Employee</span>
            <Select
              className="mt-1"
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


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
          <TableCell className="font-semibold">Date</TableCell>
            <TableCell className="font-semibold">Employee</TableCell>
            <TableCell className="font-semibold">Medical Allow</TableCell>
            <TableCell className="font-semibold">Taxabel Amount</TableCell>
            <TableCell className="font-semibold">Hardship Allow</TableCell>
            <TableCell className="font-semibold">Total Earnings</TableCell>
            <TableCell className="font-semibold">income Tax</TableCell>
            <TableCell className="font-semibold">Staff Advance</TableCell>
            <TableCell className="font-semibold">PF/pension 5/7%</TableCell>
            <TableCell className="font-semibold">Total deductions</TableCell>
            <TableCell className="font-semibold">PF/pension 10/11%</TableCell>
            <TableCell className="font-semibold">Net Pay</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedResult?fetchedResult.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{employeeData.map((usr)=>usr.id===row.EmployeeId?usr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.medicalAllowance.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.taxableAmount.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.hardshipAllowance.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.totalEarnings.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.incomeTax.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.staffAdvance.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.pfPension57.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.totalDeduction.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.pfPension1011.toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row?.netPay.toLocaleString()}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/payroll/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                 
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




export default PayrollList