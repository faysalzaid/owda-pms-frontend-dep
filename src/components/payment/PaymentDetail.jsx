
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
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaPrint,FaTrash } from 'react-icons/fa'
import { areDayPropsEqual } from '@mui/x-date-pickers/PickersDay/PickersDay'
import { useRef } from 'react'




const PaymentDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [paymentData, setPaymentData] = useState({})
    const [projects,setProject] = useState([])
    const [invoiceData,setInvoiceData] = useState([])
    const [paymentMode,setPaymentMode] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
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
        async function getDatas(){

            let newId;
            await axios.get(`${url}/payment/${id}`).then((resp)=>{
              if(resp.data.error){
                setOpenError({open:true,message:true})
              }else{
                setPaymentData(resp.data)
                newId = resp.data.invoiceId
              }
            })
            await axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                console.log(resp.data.error);
              }
            setProject(resp.data.projects)
        
            })
      
            await axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
      
              }else{
                const filteredClients = resp.data.filter((cl)=>cl.role==="client")
                setUsers(filteredClients)
              }
            })
    
            await axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error){
        
                }else{
                //   const filteredClients = resp.data.filter((cl)=>cl.role==="client")
                  setPaymentMode(resp.data)
                }
              })
              await axios.get(`${url}/invoice/`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error){
        
                }else{
                  const filteredInvoice = resp.data.filter((inv)=>inv.id===paymentData?.InvoiceId)
                  
                  setInvoiceData(filteredInvoice[0])
                 
                }
              })
      
    
      
            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
              const data = resp.data
              setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
            })

        }

        getDatas()
       
    
    
    },[])

      

    const printSectionRef = useRef(null);

    const printSection = () => {
      const printContents = printSectionRef.current.innerHTML;
    //   console.log(printContents);
      const originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      window.print();

    };
    

      






  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = ()=>{
    setIsDeleteOpen({open:true})
}



  // Delete row
  const handleDelete = async()=>{
    const request ={
        InvoiceId:paymentData.InvoiceId
    }
    await axios.delete(`${url}/payment/${id}`,{withCredentials:true},request).then((resp)=>{
        console.log(resp.data);
        if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
        }else{
            closeDelete()
            setOpenSuccess({open:true,message:"Successfully Deleted"})
            setTimeout(() => {
                props.history.goBack()
            }, 2000);
        }
    
    }).catch((error)=>{
        setOpenError({open:true,message:`${error.message}`})
    })
    
    }




// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
    return (
      <>
  
        <PageTitle>Payment Receipt</PageTitle>
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

  
        {/* <CTA /> */}
        
        {/* <!-- Cards --> */}
        <div  className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <InfoCard title="Total Projects " value={countsData.projectCount}>
            <RoundIcon
              icon={PeopleIcon}
              iconColorclassName="text-orange-500 dark:text-orange-100"
              bgColorclassName="bg-orange-100 dark:bg-orange-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Bids Registered" value={countsData.bidCount}>
            <RoundIcon
              icon={MoneyIcon}
              iconColorclassName="text-green-500 dark:text-green-100"
              bgColorclassName="bg-green-100 dark:bg-green-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Active Projects" value={countsData.activeProjects}>
            <RoundIcon
              icon={CartIcon}
              iconColorclassName="text-blue-500 dark:text-blue-100"
              bgColorclassName="bg-blue-100 dark:bg-blue-500"
              className="mr-4"
            />
          </InfoCard>
  
          <InfoCard title="Completed Projects" value={countsData.completedProjects}>
            <RoundIcon
              icon={ChatIcon}
              iconColorclassName="text-teal-500 dark:text-teal-100"
              bgColorclassName="bg-teal-100 dark:bg-teal-500"
              className="mr-4"
            />
          </InfoCard>
        </div>
  



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

        <Button><FaPrint onClick={printSection}/></Button>
        <Button onClick={openDelete} className="ml-2" style={{background:'red'}}><FaTrash/></Button>
  
      
        </TableContainer>

       

<div ref={printSectionRef} className="max-w-6xl  py-8">


<div className="border-b-2 border-gray-300 pb-4">
  <h2 className="text-2xl font-bold mb-2">Payment Receipt</h2>
  <p className="text-gray-500 mb-1">VAT Number: 123456789</p>
</div>


<div className="border-b-2 border-gray-300 py-4">
  <h3 className="text-xl font-bold mb-2">Payment Details</h3>
  <div className="flex justify-between items-center mb-4">
    <p className="text-gray-500">Payment Date:</p>
    <p className="font-bold">{paymentData?.date}</p>
  </div>
  <div className="flex justify-between items-center mb-4">
    <p className="text-gray-500">Payment Mode:</p>
    <p className="font-bold"></p>
    
  </div>
  <div className="bg-green-500 text-white text-center py-4 px-6 rounded-lg">
    <p className="text-2xl font-bold">Total Amount Received</p>
    <p className="text-4xl font-bold">ETB {paymentData?.amountReceived?.toLocaleString()}</p>
  </div>
</div>


<div className="py-4">
  <h3 className="text-xl font-bold mb-2">Project Details</h3>
  <div className="flex justify-between items-center mb-4">
    <p className="text-gray-500">Project Name:</p>
    <p className="font-bold">Example Project</p>
  </div>
  <div className="flex justify-between items-center">
    <p className="text-gray-500">Client Name:</p>
    <p className="font-bold">John Doe</p>
  </div>
</div>

</div>

      </>
    )


   

}




export default PaymentDetail