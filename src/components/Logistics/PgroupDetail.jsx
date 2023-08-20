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
import { Link, useParams, withRouter } from 'react-router-dom';
import { url } from 'config/urlConfig';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { FaCheckCircle, FaEdit, FaRegEye, FaStreetView } from 'react-icons/fa';
import CNavbar from 'components/CNavBar/Cnavbar';
import { areDayPropsEqual } from '@mui/x-date-pickers/PickersDay/PickersDay';
import { FiDownload } from 'react-icons/fi';
import { RiDeleteBin4Line } from 'react-icons/ri';

const PurchaseGroupDetail = (props) => {
  const {authState,settings} = useContext(AuthContext)
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [donors,setDonors] = useState([])
  const [purchase,setPurchase] = useState([])
  const [suppliers,setSuppliers] = useState([])
  const [countsData, setCountsData] = useState({
    projectCount: '',
    bidCount: '',
    activeProjects: '',
    completedProjects: '',
  });
  const [pGroup, setPgroup] = useState({});
  const [itemForm, setitemForm] = useState({
    name: '',
    requestedBy:"",
    owdaDonorId:"",
    date:"",
    requestingProgram:""

  });

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

      await axios.get(`${url}/pGroup/${id}`, { withCredentials: true }).then((resp) => {
        console.log('item',resp.data);
        if (resp.data.error) return setOpenError({ open: true, message: 'Error Occured' });
        setSelectedItems(resp.data?.purchase_requests?.map((pr)=>{
            return pr.id
        }))
        setitemForm({
            name: resp.data.name,
            requestedBy:resp.data.requestedBy,
            owdaDonorId:resp.data.owdaDonorId,
            date:resp.data.date,
            requestingProgram:resp.data.requestingProgram
        
          })
        setPgroup(resp.data);
      }).catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });


      await axios.get(`${url}/purchaseRequest`,{withCredentials:true}).then((resp)=>{
        //   console.log('purchase',resp.data);
        if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
        const data = resp.data.filter((pr)=> pr.status ==="item")
        // console.log(data);
        setPurchase(resp.data)
     
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })


    await axios.get(`${url}/donors`,{withCredentials:true}).then((resp)=>{
      //   console.log('purchase',resp.data);
      if(resp.data.error) return setOpenError({open:true,message:"Error Occured"})
      
      // console.log(resp.data);
      setDonors(resp.data)
   
  }).catch((error)=>{
      if (error.response && error.response.data && error.response.data.error) {
          setOpenError({open:true,message:`${error.response.data.error}`});
        } else {
          setOpenError({open:true,message:"An unknown error occurred"});
        }
  })




      await axios.get(`${url}/counts`, { withCredentials: true }).then((resp) => {
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
    setFetchedResult(searchTerm.length < 1 ? pGroup : searchResult);
  }, [pGroup, searchTerm]);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newitem = pGroup?.filter((gr) => {
        return Object.values(gr).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newitem);
    } else {
      setSearchResult(pGroup);
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
    await axios.delete(`${url}/pGroup/${id}`,{withCredentials:true}).then((resp)=>{
        
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setOpenSuccess({open:true,message:"Successfully Deleted"})
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
    const request={
      ...itemForm,
      selectedItems
    }
    // console.log(request);

    await axios.put(`${url}/pGroup/${id}`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        // console.log(resp.data);
        setPgroup(resp.data)
        setOpenSuccess({open:true, message:"Successfully Updated"})
        closeModal()
    }) .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });
    // Add your logic to handle sending item and API call
  }


  const handleItemClick = (item) => {
    setSelectedItems((prevSelectedItems) => {
      if (!(prevSelectedItems.find((selectedItem) => selectedItem === item))) {
        return [...prevSelectedItems, item];
      } else {
        return prevSelectedItems.filter((selectedItem) => selectedItem !== item);
      }
    });
  };



  return (
    <>
      <PageTitle>Purchase Group | {pGroup.name}</PageTitle>
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
        <label htmlFor="default-search" className="mb-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-100 " fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <Input type="search" id="default-search" value={searchTerm} onChange={(e) => searchHandler(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 dark:text-gray-100 font-bold border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search item..." required />
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

        <CNavbar />

        <Button onClick={openModal} className="mt-4 custom-button">Update Group</Button>
      </TableContainer>

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Update Group</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSend}>
            <div className="grid grid-cols-1 gap-4">

            <Label>
                <span>Select Donor</span>
                <Select
                  className="mt-1"
                  value={itemForm.owdaDonorId}
                  name="quantityCheck"
                  onChange={(e) => setitemForm({ ...itemForm, owdaDonorId: e.target.value })}
                  required
                >
                  <option>Select Donor</option>
                  {donors.map((pr)=><option key={pr.id} value={pr.id}>{pr.name}</option>)}
                 
                </Select>
              </Label>


              <Label>
                <span>Date</span>
                <Input
                  type="date"
                  className="mt-1"
                  value={itemForm.date}
                  name="date"
                  onChange={(e) => setitemForm({ ...itemForm, date: e.target.value })}
                  required
                />
              </Label>


              <Label>
                <span>Requesting Program</span>
                <Input
                  // type="date"
                  className="mt-1"
                  value={itemForm.requestingProgram}
                  name="date"
                  onChange={(e) => setitemForm({ ...itemForm, requestingProgram: e.target.value })}
                  required
                />
              </Label>
 


              <Label>
                <span>name</span>
                <Input
                  // type="date"
                  className="mt-1"
                  value={itemForm.name}
                  name="date"
                  onChange={(e) => setitemForm({ ...itemForm, name: e.target.value })}
                  required
                />
              </Label>
 

              <Label>
                <span>Requested By</span>
                <Input
                  // type="date"
                  className="mt-1"
                  value={itemForm.requestedBy}
                  name="date"
                  onChange={(e) => setitemForm({ ...itemForm, requestedBy: e.target.value })}
                  required
                />
              </Label>

                 
        <div className="flex flex-wrap">
            {purchase.map((item) => (
      
        <div key={item.id} className="flex items-center mr-4">
          <Input
       
            type="radio"
            className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            // name="colored-radio"
            value={item.id}
            checked={selectedItems.some((selectedItem) => selectedItem === item.id)}
            onClick={() => handleItemClick(item.id)}
            onChange={()=>item.id}
          />
          <label  className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold dark:text-gray-300">{item.description}</label>
        </div>
      


             ))}
      </div>


         
            </div>

            <div className="hidden sm:block">
              <Button className="mt-6" type="submit custom-button">Submit</Button>
            </div>
            <div className="mt-2 block sm:hidden custom-button">
              <Button block size="large" className="custom-button">
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
          <div className="block w-full sm:hidden text-white custom-button">
            <Button block size="large" layout="" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </ModalFooter>
      </Modal>

    

{/* PurchaseGroup INformation */}
  <div className="bg-gray-50 dark:bg-gray-700 flex flex-col justify-center py-12 sm:px-9 lg:px-8">
  <div className="w-full">
    <div className="bg-white dark:bg-gray-700 shadow-md rounded-md overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <div className=" items-center">
           
            <img src='https://iphce.org/wp-content/uploads/2021/04/OWDA-.png' className="h-10 w-100 mr-2"/>
            <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.name}</h2>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Purchase Group ID #{pGroup.id}</p>
            <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Date: {pGroup.date}</p>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 font-bold">Purchase Group Detail</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Name:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.name}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Requested By:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.requestedBy}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Requesting Program:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.requestingProgram}</p>
            </div>

            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Has Payment:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup?.hasPayment?"Yes":"Not Yet"}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-bold text-gray-900 dark:text-gray-100 font-bold">Donor Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Donor:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.owda_donor?.name}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Donor Address:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.owda_donor?.address}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Donor Code:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.owda_donor?.code}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-bold text-gray-500 dark:text-gray-100">Donor Email:</p>
              <p className="ml-2 text-sm font-bold text-gray-900 dark:text-gray-100 font-bold">{pGroup.owda_donor?.email}</p>
            </div>
          </div>
        </div>
       
              </div>
              </div>
              </div>
              </div>




<div className="bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center font-sans mb-6 overflow-x-auto">
  <div className="w-full">
    <div className="flex">
      <Badge type="success"> Purchase Requests</Badge>
    </div>

    <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-wrap">
    <div className="overflow-x-auto">
    <table className="min-w-full divide-gray-200 dark:divide-gray-600">
    <thead className="bg-gray-50 dark:bg-gray-800">
    <tr>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Desc
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Quantity
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Unit 
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Proj.Code
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        BL.Code
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Account.Code
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Estimated UP
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Actual UP
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Estimated TP
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Actual TP
      </th>
      <th scope="col"  className="px-6 py-3 text-left text-xs font-bold text-gray-500 dark:text-gray-100 uppercase tracking-wider">
        Show
      </th>
    
    </tr>
  </thead>
  <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-700 dark:divide-gray-600">
        {pGroup?.purchase_requests?.map((owd)=>
    <tr key={owd.id}>
        <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
        <div className="">
        <div className="text-sm font-bold text-gray-900 dark:text-gray-300">
                      {owd.description}
          </div>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">{owd.quantity}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">{owd.unit}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">{owd.owda_project?.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">{owd.owda_budget_line?.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">{owd.owda_project?.owda_account?.code}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">ETB {parseFloat(owd.estimatedUnitPrice).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
  
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">ETB {parseFloat(owd.actualUnitPrice).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">ETB {parseFloat(owd.estimatedTotalPrice).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300">ETB {parseFloat(owd.actualTotalPrice).toLocaleString({maximumFractionDigits:2})}</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm font-bold text-gray-900 dark:text-gray-300"><Link to={`/app/purchaseRequest/${owd.id}`}><FaEdit className='text-blue-500'/></Link></div>
    </td>
  </tr>



    )}
   
    </tbody>
     
    </table>









</div>
</div>

</div>
</div>



<div className="mb-2 mr-6 flex flex-col gap-4 mt-4 w-full">
<h2 className="text-lg font-semibold mb-4 dark:text-gray-300"><Badge type="danger">Quotations Details</Badge></h2>
          {pGroup.request_for_quotations?.length>0 ? pGroup.request_for_quotations?.map((q, index) => (
          
            <div key={index} className="relative flex justify-between items-center bg-white dark:bg-gray-800 rounded-md p-4 shadow-md dark:text-gray-100">
              <div className="flex-1 truncate">
                <p><Link to={`/app/quotation/${q.id}`}>{q.date}</Link></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Date</p>
              </div>
              <div className="flex-1 truncate">
                <p><Link to={`/app/quotation/${q.id}`}>{q.Supplier?.name}</Link></p>
                <p className="text-xs text-gray-600 dark:text-gray-400">Supplier</p>
              </div>
              <div className="flex-1 truncate">
                <a href={`${q.file}`} target='_blank'><FiDownload/></a>
                <p className="text-xs text-gray-600 dark:text-gray-400">Quotation file</p>
              </div>
              <button  className="text-red-500 hover:text-red-600">
                <Link to={`/app/quotation/${q?.id}`}><FaRegEye /></Link>
              </button>
              
              
            </div>
          
          )):<p>No Quotations Submitted</p>}
        </div>




              


    {/* PurchaseGroup information Section */}

    </>
  )
}

export default PurchaseGroupDetail;
