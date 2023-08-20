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
import { Link, useParams, withRouter } from 'react-router-dom';
import { url } from 'config/urlConfig';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaCheckCircle } from 'react-icons/fa';
import CNavbar from 'components/CNavBar/Cnavbar';

const SivDetail = (props) => {
  const {authState,settings} = useContext(AuthContext)
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [purchase,setPurchase] = useState([]);
  const [suppliers,setSuppliers] = useState([]);
  const [toStoreForm,setToStoreForm] = useState({name:"",type:"",date:""})
  const [countsData, setCountsData] = useState({
    projectCount: '',
    bidCount: '',
    activeProjects: '',
    completedProjects: '',
  });
  const [siv, setSIV] = useState({});
  const [sivForm, setSIVForm] = useState({
    date: '',
    issuedBy: '',
    purpose: '',
    purchaseRequestGroupId:"",
    remark:"",
    location: '',
    receivedBy: '',
  });


  const [toStore,setToStore] = useState({open:false,id:""})

  function openToStore(id){
    setToStore({open:true,id})
  }
  function closeToStore(){
    setToStore({open:false,id:""})
  }



  const {id} = useParams()
  // Notifications
  const [openSuccess, setOpenSuccess] = useState({ open: false, message: '' });

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

  useEffect(() => {
    const getData = async () => {

      await axios.get(`${url}/siv/${id}`, { withCredentials: true }).then((resp) => {
        // console.log('siv',resp.data);
        if (resp.data.error) return setOpenError({ open: true, message: 'Error Occurred' });
        setSIV(resp.data);
        setSIVForm({

            date: resp.data.date,
            issuedBy: resp.data.issuedBy,
            purpose: resp.data.purpose,
            purchaseRequestGroupId:resp.data.purchaseRequestGroupId,
            remark:resp.data.remark,
            location: resp.data.location,
            receivedBy: resp.data.receivedBy,
            
        })
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });

      await axios.get(`${url}/pGroup`, { withCredentials: true }).then((resp) => {
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
    setFetchedResult(searchTerm.length < 1 ? siv : searchResult);
  }, [siv, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newSIV = siv?.filter((s) => {
        return Object.values(s).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newSIV);
    } else {
      setSearchResult(siv);
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
    await axios.delete(`${url}/siv/${id}`, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      setOpenSuccess({ open: true, message: "Successfully Deleted" })
      closeDelete()
      setTimeout(() => {
        props.history.goBack()
      }, 1000);
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setOpenError({ open: true, message: `${error.response.data.error}` });
      } else {
        setOpenError({ open: true, message: 'An unknown error occurred' });
      }
    });
    // Add your logic to handle row deletion and API call
  }

  const handleSend = async (e) => {
    e.preventDefault()
    // console.log(sivForm);
    if (sivForm.purchaseRequestGroupId === "" || sivForm.purchaseRequestGroupId === "Select Purchase Request") return setOpenError({ open: true, message: "Please Provide Purchase Request" })
    await axios.put(`${url}/siv/${id}`, sivForm, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      setSIV(resp.data)
      // console.log(resp.data);
      setOpenSuccess({ open: true, message: "Successfully Updated" })
      closeModal()
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setOpenError({ open: true, message: `${error.response.data.error}` });
      } else {
        setOpenError({ open: true, message: 'An unknown error occurred' });
      }
    });
    // Add your logic to handle sending SIV and API call
  }


  const sendToStore = async()=>{
    // if(toStoreForm.name===""||toStoreForm.date===""||toStoreForm.type==="") return setOpenError({open:true,message:"Pleae provide all data"})
    // console.log(toStoreForm);
    await axios.post(`${url}/siv/toStore/${id}`,toStoreForm,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        // console.log('New Data',resp.data);
        setSIV(resp.data)
        setOpenSuccess({open:true,message:"Successfully Sent To Store"})
        closeToStore()
    })
    
  }




  return (
    <>
      <PageTitle>SIV Detail</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search SIV..." required />
        </div>
      </div>
      {/* End of search List */}

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Projects" value={countsData.projectCount}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Bids Registered" value={countsData.bidCount}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Active Projects" value={countsData.activeProjects}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Completed Projects" value={countsData.completedProjects}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

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
          <ModalHeader>Move it To Store</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to send it to store</p>
          </ModalBody>
          <ModalFooter>
          <div className="hidden sm:block">
              <Button className="mt-6" type="submit" onClick={sendToStore}>Send</Button>
            </div>
          </ModalFooter>
        </Modal>
        {/* End of To store model */}




        <CNavbar />

        <div className='flex'>
        <Button onClick={openModal} className="mt-4">Update SIV</Button>
        <TrashIcon className='mt-6 ml-5 w-7 h-6 text-red-600' onClick={openDelete}/>

        </div>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Update SIV</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSend}>
            <div className="grid grid-cols-1 gap-4">

            <Label>
                <span>Purchase Request</span>
                <Select
                  className="mt-1"
                  value={sivForm.purchaseRequestGroupId}
                  name="purchaseRequestGroupId"
                  onChange={(e) => setSIVForm({ ...sivForm, purchaseRequestGroupId: e.target.value })}
                  required
                >
                  <option>Select Purchase Request</option>
                  {purchase.map((pr) => <option key={pr.id} value={pr.id}>{pr.name}</option>)}
                 
                </Select>
              </Label>

              <Label>
                <span>Date</span>
                <Input
                  type="date"
                  className="mt-1"
                  value={sivForm.date}
                  name="date"
                  onChange={(e) => setSIVForm({ ...sivForm, date: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Issued By</span>
                <Input
                  className="mt-1"
                  value={sivForm.issuedBy}
                  name="issuedBy"
                  onChange={(e) => setSIVForm({ ...sivForm, issuedBy: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Purpose</span>
                <Textarea
                  className="mt-1"
                  value={sivForm.purpose}
                  name="purpose"
                  onChange={(e) => setSIVForm({ ...sivForm, purpose: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Remark</span>
                <Textarea
                  className="mt-1"
                  value={sivForm.remark}
                  name="remark"
                  onChange={(e) => setSIVForm({ ...sivForm, remark: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Location</span>
                <Input
                  className="mt-1"
                  value={sivForm.location}
                  name="location"
                  onChange={(e) => setSIVForm({ ...sivForm, location: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Received By</span>
                <Input
                  className="mt-1"
                  value={sivForm.receivedBy}
                  name="receivedBy"
                  onChange={(e) => setSIVForm({ ...sivForm, receivedBy: e.target.value })}
                  required
                />
              </Label>
            </div>

            <div className="hidden sm:block">
               <Button className="mt-6 custom-button" type="submit">Submit</Button>
            </div>
            <div className="mt-2 block sm:hidden">
              <Button block size="large">
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
        </ModalFooter>
      </Modal>



      <div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans">
  <div className="w-full">
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
      <div className="w-full md:w-1/2 mb-4">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Siv Details  <span className="text-sm font-semibold">{siv.sent?<Badge type="success">Sent To Store</Badge>:<button onClick={openToStore}><Badge type="danger">Send To Store</Badge></button>}</span></h2>
            <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Siv Code</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">#{siv.id}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-400">Date</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{siv.date}</p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Order Code</p>
                 <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">#{siv.id}</p>
                </div>
                <div className='mb-4'>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Issued By</p>
                  <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400">{siv.issuedBy}</p>
                </div>


             <div className="mb-4">
             <p className="text-sm font-medium text-gray-700 dark:text-gray-100">Purchase Order Status</p>
             <p className="text-1xl font-semibold text-white-600"><Badge type={siv.sent?"success":"warning"}>{siv.sent?"Sent to siv":"Not Sent To Store"}</Badge></p>           
             </div>

      
           
           
      </div>
      <div className="w-full md:w-1/2 mb-4 mt-2">
       
       <h2 className="text-lg font-semibold mb-4 dark:text-gray-300">Related Purchase Group Details</h2>
           
           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Purchase Group ID</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400"><Link to={`/app/purchaseGroup/${siv?.purchase_request_group?.id}`}>#{siv?.purchase_request_group?.id}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Purchase Group Name</p>
            <p  className="text-sm font-semibold text-orange-700 dark:text-yellow-400"><Link to={`/app/purchaseGroup/${siv?.purchase_request_group?.id}`}>{siv?.purchase_request_group?.name}</Link></p>
           </div>

           <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Number of Items  Or Purchases Included</p>
            <p className="text-1xl font-semibold text-red-600">{siv.purchase_request_group?.purchase_requests?.length} Items</p>
           </div>
           
          
           {/* <div className="mb-4">
             <p className="text-sm font-medium text-gray-600 dark:text-gray-100">Account Used</p>
            <p className="text-2xl font-semibold text-red-600">{parseFloat(account.utilized).toLocaleString({maximumFractionDigits:2})}</p>
           </div>
        */}
 </div>
     


    </div>
  </div>
</div>


    </>
  )
}

export default SivDetail;
