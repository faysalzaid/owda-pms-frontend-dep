
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

import { FaCheckCircle, FaCloudUploadAlt, FaFileDownload, FaSpellCheck } from 'react-icons/fa'
import CNavbar from 'components/CNavBar/Cnavbar'




const QuotationList = () => {
    const {authState,settings} = useContext(AuthContext)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [suppliers,setSuppliers] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [pGroup,setPgroup] = useState([])
    const [rfqData,setRfqData] = useState([])
    const [rfqForm,setRfqForm] = useState({
        date:"",
        requestedBy:"",
        ActualPrice:"",
        file:"", 
        purchaseRequestGroupId:"",
        SupplierId:""


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
            await axios.get(`${url}/pGroup`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                setPgroup(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          

            await axios.get(`${url}/quotations`,{withCredentials:true}).then((resp)=>{
                if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
                // console.log(resp.data);
                setRfqData(resp.data)
             
            }).catch((error)=>{
                if (error.response && error.response.data && error.response.data.error) {
                    setOpenError({open:true,message:`${error.response.data.error}`});
                  } else {
                    setOpenError({open:true,message:"An unknown error occurred"});
                  }
            })
          

            await axios.get(`${url}/suppliers`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
              // console.log(resp.data);
              setSuppliers(resp.data)
           
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
        if(rfqForm.file===undefined || rfqForm.file===null || rfqForm.file =="") return setOpenError({open:true,message:"Quotation file is required"})
        if(rfqForm.purchaseRequestGroupId === null || rfqForm.purchaseRequestGroupId==="" ||rfqForm.purchaseRequestGroupId ==="Select Status") return setOpenError({open:true,message:"Please Provide Purchase Request"})
        const formData = new FormData()
        formData.append('date',rfqForm.date)
        formData.append('file',rfqForm.file)
        formData.append('requestedBy',authState.username)
        formData.append('purchaseRequestGroupId',rfqForm.purchaseRequestGroupId)
        formData.append('SupplierId',rfqForm.SupplierId)
        // console.log(formData);
        await axios.post(`${url}/quotations`,formData,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
            // console.log(resp.data);
            setRfqData((prev)=>[resp.data,...prev])
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
        setFetchedResult(searchTerm.length<1?rfqData:searchResult)
      },[rfqData,searchTerm])
  
  
    const searchHandler = async(search)=>{
      setSearchTerm(search)
      if(search!==0){
        const newPayroll = rfqData?.filter((empl)=>{
          return Object.values(empl).join(" ").toLowerCase().includes(search.toLowerCase())
        })
        // console.log(newEmployeeList);
        setSearchResult(newPayroll)
      }else{
        setSearchResult(rfqData)
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
    await axios.delete(`${url}/quotations/${isDeleteOpen.id}`,{withCredentials:true}).then((resp)=>{
        const data = rfqData.filter((dt)=>dt.id!==isDeleteOpen.id)
        setRfqData(data)
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


const selectQuotation = async(id)=>{
  await axios.post(`${url}/quotations/select/${id}`).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
    setRfqData(resp.data)
    setOpenSuccess({open:true,message:"Successfully selected"})
  })
}


  
    return (
      <>
  
        <PageTitle>Request For Quotation</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search purchase..." required />
        </div>
            
        </div>
        {/* End of search List */}

       <CountsSection/>
  



        <TableContainer >
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
     
        <CNavbar />
        <Button onClick={openModal} className="mt-4 custom-button">New RFQ</Button>
  
      
        </TableContainer>

        <Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>New RFQ</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit} encType="multpart/form-data">
        <div className="grid grid-cols-1 gap-4">
          
          <Label>
            <span>Date</span>
            <Input
            //   type="number"
              type="date"
              className="mt-1"
              name="name"
              onChange={(e)=>setRfqForm({...rfqForm,date:e.target.value})}
              required
            />
          </Label>

         


          <Label>
            <span>Purchase Group</span>
            <Select
              className="mt-1"
              name="status"
            //   value={formValues.CompanyId}
              onChange={(e)=>setRfqForm({...rfqForm,purchaseRequestGroupId:e.target.value})}
              required
            >
              <option>Select Purchase Group</option>
                {pGroup.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
                
              
            </Select>
          </Label>



          <Label>
            <span>Supplier</span>
            <Select
              className="mt-1"
              name="status"
            //   value={formValues.CompanyId}
              onChange={(e)=>setRfqForm({...rfqForm,SupplierId:e.target.value})}
              required
            >
              <option>Select Supplier</option>
                {suppliers.map((pr)=>{
                  return <option key={pr.id} value={pr.id}>{pr.name}</option>
                  })}
                
              
            </Select>
          </Label>

        

          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300 dark:bg-gray-700 dark:text-white">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Upload Quotation</span>
              </label>
              <input
                type="file"
                id="file"
                className="hidden"
                name="attach"
                onChange={(e)=>setRfqForm({...rfqForm,file:e.target.files[0]})}
              />


        </div>
        <div className="hidden sm:block">

        <Button className="mt-6 custom-button" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block sm:hidden ">
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
          <TableCell className="font-semibold">Code</TableCell>
          <TableCell className="font-semibold">Purchase Group</TableCell>
            <TableCell className="font-semibold">P.GroupID</TableCell>
            <TableCell className="font-semibold">Date</TableCell>
            <TableCell className="font-semibold">file</TableCell>
            <TableCell className="font-semibold">RequestedBy</TableCell>
            <TableCell className="font-semibold">Supplier</TableCell>
            <TableCell className="font-semibold">Status</TableCell>
            <TableCell className="font-semibold">Select for Order</TableCell>
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {fetchedResult?fetchedResult.map((row, i) => (
            <Fragment key={i}>
              <TableRow>
              <TableCell><span className="text-sm font-semibold">#{row.id}</span></TableCell>
              <TableCell><span className="text-sm font-semibold">{row?.purchase_request_group?.name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/purchaseGroup/${row?.purchase_request_group?.id}`}>#{row?.purchase_request_group?.id}</Link></span></TableCell>                
                <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold"><a href={`${row.file}`} target="_blank"><FaFileDownload className='text-blue-600'/></a></span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.requestedBy}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.Supplier?.name}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{row.status}</span></TableCell>
                <TableCell><span className="text-sm font-semibold flex">{row.selected?(<><FaCheckCircle className='mt-1 ml-4 text-green-400'/> <span className='ml-4 text-green-400'>Selected</span></>):(<><FaCheckCircle className='mt-1 ml-4 text-red-400'/><span className='ml-4 text-red-400' onClick={()=>selectQuotation(row.id)}><button>Select</button></span></>)}</span></TableCell>
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/quotation/${row.id}`}>
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




export default QuotationList