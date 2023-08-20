
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
import "config/custom-button.css"
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

import { AiFillDelete } from 'react-icons/ai'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { FaEdit } from 'react-icons/fa'




const OwdaBudgetLinesList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [unitType,setUnitType] = useState([])
    const [budgetCategory,setBudgetCategory] = useState([])
    const [account,setAccount] = useState([])
    const [budgetLines,setBudgetLines] = useState([])
    const [budgetLineForm,setBudgetLineForm] = useState({
        name:"", 
        code:"", 
        unitQuantity:"", 
        unitCost:"", 
        duration:"", 
        donorCharge:"", 
        totalAmount:"", 
        owdaProjectId:"", 
        owdaUnitTypeId:"", 
        owdaBudgetLineCategoryId:""

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


    const [isExpanded, setIsExpanded] = useState({open:false,id:""});
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

            await axios.get(`${url}/budgetCategory`,{withCredentials:true}).then((resp)=>{
              setBudgetCategory(resp.data)
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })
          
           

            await axios.get(`${url}/budgetLines`,{withCredentials:true}).then((resp)=>{
                setBudgetLines(resp.data)
                // console.log(resp.data);
              
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
        // console.log(budgetLineForm);
        await axios.post(`${url}/budgetLines`,budgetLineForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setBudgetLines((prev)=>[...prev,resp.data])
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



  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/budgetLines/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        const data = budgetLines.filter((dt)=>dt.id!==isDeleteOpen.id)
        setBudgetLines(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        closeDelete()
        
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
  
        <PageTitle>Budget Lines</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search project..." required />
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

        <Button onClick={openModal} className="custom-button">Fill The Budget</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Budget Line</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          


          <Label>
            <span>Desc</span>
            <Input
            //   type="number"
              className="mt-1"
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
              name="code"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,code:e.target.value})}
              required
            />
          </Label>



          <Label>
            <span>Category</span>
            <Select
              className="mt-1"
              name="owdaUnitTypeId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,owdaBudgetLineCategoryId:e.target.value})}
              required
            >
              <option value="" >Select Category</option>
              {budgetCategory.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          <Label>
            <span>Donor Percentage Contr</span>
            <Input
              type="number"
              step="0.01"
              className="mt-1"
              name="code"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,donorCharge:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Unit Quantity</span>
            <Input
              type="number"
              step="0.01"
              className="mt-1"
              name="unitQuantity"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,unitQuantity:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Unit Cost</span>
            <Input
              type="number"
              step="0.01"
              className="mt-1"
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
              name="duration"
              onChange={(e)=>setBudgetLineForm({...budgetLineForm,duration:e.target.value})}
              required
            />
          </Label>
         


          <Label>
            <span>Unit Type</span>
            <Select
              className="mt-1"
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


  
        

{/* 
        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Name</TableCell>
            <TableCell className="font-semibold">Code</TableCell>
            <TableCell className="font-semibold">U.Quantity</TableCell>
            <TableCell className="font-semibold">U.Cost</TableCell>
            <TableCell className="font-semibold">Duration</TableCell>
            <TableCell className="font-semibold">U.Type</TableCell>
            <TableCell className="font-semibold">Donor Charge</TableCell>
            <TableCell className="font-semibold">T.Amount</TableCell>
            <TableCell className="font-semibold">Project</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedResult?fetchedResult.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                
                <TableCell><span className="text-sm font-semibold">{row.name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.code}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.unitQuantity}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.unitCost}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.duration}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{unitType.map((dn)=>dn.id==row.owdaUnitTypeId?dn.name:"")}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.donorCharge}</span>%</TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.totalAmount).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{project.map((dn)=>dn.id==row.owdaProjectId?dn.name:"")}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/budgetLines/${row.id}`}>
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
    </TableContainer> */}





          <TableContainer className="bg-white rounded-lg shadow-lg">
            <Table>
              <TableHeader >
                <TableRow>
                   <TableCell className="font-semibold">Desc</TableCell>
                    <TableCell className="font-semibold">Code</TableCell>
                    <TableCell className="font-semibold">U.Quantity</TableCell>
                    <TableCell className="font-semibold">U.Cost</TableCell>
                    <TableCell className="font-semibold">Duration</TableCell>
                    <TableCell className="font-semibold">U.Type</TableCell>
                    <TableCell className="font-semibold">Burn Rate</TableCell>
                    <TableCell className="font-semibold">C. Budget</TableCell>
                    <TableCell className="font-semibold">T.Budget</TableCell>
                    <TableCell className="font-semibold">Project</TableCell>
                    <TableCell className="font-semibold">
                    Expand
                  </TableCell>
                    <TableCell className="font-semibold text-center">Actions</TableCell>
                </TableRow>
              </TableHeader>
              {fetchedResult?.map((row, rowIndex) => (
              <TableBody key={rowIndex}>
               
                  <>
                    <TableRow >
                         <TableCell><span className="text-sm font-semibold">{row.name}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{row.code}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{row.unitQuantity}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{parseFloat(row.unitCost).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{row.duration}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{unitType.map((dn)=>dn.id==row.owdaUnitTypeId?dn.name:"")}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{parseFloat(row.burnRate).toLocaleString({maximumFractionDigits:2})}</span>%</TableCell>
                            <TableCell><span className="text-sm font-semibold">{parseFloat(row.totalAmount).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{parseFloat(row.totalBalance).toLocaleString({maximumFractionDigits:2})}</span></TableCell>
                            <TableCell><span className="text-sm font-semibold">{project.map((dn)=>dn.id==row.owdaProjectId?dn.name:"")}</span></TableCell>
                            <TableCell className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <button
                                  className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                                  onClick={() => setIsExpanded({open:!(isExpanded.open),id:row.id})}
                                >
                                  {isExpanded.open && isExpanded.id==row.id ? <FiChevronUp /> : <FiChevronDown />}
                                </button>
                              </TableCell>
                            <TableCell className="flex justify-center space-x-2">
                              <Link to={`/app/budgetLines/${row.id}`}>
                              <Button layout="link" size="small">
                                <EditIcon className="h-5 w-5 text-blue-600" />
                              </Button>
                              </Link>
                              <Button layout="link" size="small" onClick={() => openDelete(row.id)}>
                                <TrashIcon className="h-5 w-5 text-red-600" />
                              </Button>
                            </TableCell>
                    </TableRow>
                     {isExpanded.open&&isExpanded.id==row.id&&( 
                   <TableRow>
                   <TableCell colSpan="11" className="px-6 py-4 whitespace-nowrap">
                     <div className="overflow-x-auto">
                       <Table className="min-w-full divide-y divide-gray-200">
                         <TableHeader>
                           <TableRow>
                             <TableCell>
                               Descr
                             </TableCell>
                             <TableCell>
                               Duration
                             </TableCell>
                             <TableCell>
                               Quantity
                             </TableCell>
                             <TableCell>
                                UnitPrice
                             </TableCell>
                              <TableCell>
                                UsdRate
                             </TableCell>
                              <TableCell>
                                T.Amount(ETB)
                             </TableCell>
                              <TableCell>
                                T.Amount(USD)
                             </TableCell>
                             <TableCell>
                               Delete
                             </TableCell>
                            
                           </TableRow>
                         </TableHeader>
                         <TableBody>
                           {row.owda_activities?.map((detail, index) => (
                             <TableRow key={index}> 
                               <TableCell>{detail.description}</TableCell>
                               <TableCell>{detail.unit}</TableCell>
                               <TableCell>{detail.quantity}</TableCell>
                               <TableCell>{parseFloat(detail.unitPrice)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                               <TableCell>{parseFloat(detail.usdUnitRate)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                               <TableCell>{parseFloat(detail.totalAmount)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                               <TableCell>{parseFloat(detail.usd)?.toLocaleString({maximumFractionDigits:2})}</TableCell>
                               <TableCell style={{color:'red'}} className="mr-6 px-6"><Link key={detail.id} to={`/app/activity/${detail.id}`}><FaEdit/></Link></TableCell>
                              
                             </TableRow>
                             ))}
                         </TableBody>
                         
                       </Table>
                       <p className='ml-4 text-green-600'>Total |  ETB <span className='font-semibold'>{row.owda_activities?.reduce((acc,curr)=>acc+parseFloat(curr.totalAmount),0).toLocaleString({maximumFractionDigits:2})}</span></p>

                     </div>
                   </TableCell>
                 </TableRow>

                )}
                 
                 </>
              
       </TableBody> 
       ))} 
                 </Table>
                 </TableContainer>
            


      </>
    )


   

}




export default OwdaBudgetLinesList