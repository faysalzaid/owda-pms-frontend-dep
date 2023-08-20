
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
import { Link, useHistory, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { RiDeleteBin6Line } from 'react-icons/ri'




const DonorDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [donor,setDonor] = useState({})
    const [account,setAccount] = useState([])
    const [donorForm,setDonorForm] = useState({
        name:"",
        code:"",
        address:"",
        email:"",
        phone:"",
        owdaAccountId:""

    })

    const history = useHistory()

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
            await axios.get(`${url}/donors/${id}`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error){
                    setOpenError({open:true,message:`${resp.data.error}`})
                }else{

                    setDonor(resp.data)
                    setDonorForm({
                        name:resp.data.name,
                        code:resp.data.code,
                        address:resp.data.address,
                        email:resp.data.email,
                        phone:resp.data.phone,
                        owdaAccountId:resp.data.owdaAccountId
                
                    })
                }
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
           
            await axios.get(`${url}/accounts`,{withCredentials:true}).then((resp)=>{
                setAccount(resp.data)
                // console.log(resp.data);ƒ
             
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
        await axios.put(`${url}/donors/${id}`,donorForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setDonor(resp.data)
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
    await axios.delete(`${url}/donors/${id}`,{withCredentials:true}).then((resp)=>{
        // const data = donor.filter((dt)=>dt.id!==isDeleteOpen.id)
        // setDonor(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        setTimeout(() => {
            history.goBack()
        }, 1000);
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
  
        <PageTitle>Donors | {donor.name}</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Companies, Locations..." required />
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

        <div className='flex'>
        <Button onClick={openModal}>Update Donor</Button>
        <Button onClick={openDelete} style={{backgroundColor:'red'}} className="ml-4 text-lg text-white-600 hover:text-red-800">
       <RiDeleteBin6Line />
        </Button>
        </div>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Donor </ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
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


  
        



    <div className="bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
  <div className="bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4">Donor Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Donor Name</p>
                  <p className="text-sm font-semibold">{donor.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Donor Code</p>
                 <p className="text-sm font-semibold text-red-600">{donor.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Address</p>
                  <p className="text-2xl font-semibold text-blue-600">{donor.address}</p>
                </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
            <h2 className="text-lg font-semibold mb-4">Other Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Donor Email</p>
                  <p className="text-sm font-semibold">{donor.email}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Donor Phone</p>
                 <p className="text-sm font-semibold text-red-600">{donor.phone}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Donor Account</p>
                <Link to={`/app/accounts/${donor.owdaAccountId}`}>
                <p className="text-sm font-semibold text-green-600">
                 {account.map((ac)=>ac.id==donor.owdaAccountId?ac.name:"")}
                 </p>
                 </Link>
                </div>
      </div>


    </div>
  </div>
</div>

      </>
    )


   

}




export default DonorDetail