
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
import { Link, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";





const OwdaActivityList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [activity,setActivity] = useState([])
    const [donor,setDonor] = useState([])
    const [sites,setSites] = useState([])
    const [budgetLines,setBudgetLines] = useState([])
    const [loopedBudget,setLoopedBudget] = useState([])
    const [clickables,setClickables] = useState({donorId:"",ProjectId:""})
    const [ActivityForm,setActivityForm] = useState({
      unit: "",
      quantity:"",
      unitPrice:"",
      description:"",
      usdUnitRate:"",
      owdaBudgetLineId:"",
      owdaSiteId: "",
      // payroll data 
      date:"",
      amount:"",
      owdaDonorId:clickables.donorId,
      checkNumber:"",
      paymentVoucher:"",

      // end of payroll data



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




    // Open onetimemodal
      const [isOneTimeOpen,setIsOneTimeOpen] =useState(false)
      function closeOneTime(){
        setIsOneTimeOpen(false)
    }
    function openOneTime(){
        setIsOneTimeOpen(true)
    }

    // end of endtimemodal



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
            await axios.get(`${url}/activity`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                setActivity(resp.data)
                console.log(resp.data);

            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
           

            await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
                setDonor(resp.data)
                // console.log(resp.data);
              
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



            await axios.get(`${url}/budgetLines`,{withCredentials:true}).then((resp)=>{
              setLoopedBudget(resp.data)
           
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
        // console.log(ActivityForm);
        const request ={
          ...ActivityForm,
          user:authState
        }
        await axios.post(`${url}/activity`,request,{withCredentials:true}).then((resp)=>{
          console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            console.log(resp.data);
            setActivity((prev)=>[...prev,resp.data])
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



            
    
      const handleOneTimePayroll = async(e) => {
        e.preventDefault();
        // console.log(ActivityForm);
        await axios.post(`${url}/activity/payroll`,ActivityForm,{withCredentials:true}).then((resp)=>{
          console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            console.log(resp.data);
            setActivity((prev)=>[...prev,resp.data])
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
        setSearchResult(activity) 
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
    await axios.delete(`${url}/activity/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
      // console.log(resp.data);
      if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        const data = activity.filter((dt)=>dt.id!==isDeleteOpen.id)
        setActivity(data)
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
      const data = donor?.filter((dn)=>dn.id===parseInt(clickables.donorId))
      // console.log(data[0]?.owda_projects);
      // console.log(donor);
      if(data){
        setProject(data[0]?.owda_projects)
      }
  },[clickables?.donorId])

  useEffect(()=>{
    let data=[];
    data = project?.filter((dn)=>dn.id===parseInt(clickables.ProjectId))
    // console.log(data[0]?.owda_budget_lines); 
    // console.log('projectId from 2nd useeffect',clickables.ProjectId);
    if(data){
      setBudgetLines(data[0]?.owda_budget_lines)  
    }
},[clickables?.ProjectId])



  
    return (
      <>
  
        <PageTitle>Activities</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Activity..." required />
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
        <div className='flex mb-2'>

        <Button onClick={openModal} className="custom-button">New Activity</Button>
        </div>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Activity</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          

        <Label>
            <span>Donors</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,donorId:e.target.value})}
              required
            >
              <option value="" >Select Donor</option>
              {donor?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,ProjectId:e.target.value})}
              required
            >
              <option value="" >Select Project</option>
              {project?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          <Label>
            <span>Budgets</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setActivityForm({...clickables,owdaBudgetLineId:e.target.value})}
              required
            >
              <option value="" >Select Budget</option>
              {budgetLines?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          <Label>
            <span>Description</span>
            <Textarea
            //   type="number"
              className="mt-1"
              name="description"
              onChange={(e)=>setActivityForm({...ActivityForm,description:e.target.value})}
              required
            />
          </Label>
          <Label>
            <span>Date</span>
            <Input
            //   type="number"
              type="date"
              className="mt-1"
              name="date"
              onChange={(e)=>setActivityForm({...ActivityForm,date:e.target.value})}
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




          {/* ONetime payroll  */}
          <Modal isOpen={isOneTimeOpen} onClose={closeOneTime}>
      <ModalHeader>Register One Time Payroll</ModalHeader>
      <ModalBody>
      <form onSubmit={handleOneTimePayroll}>
        <div className="grid grid-cols-2 gap-4">
          

        <Label>
            <span>Donors</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,donorId:e.target.value})}
              required
            >
              <option value="" >Select Donor</option>
              {donor?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,ProjectId:e.target.value})}
              required
            >
              <option value="" >Select Project</option>
              {project?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          <Label>
            <span>Budgets</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setActivityForm({...clickables,owdaBudgetLineId:e.target.value})}
              required
            >
              <option value="" >Select Budget</option>
              {budgetLines?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


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
            

          {/*  end of one time payroll */}
  
        


        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Description</TableCell>
            <TableCell className="font-semibold">Unit</TableCell>
            <TableCell className="font-semibold">Quantity</TableCell>
            <TableCell className="font-semibold">Unit Price</TableCell>
            <TableCell className="font-semibold">USD Rate</TableCell>
            <TableCell className="font-semibold">T.Amount(ETB)</TableCell>
            <TableCell className="font-semibold">T.Amount(USD)</TableCell>
            <TableCell className="font-semibold">Site</TableCell>
            <TableCell className="font-semibold">BudgetLine</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedResult?fetchedResult.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
                
                <TableCell><span className="text-sm font-semibold">{row.description}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.unit}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.quantity}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.unitPrice}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.usdUnitRate}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.totalAmount).toLocaleString({maximumFractionDigits:2})} ETB</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(row.usd).toLocaleString({maximumFractionDigits:2})} USD</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.owda_site?.name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.owda_budget_line?.name}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/activity/${row.id}`}>
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




export default OwdaActivityList