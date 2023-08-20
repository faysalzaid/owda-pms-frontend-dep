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

import { FaCheckCircle } from 'react-icons/fa';
import CNavbar from 'components/CNavBar/Cnavbar';

const PaymentList = () => {
  const {authState,settings} = useContext(AuthContext)
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [purchase,setPurchase] = useState([]);
  const [suppliers,setSuppliers] = useState([]);
  const [toStoreForm,setToPaymentForm] = useState({name:"",type:"",date:"",})
  const [countsData, setCountsData] = useState({
    projectCount: '',
    bidCount: '',
    activeProjects: '',
    completedProjects: '',
  });
  const [payment, setpayment] = useState([]);
  const [paymentForm, setpaymentForm] = useState({
    date: '',
    requestedBy: '',
    purpose: '',
    checkedBy:"",
    purchaseRequestGroupId:"",
    approvedBy:"",
    section:"",
    payee:"",
    amount:""
  });

  // Notifications
  const [openSuccess, setOpenSuccess] = useState({ open: false, message: '' });
  const [toPayment,setToPayment] = useState({open:false,id:""})

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


  function openToApproval(id){
    setToPayment({open:true,id})
  }
  function closeToStore(){
    setToPayment({open:false,id:""})
  }


  useEffect(() => {
    const getData = async () => {

      await axios.get(`${url}/paymentRequest`, { withCredentials: true }).then((resp) => {
        // console.log('payment',resp.data);
        if (resp.data.error) return setOpenError({ open: true, message: 'Error Occurred' });
        setpayment(resp.data);
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
        // const data = resp.data.filter((pr) => pr.status === "completed")
        // console.log(data);
        setPurchase(resp.data)
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
    setFetchedResult(searchTerm.length < 1 ? payment : searchResult);
  }, [payment, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newpayment = payment?.filter((s) => {
        return Object.values(s).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newpayment);
    } else {
      setSearchResult(payment);
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
    await axios.delete(`${url}/paymentRequest/${isDeleteOpen.id}`, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      const data = payment.filter((s) => s.id !== isDeleteOpen.id)
      setpayment(data)
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



  const sendApproval = async(id)=>{
    // console.log(toStoreForm);
    await axios.post(`${url}/paymentRequest/approve/all/${toPayment.id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        // console.log('New Data',resp.data);
        setpayment(resp.data)
        setOpenSuccess({open:true,message:"Successfully Approved"})
        closeToStore()
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({ open: true, message: `${error.response.data.error}` });
          } else {
            setOpenError({ open: true, message: 'An unknown error occurred' });
          }
    })
    
  }

  const handleSend = async (e) => {
    e.preventDefault()
    // console.log('paymentform',paymentForm);
    if (paymentForm.purchaseRequestGroupId === "" || paymentForm.purchaseRequestGroupId === "Select Purchase Request") return setOpenError({ open: true, message: "Please Provide Purchase Request" })
    await axios.post(`${url}/paymentRequest`, paymentForm, { withCredentials: true }).then((resp) => {
      if (resp.data.error) return setOpenError({ open: true, message: `${resp.data.error}` })
      setpayment([resp.data, ...payment])
      setOpenSuccess({ open: true, message: "Successfully Added" })
      closeModal()
    }).catch((error) => {
      if (error.response && error.response.data && error.response.data.error) {
        setOpenError({ open: true, message: `${error.response.data.error}` });
      } else {
        setOpenError({ open: true, message: 'An unknown error occurred' });
      }
    });
    // Add your logic to handle sending payment and API call
  }


  useEffect(()=>{
    const data = purchase.filter((pr)=>pr.id===parseInt(paymentForm.purchaseRequestGroupId))
    const newD = data[0]?.purchase_requests?.reduce((acc,curr)=>acc+parseFloat(curr.actualTotalPrice),0)
    // console.log('amount',newD);
    setpaymentForm({...paymentForm,amount:newD})
  },[paymentForm.purchaseRequestGroupId])


  return (
    <>
      <PageTitle>Payments List</PageTitle>
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
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search payment..." required />
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
          <Modal isOpen={toPayment.open} onClose={closeToStore}>
          <ModalHeader>Move it To Store</ModalHeader>
          <ModalBody>
            <span className='text-red-500'>This approval will  create activity and invoice on this purchase Group</span>
            <p>Are you sure you want to proceed this payment approval</p>
          </ModalBody>
          <ModalFooter>
          <div className="hidden sm:block">
              <Button className="mt-6" type="submit" onClick={sendApproval}>Submit</Button>
            </div>
          </ModalFooter>
        </Modal>
        {/* End of To store model */}

        <CNavbar />

        <Button onClick={openModal} className="mt-4 custom-button">New payment</Button>
      </TableContainer>
      {/* Main Model */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Register payment</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSend}>
            <div className="grid grid-cols-2 gap-4">

            <Label>
                <span>Purchase Request</span>
                <Select
                  className="mt-1"
                  name="purchaseRequestGroupId"
                  onChange={(e) => setpaymentForm({ ...paymentForm, purchaseRequestGroupId: e.target.value })}
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
                  name="date"
                  onChange={(e) => setpaymentForm({ ...paymentForm, date: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>payee</span>
                <Input
                  className="mt-1"
                  name="issuedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, payee: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>requestedBy</span>
                <Input
                  className="mt-1"
                  name="issuedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, requestedBy: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Purpose</span>
                <Textarea
                  className="mt-1"
                  name="purpose"
                  onChange={(e) => setpaymentForm({ ...paymentForm, purpose: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Location</span>
                <Input
                  className="mt-1"
                  name="location"
                  onChange={(e) => setpaymentForm({ ...paymentForm, location: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>approvedBy</span>
                <Input
                  className="mt-1"
                  name="approvedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, approvedBy: e.target.value })}
                  required
                />
              </Label>
              <Label>
                <span>CheckedBy</span>
                <Input
                  className="mt-1"
                  name="approvedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, checkedBy: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Section</span>
                <Input
                  className="mt-1"
                  name="approvedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, section: e.target.value })}
                  required
                />
              </Label>

              {/* <Label>
                <span>Amount To Be Invoiced</span>
                <Input
                  className="mt-1"
                  value={parseFloat(paymentForm.amount).toLocaleString()}
                  name="approvedBy"
                  onChange={(e) => setpaymentForm({ ...paymentForm, amount: e.target.value })}
                  required
                  disabled
                />
              </Label> */}

            </div>

            <div className="hidden sm:block">
              <Button className="mt-6 custom-button" type="submit">Submit</Button>
            </div>
            <div className="mt-2 block sm:hidden">
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
        </ModalFooter>
      </Modal>

      {/* End of Main Model */}

      <TableContainer className="bg-white rounded-lg shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className="font-semibold">Code</TableCell>
              <TableCell className="font-semibold">Date</TableCell>
              <TableCell className="font-semibold">requestedBy</TableCell>
              <TableCell className="font-semibold">Purchase Group</TableCell>
              <TableCell className="font-semibold">Send Payment</TableCell>
              <TableCell className="font-semibold">Purpose</TableCell>
              <TableCell className="font-semibold">checkedBy</TableCell>
              <TableCell className="font-semibold">approvedBy</TableCell>
              <TableCell className="font-semibold">section</TableCell>
              <TableCell className="font-semibold text-center">Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchedResult ? fetchedResult.map((row, i) => (
              <Fragment key={i}>
                <TableRow className="mb-4">
                  <TableCell><span className="text-sm font-semibold">#{row.id}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.date}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.requestedBy}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold"><Link to={`/app/purchaseGroup/${row.purchase_request_group?.id}`}>{row.purchase_request_group?.name}</Link></span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.approved?<Badge type="success">Approved</Badge>:<button onClick={()=>openToApproval(row.id)}><Badge type="danger">Approve</Badge></button>}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.purpose?.slice(0,20)}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.checkedBy}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.approvedBy}</span></TableCell>
                  <TableCell><span className="text-sm font-semibold">{row.section}</span></TableCell>
                  <TableCell className="flex justify-center space-x-2 mt-4">
                    <Link to={`/app/paymentRequest/${row.id}`}>
                      <Button layout="link" size="small">
                        <EditIcon className="h-5 w-5 text-blue-600" />
                      </Button>
                    </Link>
                   
                  </TableCell>
                </TableRow>
              </Fragment>
            )) : ''}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentList;
