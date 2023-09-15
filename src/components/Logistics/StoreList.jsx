import React, { useState, useEffect, Fragment } from 'react';

import CTA from '../CTA';
import InfoCard from '../Cards/InfoCard';
import ChartCard from '../Chart/ChartCard';
import { Doughnut, Line } from 'react-chartjs-2';
import { AuthContext } from '../../hooks/authContext';
import { useContext } from 'react';
import ChartLegend from '../Chart/ChartLegend';
import PageTitle from '../Typography/PageTitle';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons';
import RoundIcon from '../RoundIcon';
import response from '../../utils/demo/tableData';
import { PlusCircleIcon } from "@heroicons/react/outline";
import { DocumentAddIcon } from '@heroicons/react/outline';
import 'config/custom-button.css'
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
} from '@windmill/react-ui';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui';

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData';
import { Link, withRouter } from 'react-router-dom';
import { url } from 'config/urlConfig';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaCheckCircle, FaEdit, FaPlus, FaPlusCircle, FaSitemap, FaTrash } from 'react-icons/fa';
import CNavbar from 'components/CNavBar/Cnavbar';
import CountsSection from 'components/Counts/Counts';

const StoreList = () => {
  const { authState,settings } = useContext(AuthContext);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [purchase,setPurchase] = useState([]);
  const [suppliers,setSuppliers] = useState([]);
  const [toStoreForm,setToStoreForm] = useState({name:"",type:"",date:"",purchaseRequestId:"",description:"",quantity:""})
  const [countsData, setCountsData] = useState({
    projectCount: '',
    bidCount: '',
    activeProjects: '',
    completedProjects: '',
  });
  const [store, setStore] = useState([]);
  const [storeForm, setStoreForm] = useState({
    date: '',
    issuedBy: '',
    purpose: '',
    purchaseRequestId:"",
    remark:"",
    location: '',
    receivedBy: '',
  });
  const [storeRequisitionForm,setStoreRequisitionForm] = useState({
    date:"",
    purpose:"",
    requestedBy:"",
    checkedBy:"",
    approvedBy:"",
    owdaStoreId:"",
    quantity:"",
    unit:""
  })

  // Notifications
  const [openSuccess, setOpenSuccess] = useState({ open: false, message: '' });
  const [toStore,setToStore] = useState({open:false,id:""})

  const handleCloseSuccess = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSuccess({ open: false, message: '' });
  };

  const [openError, setOpenError] = useState({ open: false, message: '' });

  const handleCloseError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenError({ open: false, message: '' });
  };

  // End of notifications
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  
  const [isStoreROpen,setIsStoreROpen] = useState(false)

    function closeStoreR() {
      setIsStoreROpen(false);
    }
  
    function openStoreR() {
      setIsStoreROpen(true);
    }





  function openToStore(id){
    setToStore({open:true,id})
  }
  function closeToStore(){
    setToStore({open:false,id:""})
  }


  useEffect(() => {
    const getData = async () => {

      await axios.get(`${url}/store`, { withCredentials: true }).then((resp) => {
        // console.log('store',resp.data);
        if (resp.data.error) return setOpenError({ open: true, message: 'Error Occurred' });
        setStore(resp.data);
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });

      await axios.get(`${url}/purchaseRequest`, { withCredentials: true }).then((resp) => {
        //   console.log('purchase',resp.data);
        if (resp.data.error) return setOpenError({ open: true, message: "Error Occurred" })
        const data = resp.data.filter((pr) => pr.status === "completed")
        // console.log(data);
        setPurchase(data)
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: "An unknown error occurred" });
        }
      })


      await axios.get(`${url}/counts`, { withCredentials: true }).then((resp) => {
        // console.log(resp.data);
        const data = resp.data;
        setCountsData({ projectCount: data.projectsCount, bidCount: data.countBids, activeProjects: data.activeProjectsCount, completedProjects: data.completedProjects });
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });
    }

    getData();

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your logic to handle form submission and API call
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? store : searchResult);
  }, [store, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newstore = store?.filter((s) => {
        return Object.values(s).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newstore);
    } else {
      setSearchResult(store);
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: '' });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  }

  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id });
  }

  // Delete row
  const handleDelete = async () => {
    await axios.delete(`${url}/store/${isDeleteOpen.id}`, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      const data = store.filter((s) => s.id !== isDeleteOpen.id)
      setStore(data)
      setOpenSuccess({ open: true, message: "Successfully Deleted" })
      closeDelete()
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setOpenError({ open: true, message: `${error.response.data.error}` });
      } else {
        setOpenError({ open: true, message: 'An unknown error occurred' });
      }
    });
    // Add your logic to handle row deletion and API call
  }



  const sendToStore = async(e)=>{
    e.preventDefault()
    if(toStoreForm.name===""||toStoreForm.date===""||toStoreForm.type==="") return setOpenError({open:true,message:"Pleae provide all data"})
    // console.log(toStoreForm);
    await axios.post(`${url}/store`,toStoreForm,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        // console.log('New Data',resp.data);
        setStore([resp.data,...store])
        setOpenSuccess({open:true,message:"Successfully Sent To Store"})
        closeToStore()
    })
    
  }

  const handleSend = async (e) => {
    e.preventDefault()
    if(storeRequisitionForm.owdaStoreId===""||storeRequisitionForm.owdaStoreId===undefined) return setOpenError({open:true,message:"Please provide store item"})
    console.log(storeForm);
    if (storeForm.purchaseRequestId === "" || storeForm.purchaseRequestId === "Select Purchase Request") return setOpenError({ open: true, message: "Please Provide Purchase Request" })
    await axios.post(`${url}/store`, storeForm, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      setStore([resp.data, ...store])
      setOpenSuccess({ open: true, message: "Successfully Added" })
      closeModal()
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setOpenError({ open: true, message: `${error.response.data.error}` });
      } else {
        setOpenError({ open: true, message: 'An unknown error occurred' });
      }
    });
    // Add your logic to handle sending store and API call
  }


  const handleStoreR =async(e)=>{
      e.preventDefault()
      // console.log(storeRequisitionForm);
      await axios.post(`${url}/storeR`,storeRequisitionForm,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setStore(resp.data)
        console.log('newdata',resp.data);
        setOpenSuccess({open:true,message:"Successfully Created data"})
        closeStoreR()

      })
  }


  return (
    <>
      <PageTitle>store List</PageTitle>
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
          <Input type="search" id="default-search" value={searchTerm} onChange={(e) => searchHandler(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search store..." required />
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

          {/* To Store Model */}
          <Modal isOpen={toStore.open} onClose={closeToStore}>
          <ModalHeader>Store Register</ModalHeader>
          <ModalBody>
          <form onSubmit={sendToStore} className="border border-gray-300 rounded-lg p-6">
      <div className="flex flex-wrap mb-6">
        <Label className="w-full sm:w-1/2">
          <span>Name</span>
          <Input
            className="mt-1"
            name="name"
            onChange={(e) => setToStoreForm({ ...toStoreForm, name: e.target.value })}
            required
          />
        </Label>

        <Label className="w-full sm:w-1/2">
          <span>Quantity</span>
          <Input
            type="number"
            className="mt-1"
            name="quantity"
            onChange={(e) => setToStoreForm({ ...toStoreForm, quantity: e.target.value })}
            required
          />
        </Label>

        <Label className="w-full">
          <span>Description</span>
          <Textarea
            className="mt-1"
            name="description"
            onChange={(e) => setToStoreForm({ ...toStoreForm, description: e.target.value })}
          />
        </Label>

        <Label className="w-full sm:w-1/2">
          <span>Date</span>
          <Input
            type="date"
            className="mt-1"
            name="date"
            onChange={(e) => setToStoreForm({ ...toStoreForm, date: e.target.value })}
            required
          />
        </Label>

        <Label className="w-full sm:w-1/2">
          <span>Type</span>
          <Input
            className="mt-1"
            name="type"
            onChange={(e) => setToStoreForm({ ...toStoreForm, type: e.target.value })}
            required
          />
        </Label>
      </div>

      <div className="hidden sm:block border border-gray-300 rounded-lg p-4 mb-6">
        <Button className="custom-button" type="submit">
          Submit
        </Button>
      </div>
      <div className="block sm:hidden border border-gray-300 rounded-lg p-4 mt-2">
        <Button block size="large" type="submit">
          Accept
        </Button>
      </div>
    </form>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>
        {/* End of To store model */}

        {/* START OF STORE REQUISITION STORE FORM */}


        <Modal isOpen={isStoreROpen} onClose={closeStoreR}>
          <ModalHeader>Store Requisition Form</ModalHeader>
          <ModalBody>
          <form onSubmit={handleStoreR} className="border border-gray-300 rounded-lg p-6">
      <div className="flex flex-wrap mb-6">
        <Label className="w-full sm:w-1/2">
          <span>Date</span>
          <Input
            type="date"
            className="mt-1"
            name="date"
            onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, date: e.target.value })}
            required
          />
        </Label>

        <Label className="w-full sm:w-1/2">
          <span>Requested By</span>
          <Input
            // type="number"
            className="mt-1 ml-1"
            name="requestedBy"
            onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, requestedBy: e.target.value })}
            required
          />
        </Label>
        <Label className="w-full sm:w-1/2">
          <span>Quantity</span>
          <Input
            type="number"
            className="mt-1 ml-1"
            name="requestedBy"
            onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, quantity: e.target.value })}
            required
          />
        </Label>
        <Label className="w-full sm:w-1/2">
          <span>Unit</span>
          <Input
            // type="number"
            className="mt-1 ml-1"
            name="requestedBy"
            onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, unit: e.target.value })}
            required
          />
        </Label>
        <Label className="w-full">
          <span>Purpose</span>
          <Textarea
            className="mt-1"
            name="purpose"
            onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, purpose: e.target.value })}
          />
        </Label>
        <Label className="w-full sm:w-1/1">
            <span>Item</span>
            <Select
              className="mt-1"
              name="store"
              onChange={(e) => setStoreRequisitionForm({ ...storeRequisitionForm, owdaStoreId: e.target.value })}

              required
            >
              <option value="" >Select Item</option>
              {store?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

      
      </div>

      <div className="hidden sm:block border border-gray-300 rounded-lg p-4 mb-6">
        <Button className="custom-button" type="submit">
          Submit
        </Button>
      </div>
      <div className="block sm:hidden border border-gray-300 rounded-lg p-4 mt-2">
        <Button block size="large" type="submit">
          Accept
        </Button>
      </div>
    </form>
          </ModalBody>
          <ModalFooter>
          </ModalFooter>
        </Modal>


        {/* END OF STORE REQUISITION STORE FROM */}



        <Button color="success" onClick={openToStore} className="mt-1 ml-4 bg-blue-500 hover:bg-blue-600 custom-button"><FaPlusCircle/>add</Button>
        <Button className="mt-1 ml-4 bg-blue-500 hover:bg-blue-600 custom-button" onClick={openStoreR}>Store Requisition Form <Link to='/app/storerequisition'><Badge className="ml-2 font-bold" style={{background:"green",color:"white"}}>view</Badge></Link></Button>
      </TableContainer>
     

     
<div className="flex flex-wrap ">
    {fetchedResult?.map((st,i)=>
    
  <div key={i} className="w-64 mx-4 my-4 bg-white dark:bg-gray-700 shadow-lg rounded-lg overflow-hidden">
    <div className="flex items-center justify-between px-4 py-2 bg-green-500 text-white">
      <h2 className="text-sm font-semibold">{st.name}</h2>
      <FaSitemap/>
      <i className="text-2xl fas fa-random"></i>
    </div>
    <div className="px-4 py-2">
        <div className='flex'>
      <p className="text-sm text-gray-600 dark:text-gray-100 font-bold mb-2">Type</p>
      <p className="text-gray-800 dark:text-gray-100 ml-4 mb-2">{st.type}</p>
        </div>

        <div className='flex'>
      <p className="text-sm text-gray-600 dark:text-gray-100 font-bold mb-2">Quantity</p>
      <p className="text-gray-800 dark:text-gray-100 ml-4 mb-2">{st.quantity}</p>
        </div>

        <div className='flex'>
      <p className="text-sm text-gray-600 dark:text-gray-100 font-bold mb-2">Remaining Quantity</p>
      <p className="text-gray-800 dark:text-gray-100 ml-4">{st.remaining}</p>
        </div>
    </div>
    <div className="flex justify-between px-4 py-2 bg-gray-100 dark:bg-gray-700">
  
      <span className="text-indigo-500 hover:text-indigo-700" >
        <Link to={`/app/store/${st.id}`}>
        <FaEdit/>
        </Link>
      </span>

      <span className="text-red-500 hover:text-red-700" >
         <FaTrash/>
      </span>
    </div>
  </div>
    )}

  

  </div>

  
    </>
  )
}

export default StoreList;
