
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
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaCheckCircle, FaEdit } from 'react-icons/fa'
import { AiFillDelete } from 'react-icons/ai'




const OwdaDonorProjectList = () => {
    const {id} = useParams()

    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [donor,setDonor] = useState({})
    const [partener,setPartener] = useState([])
    const [sector,setSector] = useState([])
    const [category,setCategory] = useState([])
    const [unitType,setUnitType] = useState([])
    const [account,setAccount] = useState([])
    const [loopedDonor,setLoopedDonor] = useState([])
    const [isExpanded, setIsExpanded] = useState({open:false,id:""});
    const [donorForm,setDonorForm] = useState({
        name:"",
        code:"",
        address:"",
        email:"",
        phone:"",
        owdaAccountId:""

    })
    const [projectForm,setProjectForm] = useState({
        name:"", 
        status:"pending", 
        code:"", 
        description:"", 
        starttime:"", 
        endtime:"", 
        color:"", 
        owdaDonorId:id, 
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


    const [isDonorOpen,setIsDonorOpen] = useState(false)
    function openDonor(){
        setIsDonorOpen(true)
    }

    function closeDonor(){
        setIsDonorOpen(false)
    }




    const expandChev = async(id)=>{
      setIsExpanded({open:true,id})
    }


      useEffect(()=>{
        const getData=async()=>{
    

            await axios.get(`${url}/donors/${id}`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
              console.log(resp.data);
                setDonor(resp.data) 
                setProject(resp.data.owda_projects)
                setDonorForm({
                    name:resp.data.name,
                    code:resp.data.code,
                    address:resp.data.address,
                    email:resp.data.email,
                    phone:resp.data.phone,
                    owdaAccountId:resp.data.owdaAccountId
            
                })
                // console.log(resp.data);
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
              setLoopedDonor(resp.data)
           
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



    
    const handleDonorSubmit = async(e) => {
        e.preventDefault();
        await axios.put(`${url}/donors/${id}`,donorForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setDonor(resp.data)
            setOpenSuccess({open:true,message:"Successfully Updated"})
            closeDonor();   
          }

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })

       
      };

      
    
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
        setFetchedResult(searchTerm.length<1?project:searchResult)
      },[project,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = project?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(project)
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
  
        <PageTitle>Donor | {donor.name}</PageTitle>
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

        <Button className="mb-2 custom-button" onClick={openModal}>New project</Button>
  
      
        </TableContainer>


        {/* Project Section */}
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
              <option>Select Account</option>
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
    {/* End of Project Section */}



    {/* Donor Section */}



    <Modal isOpen={isDonorOpen} onClose={closeDonor}>
      <ModalHeader>Update Donor </ModalHeader>
      <ModalBody>
      <form onSubmit={handleDonorSubmit}>
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Name</span>
            <Input
            //   type="number"
              className="mt-1"
              value={donorForm.name}
              name="name"
              onChange={(e)=>setDonorForm({...donorForm,name:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Code</span>
            <Input
            //   type="number"
              className="mt-1"
              value={donorForm.code}
              name="code"
              onChange={(e)=>setDonorForm({...donorForm,code:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Address</span>
            <Input
            //   type="number"
              className="mt-1"
              value={donorForm.address}
              name="address"
              onChange={(e)=>setDonorForm({...donorForm,address:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Email</span>
            <Input
              type="email"
              className="mt-1"
              value={donorForm.email}
              name="email"
              onChange={(e)=>setDonorForm({...donorForm,email:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Phone</span>
            <Input
              type="phone"
              className="mt-1"
              value={donorForm.phone}
              name="phone"
              onChange={(e)=>setDonorForm({...donorForm,phone:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Accounts</span>
            <Select
              className="mt-1"
              value={donorForm.owdaAccountId}
              name="CompanyId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setDonorForm({...donorForm,owdaAccountId:e.target.value})}
              required
            >
              <option >Select Account</option>
              {account?.map((cp,i)=>(
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



    {/* End of Donor Section */}

    <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-1 gap-4">

           
     
  
                  <div className="w-full bg-gradient-to-br from-green-400 to-blue-500 rounded-lg shadow-lg p-4 text-sm text-white dark:bg-gray-800 dark:text-gray-200">
                  <div className="font-bold mb-1 text-gray-600 dark:text-gray-300">Donor Information</div>
                  <div className="mb-1">
                    <p className="text-gray-600 dark:text-gray-300">Name:</p>
                    <p className="font-bold text-gray-600 dark:text-gray-300">{donor.name}</p>
                  </div>
                  <div className="mb-1">
                    <p className="text-gray-600 dark:text-gray-300">Email:</p>
                    <p className="font-bold text-gray-600 dark:text-gray-300">{donor.email}</p>
                  </div>
                  <div className="mb-1">
                    <p className="text-gray-600 dark:text-gray-300">Account:</p>
                    <p className="font-bold text-gray-600 dark:text-gray-300">{donor?.owda_account?.name}</p>
               
                  </div>
                  <div className="mb-1">
                    <p className="text-gray-600 dark:text-gray-300">Phone:</p>
                    <p className="font-bold text-gray-600 dark:text-gray-300">{donor.phone}</p>
                  </div>
                  <div className="font-bold mb-1 text-gray-600 dark:text-gray-300">Owned Projects | {donor?.owda_projects?.length}</div>
                  <button onClick={openDonor} className="w-full mt-3 text-gray-600 dark:text-gray-300 text-purple-500 font-semibold py-2 px-4 border border-purple-500 rounded shadow">
                    Update
                  </button>
                </div>







                <div>
      <div >
        <div>
          <div className="">
            <Table>
              <TableHeader >
                <TableRow>
                  <TableCell className="font-semibold">
                    Name
                  </TableCell>
                  <TableCell className="font-semibold">
                    Status
                  </TableCell>
                  <TableCell className="font-semibold">
                      Code 
                  </TableCell>
                  <TableCell className="font-semibold">
                    Start Time
                  </TableCell>
                  <TableCell className="font-semibold">
                    End Time
                  </TableCell>
                  <TableCell className="font-semibold">
                    Category
                  </TableCell>
                  <TableCell className="font-semibold">
                    Account
                  </TableCell>
                  <TableCell className="font-semibold">
                    Edit
                  </TableCell>
                  <TableCell className="font-semibold">
                    Delete
                  </TableCell>
                  <TableCell className="font-semibold">
                    Expand
                  </TableCell>
                  <TableCell className="font-semibold">
                    <span className="sr-only">View details</span>
                  </TableCell>
                </TableRow>
              </TableHeader>
              {project?.map((row, rowIndex) => (
              <TableBody key={rowIndex}>
               
                  <>
                    <TableRow >
                      <TableCell className="font-bold text-sm">{row.name}</TableCell>
                      <TableCell className="font-bold text-sm">{row.status}</TableCell>
                      <TableCell className="font-bold text-sm">{row.code}</TableCell>
                      <TableCell className="font-bold text-sm">{row.starttime}</TableCell>
                      <TableCell className="font-bold text-sm">{row.endtime}</TableCell>
             
                      <TableCell className="font-bold text-sm">{category.map((dn)=>dn.id==row.owdaCategoryId?dn.name:"")}</TableCell>
                      <TableCell className="font-bold text-sm">{account.map((dn)=>dn.id==row.owdaAccountId?dn.name:"")}</TableCell>
                      <TableCell className="font-bold text-sm" style={{color:"blue"}}><Link to={`/app/projects/${row.id}`}><FaEdit className='ml-3'/></Link></TableCell>
                      <TableCell className="font-bold text-sm" style={{color:'red'}}><AiFillDelete className='ml-4'  onClick={()=>setIsDeleteOpen({open:true,id:row.id})}/></TableCell>
                      <TableCell className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                          onClick={() => setIsExpanded({open:!(isExpanded.open),id:row.id})}
                        >
                          {isExpanded.open && isExpanded.id==row.id ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </TableCell>
                    </TableRow>
                     {isExpanded.open&&isExpanded.id==row.id&&( 
                   <TableRow>
                   <TableCell colSpan="11" className="px-6 py-4 whitespace-nowrap">
                     <div className="overflow-x-auto">
                       <Table className="min-w-full divide-y divide-gray-200">
                         <TableHeader>
                           <TableRow>
                             <TableCell>
                               Descr
                             </TableCell>
                             <TableCell>
                               Code
                             </TableCell>
                             <TableCell>
                               Duration
                             </TableCell>
                             <TableCell>
                               U.Type
                             </TableCell>
                             <TableCell>
                                U.Quantity
                             </TableCell>
                              <TableCell>
                                U.Cost
                             </TableCell>
                              <TableCell>
                                Amount
                             </TableCell>
                             <TableCell>
                               Delete
                             </TableCell>
                            
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {row.owda_budget_lines?.map((detail, index) => (
                             <TableRow key={index}>
                               <TableCell>{detail.name}</TableCell>
                               <TableCell>{detail.code}</TableCell>
                               <TableCell>{detail.duration}</TableCell>
                               <TableCell>{unitType.map((un)=>un.id==detail.owdaUnitTypeId?un.name:"")}</TableCell>
                               <TableCell>{detail.unitQuantity}</TableCell>
                               <TableCell>{parseFloat(detail.unitCost)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                               <TableCell>{parseFloat(detail.totalAmount)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                        
                               <TableCell style={{color:'red'}} className="mr-6 px-6"><Link to={`/app/budgetLines/${detail.id}`}><FaEdit/></Link></TableCell>
                             </TableRow>
                           ))}
                         </TableBody>
                       </Table>
                       <p className='ml-4 text-green-600'>Total |  ETB <span className='font-semibold'>{row.owda_budget_lines?.reduce((acc,curr)=>acc+parseFloat(curr.totalAmount),0).toLocaleString({maximumFractionDigits:2})}</span></p>
                     </div>
                   </TableCell>
                 </TableRow>

                )}
                 
                  </>
              
       </TableBody> 
       ))} 
                 </Table>
              </div>
          </div> 
      </div> 
      </div>  

</div>





    


      </>
    )


   

}




export default OwdaDonorProjectList