
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


// import NewInvoice from './SingleInvoice'
import { useRef } from 'react'
import useAuth from 'hooks/useAuth'




const LetterRequest = () => {
    const {authState} = useAuth()
    const [users, setUsers] = useState([])
    const [mode,setMode] = useState([])
    const [invoices, setInvoices] = useState([])
    const [slipData,setSlipData] = useState([])
    const [projects,setProject] = useState([])
    const [modeModel,setModeModel] = useState(false)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [formValues,setFormValues] = useState({date:"",notes:"",totalPaid:"",total:0,UserId:"",ProjectId:"",PaymentModeId:""})
    const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})
    const [letterForm,setLetterForm] = useState({to:"",subject:"",message:"",ProjectId:"",UserId:"",createdBy:"",date:""})
    const modeInput = useRef()
    let amountRef = useRef()

    const closeDelete = ()=>{
      setIsDeleteOpen(false)
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
      axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          console.log(resp.data.error);
        }else{
          setProject(resp.data.projects)
        }
      })
      axios.get(`${url}/invoice`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){

          }else{
            setInvoices(resp.data)
          }
      })

      axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
        }else{
          // const filteredClients = resp.data.filter((cl)=>cl.role==="client")
          setUsers(resp.data)
        }
      })
      axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
        const data = resp.data
        setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
      })

      axios.get(`${url}/paymentmode`,{withCredentials:true}).then((resp)=>{
       setMode(resp.data)
      })

      axios.get(`${url}/slip`,{withCredentials:true}).then((resp)=>{
        setSlipData(resp.data.slip)
       })

  
  
  },[])

  // END OF USE EFFECT
  
  
  

  
  
const handleSubmit = async(e)=>{
  e.preventDefault();
  // console.log(formValues);
  const request = {
    ProjectId:letterForm.ProjectId,
    UserId:authState.id,
    to:letterForm.to,
    subject:letterForm.subject,
    message:letterForm.message,
    date:letterForm.date,
    createdBy:authState.username

  }
  console.log(request);
  await axios.post(`${url}/slip`,{withCredentials:true},request).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})
    }else{
      setSlipData((prev)=>[...prev,resp.data])
      setOpenSuccess({open:true,message:"Succesfully Added"})
      closeModal()
    }
  }).catch((error)=>{
    setOpenError({open:true,message:`${error.response.data.error}`})
 
  })
}

const handleDelete = ()=>{

}
  
const captureProject = ()=>{

}
// Invoice Data  


// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  
  
    return (
      <>
  
        <PageTitle>Letter | Requests</PageTitle>
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



{/* Main Model */}
        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Request Letter</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">



        <Label>
            <span>To</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              name="to"
              onChange={(e)=>setLetterForm({...letterForm,to:e.target.value})}
              required
            />
          </Label>

        <Label>
            <span>Date</span>
            <Input
              type="date"
              ref={modeInput}
              className="mt-1"
              name="date"
              onChange={(e)=>setLetterForm({...letterForm,date:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Subject</span>
            <Input
              type="text"
              ref={modeInput}
              className="mt-1"
              name="subject"
              onChange={(e)=>setLetterForm({...letterForm,subject:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
            //   value={letterForm.ProjectId}
              onChange={(e)=>setLetterForm({...letterForm,ProjectId:e.target.value})}
              required
            >
              <option>Select a Project type</option>
              {projects.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>



          <div className='rounded-lg border-gray-300 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-gray'>
          <Label>
            <span className='font-medium'>Notes</span>
            <Textarea
              className="mt-1 block w-full h-40 px-4 py-2 resize-none border-gray-10 outline-none"
              name="notes"
            //   value={letterForm.notes}
              onChange={(e)=>setLetterForm({...letterForm,message:e.target.value})}
              required
            />
          </Label>
          </div>
              
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


{/* End Of Main Modle */}

       <CountsSection/>
  
        <TableContainer>
        {/* Calendar section */}
  
        <Button className="mb-4" onClick={openModal}>New Request</Button>
  
        {/* end of calendar section */}
        </TableContainer>
  
        


        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Generated Date</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Slip Subject</TableCell>
                <TableCell>Written By</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            {slipData?.map((slip, i) => (
            <TableBody key={i}>
              
                <TableRow>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{slip.date}</p>
                        {/* <p className="text-xs text-gray-600 dark:text-gray-400">{slip.date}</p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{slip.to}</p>
                        {/* <p className="text-xs text-gray-600 dark:text-gray-400">{slip.date}</p> */}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{slip.subject.slice(0,5)}</p>
                        {/* <p className='font-semibold'>{slip.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{slip.createdBy}</p>
                        {/* <p className='font-semibold'>{slip.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-semibold">{projects.map((pr)=>pr.id===slip.ProjectId?pr.name:"")}</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={slip.status==='accepted'?"success":"danger"}>{slip.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/requests/${slip.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
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




export default LetterRequest