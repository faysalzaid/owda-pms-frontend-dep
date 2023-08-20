
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
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';


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
import { Link, useHistory, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { RiDeleteBin6Line } from 'react-icons/ri'
import { FaBook, FaBookDead, FaDownload, FaEdit,FaCashRegister } from 'react-icons/fa'




const AccountDetail = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [accountType,setAccountType] = useState([])
    const [bank,setBank] = useState([])
    const [currency,setCurrency] = useState([])
    const [donor,setDonor] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [account,setAccount] = useState({})
    const [isTransferOpen,setIsTransferOpen] = useState({open:false,value:"",toAccount:"",owdaCurrencyId:"",owdaDonorId:"",date:""})
    const [loopAccount,setLoopAccount] = useState([])
    const [accountForm,setAccountForm] = useState({
        name:"",
        code:"",
        description:"",
        owdaBankId:"",
        owdaAccountTypeId:"",
        transfer:""

    })


    const {id} = useParams()
    const history = useHistory()

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
            await axios.get(`${url}/accounts/${id}`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error){
                    setOpenError({open:true,message:`${resp.data.error}`})
                  }else{
                    // console.log(resp.data);
                    // console.log(resp.data);
                    setAccount(resp.data)
                    setAccountForm({
                        name:resp.data.name,
                        code:resp.data.code,
                        description:resp.data.description,
                        owdaBankId:resp.data.owdaBankId,
                        owdaAccountTypeId:resp.data.owdaAccountTypeId,
                        transfer:resp.data.transfer,
                
                    })
                }
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          
            await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
              setDonor(resp.data)
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })
        

          await axios.get(`${url}/currencies`,{withCredentials:true}).then((resp)=>{
              setCurrency(resp.data)
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })


            await axios.get(`${url}/banks`,{withCredentials:true}).then((resp)=>{
                setBank(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })

            await axios.get(`${url}/accounts`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error){
                setOpenError({open:true,message:`${resp.data.error}`})
              }else{
                const data = resp.data.filter((acc)=>acc.id!=id)
                // console.log(data);
                setLoopAccount(data)
              }
           
          }).catch((error)=>{
              if (error.response && error.response.data && error.response.data.error) {
                  setOpenError({open:true,message:`${error.response.data.error}`});
                } else {
                  setOpenError({open:true,message:"An unknown error occurred"});
                }
          })


            await axios.get(`${url}/accountTypes`,{withCredentials:true}).then((resp)=>{
                setAccountType(resp.data)
             
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
        await axios.put(`${url}/accounts/${id}`,accountForm,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setAccount(resp.data)
            // console.log(resp.data);
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
        setFetchedResult(searchTerm.length<1?account:searchResult)
      },[account,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = account?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(account)
      }
    }


    // Chevron Logics
    
    const [isIncomeOpen, setIsIncomeOpen] = useState(false);

    const toggleIncome = () => {
      setIsIncomeOpen(!isIncomeOpen);
    };


    const [isProjectOpen, setIsProjectOpen] = useState(false);

    const toggleProject = () => {
      setIsProjectOpen(!isProjectOpen);
    };



    const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

    const toggleInvoice = () => {
      setIsInvoiceOpen(!isInvoiceOpen);
    };
    // End of Chevron Logics
    




  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id})
}

  const openTransfer = ()=>{
    setIsTransferOpen({open:true})
  }
  const closeTransfer = ()=>{
    setIsTransferOpen({open:false})
  }

    const handleTransfer =  async(e)=>{
        e.preventDefault()
        const request = {
          currentAccount:id,
          toAccount:isTransferOpen.toAccount,
          value:isTransferOpen.value,
          owdaCurrencyId:isTransferOpen.owdaCurrencyId,
          owdaDonorId:isTransferOpen.owdaDonorId,
          date:isTransferOpen.date,  
        }
        // console.log(req);
        await axios.post(`${url}/income/transfer`,request,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            console.log(request);
            setOpenSuccess({open:true,message:"Successfully Transfered"}) 
            setAccount(resp.data)
            closeTransfer()

          }
        })
        await axios.post()
    }


  // Delete row
  const handleDelete = async()=>{
    await axios.delete(`${url}/accounts/${id}`,{withCredentials:true}).then((resp)=>{
        // const data = account.filter((dt)=>dt.id!==isDeleteOpen.id)
        // setAccount(data)
        setOpenSuccess({open:true,message:"deleted Successfully"})
        setTimeout(() => {
            history.goBack()
        }, 1000);
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
  
        <PageTitle>Accounts | {account.name}</PageTitle>
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

          {/* Transfer section */}
          <Modal isOpen={isTransferOpen.open} onClose={closeTransfer}>
          <ModalHeader>Enter Transfer Amount</ModalHeader>
          <ModalBody>
          <form onSubmit={handleTransfer}>
              <div className="grid grid-cols-1 gap-4">

              <Label>
              <span>Date</span>
              <Input
                type="date"
              //   type="number"
                className="mt-1"
                // value={accountForm.name}
                // step="0.01"
                name="name"
                autoComplete="off"
                onChange={(e)=>setIsTransferOpen({...isTransferOpen,date:e.target.value})}
                required
              />
            </Label>


            <Label>
              <span>Amount</span>
              <Input
                type="number"
              //   type="number"
                className="mt-1"
                // value={accountForm.name}
                step="0.01"
                name="name"
                autoComplete="off"
                onChange={(e)=>setIsTransferOpen({...isTransferOpen,value:e.target.value})}
                required
              />
            </Label>

            <Label>
            <span>Account</span>
            <Select
              className="mt-1"
              // value={accountForm.owdaBankId}
              name="owdaBankId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setIsTransferOpen({...isTransferOpen,toAccount:e.target.value})}
              required
            >
              <option value="" >Select Account To Transfer</option>
              {loopAccount.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          <Label>
            <span>Donor</span>
            <Select
              className="mt-1"
              // value={accountForm.owdaBankId}
              name="owdaBankId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setIsTransferOpen({...isTransferOpen,owdaDonorId:e.target.value})}
              required
            >
              <option value="" >Select Donor</option>
              {donor.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

          <Label>
            <span>Currency</span>
            <Select
              className="mt-1"
              // value={accountForm.owdaBankId}
              name="owdaBankId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setIsTransferOpen({...isTransferOpen,owdaCurrencyId:e.target.value})}
              required
            >
              <option value="" >Select Currency</option>
              {currency.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


              </div>
            </form>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-600" onClick={handleTransfer}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of Transfer Section */}
        <div className='flex'>
        <Button onClick={openModal}>Update Account</Button>
        <Button onClick={openDelete} style={{backgroundColor:'red'}} className="ml-4 text-lg text-white-600 hover:text-red-800">
       <RiDeleteBin6Line />
        </Button>
        {account.transfer&&
         <Button onClick={openTransfer} style={{backgroundColor:'green'}} size="small" className="ml-4">
         Transfer to account
       </Button>
       }
       
        </div>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Update Account</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          


          <Label>
            <span>Name</span>
            <Input
            //   type="number"
              className="mt-1"
              value={accountForm.name}
              name="name"
              onChange={(e)=>setAccountForm({...accountForm,name:e.target.value})}
              required
            />
          </Label>



          <Label>
            <span>Code</span>
            <Input
            //   type="number"
              className="mt-1"
              value={accountForm.code}
              name="name"
              onChange={(e)=>setAccountForm({...accountForm,code:e.target.value})}
              required
            />
          </Label>


          <Label>
            <span>Description</span>
            <Input
            //   type="number"
              className="mt-1"
              value={accountForm.description}
              name="name"
              onChange={(e)=>setAccountForm({...accountForm,description:e.target.value})}
              
            />
          </Label>

          <Label>
            <span>Account Type</span>
            <Select
              className="mt-1"
              value={accountForm.owdaAccountTypeId}
              name="owdaAccountTypeId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setAccountForm({...accountForm,owdaAccountTypeId:e.target.value})}
              required
            >
              <option value="" >Select Account Type</option>
              {accountType.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>


          

          <Label>
            <span>Transfer Account</span>
            <Select
              className="mt-1"
              value={accountForm.transfer}
              name="transfer"
            //   value={formValues.CompanyId}
              onChange={(e)=>setAccountForm({...accountForm,transfer:e.target.value})}
              required
            >
              <option value="">Select:-</option>
                <option value='true'>Yes</option>
                <option value='false'>No</option>
            </Select>
          </Label>


          <Label>
            <span>Bank</span>
            <Select
              className="mt-1"
              value={accountForm.owdaBankId}
              name="owdaBankId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setAccountForm({...accountForm,owdaBankId:e.target.value})}
              required
            >
              <option value="" >Select Bank</option>
              {bank.map((cp,i)=>(
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
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Account Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Name</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{account.name}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Code</p>
                 <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{account.code}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Description</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{account.description}</p>
                </div>
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Other Details</h2>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Type</p>
             <p className="text-sm font-semibold text-green-500">{accountType.map((ac)=>ac.id==account.owdaAccountTypeId?ac.name:"")}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Bank</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{bank.map((bn)=>bn.id==account.owdaBankId?bn.name:"")}</p>
           </div>
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Balance</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.balance).toLocaleString({maximumFractionDigits:2})}</p>
           </div> */}
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.balance).toLocaleString({maximumFractionDigits:2})}</p>
           </div>
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Balance</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.remaining).toLocaleString({maximumFractionDigits:2})}</p>
           </div>
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Account Used</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.utilized).toLocaleString({maximumFractionDigits:2})}</p>
           </div>
        */}
 </div>
     


    </div>
  </div>
</div>

<div className="flex flex-col gap-4 mt-0 overflow-x-auto">
      <button
        className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300 p-4 shadow-md"
        onClick={toggleIncome}
      >
        <p className="ml-4 font-bold">Incomes</p>
        {isIncomeOpen ? (
          <FaChevronUp className="text-xl" />
        ) : (
          <FaChevronDown className="text-xl" />
        )}
      </button>
      {isIncomeOpen && (
        <div className="space-y-2">
          {account.owda_incomes?.map((ac, i) => (
            <div
              key={i}
              className="relative flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-300 rounded-md p-4 shadow-md"
            >
              {/* Rest of your content */}
              <div className="flex-1 truncate">{ac.date}</div>
              <div className="flex-1 truncate">
                {parseFloat(ac.amount).toLocaleString({ maximumFractionDigits: 2 })}
              </div>
              <div className="flex-1 truncate">
                {currency.map((cr) => (cr.id === ac.owdaCurrencyId ? cr.sign : ''))}
              </div>
              <div className="flex-1 truncate">
                {donor.map((cr) => (cr.id === ac.owdaDonorId ? cr.name : ''))}
              </div>
              <button className="text-red-500 hover:text-red-600">
                <FaBookDead />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>




<div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans mb-6 overflow-x-auto mt-6">
  <div className="w-full">
    <div className="flex">
      <button
        className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-100  p-4 shadow-md"
        onClick={toggleProject}
      >
      <Badge type="warning" className="font-bold">Projects Using This Account</Badge>
         {isProjectOpen ? (
          <FaChevronUp className="text-xl ml-4" />
        ) : (
          <FaChevronDown className="text-xl ml-4" />
        )}

      </button>
      
      
   
    </div>

        {isProjectOpen&&(    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
    <div className="overflow-x-auto">
    <table className="min-w-full divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Name
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Status
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Code
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Start Time
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        End Time
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Used Amount
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Show
      </th>
    
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
    {account?.owda_projects?.map((owd)=>
    
    <tr key={owd.id}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.name}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.status}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.starttime}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.endtime}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">ETB {parseFloat(owd.inUseAmount).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300"><Link to={`/app/projects/${owd.id}`}><FaEdit className='text-blue-500'/></Link></div>
    </td>
  </tr>
 

    )}
   
    </tbody>
    </table>
    </div>
    </div>
    
    )}

  </div>
</div>







<div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans mb-6 overflow-x-auto mt-6">
  <div className="w-full">
    <div className="flex">
      <button
        className="flex justify-between items-center bg-gray-100 dark:bg-gray-800 text-dark-900 dark:text-gray-100  p-4 shadow-md"
        onClick={toggleInvoice}
      >
      <Badge type="success" className="font-bold">Related Invoices</Badge>
         {isInvoiceOpen ? (
          <FaChevronUp className="text-xl ml-4" />
        ) : (
          <FaChevronDown className="text-xl ml-4" />
        )}

      </button>
      
      
   
    </div>

        {isInvoiceOpen&&(    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
    <div className="overflow-x-auto">
    <table className="min-w-full divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Invoice ID
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Amount
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Created By
      </th>
      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Date
      </th>

      <th scope="col"className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        Show
      </th>
    
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
    {account?.owda_invoices?.map((owd)=>
    
    <tr key={owd.id}>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.id}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">ETB - {parseFloat(owd.amount).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.addedBy}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300">{owd.date}</div>
    </td>

    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm font-medium text-gray-900 dark:text-gray-300"><Link to={`/app/projects/${owd.id}`}><FaEdit className='text-blue-500'/></Link></div>
    </td>
  </tr>
 

    )}
   
    </tbody>
    </table>
    </div>
    </div>
    
    )}

  </div>
</div>


        



      </>
    )


   

}




export default AccountDetail