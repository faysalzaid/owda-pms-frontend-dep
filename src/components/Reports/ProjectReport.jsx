
import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 

import CTA from '../CTA'
import InfoCard from '../Cards/InfoCard'
import ChartCard from '../Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import { FaPlusCircle } from "react-icons/fa";
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
  Button
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";



import { useRef } from 'react'
import useAuth from 'hooks/useAuth'




const ProjectReport = () => {
    const {authState,settings} = useAuth()
    const [users, setUsers] = useState([])
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [mode,setMode] = useState([])
    const [invoices, setInvoices] = useState([])
    const [projects,setProject] = useState([])
    const [modeModel,setModeModel] = useState(false)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [formValues,setFormValues] = useState({date:"",notes:"",totalPaid:"",total:0,UserId:"",ProjectId:"",PaymentModeId:""})
    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})
    const modeInput = useRef()
    let amountRef = useRef()

    const closeDelete = ()=>{
      setIsDeleteOpen({open:false})
  }
    const openDelete = (id)=>{
      setIsDeleteOpen({open:true,id:id})
  }

  const [isOpen,setIsOpen] = useState(false)
  function closeModal(){
      setIsOpen(false)
  }
  function openModal(){
    setIsOpen(true)
  }
  


  const addMode =async(e)=>{
    e.preventDefault()

    // console.log();
    const request = {
      mode:modeInput.current.value
    }
    await axios.post(`${url}/project`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setMode([...mode,resp.data])
        closeModeModel()
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    }).catch((error)=>{
      setOpenError({open:true,message:`${error.response.data.error}`})
    })
    
  }


  function closeModeModel(){
    setModeModel(false)
  }
  
  //  Notifications
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

    // USE EFFECT 
      useEffect(()=>{
        const getData = async()=>{

          await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
              }else{
                setProject(resp.data)
                console.log(resp.data);
              }
          })
    
         
          await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
            const data = resp.data
            setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
          })
    
       

        }

        getData()

  
  
  },[])

  // END OF USE EFFECT
  
  
  useEffect(()=>{
      const newPr = projects.filter((pr)=>pr.id===formValues.ProjectId)
      setFormValues({...formValues,total:newPr[0]?.totalCost})
      // console.log('hitted');
  },[formValues.ProjectId])
  


  const searchHandler = async(search)=>{
    setSearchTerm(search)
    if(search!==0){
      const newPayroll = invoices?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newPayroll)
    }else{
      setSearchResult(partener)
    }
  }



  useEffect(()=>{
    setFetchedResult(searchTerm.length<1?invoices:searchResult)
  },[invoices,searchTerm])


  
  
const handleSubmit = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  const request = {
    ProjectId:formValues.ProjectId,
    UserId:authState.id,
    date:formValues.date,
    total:formValues.total,
    totalPaid:formValues.totalPaid,
    notes:formValues.notes,
    PaymentModeId:formValues.PaymentModeId
  }
  await axios.post(`${url}/invoice`,request,{withCredentials:true}).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setInvoices([...invoices,resp.data])
      setOpenSuccess({open:true,message:"Succesfully Added"})
      closeModal()
    }
  }).catch((error)=>{
    setOpenError({open:true,message:`${error.response.data.error}`})
 
  })
}

const handleDelete = ()=>{
  axios.delete(`${url}/invoice/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      const newData = invoices.filter((inv)=>inv.id!==isDeleteOpen.id)
      setInvoices(newData)
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
    }
  })

}
  
const captureProject = ()=>{

}
// Invoice Data  


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  
  
    return (
      <>
  
        <PageTitle>Project Report</PageTitle>
        {/* Notifications */}
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
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-100 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Invoice Values..." required />
        </div>
            
        </div>
        {/* End of search List */}

        {/* End of Notification */}
  
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

          {/* Payment MOde section */}
      <Modal isOpen={modeModel} onClose={closeModeModel}>
      <ModalHeader>Add Mode</ModalHeader>
      <ModalBody>
      <form onSubmit={addMode}>
        <div className="grid grid-cols-1 gap-4">
          <Label>
            <span>Mode</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              name="totalPaid"
              onChange={(e)=>setFormValues({...formValues,totalPaid:e.target.value})}
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
            <Button layout="outline" onClick={closeModeModel}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModeModel}>
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


        {/* End of Payment Mode Section */}



     <CountsSection/>
  
        <TableContainer>
        {/* Calendar section */}
  
        {/* <Button className="mb-4" onClick={openModal}>New Invoice</Button> */}
  
        {/* end of calendar section */}
        </TableContainer>

      
      {/* Filter section */}
      <div className="container mx-auto px-4 py-8">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold mb-4">Filter Project with their invoices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Project Filter */}
          <div className="relative">
          <label htmlFor="projectFilter" className="block font-medium">
            Project
          </label>
          <div className="relative mt-1">
            <input
              type="text"
              id="projectSearch"
              className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50"
              placeholder="Search Project"
            />
            <select
              id="projectFilter"
              className="absolute top-0 left-0 w-full border rounded-md opacity-0 cursor-pointer"
            >
              <option value="">All Projects</option>
              <option value="project1">Project 1</option>
              <option value="project2">Project 2</option>
              {/* Add more projects */}
            </select>
          </div>
        </div>

          <div className="relative">
            <label htmlFor="monthFilter" className="block font-medium">
              Month
            </label>
            <select
              id="monthFilter"
              className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring focus:ring-opacity-50"
            >
              <option value="">All Months</option>
              <option value="january">January</option>
              <option value="february">February</option>
              {/* Add more months */}
            </select>
           </div>


           
         </div>
        </div>
      </div>
          
      {/* end of filter section */}

      {/* Major data  */}

      <div className="flex  bg-gray-100">
            <div className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg">
                <div className="flex justify-between p-4">
                    <div>
                        <h1 className="text-3xl italic font-extrabold tracking-widest text-green-500">Owda-project Report</h1>
                        <p className="text-base">If account is not paid within 7 days the credits details supplied as
                            confirmation.</p>
                    </div>
                    <div className="p-2">
                        <ul className="">
                            
                            <li className="flex flex-col p-2 border-l-2 border-green-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-green-600" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <span className="text-sm">
                                    2821 Kensington Road,Avondale Estates, GA 30002 USA
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-indigo-500"></div>
                <div className="flex justify-between p-4">
                    <div>
                        <h6 className="font-bold">Order Date : <span className="text-sm font-medium"> 12/12/2022</span></h6>
                        <h6 className="font-bold">Order ID : <span className="text-sm font-medium"> 12/12/2022</span></h6>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold"> Billed To : </span>
                            Joe Smith
                            795 Folsom Ave
                            San Francisco, CA 94107
                            P: (123) 456-7890
                        </address>
                    </div>
                    <div className="w-40">
                        <address className="text-sm">
                            <span className="font-bold">Ship To :</span>
                            Joe doe
                            800 Folsom Ave
                            San Francisco, CA 94107
                            P: + 111-456-7890
                        </address>
                    </div>
                    <div></div>
                </div>
                <div className="flex justify-center p-4">
                    <div className="border-b border-gray-200 shadow">
                        <table className="">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        #
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Product Name
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Quantity
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Rate
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-gray-900">
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100 ">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            Amazon Brand - Symactive Men's Regular Fit T-Shirt
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-100">4</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        $20
                                    </td>
                                    <td className="px-6 py-4">
                                        $30
                                    </td>
                                </tr>
                                <tr className="whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        2
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            Amazon Brand - Symactive Men's Regular Fit T-Shirt
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-100">2</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        $60
                                    </td>
                                    <td className="px-6 py-4">
                                        $12
                                    </td>
                                </tr>
                                <tr className="border-b-2 whitespace-nowrap">
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        3
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 dark:text-gray-100">
                                            Amazon Brand - Symactive Men's Regular Fit T-Shirt
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-100">1</div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        $10
                                    </td>
                                    <td className="px-6 py-4">
                                        $13
                                    </td>
                                </tr>
                                <tr className="">
                                    <td colSpan="3"></td>
                                    <td className="text-sm font-bold">Sub Total</td>
                                    <td className="text-sm font-bold tracking-wider"><b>$950</b></td>
                                </tr>
                       
                                <tr>
                                    <th colSpan="3"></th>
                                    <td className="text-sm font-bold"><b>Tax Rate</b></td>
                                    <td className="text-sm font-bold"><b>$1.50%</b></td>
                                </tr>
                            
                                <tr className="text-white bg-gray-800">
                                    <th colSpan="3"></th>
                                    <td className="text-sm font-bold"><b>Total</b></td>
                                    <td className="text-sm font-bold"><b>$999.0</b></td>
                                </tr>
               

                            </tbody>
                        </table>
                    </div>
                </div>
               
                <div className="w-full h-0.5 bg-indigo-500"></div>

                <div className="p-4">
                    
                    <div className="flex items-end justify-end space-x-3">
                        <button className="px-4 py-2 text-sm text-green-600 bg-green-100">Print</button>
                       
                    </div>
                </div>

            </div>
        </div>
       


      {/* End of Major data */}

            

      </>
    )


   

}




export default ProjectReport















// function ProjectReport() {
//     return ( 
    
    
    
    
  
        
    
    
//     );
// }

// export default ProjectReport;