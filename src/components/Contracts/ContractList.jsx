
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";





const ContractList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [contracTypes, setContractTypes] = useState([]);
    const [users, setUsers] = useState([])
    const [data, setData] = useState([])
    const [projects,setProject] = useState([])
    const [contracts,setContracts] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  


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
    const [formValues, setFormValues] = useState({
        UserId: "",
        ProjectId: "",
        subject: "",
        contractValue: "",
        ContractTypeId: "",
        startDate: "",
        endDate: ""
      });



      useEffect(()=>{

        axios.get(`${url}/contract`).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:true})
          }else{
            setContracts(resp.data)
          }
        })
        axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }
        setProject(resp.data.projects)
    
        })
  
        axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
  
          }else{
            const filteredClients = resp.data.filter((cl)=>cl.role==="client")
            setUsers(filteredClients)
          }
        })
  
  
        axios.get(`${url}/contracttype`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
  
          }else{
            setContractTypes(resp.data)
          }
        })
  
        axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
          const data = resp.data
          setCountsData({ projectCount:data.projectsCount,bidCount:data.countBids,activeProjects:data.activeProjectsCount,completedProjects:data.completedProjects})
        })
    
    
    },[])

      
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        axios.post(`${url}/contract`,formValues,{withCredentials:true}).then((resp)=>{
          console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`$${resp.data.error}`})
          }else{
            setContracts([...contracts,resp.data])
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeModal();
          }

        })
        // handle form submission here
        // e.g. make an API call to save the form data
       
      };

      

  
    // console.log('data from app',authState);

  
  



  // useEffect(()=>{

  // },[])
    // pagination setup

  
    // pagination change control

  
// Invoice Data  




  const handleEdit = (index) => {
    // Implement your own edit logic here
    console.log(`Edit row ${index}`);
  };

  const handleFile = (e) => {
    // if (e.target.files.length) {
    //   setPreview(URL.createObjectURL(e.target.files[0]));
    // }
  }



  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}



  // Delete row
  const handleDelete = ()=>{
    axios.delete(`${url}/contract/${isDeleteOpen.id}`).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        const data = contracts.filter((dt)=>dt.id!==isDeleteOpen.id)
        setContracts(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        
       
      }
    })}




// End of invoice data
  
    // on page change, load new sliced data
    // here you would make another server request for new data

  
    return (
      <>
  
        <PageTitle>Contracts</PageTitle>
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

        <Button onClick={openModal}>New Contract</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Add Contract</ModalHeader>
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


  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Customer</TableCell>
            <TableCell className="font-semibold">Project</TableCell>
            <TableCell className="font-semibold">Subject</TableCell>
            <TableCell className="font-semibold">Contract Type</TableCell>
            <TableCell className="font-semibold">Start Date</TableCell>
            <TableCell className="font-semibold">End Date</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {contracts?contracts.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell><span className="text-sm font-semibold">{users.map((usr)=>usr.id===row.UserId?usr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{projects.map((pr)=>pr.id===row.ProjectId?pr.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.subject}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{contracTypes.map((ctr)=>ctr.id===row.ContractTypeId?ctr.type:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.startDate}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.endDate}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/contract/${row.id}`}>
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




export default ContractList