
import React, { useState, useEffect,Fragment } from 'react';import CountsSection from 'components/Counts/Counts' 

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
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaCheckCircle, FaCloudUploadAlt, FaDownload, FaFileDownload, FaRemoveFormat } from 'react-icons/fa'
import { popoverClasses } from '@mui/material'




const QuotationDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [purchase,setPurchase] = useState([])
    const [suppliers,setSuppliers] = useState([])
    const [rfqData,setRfqData] = useState({})
    const [rfqForm,setRfqForm] = useState({
      date:"",
      requestedBy:"",
      ActualPrice:"",
      file:"", 
      purchaseRequestGroupId:"",
      SupplierId:""

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
            await axios.get(`${url}/pGroup`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                setPurchase(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          

            await axios.get(`${url}/quotations/${id}`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                // console.log(resp.data);
                setRfqData(resp.data)
                setRfqForm({  
                date:resp.data.date,
                requestedBy:resp.data.requestedBy,
                ActualPrice:resp.data.ActualPrice,
                file:resp.data.file, 
                purchaseRequestGroupId:resp.data.purchaseRequestGroupId,
                SupplierId:resp.data.SupplierId
              })
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })




            await axios.get(`${url}/suppliers`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
              // console.log(resp.data);
              setSuppliers(resp.data)
           
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
      if(rfqForm.file===undefined || rfqForm.file===null || rfqForm.file ==="") return setOpenError({open:true,message:"Quotation file is required"})
      if(rfqForm.purchaseRequestGroupId === null || rfqForm.purchaseRequestGroupId==="" ||rfqForm.purchaseRequestGroupId ==="Select Status") return setOpenError({open:true,message:"Please Provide Purchase Request"})
      const formData = new FormData()
      formData.append('date',rfqForm.date)
      formData.append('file',rfqForm.file)
      formData.append('SupplierId',rfqForm.SupplierId)
      formData.append('requestedBy',authState.username)
      formData.append('purchaseRequestGroupId',rfqForm.purchaseRequestGroupId)
      // console.log(formData);
      await axios.put(`${url}/quotations/${id}`,formData,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          // console.log(resp.data);
          setRfqData(resp.data)
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


      
 
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = rfqData?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(rfqData)
      }
    }







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = ()=>{
    setIsDeleteOpen({open:true})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/quotations/${id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
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



const selectQuotation = async()=>{
  await axios.post(`${url}/quotations/select/detail/${id}`).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
    setRfqData(resp.data)
    setOpenSuccess({open:true,message:"Successfully selected"})
  })
}



  
    return (
      <>
  
        <PageTitle>Request For Quotation</PageTitle>
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
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-100" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search purchase..." required />
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
        <Button onClick={openModal} className="custom-button">Update RFQ</Button>
        <TrashIcon  className="mt-2 ml-2 h-6 w-6 text-red-600" onClick={openDelete}/>
        <span className="text-sm ml-auto mr-4 font-semibold flex">{rfqData.selected?(<><FaCheckCircle className='mt-4  text-green-400'/> <span className='mt-3 text-green-400'>Selected</span></>):(<><FaCheckCircle className='mt-1  text-red-400'/><span className=' text-red-400' onClick={()=>selectQuotation()}><button>Select</button></span></>)}</span>
        </div>
  
      
        </TableContainer>
        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update RFQ</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit} encType="multpart/form-data">
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Date</span>
            <Input
              type="date"
              value={rfqForm.date}
              className="mt-1"
              name="name"
              onChange={(e)=>setRfqForm({...rfqForm,date:e.target.value})}
              required
            />
          </Label>

         


          <Label>
            <span>Purchase Group</span>
            <Select
              className="mt-1"
              name="status"
              value={rfqForm.purchaseRequestGroupId}
              onChange={(e)=>setRfqForm({...rfqForm,purchaseRequestGroupId:e.target.value})}
              required
            >
              <option>Select Status</option>
                {purchase.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
                
              
            </Select>
          </Label>



          <Label>
            <span>Supplier</span>
            <Select
              className="mt-1"
              name="status"
              value={rfqForm.SupplierId}
              onChange={(e)=>setRfqForm({...rfqForm,SupplierId:e.target.value})}
              required
            >
              <option>Select Supplier</option>
                {suppliers.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
                
              
            </Select>
          </Label>


          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300 dark:bg-gray-700 dark:text-white">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload Quotation</span>
              </label>
              <input
             
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setRfqForm({...rfqForm,file:e.target.files[0]})}
              />


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


  
        

    <div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Request for Quotation Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Date</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{rfqData.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100"> Request For Quotation Code</p>
                 <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">#{rfqData.id}</p>
                </div>


                <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Selected For Order</p>
             <p className="text-sm font-semibold text-green-500">{rfqData.selected?"Yes":"No"}</p>
           </div>
           
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">RFQ status</p>
             <p className="text-sm font-semibold text-green-500">{rfqData.status}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">RFQ File</p>
             <a href={rfqData.file} target="_blank"><FaDownload className='mt-2 ml-2 dark:text-gray-100'/></a>
           </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Related Purchase Group Details</h2>
           
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Purchase Group ID</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400"><Link to={`/app/purchaseGroup/${rfqData?.purchase_request_group?.id}`}>#{rfqData?.purchase_request_group?.id}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Purchase Group Name</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400"><Link to={`/app/purchaseGroup/${rfqData?.purchase_request_group?.id}`}>{rfqData?.purchase_request_group?.name}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Number of Items  Or Purchases Included</p>
            <p className="text-1xl font-semibold text-red-600">{rfqData.purchase_request_group?.purchase_requests?.length} Items</p>
           </div>
           
          
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Account Used</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.utilized).toLocaleString({maximumFractionDigits:2})}</p>
           </div>
        */}
 </div>
     


    </div>
  </div>
</div>

      </>
    )


   

}




export default QuotationDetail