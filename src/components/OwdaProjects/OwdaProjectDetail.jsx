
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

import "config/custom-button.css"
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

import { FaChevronDown, FaEdit, FaPlusCircle } from 'react-icons/fa'
import { RiDeleteBin5Line } from 'react-icons/ri'




const OwdaProjectDetial = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [budgetLines,setBudgetLines] = useState([])
    const [project,setProject] = useState({})
    const [donor,setDonor] = useState([])
    const [partener,setPartener] = useState([])
    const [bCategory,setBCategory] = useState([])
    const [allBCategory,setAllBCategory] = useState([])
    const [fCategory,setFCategory] = useState(0)
    const [sector,setSector] = useState([])
    const [category,setCategory] = useState([])
    const [account,setAccount] = useState([])
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
            await axios.get(`${url}/project/${id}`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                return setOpenError({open:true,message:`${resp.data.error}`})
              }
              // console.log(resp.data);
                setProject(resp.data)
                setBudgetLines(resp.data.owda_budget_lines)
                setAllBCategory(resp.data.owda_budget_lines)
                setProjectForm({
                    name:resp.data.name, 
                    status:resp.data.status, 
                    code:resp.data.code, 
                    description:resp.data.description, 
                    starttime:resp.data.starttime, 
                    endtime:resp.data.endtime, 
                    color:resp.data.color, 
                    owdaDonorId:resp.data.owdaDonorId, 
                    owdaPartenerId:resp.data.owdaPartenerId, 
                    owdaSectorId:resp.data.owdaSectorId, 
                    owdaCategoryId:resp.data.owdaCategoryId,
                    owdaAccountId:resp.data.owdaAccountId
            
                })
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
                setDonor(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/budgetCategory`,{withCredentials:true}).then((resp)=>{
              setBCategory(resp.data)
           
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
                setAccount(resp.data)
             
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
        // console.log(projectForm);
        e.preventDefault();
        await axios.put(`${url}/project/${id}`,projectForm,{withCredentials:true}).then((resp)=>{
          console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setProject(resp.data)
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
    await axios.delete(`${url}/project/${id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{

        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        setTimeout(() => {
          props.history.goBack()
        }, 2000);
      }
        // const data = project.filter((dt)=>dt.id!==isDeleteOpen.id)
        // setProject(data)
        
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}




const filterByCategory = async()=>{
  if(fCategory==0){
    setBudgetLines(allBCategory)
  }else{
    console.log(fCategory);
    const d = allBCategory.filter((bd)=>bd.owdaBudgetLineCategoryId==fCategory)
    setBudgetLines(d)

  }
}
  
    return (
      <>
  
        <PageTitle>Project | {project.name}</PageTitle>
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

        <Button onClick={openModal} className="custom-button">Update project</Button>
        <Button onClick={openDelete} style={{backgroundColor:'red'}} className="ml-4 text-lg text-white-600 hover:text-red-800">
       <RiDeleteBin5Line />
        </Button>
       
  
        <h2 className="text-lg font-medium m-2">Filter</h2>
       <div className="flex relative inline-flex">
        <select onChange={(e)=>setFCategory(e.target.value)} className="flex-2 mt-1 w-48 h-10 pl-3 pr-8 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <option value={0}>All Categories</option>
          {bCategory?.map((pr)=> <option value={pr.id} key={pr.id}>{pr.name}</option>)}
         
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2">
          <FaChevronDown className="text-gray-400" />
        </div>
      </div>
      <Button size="small" onClick={()=>filterByCategory()} className="ml-3 mr-2 text-white py-2 px-4 rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 custom-button" disabled={fCategory===0?true:false}>
        Generate
      </Button>


      
        </TableContainer>


  

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update project</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          


          <Label>
            <span>Name</span>
            <Input
            //   type="number"
              className="mt-1"
              value={projectForm.name}
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
              value={projectForm.code}
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
              value={projectForm.description}
              name="description"
              onChange={(e)=>setProjectForm({...projectForm,description:e.target.value})}
              required
            />
          </Label>

             
          <Label>
            <span>Status</span>
            <Select
              className="mt-1"
              value={projectForm.status}
              name="status"
    
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
              value={projectForm.starttime}
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
              value={projectForm.endtime}
              name="endtime"
              onChange={(e)=>setProjectForm({...projectForm,endtime:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Donor</span>
            <Select
              className="mt-1"
              value={projectForm.owdaDonorId}
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
              value={projectForm.owdaPartenerId}
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
              value={projectForm.owdaSectorId}
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
              value={projectForm.owdaCategoryId}
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
              value={projectForm.owdaAccountId}
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
            <Button block className="custom-button" type="submit" size="large">
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





    <div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
        <h2 className="text-lg dark:text-gray-100 font-semibold mb-4">Project Details</h2>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project Name</p>
          <p className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{project.name}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Account Code</p>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">{project.code}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Description</p>
          <p className="text-sm font-semibold text-pink-700 dark:text-pink-400">{project.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-800 dark:text-gray-300">Project Category</p>
          <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">
            {category.map((ca) => (ca.id === project.owdaCategoryId ? ca.name : ""))}
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
        <h2 className="text-lg dark:text-gray-100 font-semibold mb-4">Other Details</h2>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project Partner</p>
          <p className="text-sm font-semibold text-green-700 dark:text-green-400">
            {partener.map((ac) => (ac.id === project.owdaPartenerId ? ac.name : ""))}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project Donor</p>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">
            {donor.map((bn) => (bn.id === project.owdaDonorId ? bn.name : ""))}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project Sector</p>
          <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">
            {sector.map((bn) => (bn.id === project.owdaSectorId ? bn.name : ""))}
          </p>
        </div>
        <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project Account</p>
          <p className="text-sm font-semibold text-red-600">{account.map((bn)=>bn.id==project.owdaAccountId?<Link to={`/app/accounts/${bn.id}`} key={bn.id}>{bn.name}</Link>:"")}</p>
            <p className="text-sm font-semibold text-purple-700">{parseFloat(account.map((bn)=>bn.id==project.owdaAccountId?bn.balance:"")).toLocaleString({maximumFractionDigits:2})}</p>
           </div>


           <div className="mb-4">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-100">Project inUse Amount</p>
          <p className="text-sm font-semibold text-red-700 dark:text-red-400">ETB-{parseFloat(project.inUseAmount).toLocaleString({})}</p>
           </div>
       
        </div>
    </div>
  </div>
</div>






<div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans mb-6 overflow-x-auto">
  <div className="w-full">
    <div className="flex">
      <Badge> Budget Lines</Badge>
    </div>

    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
    <div className="overflow-x-auto">
    <table className="min-w-full divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Desc
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Code
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Unit Quantity
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Duration
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Unit Cost
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Donor Charge
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Category
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Total Amount
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Show
      </th>
    
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
        {budgetLines?.map((owd)=>
    <tr key={owd.id}>
        <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
        <div className="">
        <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">
                      {owd.name}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{owd.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{owd.unitQuantity}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{owd.duration}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{owd.unitCost}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{owd.donorCharge}%</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{bCategory.map((bc)=>bc.id===owd.owdaBudgetLineCategoryId?bc.name:"")}</div>
    </td>
  
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300">{parseFloat(owd.totalAmount).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-semibold font-medium text-gray-900 dark:text-gray-300"><Link to={`/app/budgetLines/${owd.id}`}><FaEdit className='text-blue-500'/></Link></div>
    </td>
  </tr>



    )}
   
    </tbody>
     
    </table>









</div>
</div>
<div>
<p className='ml-4 mb-6 text-green-600 '>Total |  ETB <span className='font-semibold'>{budgetLines?.reduce((acc,curr)=>acc+parseFloat(curr.totalBalance),0).toLocaleString({maximumFractionDigits:2})}</span></p>
</div>
</div>
</div>









      </>
    )


   

}




export default OwdaProjectDetial