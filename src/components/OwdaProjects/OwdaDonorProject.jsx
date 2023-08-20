
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
import { ChevronDownIcon, ChevronUpIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import  
"config/custom-button.css";import "config/custom-button.css"    

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
  TableHead
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

import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'




const OwdaDonorProjectDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [donor,setDonor] = useState([])
    const [partener,setPartener] = useState([])
    const [sector,setSector] = useState([])
    const [category,setCategory] = useState([])
    const [account,setAccount] = useState([])
    const [unitType,setUnitType] = useState([])
    const [isExpanded, setIsExpanded] = useState({open:false,id:""});

    const [projectForm,setProjectForm] = useState({
        name:"", 
        status:"pending", 
        code:"", 
        description:"", 
        starttime:"", 
        endtime:"", 
        color:"", 
        owdaDonorId:"", 
        owdaPartenerId:"", 
        owdaSectorId:"", 
        owdaCategoryId:"",
        owdaAccountId:""

    })


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



    const expandChev = async(id)=>{
      setIsExpanded({open:true,id})
    }


      useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
              // console.log(resp.data);
                setProject(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                setDonor(resp.data) 
                // console.log(resp.data);
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/unitType`,{withCredentials:true}).then((resp)=>{
              setUnitType(resp.data)
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })
          
            await axios.get(`${url}/sector`,{withCredentials:true}).then((resp)=>{
                setSector(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/partener`,{withCredentials:true}).then((resp)=>{
                setPartener(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/category`,{withCredentials:true}).then((resp)=>{
                setCategory(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/accounts`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                setAccount(resp.data)
                // console.log('Accounts', resp.data);
             
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
        await axios.post(`${url}/project`,projectForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setProject((prev)=>[...prev,resp.data])
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

      
      useEffect(()=>{
        setFetchedResult(searchTerm.length<1?donor:searchResult)
      },[donor,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = donor?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(donor)
      }
    }







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/project/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        return setOpenError({open:true,message:`${resp.data.error}`})
      }
        const data = project.filter((dt)=>dt.id!==isDeleteOpen.id)
        setProject(data)
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
  
        <PageTitle>Projects By Donors</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search donors..." required />
        </div>
            
        </div>
        {/* End of search List */}

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

        {/* <Button onClick={openModal}>New project</Button> */}
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register project</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          


          <Label>
            <span>Name</span>
            <Input
            //   type="number"
              className="mt-1"
              name="name"
              onChange={(e)=>setProjectForm({...projectForm,name:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Code</span>
            <Input
            //   type="number"
              className="mt-1"
              name="code"
              onChange={(e)=>setProjectForm({...projectForm,code:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Description</span>
            <Textarea
            //   type="number"
              className="mt-1"
              name="description"
              onChange={(e)=>setProjectForm({...projectForm,description:e.target.value})}
              required
            />
          </Label>

             
          <Label>
            <span>Status</span>
            <Select
              className="mt-1"
              name="status"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,status:e.target.value})}
              required
            >
              <option value="" disabled>Select Status</option>
                <option>pending</option>
                <option>open</option>
                <option>active</option>
                <option>completed</option>
              
            </Select>
          </Label>

          <Label>
            <span>Start Time</span>
            <Input
              type="date"
              className="mt-1"
              name="starttime"
              onChange={(e)=>setProjectForm({...projectForm,starttime:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>End Time</span>
            <Input
              type="date"
              className="mt-1"
              name="endtime"
              onChange={(e)=>setProjectForm({...projectForm,endtime:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Donor</span>
            <Select
              className="mt-1"
              name="owdaDonorId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,owdaDonorId:e.target.value})}
              required
            >
              <option value="" >Select Donor</option>
              {donor.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Partener</span>
            <Select
              className="mt-1"
              name="owdaPartenerId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,owdaPartenerId:e.target.value})}
              required
            >
              <option value="" >Select Partener</option>
              {partener.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>
          
          <Label>
            <span>Sector</span>
            <Select
              className="mt-1"
              name="owdaSectorId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,owdaSectorId:e.target.value})}
              required
            >
              <option value="" >Select Sector</option>
              {sector.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Category</span>
            <Select
              className="mt-1"
              name="owdaCategoryId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,owdaCategoryId:e.target.value})}
              required
            >
              <option value="" >Select Category</option>
              {category.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>
          

          <Label>
            <span>Account</span>
            <Select
              className="mt-1"
              name="owdaAccountId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setProjectForm({...projectForm,owdaAccountId:e.target.value})}
              required
            >
              <option value="" >Select Account</option>
              {account.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
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

    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">

           
          {fetchedResult.map((dn)=>
  
                  <div key={dn.id} className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg p-4 text-sm text-white dark:bg-gray-800 dark:text-gray-200">
                  <div className="font-bold mb-1 text-gray-600 dark:text-gray-300">Donor Information</div>
                  <div className="mb-1 flex">
                    <p className="text-gray-600 dark:text-gray-300">Name:</p>
                    <p className="font-bold ml-2 text-gray-600 dark:text-gray-300">{dn.name}</p>
                  </div>
                  <div className="mb-1 flex">
                    <p className="text-gray-600 dark:text-gray-300">Email:</p>
                    <p className="font-bold ml-2 text-gray-600 dark:text-gray-300">{dn.email}</p>
                  </div>
                  <div className="mb-1 flex">
                    <p className="text-gray-600 dark:text-gray-300">Account:</p>
                    <p className="font-bold ml-2 text-gray-600 dark:text-gray-300">{account.map((ac)=>ac.id===dn.owdaAccountId?ac.name:"")}</p>
               
                  </div>
                  <div className="mb-1 flex">
                    <p className="text-gray-600 dark:text-gray-300">Phone:</p>
                    <p className="font-bold ml-2 text-gray-600 dark:text-gray-300">{dn.phone}</p>
                  </div>
                  <div className="font-bold mb-1 text-gray-600 dark:text-gray-300">Owned Projects | {dn.owda_projects.length}</div>
                  <Link to={`/app/donorprojects/${dn.id}`}>
                  <button className="w-full mt-3 text-gray-600 dark:text-gray-300 text-green-500 font-semibold py-2 px-4 border border-green-500 rounded shadow">
                    View
                  </button>
                  </Link>
                
                </div>
          )}





</div>





    


      </>
    )


   

}




export default OwdaDonorProjectDetail