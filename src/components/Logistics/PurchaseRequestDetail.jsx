
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

import { RiDeleteBin6Line } from 'react-icons/ri'
import { FiDownload } from 'react-icons/fi'




const PurchaseRequestDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [purchase,setPurchase] = useState({})
    const [budgetlines,setBudgetlines] = useState([])
    const [holdBudgetLine,setHoldBudgetLine] = useState([])
    const [projects,setProjects] = useState([])
    const [purchaseForm,setPurchaseForm] = useState({
        date:"",
        description:"",
        requestedBy:"",
        quantity:"",
        unit:"",
        estimatedUnitPrice:"",
        actualUnitPrice:'',
        owdaProjectId:"",
        owdaBudgetLineId:"",
        status:""



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
            await axios.get(`${url}/purchaseRequest/${id}`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                setPurchase(resp.data)
                // console.log(resp.data);
                setPurchaseForm({  date:resp.data.date,
                description:resp.data.description,
                requestedBy:resp.data.requestedBy,
                quantity:resp.data.quantity,
                unit:resp.data.unit,
                estimatedUnitPrice:resp.data.estimatedUnitPrice,
                owdaProjectId:resp.data.owdaProjectId,
                owdaBudgetLineId:resp.data.owdaBudgetLineId,
                status:resp.data.status,
                actualUnitPrice:resp.data.actualUnitPrice
        
              
              })
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })


                      
            await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
              setProjects(resp.data)
              // console.log(resp.data);
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })


          await axios.get(`${url}/budgetLines`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
            setBudgetlines(resp.data)
            setHoldBudgetLine(resp.data)
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
        if(purchaseForm.owdaProjectId===""||purchaseForm.owdaProjectId==="Select Project") return setOpenError({open:true,message:"Please Choose Project"})
        if(purchaseForm.status===""||purchaseForm.status==="Select Status") return setOpenError({open:true,message:"Please Choose Status"})
        if(purchaseForm.owdaBudgetLineId===""||purchaseForm.owdaBudgetLineId==="Select BudgetLine") return setOpenError({open:true,message:"Please Choose Budget Line"})
        const request = {
            date:purchaseForm.date,
            description:purchaseForm.description,
            requestedBy:authState.username,
            quantity:purchaseForm.quantity,
            unit:purchaseForm.unit,
            estimatedUnitPrice:purchaseForm.estimatedUnitPrice,
            owdaBudgetLineId:purchaseForm.owdaBudgetLineId,
            owdaProjectId:purchaseForm.owdaProjectId,
            actualUnitPrice:purchaseForm.actualUnitPrice
        }
        // console.log(request);
        await axios.put(`${url}/purchaseRequest/${id}`,request,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setPurchase(resp.data)
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
        setFetchedResult(searchTerm.length<1?purchase:searchResult)
      },[purchase,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = purchase?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(purchase)
      }
    }




    useEffect(()=>{
      const data = holdBudgetLine.filter((bl)=>bl.owdaProjectId==purchaseForm.owdaProjectId)
      setBudgetlines(data)
    
    },[purchaseForm.owdaProjectId])





  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/purchaseRequest/${id}`,{withCredentials:true}).then((resp)=>{
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



  
    return (
      <>
  
        <PageTitle>Purchase Request | {purchase.description}</PageTitle>
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
        <div className='flex'>
        <Button onClick={openModal}>Update Purchase Request</Button>
        <TrashIcon className='w-6 h-6 text-red-600 mt-1 ml-4' onClick={openDelete}/>
        </div>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register purchase</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Date</span>
            <Input
            value={purchaseForm.date}
            //   type="number"
              type="date"
              className="mt-1"
              name="name"
              onChange={(e)=>setPurchaseForm({...purchaseForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="status"
              value={purchaseForm.owdaProjectId}
              onChange={(e)=>setPurchaseForm({...purchaseForm,owdaProjectId:e.target.value})}
              required
            >
              <option>Select Project</option>
                {projects.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
              
            </Select>
          </Label>

          <Label>
            <span>Budget Line</span>
            <Select
              className="mt-1"
              name="status"
              value={purchaseForm.owdaBudgetLineId}
              onChange={(e)=>setPurchaseForm({...purchaseForm,owdaBudgetLineId:e.target.value})}
              required
            >
              <option>Select BudgetLine</option>
                {budgetlines.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
              
            </Select>
          </Label>

          <Label>
            <span>Description</span>
            <Input
            value={purchaseForm.description}
            //   type="number"
              className="mt-1"
              name="description"
              onChange={(e)=>setPurchaseForm({...purchaseForm,description:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Quantity</span>
            <Input
            value={purchaseForm.quantity}
            //   type="number"
              type="number"
              step="0.1"
              className="mt-1"
              name="quantity"
              onChange={(e)=>setPurchaseForm({...purchaseForm,quantity:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>unit</span>
            <Input
            value={purchaseForm.unit}
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPurchaseForm({...purchaseForm,unit:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Estimated Unit Price</span>
            <Input
            value={purchaseForm.estimatedUnitPrice}
            //   type="number"
              className="mt-1"
              name="name"
              onChange={(e)=>setPurchaseForm({...purchaseForm,estimatedUnitPrice:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Actual Unit Price</span>
            <Input
            value={purchaseForm.actualUnitPrice}
            //   type="number"
              className="mt-1"
              name="name"
              onChange={(e)=>setPurchaseForm({...purchaseForm,actualUnitPrice:e.target.value})}
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


  
        


    <div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Purchase Request Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Date</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchase.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Purchase Request Code</p>
                 <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">#{purchase.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Description</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchase.description}</p>
                </div>
                <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Actual Unit Price</p>
            <p className="text-1xl font-semibold text-red-600">{parseFloat(purchase.actualUnitPrice)===0?"Related Quotation is not selected":`ETB ${parseFloat(purchase.actualUnitPrice).toLocaleString()}`}</p>
           </div>
                <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Actual Total Price</p>
             <p className="text-1xl font-semibold text-red-600">{parseFloat(purchase.actualTotalPrice)===0?"Related Quotation is not selected":`ETB ${parseFloat(purchase.actualTotalPrice).toLocaleString()}`}</p>           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Project</p>
            <p className="text-1xl font-semibold text-green-600"><Link to={`/app/projects/${purchase.owda_project?.id}`}>{purchase.owda_project?.name}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Budgetline</p>
            <p className="text-1xl font-semibold text-green-600"><Link to={`/app/budgetLines/${purchase.owda_budget_line?.id}`}>#{purchase.owda_budget_line?.code}</Link></p>
           </div>
           
           
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Other Details</h2>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Quantity</p>
             <p className="text-sm font-semibold text-green-500">{purchase.quantity}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Unit</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{purchase.unit}</p>
           </div>
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Account Balance</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.balance).toLocaleString({maximumFractionDigits:2})}</p>
           </div> */}
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Estimated Unit Price</p>
            <p className="text-2xl font-semibold text-red-600">ETB {parseFloat(purchase.estimatedUnitPrice).toLocaleString()}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Estimated Total Price</p>
            <p className="text-2xl font-semibold text-red-600">ETB {parseFloat(purchase.estimatedTotalPrice).toLocaleString()}</p>
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




export default PurchaseRequestDetail