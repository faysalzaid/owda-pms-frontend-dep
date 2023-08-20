
import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 

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


import NewInvoice from './SingleInvoice'
import { useRef } from 'react'
import useAuth from 'hooks/useAuth'




const InvoiceList = () => {
    const {authState} = useAuth()
    const [users, setUsers] = useState([])
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [mode,setMode] = useState([])
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
  


  const addMode =async(e)=>{
    e.preventDefault()

    // console.log();
    const request = {
      mode:modeInput.current.value
    }
    await axios.post(`${url}/paymentmode`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setMode([...mode,resp.data])
        closeModeModel()
        setOpenSuccess({open:true,message:"Successfully Added"})
      }
    }).catch((error)=>{
      setOpenError({open:true,message:`${error.response.data.error}`})
    })
    
  }


  function closeModeModel(){
    setModeModel(false)
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

          await axios.get(`${url}/invoice`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
              }else{
                setInvoices(resp.data)
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
      const newPayroll = invoices?.filter((empl)=>{
        return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
      })
      // console.log(newEmployeeList);
      setSearchResult(newPayroll)
    }else{
      setSearchResult(partener)
    }
  }



  useEffect(()=>{
    setFetchedResult(searchTerm.length<1?invoices:searchResult)
  },[invoices,searchTerm])


  
  
const handleSubmit = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  const request = {
    ProjectId:formValues.ProjectId,
    UserId:authState.id,
    date:formValues.date,
    total:formValues.total,
    totalPaid:formValues.totalPaid,
    notes:formValues.notes,
    PaymentModeId:formValues.PaymentModeId
  }
  await axios.post(`${url}/invoice`,request,{withCredentials:true}).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setInvoices([...invoices,resp.data])
      setOpenSuccess({open:true,message:"Succesfully Added"})
      closeModal()
    }
  }).catch((error)=>{
    setOpenError({open:true,message:`${error.response.data.error}`})
 
  })
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
  
const captureProject = ()=>{

}
// Invoice Data  


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  
  
    return (
      <>
  
        <PageTitle>Invoices</PageTitle>
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


      {/* Search section */}
      <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Invoice Values..." required />
        </div>
            
        </div>
        {/* End of search List */}

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

          {/* Payment MOde section */}
      <Modal isOpen={modeModel} onClose={closeModeModel}>
      <ModalHeader>Add Mode</ModalHeader>
      <ModalBody>
      <form onSubmit={addMode}>
        <div className="grid grid-cols-1 gap-4">
          <Label>
            <span>Mode</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              name="totalPaid"
              onChange={(e)=>setFormValues({...formValues,totalPaid:e.target.value})}
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
            <Button layout="outline" onClick={closeModeModel}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModeModel}>
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


        {/* End of Payment Mode Section */}



     <CountsSection/>
  
        <TableContainer>
        {/* Calendar section */}
  
        {/* <Button className="mb-4" onClick={openModal}>New Invoice</Button> */}
  
        {/* end of calendar section */}
        </TableContainer>
  
        


        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Invoice Date</TableCell>
                <TableCell>Amount Paid</TableCell>
                <TableCell>Added By</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Account</TableCell>
                <TableCell>BudgetLine</TableCell>
                <TableCell>ActivityID</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            {fetchedResult?.map((invoice, i) => (
            <TableBody key={i}>
              
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{invoice.date}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{invoice.date}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{parseFloat(invoice.amount).toLocaleString()}</p>
                        {/* <p className='font-semibold'>{invoice.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{invoice.addedBy.toLocaleString()}</p>
                        {/* <p className='font-semibold'>{invoice.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{invoice.createdFor}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{invoice?.owda_project?.name}</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={invoice.status==='Paid'?"success":"danger"}>{invoice?.owda_account?.name}</Badge>
                </TableCell>

                <TableCell>
                    <span className="text-sm font-semibold">{invoice?.owda_budget_line?.name}</span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Code:{invoice?.owda_budget_line?.code}</p>
                  </TableCell>

                  <TableCell>
                  <span className='text-sm font-semibold'>{invoice?.owda_activity?.id}</span>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/invoice/${invoice.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" onClick={()=>openDelete(invoice.id)}/>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
          
            </TableBody>
                ))}
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




export default InvoiceList