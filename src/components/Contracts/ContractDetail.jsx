/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 
// import {ContractDetailCard} from './Card'
import { DocumentAddIcon } from '@heroicons/react/outline';
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
import { FaPrint,FiPrinter } from 'react-icons/fa';
import { RiUpload2Line,RiDeleteBin6Line,RiDeleteBin3Fill } from 'react-icons/ri';
import { FaCloudUploadAlt, FaFilePowerpoint, FaFileWord } from "react-icons/fa";

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'


import { FaRegFilePdf, FaRegFileWord, FaFileExcel, FaRegFilePowerpoint, FaRegImage, FaFileAlt } from 'react-icons/fa';

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
import { Modal, ModalHeader, ModalBody, ModalFooter,Card, CardBody,CardHeader  } from '@windmill/react-ui'
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





const ContractDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const hiddenFileInput = React.useRef(null);
    const [contracts, setContracts] = useState({ 
      UserId: "",
      ProjectId:"",
      subject: "",
      contractValue: "",
      ContractTypeId: "",
      startDate: "",
      endDate: "",
      status:"",
      createdAt:""
  })
    const [contracTypes, setContractTypes] = useState([]);
    const [users, setUsers] = useState([])
    const [projects,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [fileUpload, setFileUpload] = useState({attach:"",ContractId:""});
    const [filesList,setFilesList] = useState([])
    const [formValues, setFormValues] = useState({
      UserId: "",
      ProjectId: "",
      subject: "",
      contractValue: "",
      ContractTypeId: "",
      startDate: "",
      endDate: ""
    });
    const {id} = useParams()

  


    useEffect(()=>{

      axios.get(`${url}/contract/${id}`).then((resp)=>{
          if(resp.data.error){

            setOpenError({open:true,message:`${resp.data.error}`})
            
          }else{
            // console.log(resp.data);
            setContracts({ 
              UserId: resp.data.UserId,
              ProjectId:resp.data.ProjectId,
              subject: resp.data.subject,
              contractValue: resp.data.contractValue,
              ContractTypeId: resp.data.ContractTypeId,
              startDate: resp.data.startDate,
              endDate: resp.data.endDate,
              status:resp.data.status,
              createdAt:resp.data.createdAt
          })
            setFormValues({
              UserId: resp.data.userId,
              ProjectId: resp.data.ProjectId,
              subject: resp.data.subject,
              contractValue: resp.data.contractValue,
              ContractTypeId: resp.data.ContractTypeId,
              startDate: resp.data.startDate,
              endDate: resp.data.endDate
            })
          }
      })


      axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`$${resp.data.error}`})
        }
      setProject(resp.data.projects)
  
      })


      axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`$${resp.data.error}`})
        }else{
          
          const filteredClients = resp.data.filter((cl)=>cl.role==="client")
          setUsers(filteredClients)
        }
      })


      axios.get(`${url}/contracttype`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`$${resp.data.error}`})
        }else{
          setContractTypes(resp.data)
        }
      })



      axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
        const data = resp.data
        setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
      })
  


      axios.get(`${url}/attachment`).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`$${resp.data.error}`})
        }else{
          // console.log(resp.data);
          const data = resp.data.filter((res)=>res.ContractId===id)
          console.log(data);
          setFilesList(data)
        }
      })
  
  },[])
  






    const handleSubmit = async(e) => {
      e.preventDefault();
      console.log(formValues);
      // await axios.put(`${url}/contract/${id}`,formValues,{withCredentials:true}).then((resp)=>{
      //   if(resp.data.error){
      //     setOpenError({open:true,message:`$${resp.data.error}`})
      //   }else{
          
      //     setContracts({ 
      //       UserId: resp.data.UserId,
      //       ProjectId:resp.data.ProjectId,
      //       subject: resp.data.subject,
      //       contractValue: resp.data.contractValue,
      //       ContractTypeId: resp.data.ContractTypeId,
      //       startDate: resp.data.startDate,
      //       endDate: resp.data.endDate,
      //       status:resp.data.status,
      //       createdAt:resp.data.createdAt
      //   })
      //     setFormValues({
      //       UserId: resp.data.userId,
      //       ProjectId: resp.data.ProjectId,
      //       subject: resp.data.subject,
      //       contractValue: resp.data.contractValue,
      //       ContractTypeId: resp.data.ContractTypeId,
      //       startDate: resp.data.startDate,
      //       endDate: resp.data.endDate
      //     })
      //     setOpenSuccess({open:true,message:"Successfully Updated"})
      //     closeModal();
      //   }

      // })
      // handle form submission here
      // e.g. make an API call to save the form data
     
    };



    const handleFileSubmit =async(e)=>{
      e.preventDefault()
      try {
        const formdata = new FormData()
        formdata.append('attach',fileUpload.attach)
        formdata.append('ContractId',id)
        console.log(formdata);
        const request = {
          file:fileUpload.attach,
          ContractId:id
        }
        await axios.post(`${url}/attachment`,formdata,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            setFilesList([...filesList,resp.data])
            setOpenSuccess({open:true,message:"Successfully Uploaded"})
          }
        })   
      } catch (error) {
        setOpenError({open:true,message:`${error}`})
      }
     
    }

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
    const closeModal = ()=>{
        setIsOpen(false)
    }
    const openModal = ()=>{
        setIsOpen(true)
    }


    const [isDeleteOpen,setIsDeleteOpen] = useState(false)

    const closeDelete = ()=>{
      setIsDeleteOpen(false)
  }
    const openDelete = ()=>{
      setIsDeleteOpen(true)
  }

    

      

  
    // console.log('data from app',authState);
    




    const companyLogoUrl="https://cdn.logojoy.com/wp-content/uploads/2018/05/01104813/1268-768x591.png"


  
// Invoice Data  



  const handleEdit = (index) => {
    // Implement your own edit logic here
    console.log(`Edit row ${index}`);
  };

  // Delete row
  const handleFileDelete = (dfile) => {
    // Implement your own delete logic here
    axios.delete(`${url}/attachment/${dfile.id}`).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        const data = filesList.filter((fl)=>fl.id!==dfile.id)
        setFilesList(data)
        setOpenSuccess({open:true,message:"Successfully deleted"})
      }
    })
  };


  const handleDelete = ()=>{
    axios.delete(`${url}/contract/${id}`).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        setTimeout(() => {
          props.history.push('/app/contract')
          closeDelete()
        }, 1000);
      }
    })


  }

// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data
  

  
    return (
      <>
  
      <PageTitle></PageTitle>


        <PageTitle>Contract-Detail</PageTitle>
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
       <CountsSection/>
  
        <TableContainer>
   
        <div className='mb-6 ml-4 flex'>
        <Button className=' ml-4' onClick={openModal}>Update Contract</Button>
        <Button onClick={openDelete} style={{backgroundColor:'red'}} className="ml-4 text-lg text-white-600 hover:text-red-800">
       <RiDeleteBin6Line />
        </Button>
        </div>
     
        </TableContainer>

        {/* Delete Confirm section */}
        <Modal isOpen={isDeleteOpen} onClose={closeDelete}>
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

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Contract</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>Customer</span>
            <Select
              className="mt-1"
              name="contractType"
              value={formValues.UserId}
              onChange={(e)=>setFormValues({...formValues,UserId:e.target.value})}
              required
            >
              <option value="" disabled>Select a Customer type</option>
              {users.map((usr,i)=>(
                <option key={i} value={usr.id}>{usr.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
              value={formValues.ProjectId}
              onChange={(e)=>setFormValues({...formValues,ProjectId:e.target.value})}
              required
            >
              <option value="" disabled>Select a Project type</option>
              {projects.map((pr,i)=>(
                <option key={i} value={pr.id}>{pr.name}</option>
              ))}
              
              
            </Select>
          </Label>

          <Label>
            <span>Subject</span>
            <Input
              className="mt-1"
              name="subject"
              value={formValues.subject}
              onChange={(e)=>setFormValues({...formValues,subject:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Contract Value</span>
            <Input
              className="mt-1"
              name="contractValue"
              value={formValues.contractValue}
              onChange={(e)=>setFormValues({...formValues,contractValue:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Contract Type</span>
            <Select
              className="mt-1"
              name="ContractTypeId"
              value={formValues.ContractTypeId}
              onChange={(e)=>setFormValues({...formValues,ContractTypeId:e.target.value})}
              required
            >
              <option value="" disabled>Select a Contract type</option>
              {contracTypes.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.type}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Start Date</span>
            <Input
              type="date"
              className="mt-1"
              name="startDate"
              value={formValues.startDate}
              onChange={(e)=>setFormValues({...formValues,startDate:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>End Date</span>
            <Input
              type="date"
              className="mt-1"
              name="endDate"
              value={formValues.endDate}
              onChange={(e)=>setFormValues({...formValues,endDate:e.target.value})}
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

  

  {/* Contract INformation */}
  <div className="bg-gray-50  flex flex-col justify-center py-12 sm:px-9 lg:px-8">
  <div className="w-full">
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img src="https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png" alt="Company Logo" className="h-8 w-8 mr-2" />
            <h2 className="text-lg font-medium text-gray-900">{contracts.subject}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-gray-500">Contract #1234</p>
            <p className="text-sm font-medium text-gray-500">Signed: {contracts.startDate}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">Customer Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">Name:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{users.map((usr)=>usr.id===contracts.UserId?usr.name:'')}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Email:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{users.map((usr)=>usr.id===contracts.UserId?usr.email:'')}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">Project Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">Project:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{projects.map((pr)=>pr.id===contracts.ProjectId?pr.name:'')}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Contract Value:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">ETB {contracts.contractValue.toLocaleString()}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Start Date:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{contracts.startDate}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">End Date:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{contracts.endDate}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">Contract Status</h3>
          <div className="mt-2">
            
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Status:</p>
              <p className="ml-2 text-sm font-medium text-gray-900"><span className='text-teal-500 dark:text-teal-100'>{contracts.status}</span></p>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              </div>
              


    {/* Contract information Section */}


    

    
    

{/* Files LIst section */}
          <div className="ml-6 mr-6 flex flex-col gap-4 mt-4">
          {filesList.map((file, index) => (
          
            <div key={index} className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><Link to={`${file.attach}`} target='_blank'>{file.name.slice(0,5)}</Link></div>
              <button onClick={() => handleFileDelete(file)} className="text-red-500 hover:text-red-600">
                <RiDeleteBin6Line />
              </button>
            </div>
          
          ))}
        </div>

  {/* End Files List */}
      {/* Form upload section */}
      
      <form onSubmit={handleFileSubmit} className="flex flex-col items-center mt-2">
              <label htmlFor="file" className="w-full max-w-xs p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload Doc</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setFileUpload({attach:e.target.files[0]})}
              />
              {fileUpload.file && (
                <div className="w-full max-w-xs p-2 mt-4 rounded-lg shadow-lg bg-white text-center">
                  <p className="text-gray-600">{fileUpload.attach.name}</p>
                </div>
              )}
              <Button
                type="submit"
                className="mt-4 mb-6 px-6 py-2 rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 transition duration-300"
                disabled={!fileUpload.attach}
              >
                Submit
              </Button>
    </form>

    {/* End of upload section  */}








      </>
    )


   

}




export default ContractDetail