  import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 
import { Link } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { useQuery } from '@tanstack/react-query'
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon,EditIcon, EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import RoundIcon from '../components/RoundIcon'
import InfoCard from '../components/Cards/InfoCard'
import * as Yup from 'yup'
import  Alert  from '@windmill/react-ui'
import response from '../utils/demo/tableData'
import { AuthContext } from '../hooks/authContext'
import UnAuthorized from 'components/UnAuthorized/UnAuthorized'
import { useContext } from 'react'
import { url } from 'config/urlConfig'

// make a copy of the data, for the second table
const response2 = response.concat([])

function CompanyList(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showModal, setShowModal] = useState({show:false,id:""});
  const {authState,settings} = useContext(AuthContext)


  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


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





    //COMAPNY DATA STATES

    const [companyData,setCompanyData] = useState([])
    const [companyFormData,setCompanyFormData] = useState({name:"",location:"",UserId:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [users,setUsers] = useState([])
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [count,setCount] = useState(0)

    //ENDOF COMPANY DATA

useEffect(()=>{


  axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){

    }else{
      const data = resp.data.filter((usr)=>usr.role=="client")
      setUsers(data)

    }
  })

  axios.get(`${url}/companies`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){

    }else{
      setCompanyData(resp.data.company)
      setCount(resp.data.count)
    }
  })
  document.title = "Cellu-Crm | Companies";

},[])






  
  useEffect(()=>{
    setFetchedResult(searchTerm.length<1?companyData:searchResult)
  },[companyData,searchTerm])


  const searchHandler = async(search)=>{
    setSearchTerm(search)
    if(search!==0){
      const newCompanyList = companyData?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newCompanyList)
    }else{
      setSearchResult(companyData)
    }
  }











  const addCompany =async(e)=>{
    e.preventDefault()
    // console.log(e.data);
    if(companyFormData.name==="" || companyFormData.location===""){
      setErrorMessage('Please Provide all data')
    }else{
     
      const response = await axios.post(`${url}/companies`,companyFormData,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          // console.log('added data',resp.data);
      
          setCompanyData((prev)=>[...prev,resp.data])
          setCompanyFormData({name:"",location:"",UserId:""})
          setOpenSuccess({open:true,message:"Added Successfully"})
         
          closeModal()
        }
      })
    }

}
const deleteCompany =async()=>{
  // console.log('new data ',newData[0]);
  // console.log(query.indexOf(newData[0]));
  const response = await axios.get(`${url}/companies/delete/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
    
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      
      const newData = companyData.filter((c)=>c.id!==isDeleteOpen.id)
      setCompanyData(newData)
      closeDelete() 
      setOpenSuccess({open:true,message:"Deleted Successfully"})
      // props.history.push('/app/companies')
    }
  })
}





  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}


  return (
    <>
   
      <PageTitle>List of Companies Registered</PageTitle>

      {/* Notification Section */}
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

      {/* End of Notification section */}
     {/* Delete Confirm section */}
     <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteCompany}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}

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
      {/* infCarf */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Companies" value={count}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      {/* End of Info Card */}


      <div>
        <Button onClick={openModal}>Add Company</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Company Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={e=>{addCompany(e)}}>
        <Label>
          <span>Name</span>
            <Input type="text" className="mt-1" name="name" placeholder="Company Name" value={companyFormData.name} autoComplete='off' onChange={e=>setCompanyFormData({...companyFormData, name:e.target.value})}/>
        </Label>
        <Label>
            <span>Customer</span>
            <Select
              className="mt-1"
              name="contractType"
              value={companyFormData.UserId}
              onChange={(e)=>setCompanyFormData({...companyFormData,UserId:e.target.value})}
              required
            >
              <option value="" disabled>Select a Customer type</option>
              {users.map((usr,i)=>(
                <option key={i} value={usr.id}>{usr.name}</option>
              ))}
              
            </Select>
          </Label>

        <Label>
          <span>Location</span>
          <Input type="text" className="mt-1" name="location" placeholder="Jijiga"  value={companyFormData.location} onChange={e=>setCompanyFormData({...companyFormData,location:e.target.value})}/>
        </Label>
        <Button className="mt-4" type="submit">Save</Button>
        </form>
            
   
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
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
          <div className="block w-full sm:hidden">
<Button block size="large" type="submit" className="custom-button">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      <SectionTitle></SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Company Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Client</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult?.map((comp, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    
                    <div>
                      <p className="font-semibold">{comp.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{comp.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{comp.location}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{users.map((usr)=>usr.id===comp.UserId?usr.name:"")}</span>
                </TableCell>
                
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={{pathname:`/app/companies/${comp.id}`}}>
                    <Button layout="link" size="icon" aria-label="Edit">
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    </Link>
                    <Button onClick={()=>openDelete(comp.id)} style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          {/* <Pagination
            // totalResults={totalResults}
            // resultsPerPage={resultsPerPage}
            // onChange={onPageChangeTable2}
            // label="Table navigation"
          /> */}
        </TableFooter>
      </TableContainer>

    </>
  )
}

export default CompanyList
