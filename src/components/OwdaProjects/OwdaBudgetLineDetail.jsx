
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

import { FaEdit } from 'react-icons/fa'




const OwdaBudgetLinesDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [unitType,setUnitType] = useState([])
    const [account,setAccount] = useState([])
    const [budgetLines,setBudgetLines] = useState({})
    const [budgetCorrection,setBudgetCorrection] = useState({amount:""})
    const [budgetLineForm,setBudgetLineForm] = useState({
        name:"", 
        code:"", 
        unitQuantity:"", 
        unitCost:"", 
        duration:"", 
        donorCharge:"", 
        totalAmount:0, 
        owdaProjectId:"", 
        owdaUnitTypeId:"", 
        belowPercentage:"",        

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
            await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
                setProject(resp.data)
                // console.log(resp.data÷);
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/unitType`,{withCredentials:true}).then((resp)=>{
                setUnitType(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
           

            await axios.get(`${url}/budgetLines/${id}`,{withCredentials:true}).then((resp)=>{
           
                setBudgetLines(resp.data)
                setBudgetLineForm({
                    name:resp.data.name, 
                    code:resp.data.code, 
                    unitQuantity:resp.data.unitQuantity, 
                    unitCost:resp.data.unitCost, 
                    duration:resp.data.duration, 
                    donorCharge:resp.data.donorCharge, 
                    totalAmount:resp.data.totalAmount, 
                    owdaProjectId:resp.data.owdaProjectId, 
                    owdaUnitTypeId:resp.data.owdaUnitTypeId, 
                    belowPercentage:resp.data.belowPercentage,
                })

           
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/accounts`,{withCredentials:true}).then((resp)=>{
                setAccount(resp.data)
             
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
        //console.log(budgetLineForm);
        await axios.put(`${url}/budgetLines/${id}`,budgetLineForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setBudgetLines(resp.data)
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
        setFetchedResult(searchTerm.length<1?budgetLines:searchResult)
      },[budgetLines,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newData = budgetLines?.filter((empl)=>{
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


const handleCorrection = async(e)=>{
    e.preventDefault()
}

const [isCorrectionOpen,setIsCorrectionOpen] = useState({open:false,id:""})

const closeCorrection = ()=>{
  setIsCorrectionOpen(false)
}
const openCorrection = (id)=>{
  setIsCorrectionOpen({open:true,id})
}



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/budgetLines/${id}`,{withCredentials:true}).then((resp)=>{
        const data = budgetLines.filter((dt)=>dt.id!==isDeleteOpen.id)
        setBudgetLines(data)
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
  
        <PageTitle>Budget Line | {budgetLines.name}</PageTitle>
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
            {/* BudgetCorrection Modal */}
            <Modal isOpen={isCorrectionOpen.open} onClose={closeCorrection}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <form onSubmit={handleCorrection}>
                <div className="grid grid-cols-1 gap-4">
                    <Label>
                        <span>Amount</span>
                        <Input
                        type="number"
                        step="0.01"
                        className="mt-1"
                        // value={budgetLineForm.name}
                        name="name"
                        onChange={(e)=>setBudgetCorrection({...budgetCorrection,amount:e.target.value})}
                        required
                        />
                    </Label>
                </div>
                <div className="hidden sm:block">
                 <Button className="mt-6 custom-button" type="submit">Submit</Button>
                </div>
            </form>
          </ModalBody>
          <ModalFooter>
            {/* <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={handleDelete}>
              Confirm
            </button> */}
          </ModalFooter>
      </Modal>

            {/* End of Budget Correction Modal */}
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

        <Button onClick={openModal} className="custom-button">Update Budget Line</Button>

  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Budget Line</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          


          <Label>
            <span>Name</span>
            <Input
            //   type="number"
              className="mt-1"
              value={budgetLineForm.name}
              name="name"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,name:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Code</span>
            <Input
            //   type="number"
              className="mt-1"
              value={budgetLineForm.code}
              name="code"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,code:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Donor Charge</span>
            <Input
              type="number"
              className="mt-1"
              value={budgetLineForm.donorCharge}
              name="code"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,donorCharge:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Unit Quantity</span>
            <Input
              type="number"
              className="mt-1"
              value={budgetLineForm.unitQuantity}
              name="unitQuantity"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,unitQuantity:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Unit Cost</span>
            <Input
              type="number"
              className="mt-1"
              value={budgetLineForm.unitCost}
              name="unitCost"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,unitCost:e.target.value})}
              required
            />
          </Label>
         

          <Label>
            <span>Duration</span>
            <Input
              type="number"
              className="mt-1"
              value={budgetLineForm.duration}
              name="duration"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,duration:e.target.value})}
              required
            />
          </Label>
         
          <Label>
            <span>Allowance</span>
            <Input
              type="number"
              className="mt-1"
              value={budgetLineForm.belowPercentage?budgetLineForm.belowPercentage:0}
              name="duration"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,belowPercentage:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Total Amount</span>
            <Input
              type="number"
              className="mt-1"
              step="0.01"
              value={budgetLineForm.totalAmount?budgetLineForm.totalAmount:0}
              name="totalAmount"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,totalAmount:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Unit Type</span>
            <Select
              className="mt-1"
              value={budgetLineForm.owdaUnitTypeId}
              name="owdaUnitTypeId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,owdaUnitTypeId:e.target.value})}
              required
            >
              <option value="" >Select Unity Type</option>
              {unitType.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

        

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              value={budgetLineForm.owdaProjectId}
              name="owdaProjectId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,owdaProjectId:e.target.value})}
              required
            >
              <option value="" >Select Project</option>
              {project.map((cp,i)=>(
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
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Budget Line Details</h2>
                <div className="mb-4">
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Desc</p>
                  <p className="text-sm font-semibold dark:text-gray-300">{budgetLines.name}</p>
                </div>
                <div className="mb-4">
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Code</p>
                 <p className="text-sm font-semibold text-red-700 dark:text-red-400">{budgetLines.code}</p>
                </div>
                <div>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Unit Quantity</p>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">{budgetLines.unitQuantity}</p>
                </div>
                <div>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Unit Cost</p>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">{parseFloat(budgetLines.unitCost).toLocaleString({maximumFractionDigits:2})}</p>
                </div>
                <div>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">T.Budget Balance</p>
                  <p className="text-xl font-semibold text-black-600 dark:text-gray-300">{parseFloat(budgetLines.totalBalance).toLocaleString({maximumFractionDigits:2})}</p>
                </div>
                <div>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Current Total Amount</p>
                  <p className="text-xl font-semibold text-dark-600 dark:text-gray-300">{parseFloat(budgetLines.totalAmount).toLocaleString({maximumFractionDigits:2})}</p>
                </div>
                
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Other Details</h2>
           <div className="mb-4">
             <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Line Project</p>
             <p className="text-sm font-semibold text-green-500">{project.map((ac)=>ac.id==budgetLines.owdaProjectId?ac.name:"")}</p>
           </div>
           <div className='mb-4'>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Duration</p>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">{budgetLines.duration}</p>
            </div>
           <div className="mb-4">
             <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Line Unit Type</p>
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">{unitType.map((bn)=>bn.id==budgetLines.owdaUnitTypeId?bn.name:"")}</p>
           </div>
           <div className='mb-4'>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Budget Donor Charge</p>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">{budgetLines.donorCharge}%</p>
            </div>
              <div className='mb-4'>
                  <p  className="text-sm font-medium text-gray-600 dark:text-gray-300">Burn Rate</p>
                  <p className="text-sm font-semibold text-red-700 dark:text-red-400">{budgetLines.burnRate}%</p>
            </div>
       
 </div>
     


    </div>
  </div>
</div>



<div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans mb-6 overflow-x-auto">
  <div className="w-full">
    <div className="flex">
      <Badge type="warning"> Activities</Badge>
   
    </div>

    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
    <div className="overflow-x-auto">
    <table className="min-w-full divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Description
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Unit
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Unit Price
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Quantity
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Usd Unit Rate
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Total Amount(ETB)
      </th>
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Total Amount(USD)
      </th>
      {/* <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Site
      </th> */}
      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Show
      </th>
    
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
        {budgetLines?.owda_activities?.map((owd)=>
  
    <tr key={owd.id}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <div className="">
          <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">
            {owd.description}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.unit}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.unitPrice}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.quantity}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.usdUnitRate}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{parseFloat(owd.totalAmount).toLocaleString({maximumFractionDigits:2})} ETB</div>
    </td>
  
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{parseFloat(owd.usd).toLocaleString({maximumFractionDigits:2})} USD</div>
    </td>
  
    {/* <td className="px-6 py-4 whitespace-nowrap"> */}
      {/* <div  className="text-sm font-medium text-gray-900 dark:text-gray-300">{s}</div> */}
    {/* </td> */}
    <td className="px-6 py-4 whitespace-nowrap">
      <div  className="text-sm font-medium text-gray-900 dark:text-gray-300"><Link to={`/app/activity/${owd.id}`}><FaEdit className='text-blue-500'/></Link></div>
    </td>
  </tr>

    )}
   
    </tbody>
    
    </table>
    <div className='flex ml-4'>
    <p className=' text-green-600'>Total |ETB <span className='font-semibold ml-1'>{budgetLines.owda_activities?.reduce((acc,curr)=>acc+parseFloat(curr.totalAmount),0).toLocaleString({maximumFractionDigits:2})}</span></p>
    <p className=' text-green-600 ml-6'>Total |USD <span className='font-semibold ml-1'>{budgetLines.owda_activities?.reduce((acc,curr)=>acc+parseFloat(curr.usd),0).toLocaleString({maximumFractionDigits:2})}</span></p>
    </div>
    </div>
    </div>
  </div>
</div>

      </>
    )


   

}




export default OwdaBudgetLinesDetail