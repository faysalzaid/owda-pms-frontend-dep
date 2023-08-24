
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
    const [singleProject, setSingleProject] = useState({project:{},state:false})
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
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
      const newD = projects?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newD)
    }else{
      setSearchResult(projects)
    }
  }



  useEffect(()=>{
    setFetchedResult(searchTerm.length<1?projects:searchResult)
  },[projects,searchTerm])



  const CallSingleProject = (id)=>{
    console.log('called');
    const newProject = projects.filter((pr)=>pr.id===id)
    setSingleProject({project:newProject[0],state:true})
    console.log(newProject[0]);
    setInvoices(newProject[0]?.owda_invoices)
    
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
  



const handleChange = (e)=>{

}
// project search func




// end of project search fun
  
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

         



     <CountsSection/>
  
        <TableContainer>
        {/* Calendar section */}
  
        {/* <Button className="mb-4" onClick={openModal}>New Invoice</Button> */}
  
        {/* end of calendar section */}
        </TableContainer>

      
      {/* Filter section */}
      <div className="flex container mx-auto px-4 py-8">
      <div className="mb-2">
        <h2 className="text-2xl font-semibold mb-4">Filter Project with their invoices</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Project Filter */}
          <div className="relative">
            <label htmlFor="projectFilter" className="block font-medium">
              Project
            </label>
            <div className="relative mb-4">
              <input
                type="text"
                id="projectSearch"
                className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50"
                placeholder="Search Project"
                value={searchTerm}
                onChange={(e)=>searchHandler(e.target.value)}
              />
              <Select
                id="projectFilter"
                className="absolute w-full rounded-md mb-4 mt-2 bg-white border opacity-2 cursor-pointer"
                
                
              >
                {fetchedResult.map((rs)=>
                <option key={rs.id} value={rs.id} onClick={()=>CallSingleProject(rs.id)}>{rs.name}</option>
                
                )}
               
                {/* Add more projects */}
              </Select>
            </div>
          </div>


          <div className="relative sm:mt-4">
            <label htmlFor="monthFilter" className="block font-medium mt-4">
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
      {singleProject.state?      
      <div className="flex  bg-gray-100">
            <div className="w-full bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-lg">
                <div className="flex justify-between p-4">
                    <div>
                        <h1 className="text-3xl  font-extrabold tracking-widest text-green-500">Owda-project Report</h1>
                        <span className='font-bold'>Project name: {singleProject.project.name}</span>
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
                <div className="w-full bg-indigo-500"></div>
                <div className="flex justify-between p-4">
                    <div>
                        <h6 className="font-bold">Project Code : <span className="text-sm font-bold"> {singleProject.project.code}</span></h6>
                        <h6 className="font-bold">Project ID : <span className="text-sm font-bold"> {singleProject.project.id}</span></h6>
                    </div>
                    <div className="w-40">
                        <address className="text-sm font-bold">
                            <p className="font-bold">Percentage | <span className='text-green-500'>{singleProject.project.percentage} </span> </p>
                            <p className="font-bold">startTime |<span className='text-blue-500'>{singleProject.project.starttime} </span> </p>
                            <p className="font-bold">EndTime | <span className='text-red-500'>{singleProject.project.endtime} </span>   </p>
                           
                        </address>
                    </div>
                    <div className="w-40">
                        <address className="text-sm font-bold">
                            <span className="font-bold">Ship To :</span>
                            Joe doe
                            800 Folsom Ave
                            San Francisco, CA 94107
                            P: + 111-456-7890
                        </address>
                    </div>
                    <div></div>
                </div>
                <div className="w-full p-4">
                    <div className="border-b border-gray-200 shadow">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        ID
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Date
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Amount
                                    </th>
                                    <th className="px-4 py-2 text-xs text-gray-500 dark:text-gray-100 ">
                                        Created For
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
                                            Amazon Brand
                                        </div>
                                    </td>
                                    
                                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-100">
                                        $20
                                    </td>
                                    <td className="px-6 py-4">
                                        $30
                                    </td>
                                </tr>
                                
                                <tr className="">
                                    <td colSpan="3"></td>
                                    <td className="text-sm font-bold">Sub Total</td>
                                    <td className="text-sm font-bold tracking-wider"><b>$950</b></td>
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
       :<p className='ml-4'>Select Project</p>}



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