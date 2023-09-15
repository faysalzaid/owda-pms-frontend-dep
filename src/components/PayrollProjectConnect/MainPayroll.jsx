
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
import { FaBaby, FaBuffer, FaCalculator, FaQq, FaSave, FaShapes,FaAmazonPay } from "react-icons/fa";


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





const OwdaMainPayroll = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [project,setProject] = useState([])
    const [activity,setActivity] = useState([])
    const [addedNumber,setAddedNumber] = useState(0)
    const [projectBased,setProjectBased] = useState([])
    const [contributors,setContributors] = useState([])
    const [budgetLines,setBudgetLines] = useState([])
    const [loopedBudget,setLoopedBudget] = useState([])
    const [clickables,setClickables] = useState({ProjectId:""})
    const [siteData,setSiteData] = useState([])
    const [payrollForm,setPayrollForm] = useState({
      unit: "",
      quantity:"",
      unitPrice:"",
      description:"",
      usdUnitRate:"",
      owdaBudgetLineId:"",
      owdaSiteId: "",
      id:"",
      ProjectId:"",
      // payroll data 
      date:"",
      checkNumber:"",
      paymentVoucher:"",
      pCategory:""
      

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
      const [isSelectionOpen,setIsSelectionOpen] =useState(false)
      function closeOneTime(){
        setIsOneTimeOpen(false)
    }
    function openOneTime(empl){
        setIsOneTimeOpen(true)
        setPayrollForm({...payrollForm ,owdaBudgetLineId:empl.owdaBudgetLineId,id:empl.id,unitPrice:empl.baseSalary,ProjectId:clickables.ProjectId,pCategory:empl.pCategory})
    }

    function openOneTimeWithSelection(empl){
      setIsSelectionOpen(true)
      setPayrollForm({...payrollForm ,owdaBudgetLineId:empl.owdaBudgetLineId,id:empl.id,unitPrice:empl.baseSalary,ProjectId:clickables.ProjectId,pCategory:empl.pCategory})
  }
  function closeOneTimeWithSelection(empl){
    setIsSelectionOpen(false)
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


            await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
                // console.log(resp.data);
                setProject(resp.data)
             
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


          await axios.get(`${url}/site`,{withCredentials:true}).then((resp)=>{
            setSiteData(resp.data)
         
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




      
    
            
    
    const handleSelectedBaserPayroll = async(e) => {
      e.preventDefault();
      // console.log('payroll form',payrollForm);
      const request = {
        payrollForm,
        selectedProjectBased
      }
      await axios.post(`${url}/activity/payroll/baser/selected`,request,{withCredentials:true}).then((resp)=>{
        // console.log(resp.data);
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{ 
          // const data = resp.data.filter((dt)=>)
          // onsole.log(resp.data);
          setProjectBased(resp.data.Employees?.filter((emp)=>emp.pCategory==="baser"))
          setContributors(resp.data.Employees?.filter((emp)=>emp.pCategory==="contributor"))
          setBudgetLines(resp.data.owda_budget_lines)
          setOpenSuccess({open:true,message:"Successfully Added"})
          closeOneTimeWithSelection();   
        }

      }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })

     
    };



            
    
      const handleBaserPayroll = async(e) => {
        e.preventDefault();
        console.log('payroll form',payrollForm);
        await axios.post(`${url}/activity/payroll/baser`,payrollForm,{withCredentials:true}).then((resp)=>{
          // console.log(resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{ 
            // const data = resp.data.filter((dt)=>)
            // onsole.log(resp.data);
            setProjectBased(resp.data.Employees?.filter((emp)=>emp.pCategory==="baser"))
            setContributors(resp.data.Employees?.filter((emp)=>emp.pCategory==="contributor"))
            setBudgetLines(resp.data.owda_budget_lines)
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeOneTime();   
          }

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })

       
      };



      const handleContributorPayroll = async(e)=>{
        e.preventDefault();
        
        // console.log('payroll form',payrollForm);
        const request = {
          ...payrollForm,
          user:authState.email
        }
        await axios.post(`${url}/activity/payroll/contributor`,request,{withCredentials:true}).then((resp)=>{
          console.log('The resp',resp.data);
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{ 
            // const data = resp.data.filter((dt)=>dt.id===parseInt(clickables.ProjectId))
            // console.log('From CONTRIBUTION',resp.data);
          
            // setProjectBased(resp.data.Employees?.filter((emp)=>emp.pCategory==="baser"))
            // setContributors(resp.data.Employees?.filter((emp)=>emp.pCategory==="contributor"))
            // setBudgetLines(resp.data.owda_budget_lines)
            setOpenSuccess({open:true,message:"Successfully Added"})
            closeOneTime();   
          }

        }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                setOpenError({open:true,message:`${error.response.data.error}`});
              } else {
                setOpenError({open:true,message:"An unknown error occurred"});
              }
        })
      }
      

      
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
  const [isOpenContributor,setIsOpenContributor] = useState({open:false,project:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}


const openContributor = (pr)=>{
  setIsOpenContributor({open:true,project:pr})
  // console.log(pr);
}

const closeContributor = ()=>{
  setIsOpenContributor({open:false,project:""})
}


  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/activity/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
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
            let data=[];
            data = project?.filter((dn)=>dn.id===parseInt(clickables.ProjectId))
            // console.log(data[0]?.owda_budget_lines); 
            // console.log('projectId from 2nd useeffect',clickables.ProjectId);
            if(data){
            setBudgetLines(data[0]?.owda_budget_lines)
            setProjectBased(data[0]?.Employees?.filter((emp)=>emp.pCategory==="baser"))  
            // console.log('contributors',data[0]?.Employees?.filter((emp)=>emp.pCategory==="baser"));
            setContributors(data[0]?.Employees?.filter((emp)=>emp.pCategory==="contributor"))  
            // console.log('data',data[0]?.Employees?.filter((emp)=>emp.pCategory==="baser"));

            }
        },[clickables?.ProjectId])





      function isMonthReached(payroll) {
        const date = new Date(payroll.lastPayment).getMonth();
        // console.log('runned');
        return date < new Date().getMonth();
      }


      const [selectedProjectBased, setSelectedProjectBased] = useState([]);

      const toggleSelect = (employee) => {
        // Check if the employee is already selected, and toggle their selection
        if (selectedProjectBased.includes(employee)) {
          setSelectedProjectBased(selectedProjectBased.filter((e) => e !== employee));
        } else {
          setSelectedProjectBased([...selectedProjectBased, employee]);
        }

     
      };


      useEffect(()=>{
        console.log(selectedProjectBased);
        const data = selectedProjectBased?.reduce((acc,curr)=>acc+parseFloat(curr.baseSalary),0).toLocaleString({maximumFractionDigits:2})
        setAddedNumber(data)
      },[selectedProjectBased])

    return (
      <>
  
        <PageTitle>Main payroll Page </PageTitle>
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


          {/* Contributor Data */}
          <Modal isOpen={isOpenContributor.open} onClose={closeContributor}>
          <ModalHeader>Contributor | {isOpenContributor.project.name}</ModalHeader>
          <ModalBody>
          {isOpenContributor.project?.owda_projects?.map((project, index) => (
          <div key={index} className="mb-4">
            <div className='flex'>
            <div className="font-semibold mb-2 ">{`Project ${index + 1}: `}</div>
            <div className="font-semibold mb-2 ml-2">{`${project.name}`}</div>

            </div>
            {/* <div className="mb-2">{project.EmployeeProject.percentage}</div> */}
            <div>{`Contribution: ${project.EmployeeProject.percentage}%`}</div>
          </div>
        ))}
          </ModalBody>
          <ModalFooter>
            {/* <button className="px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600" onClick={handleContributorPayroll}>
              Pay
            </button> */}
          </ModalFooter>
      </Modal>

        {/* End of Contributor data */}


        <div className='flex mb-2'>
        <div className="max-w-screen-lg flex flex-col sm:flex-row">
            <div className="flex flex-col sm:flex-row mb-4">
                <div className="flex relative inline-flex mr-2">
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
                </div>
        {/* <Button onClick={openOneTime} className="mt-1">Add Payroll</Button> */}
            </div>


        </div>
        </div>
        {selectedProjectBased.length>0?
        <Button className="custom-button mb-4" size="small" onClick={openOneTimeWithSelection}>Pay</Button>
        :""}
  
        
        </TableContainer>



          {/* start of selected projects payroll */}
          <Modal isOpen={isSelectionOpen} onClose={closeOneTimeWithSelection}>
      <ModalHeader>Register Payroll of {selectedProjectBased?.length} employees & {addedNumber}-ETB of Salary</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSelectedBaserPayroll}>
        <div className="grid grid-cols-2 gap-4">
          
        <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              onChange={(e)=>setPayrollForm({...payrollForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Site</span>
            <Select
              className="mt-1"
              name="owdaSiteId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setPayrollForm({...payrollForm,owdaSiteId:e.target.value})}
              required
            >
              <option value="" >Select Site</option>
              {siteData?.map((cp,i)=>(
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
              onChange={(e)=>setPayrollForm({...payrollForm,description:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Unit</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,unit:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Check Number</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,checkNumber:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Payment Voucher</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,paymentVoucher:e.target.value})}
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
              onChange={(e)=>setPayrollForm({...payrollForm,quantity:e.target.value})}
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
              onChange={(e)=>setPayrollForm({...payrollForm,usdUnitRate:e.target.value})}
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

          {/* end of selected projects payroll */}

          {/* ONetime payroll  */}
          <Modal isOpen={isOneTimeOpen} onClose={closeOneTime}>
      <ModalHeader>Register One Time Payroll</ModalHeader>
      <ModalBody>
      <form onSubmit={payrollForm.pCategory==="baser"?handleBaserPayroll:handleContributorPayroll}>
        <div className="grid grid-cols-2 gap-4">
          
        <Label>
            <span>Date</span>
            <Input
              type="date"
              className="mt-1"
              name="date"
              onChange={(e)=>setPayrollForm({...payrollForm,date:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Site</span>
            <Select
              className="mt-1"
              name="owdaSiteId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setPayrollForm({...payrollForm,owdaSiteId:e.target.value})}
              required
            >
              <option value="" >Select Site</option>
              {siteData?.map((cp,i)=>(
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
              onChange={(e)=>setPayrollForm({...payrollForm,description:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Unit</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,unit:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Check Number</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,checkNumber:e.target.value})}
              required
            />
          </Label>

          <Label>
            <span>Payment Voucher</span>
            <Input
            //   type="number"
              className="mt-1"
              name="unit"
              onChange={(e)=>setPayrollForm({...payrollForm,paymentVoucher:e.target.value})}
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
              onChange={(e)=>setPayrollForm({...payrollForm,quantity:e.target.value})}
              required
            />
          </Label>


          {payrollForm.pCategory ==="baser"&& 
          <Label>
            <span>Unit Price (ETB)</span>
            <Input
              type="number"
              value={payrollForm.unitPrice}
              disabled
              step="0.01"
              className="mt-1"
              name="unitPrice"
              onChange={(e)=>setPayrollForm({...payrollForm,unitPrice:e.target.value})}
              required
            />
          </Label>}
         


         

          <Label>
            <span>USD Unit Rate</span>
            <Input
              type="number"
              step='0.01'
              className="mt-1"
              name="duration"
              onChange={(e)=>setPayrollForm({...payrollForm,usdUnitRate:e.target.value})}
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
            

          {/*  end of one time payroll */}
  
        

        {/* Project Based Tables */}
        <Badge type="success">Project Based</Badge>
<TableContainer className="bg-white rounded-lg shadow-lg mb-4">
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell className="font-semibold">Employee</TableCell>
        <TableCell className="font-semibold">Budget Line</TableCell>
        <TableCell className="font-semibold">Budget Desc</TableCell>
        <TableCell className="font-semibold">Base Salary</TableCell>
        <TableCell className="font-semibold">Duration</TableCell>
        <TableCell className="font-semibold">Current Salary</TableCell>
        <TableCell className="font-semibold">Last Payment</TableCell>
        <TableCell className="font-semibold">Select</TableCell>
        <TableCell className="font-semibold text-center">Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {projectBased && projectBased.map((row, i) => (
        <Fragment key={i}>
          {projectBased ? (
            <TableRow>
              <TableCell><span className="text-sm font-semibold"><Link to={`/app/employees/${row.id}`}>{row.name}</Link></span></TableCell>
              <TableCell><span className="text-sm font-semibold">{budgetLines.map((bl) => (bl.id === parseInt(row?.EmployeeProject?.owdaBudgetLineId) ? bl.code : ""))}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{budgetLines.map((bl) => (bl.id === parseInt(row?.EmployeeProject?.owdaBudgetLineId)? bl.name : ""))}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{parseFloat(row.baseSalary).toLocaleString({ maximumFractionDigits: 2 })} ETB</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row.duration} Months</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{parseFloat(row.currentSalary).toLocaleString({ maximumFractionDigits: 2 })} ETB</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row.lastPayment?.slice(0,10)}</span></TableCell>

                        <TableCell> 
                      <input
                      type="checkbox"
      
                      onChange={() => toggleSelect(row)}
                      checked={selectedProjectBased.includes(row)}
                      disabled={!isMonthReached(row)}
                    />
              </TableCell>
              
              <TableCell className="flex justify-center space-x-0">
                <Button layout="link" size="small"  onClick={()=>openOneTime(row)}  disabled={!isMonthReached(row)}>
                  <FaSave className={`${isMonthReached(row)?"h-5 w-5 text-red-600":"h-5 w-5 text-green-600"}`} />
                </Button>
                <Link to={`/app/employees/${row.id}`}>
                  <Button layout="link" size="small" >
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No Project Based Employee on this Project</TableCell>
            </TableRow>
          )}
        </Fragment>
      ))}
    </TableBody>
  </Table>
  <div className='flex ml-4'>
    <p className=' text-green-600'>Total |ETB <span className='font-semibold ml-1'>{projectBased?.reduce((acc,curr)=>acc+parseFloat(curr.currentSalary),0).toLocaleString({maximumFractionDigits:2})}</span></p>
    {/* <p className=' text-green-600 ml-6'>Total |USD <span className='font-semibold ml-1'>{budgetLines.owda_activities?.reduce((acc,curr)=>acc+parseFloat(curr.usd),0).toLocaleString({maximumFractionDigits:2})}</span></p> */}
    </div>
</TableContainer>

    {/* End of project based table */}


    {/* Contributors */}
    <Badge type="danger">Contributors</Badge>
<TableContainer className="bg-white rounded-lg shadow-lg">
  <Table>
    <TableHeader>
      <TableRow>
      <TableCell className="font-semibold">Employee</TableCell>
        <TableCell className="font-semibold">Budget Line</TableCell>
        <TableCell className="font-semibold">Budget Desc</TableCell>
        <TableCell className="font-semibold">Base Salary</TableCell>
        <TableCell className="font-semibold">Duration</TableCell>
        <TableCell className="font-semibold">Current Salary</TableCell>
        <TableCell className="font-semibold">Last Payment</TableCell>
        <TableCell className="font-semibold">Month</TableCell>
         <TableCell className="font-semibold">Pay</TableCell>
    
        <TableCell className="font-semibold text-center">Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {contributors && contributors.map((row, i) => (
        <Fragment key={i}>
          {contributors ? (
            <TableRow>
              <TableCell><span className="text-sm font-semibold"><Link to={`/app/employees/${row.id}`}>{row.name}</Link></span></TableCell>
              <TableCell><span className="text-sm font-semibold">{budgetLines.map((bl) => (bl.id === parseInt(row?.EmployeeProject?.owdaBudgetLineId) ? bl.code : ""))}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{budgetLines.map((bl) => (bl.id === parseInt(row?.EmployeeProject?.owdaBudgetLineId)? bl.name : ""))}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{parseFloat(row.baseSalary).toLocaleString({ maximumFractionDigits: 2 })} ETB</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row.duration} Months</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{parseFloat(row.currentSalary).toLocaleString({ maximumFractionDigits: 2 })} ETB</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row.lastPayment?.slice(0,10)}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row.duration} Months</span></TableCell>
              <TableCell className=" justify-center">

              <Button layout="link" size="small"  onClick={()=>openOneTime(row)} disabled={!isMonthReached(row)}>
                  <FaAmazonPay className={`${isMonthReached(row)?"h-6 w-6 text-green-600":"h-6 w-6 text-red-600"}`} />
                </Button>

              </TableCell>
              <TableCell className="flex justify-center space-x-2">
              <Button layout="link" size="small"  onClick={()=>openContributor(row)} >
                  <FaBuffer className={`${isMonthReached(row)?"h-5 w-5 text-red-600":"h-5 w-5 text-green-600"}`} />
                </Button>
                <Link to={`/app/employees/${row.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                </Link>
               
              </TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell>No Project Based Employee on this Project</TableCell>
            </TableRow>
          )}
        </Fragment>
      ))}
    </TableBody>
  </Table>
  <div className='flex ml-4'>
    <p className=' text-green-600'>Total |ETB <span className='font-semibold ml-1'>{contributors?.reduce((acc,curr)=>acc+parseFloat(curr.currentSalary),0).toLocaleString({maximumFractionDigits:2})}</span></p>
    {/* <p className=' text-green-600 ml-6'>Total |USD <span className='font-semibold ml-1'>{budgetLines.owda_activities?.reduce((acc,curr)=>acc+parseFloat(curr.usd),0).toLocaleString({maximumFractionDigits:2})}</span></p> */}
    </div>
</TableContainer>

    {/* Contributors */}

      </>
    )


   

}




export default OwdaMainPayroll