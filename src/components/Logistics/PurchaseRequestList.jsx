
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
import CNavbar from 'components/CNavBar/Cnavbar'
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";





const PurchaseRequestList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [purchase,setPurchase] = useState([])
    const [itemsList,setItemsList] = useState([])
    const [selectedItems, setSelectedItems] = useState([]);
    const [budgetlines,setBudgetlines] = useState([])
    const [holdBudgetLine,setHoldBudgetLine] = useState([])
    const [projects,setProjects] = useState([])
    const [purchaseForm,setPurchaseForm] = useState({
        date:"",
        description:"",
        requestedBy:"",
        quantity:"",
        unit:"",
        owdaProjectId:"",
        owdaBudgetLineId:""



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



      useEffect(()=>{
        const getData=async()=>{
            await axios.get(`${url}/purchaseRequest`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                setPurchase(resp.data)
                // console.log(resp.data);
             
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


          await axios.get(`${url}/items`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
            setItemsList(resp.data)
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




// items select method
  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (!(prevSelectedItems.find((selectedItem) => selectedItem === item))) {
        return [...prevSelectedItems, item];
      } else {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      }
    });
  };

  // console.log(selectedItems);

      
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        setPurchaseForm({...purchaseForm,requestedBy:authState.username})
        // console.log(purchaseForm);
        if(purchaseForm.owdaProjectId===""||purchaseForm.owdaProjectId==="Select Project") return setOpenError({open:true,message:"Please Choose Project"})
        if(purchaseForm.owdaBudgetLineId===""||purchaseForm.owdaBudgetLineId==="Select BudgetLine") return setOpenError({open:true,message:"Please Choose Budget Line"})
        // const request  ={
        //   ...purchaseForm,
        //   selectedItems
        // }
        // console.log(request);
        await axios.post(`${url}/purchaseRequest`,purchaseForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setPurchase((prev)=>[resp.data,...prev])
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







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/purchaseRequest/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = purchase.filter((dt)=>dt.id!==isDeleteOpen.id)
        setPurchase(data)
        // console.log(resp.data);
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



useEffect(()=>{
  const data = holdBudgetLine.filter((bl)=>bl.owdaProjectId==purchaseForm.owdaProjectId)
  setBudgetlines(data)

},[purchaseForm.owdaProjectId])


  
    return (
      <>
  
        <PageTitle>Purchase Requests</PageTitle>
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
        <CNavbar  className="dark:bg-gray-100"/>
        <Button onClick={openModal} className="mt-4 custom-button">New Purchase Request</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Purchase Request</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit} className="border border-gray-800 dark:border-gray-100 rounded-lg p-6">
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Date</span>
            <Input
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
            //   value={formValues.CompanyId}
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
            //   value={formValues.CompanyId}
              onChange={(e)=>setPurchaseForm({...purchaseForm,owdaBudgetLineId:e.target.value})}
              required
            >
              <option>Select BudgetLine</option>
                {budgetlines.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
              
            </Select>
          </Label>



          

        
        <div className="flex flex-wrap">
            {itemsList.map((item) => (
      
        <div key={item.id} className="flex items-center mr-4">
          <Input
       
            type="radio"
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            // name="colored-radio"
            value={item.id}
            checked={selectedItems.some((selectedItem) => selectedItem === item.id)}
            onClick={() => handleItemClick(item.id)}
            onChange={()=>item.id}
          />
          <label  className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{item.name}</label>
        </div>
      


             ))}
      </div>
      


          <Label>
            <span>Description</span>
            <Input
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
              type="number"
              step="0.1"
              className="mt-1"
              name="name"
              onChange={(e)=>setPurchaseForm({...purchaseForm,estimatedUnitPrice:e.target.value})}
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


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Date</TableCell>
            <TableCell className="font-semibold">Description</TableCell>
            <TableCell className="font-semibold">BudgetLine</TableCell>
         
            <TableCell className="font-semibold">Quantity</TableCell>
            <TableCell className="font-semibold">Unit</TableCell>
            <TableCell className="font-semibold">Est.UnitPrice</TableCell>
            <TableCell className="font-semibold">Est.TotalPrice</TableCell>
            <TableCell className="font-semibold">Act.UnitPrice</TableCell>
            <TableCell className="font-semibold">Act.TotalPrice</TableCell>
       
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedResult?fetchedResult.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                
                <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.description}</span></TableCell>
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/budgetLines/${row.owda_budget_line?.id}`}>{holdBudgetLine.map((bl)=>bl.id===row.owdaBudgetLineId?bl.code:"")}</Link></span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.quantity}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.unit}</span></TableCell>                
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.estimatedUnitPrice).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.estimatedTotalPrice).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.actualUnitPrice).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.actualTotalPrice).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/purchaseRequest/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                  <Button layout="link" size="small" onClick={() => openDelete(row.id)}>
                    <TrashIcon className="h-5 w-5 text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            </Fragment>
          )):""}
        </TableBody>
      </Table>
    </TableContainer>

      </>
    )


   

}




export default PurchaseRequestList