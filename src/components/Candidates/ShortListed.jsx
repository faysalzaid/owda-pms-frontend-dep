
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





const ShortListedCandidates = () => {
    const {authState,settings} = useContext(AuthContext)
    const [LeaveData,setLeaveData] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [payrollData,setPayrollData] = useState([])
    const [employeeData,setEmployeeData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [payrolForm,setPayrolForm] = useState({date:"",EmployeeId:"",DepartmentId:"",basicSalary:"",staffAdvance:"",position:""})
    const [candidateData,setCandidateData] = useState([])
    const [candidateForm,setCandidateForm] = useState({date:"",name:"",
        qualification:"",
        yearsOfExperience:"",
        organizationWorkedBefore:"",
        address:"",
        location:"",
        vacancy:"",
        status:""

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
            await axios.get(`${url}/candidates`,{withCredentials:true}).then((resp)=>{
                const data = resp.data.filter((d)=>d.status=='shortlisted')
                setCandidateData(data)
             
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
       

        await axios.post(`${url}/candidates`,candidateForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setCandidateData((prev)=>[...prev,resp.data])
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

      







  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/candidates/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = candidateData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setCandidateData(data)
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



  
    return (
      <>
  
        <PageTitle>ShortListed Candidates</PageTitle>
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

        {/* <Button onClick={openModal}>New Candidate</Button> */}
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Candidate</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          
          <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              onChange={(e)=>setCandidateForm({...candidateForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Full Name</span>
            <Input
            //   type="number"
              className="mt-1"
              name="name"
              onChange={(e)=>setCandidateForm({...candidateForm,name:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>status</span>
            <Select
              className="mt-1"
              name="status"
              // value={formValues.ProjectId}
              onChange={(e)=>setCandidateForm({...candidateForm,status:e.target.value})}
              required
            >
              <option value="" >Status</option>
          
                <option>pending</option>
                <option>shortlisted</option>
                <option>selected</option>
                <option>rejected</option>
              
            </Select>
          </Label>


          <Label>
            <span>Qualification</span>
            <Input
            // type="number"
              className="mt-1"
              name="qualification"
              onChange={(e)=>setCandidateForm({...candidateForm,qualification:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Years Of Experience</span>
            <Input
            type="number"
              className="mt-1"
              name="yearsOfExperience"
              onChange={(e)=>setCandidateForm({...candidateForm,yearsOfExperience:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Organization Worked Before</span>
            <Input
            // type="number"
              className="mt-1"
              name="organizationWorkedBefore"
              onChange={(e)=>setCandidateForm({...candidateForm,organizationWorkedBefore:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Adress</span>
            <Input
            // type="number"
              className="mt-1"
              name="address"
              onChange={(e)=>setCandidateForm({...candidateForm,address:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Location</span>
            <Input
            // type="number"
              className="mt-1"
              name="location"
              onChange={(e)=>setCandidateForm({...candidateForm,location:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Vacancy</span>
            <Input
            // type="number"
              className="mt-1"
              name="vacancy"
              onChange={(e)=>setCandidateForm({...candidateForm,vacancy:e.target.value})}
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
            <TableCell className="font-semibold">Full Name</TableCell>
            <TableCell className="font-semibold">Qualification</TableCell>
            <TableCell className="font-semibold">Experience(Years)</TableCell>
            <TableCell className="font-semibold">Worked Before</TableCell>
            <TableCell className="font-semibold">Address</TableCell>
            <TableCell className="font-semibold">Location</TableCell>
            <TableCell className="font-semibold">Vacancy</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidateData?candidateData.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.qualification}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.yearsOfExperience}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.organizationWorkedBefore}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.address}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.location}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.vacancy}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.status}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/candidates/${row.id}`}>
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




export default ShortListedCandidates