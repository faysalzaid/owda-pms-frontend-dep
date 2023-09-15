
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





const OwdaActivityDetail = (props) => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [activity,setActivity] = useState({})
    const [unitType,setUnitType] = useState([])
    const [sites,setSites] = useState([])
    const [budgetLines,setBudgetLines] = useState([])
    const [ActivityForm,setActivityForm] = useState({
      unit: "",
      quantity:"",
      unitPrice:"",
      description:"",
      usdUnitRate:"",
      owdaBudgetLineId:"",
      owdaSiteId: "",


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
            await axios.get(`${url}/activity/${id}`,{withCredentials:true}).then((resp)=>{
                setActivity(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
           

            await axios.get(`${url}/budgetLines`,{withCredentials:true}).then((resp)=>{
                setBudgetLines(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/site`,{withCredentials:true}).then((resp)=>{
                setSites(resp.data)
             
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
        console.log(ActivityForm);
        await axios.put(`${url}/activity`,ActivityForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setActivity(resp.data)
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
        setFetchedResult(searchTerm.length<1?activity:searchResult)
      },[activity,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newData = activity?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newData)
      }else{
        setSearchResult(project)
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
    await axios.delete(`${url}/activity/${id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        openError({open:true,message:`${resp.data.error}`})
      }else{
        // const data = activity.filter((dt)=>dt.id!==isDeleteOpen.id)
        // setActivity(data)
        // setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        setOpenSuccess({open:true,message:"Successfully Deleted"})
        setTimeout(() => {
          props.history.goBack()
        }, 2000);

      }
        
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
  
        <PageTitle>Activity | {activity.description}</PageTitle>
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

        <Button style={{background:"red"}} size="small" onClick={openDelete}>Delete Activity</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Activity</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          


          <Label>
            <span>Description</span>
            <Input
            //   type="number"
              className="mt-1"
              name="description"
              onChange={(e)=>setActivityForm({...ActivityForm,description:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Unit</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setActivityForm({...ActivityForm,unit:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Quantity</span>
            <Input
              type="number"
              step="0.01"
              className="mt-1"
              name="quantity"
              onChange={(e)=>setActivityForm({...ActivityForm,quantity:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Unit Price (ETB)</span>
            <Input
              type="number"
              step="0.01"
              className="mt-1"
              name="unitPrice"
              onChange={(e)=>setActivityForm({...ActivityForm,unitPrice:e.target.value})}
              required
            />
          </Label>


         

          <Label>
            <span>USD Unit Rate</span>
            <Input
              type="number"
              step='0.01'
              className="mt-1"
              name="duration"
              onChange={(e)=>setActivityForm({...ActivityForm,usdUnitRate:e.target.value})}
              required
            />
          </Label>
         


          <Label>
            <span>BudgetLine</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setActivityForm({...ActivityForm,owdaBudgetLineId:e.target.value})}
              required
            >
              <option value="" >Select Budget Line</option>
              {budgetLines.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

        

          <Label>
            <span>Site</span>
            <Select
              className="mt-1"
              name="owdaSiteId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setActivityForm({...ActivityForm,owdaSiteId:e.target.value})}
              required
            >
              <option value="" >Select Site</option>
              {sites.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
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
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4">Activity Details | Date: <span className='text-red-700'>{activity.date}</span></h2>
                <div className="mb-4">
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Activity Description</p>
                  <p className="text-sm font-semibold">{activity.description}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Activity Unit</p>
                 <p className="text-sm font-semibold text-red-500">{activity.unit}</p>
                </div>
                <div>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Activity Quantity</p>
                  <p className="text-sm font-semibold text-green-600">{activity.quantity}</p>
                </div>
                <div>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Activity Unit Price</p>
                  <p className="text-sm font-semibold text-purple-600">{parseFloat(activity.unitPrice).toLocaleString({maximumFractionDigits:2})}</p>
                </div>
                <div>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Activity Usd Unit Rate</p>
                  <p className="text-sm font-semibold text-black-600">{activity.usdUnitRate}</p>
                </div>
                <div>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Acitivity Total(ETB)</p>
                  <p className="text-sm font-semibold text-red-600">{parseFloat(activity.totalAmount).toLocaleString({maximumFractionDigits:2})} ETB</p>
                </div>
                <div>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Acitivity Total(USD)</p>
                  <p className="text-sm font-semibold text-blue-600">{parseFloat(activity.usd).toLocaleString({maximumFractionDigits:2})} USD</p>
                </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4">Other Details</h2>
           <div className="mb-4">
             <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Site</p>
             <p className="text-sm font-semibold text-green-500">{sites.map((ac)=>ac.id==activity.owdaSiteId?ac.name:"")}</p>
           </div>
           <div className='mb-4'>
                  <p className="text-sm dark:text-gray-100 font-bold text-gray-600">Budget Line</p>
                  <p className="text-sm font-semibold text-black-600">{budgetLines.map((ac)=>ac.id==activity.owdaBudgetLineId?<Link key={ac.id} to={`/app/budgetLines/${ac.id}`}>{ac.name}</Link>:"")}</p>
            </div>
       
    </div>
    </div>
  </div>
</div>

      </>
    )


   

}




export default OwdaActivityDetail