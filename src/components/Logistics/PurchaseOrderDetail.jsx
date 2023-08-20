
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
import { BanIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';
import 'config/custom-button.css'
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

import { FaCheckCircle } from 'react-icons/fa'




const PurchaseOrderDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [purchase,setPurchase] = useState([])
    const [purchaseOrder,setPurchaseOrder] = useState({})
    // const [users,setUsers] = 
    const [orderForm,setOrderForm] = useState({
        date:"",
        description:"",
        issuedBy:"",
        issuedTo:"",
        purchaseRequestGroupId:""
     


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
            await axios.get(`${url}/purchaseorders/${id}`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                setPurchaseOrder(resp.data)
                setOrderForm({  
                date:resp.data.date,
                issuedBy:resp.data.issuedBy,
                issuedTo:resp.data.issuedTo,
                purchaseRequestGroupId:resp.data.purchaseRequestGroupId
            })
                // console.log(resp.data);
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
            await axios.get(`${url}/pGroup`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                const data = resp.data.filter((pr)=>pr.status==="porder" || pr.status==="grn" || pr.status==="completed")
                setPurchase(data)
                // console.log(resp.data);
             
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
        if(orderForm.purchaseRequestGroupId ==="" || orderForm.purchaseRequestGroupId==="Select Purchase Request") return setOpenError({open:true,message:"Please Provide Purchase Request"})
        const request ={
            date:orderForm.date,  
            issuedBy:orderForm.issuedBy,
            purchaseRequestGroupId:orderForm.purchaseRequestGroupId,
            issuedTo:orderForm.issuedTo
        }
        // console.log(request);
        await axios.put(`${url}/purchaseorders/${id}`,request,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setPurchaseOrder(resp.data)
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
        setFetchedResult(searchTerm.length<1?purchaseOrder:searchResult)
      },[purchaseOrder,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = purchaseOrder?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(purchaseOrder)
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
    await axios.delete(`${url}/purchaseorders/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = purchaseOrder.filter((dt)=>dt.id!==isDeleteOpen.id)
        setPurchaseOrder(data)
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


const handleSend = async(id)=>{
  // console.log(id);
  await axios.post(`${url}/purchaseorders/sent/${id}`,{withCredentials:true}).then((resp)=>{
   if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
   setPurchaseOrder(resp.data)
   setOpenSuccess({open:true,message:"Successfully Sent To GRN"})
  })
}

const handleUnSend = async(id)=>{
  // console.log(id);
  await axios.post(`${url}/purchaseorders/unsent/${id}`,{withCredentials:true}).then((resp)=>{
   if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
   setPurchaseOrder(resp.data)
   setOpenSuccess({open:true,message:"Successfully Returned from GRN"})
  })
}



  
    return (
      <>
  
        <PageTitle>Purchase Order ID | #{purchaseOrder.id} </PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search purchaseOrder..." required />
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
        <Button onClick={openModal} className="custom-button">Update Purchase Order</Button>
        {purchaseOrder.sent?(<div className='mt-2'><button className='flex' onClick={()=>handleUnSend(id)}><FaCheckCircle className='mt-1 ml-2 text-green-400'/><span className='ml-2 text-green-400'>Sent To GRN</span></button></div>):(<div className='mt-2'><button className='flex' onClick={()=>handleSend(purchaseOrder.id)}><FaCheckCircle className='mt-1 ml-4 text-red-400'/><span className='ml-2 text-red-400'>Send To GRN</span></button></div>)}
        </div>
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Purchase Order</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Date</span>
            <Input
            //   type="number"
              value={orderForm.date}
              type="date"
              className="mt-1"
              name="name"
              onChange={(e)=>setOrderForm({...orderForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Issued To</span>
            <Input
            //   type="number"
              value={orderForm.issuedTo}
              className="mt-1"
              name="description"
              onChange={(e)=>setOrderForm({...orderForm,issuedTo:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Issued By</span>
            <Input
            //   type="number"
              value={orderForm.issuedBy}
              className="mt-1"
              name="description"
              onChange={(e)=>setOrderForm({...orderForm,issuedBy:e.target.value})}
              required
            />
          </Label>

         
          <Label>
            <span>Purchase Group</span>
            <Select
              className="mt-1"
              name="status"
              value={orderForm.purchaseRequestGroupId}
              onChange={(e)=>setOrderForm({...orderForm,purchaseRequestGroupId:e.target.value})}
              required
            >
              <option>Select Purchase Group</option>
                {purchase.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr?.name}</option>
                  })}
                
              
            </Select>
          </Label>


       
       

         



        </div>
        <div className="hidden sm:block">

        <Button className="mt-6 custom-button" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
            <Button block size="large" className="custom-button" type="submit">
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
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Purchase Order Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Date</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchaseOrder.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Order Code</p>
                 <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">#{purchaseOrder.id}</p>
                </div>
                <div className='mb-4'>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Issued To</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchaseOrder.issuedTo}</p>
                </div>
                <div className='mb-4'>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Issued By</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchaseOrder.issuedBy}</p>
                </div>
            
              

             <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Order Status</p>
             <p className="text-1xl font-semibold text-white-600"><Badge type="success">{purchaseOrder.sent?"Sent to GRN":"Pending"}</Badge></p>           
             </div>

      
           
           
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Purchase Group Details</h2>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Group ID</p>
             <p className="text-sm font-semibold text-green-500"><Link to={`/app/purchaseGroup/${purchaseOrder.purchase_request_group?.id}`}>#{purchaseOrder.purchase_request_group?.id}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">No of Purchases Included</p>
            <p className="text-1xl font-semibold text-green-600"> {purchaseOrder.purchase_request_group?.purchase_requests?.length} Items</p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Group Name</p>
            <p className="text-1xl font-semibold text-green-600"> {purchaseOrder.purchase_request_group?.name}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Quantity</p>
            <p className="text-1xl font-semibold text-green-600"> {purchaseOrder.purchase_request_group?.unit}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Request Status</p>
            <p className="text-1xl font-semibold text-red-600"><Badge type="success">{(purchaseOrder?.purchase_request_group?.status.toUpperCase())}</Badge></p>
           </div>
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Used</p>
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




export default PurchaseOrderDetail