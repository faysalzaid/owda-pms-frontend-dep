import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Button } from '@windmill/react-ui';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { Input, Label, Select } from '@windmill/react-ui';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
import { ErrorAlert, SuccessAlert } from 'components/Alert';
import 'config/custom-button.css'
import { AuthContext } from 'hooks/authContext';


const SupplierList = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [suppliers, setSuppliers] = useState([])
  const {authState,settings} = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
  });

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
      await axios
        .get(`${url}/suppliers`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.error) return setOpenError({ open: true, message: 'Error Occurred' });
          setSuppliers(resp.data);
        })
        .catch((error) => {
          if (error.response && error.response.data && error.response.data.error) {
            setOpenError({ open: true, message: `${error.response.data.error}` });
          } else {
            setOpenError({ open: true, message: 'An unknown error occurred' });
          }
        });
    };

    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formValues.name === '' || formValues.phone === '' || formValues.address === '' || formValues.email === '')
      return setOpenError({ open: true, message: 'Please provide all the required information' });

    await axios
      .post(`${url}/suppliers`, formValues, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        } else {
          setSuppliers((prev) => [...prev,resp.data]);
          setOpenSuccess({ open: true, message: 'Successfully Added' });
          closeModal();
        }
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });
  };

  useEffect(() => {
    setFetchedResult(searchTerm.length < 1 ? suppliers : searchResult);
  }, [suppliers, searchTerm]);

  const searchHandler = (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newSuppliers = suppliers?.filter((supplier) => {
        return Object.values(supplier).join(' ').toLowerCase().includes(search.toLowerCase());
      });
      setSearchResult(newSuppliers);
    } else {
      setSearchResult(suppliers);
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: '' });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id });
  };

  // Delete row
  const handleDelete = async () => {
    await axios
      .delete(`${url}/suppliers/${isDeleteOpen.id}`, { withCredentials: true })
      .then((resp) => {
        const data = suppliers.filter((supplier) => supplier.id !== isDeleteOpen.id);
        setSuppliers(data);
        setOpenSuccess({ open: true, message: 'Deleted Successfully' });
        closeDelete();
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({ open: true, message: `${error.response.data.error}` });
        } else {
          setOpenError({ open: true, message: 'An unknown error occurred' });
        }
      });
  };

  return (
    <>
      <div className='mb-5 mt-6'>
        <label htmlFor='default-search' className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'>
          Search
        </label>
        <div className='relative'>
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <svg
              aria-hidden='true'
              className='w-5 h-5 text-gray-500 dark:text-gray-400'
              fill='none'
              strokeWidth='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
            </svg>
          </div>
          <Input
            type='search'
            id='default-search'
            value={searchTerm}
            onChange={(e) => searchHandler(e.target.value)}
            className='block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Search supplier...'
            required
          />
        </div>
      </div>

      <Button onClick={openModal} className='mt-4 custom-button'>
        Add Supplier
      </Button>

      <TitleChange name={`${settings.name} | Dashboard`}/><ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal='right'
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal='right'
      />

      <TableContainer className='bg-white rounded-lg shadow-lg'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell className='font-semibold'>Supplier Name</TableCell>
              <TableCell className='font-semibold'>Phone</TableCell>
              <TableCell className='font-semibold'>Address</TableCell>
              <TableCell className='font-semibold'>Email</TableCell>
              <TableCell className='font-semibold text-center'>Actions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fetchedResult
              ? fetchedResult.map((row, i) => (
                  <Fragment key={i}>
                    <TableRow className='mb-4'>
                      <TableCell>
                        <span className='text-sm font-semibold'>{row.name}</span>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm font-semibold'>{row.phone}</span>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm font-semibold'>{row.address}</span>
                      </TableCell>
                      <TableCell>
                        <span className='text-sm font-semibold'>{row.email}</span>
                      </TableCell>
                      <TableCell className='flex justify-center space-x-2 mt-4'>
                        <Link to={`/app/supplier/${row.id}`}>
                          <Button layout='link' size='small'>
                            <EditIcon className='h-5 w-5 text-blue-600' />
                          </Button>
                        </Link>
                        <Button layout='link' size='small' onClick={() => openDelete(row.id)}>
                          <TrashIcon className='h-5 w-5 text-red-600' />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Fragment>
                ))
              : ''}
          </TableBody>
        </Table>
      </TableContainer>

     

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Add Supplier</ModalHeader>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <div className='grid grid-cols-1 gap-4'>
              <Label>
                <span>Supplier Name</span>
                <Input
                  type='text'
                  className='mt-1'
                  name='name'
                  value={formValues.name}
                  onChange={(e) => setFormValues({ ...formValues, name: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Phone</span>
                <Input
                  type='text'
                  className='mt-1'
                  name='phone'
                  value={formValues.phone}
                  onChange={(e) => setFormValues({ ...formValues, phone: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Address</span>
                <Input
                  type='text'
                  className='mt-1'
                  name='address'
                  value={formValues.address}
                  onChange={(e) => setFormValues({ ...formValues, address: e.target.value })}
                  required
                />
              </Label>

              <Label>
                <span>Email</span>
                <Input
                  type='email'
                  className='mt-1'
                  name='email'
                  value={formValues.email}
                  onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                  required
                />
              </Label>
            </div>

            <Button className='mt-6 custom-button' type='submit'>
              Submit
            </Button>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button layout='outline' onClick={closeModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to perform this action?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className='px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600'
            onClick={handleDelete}
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default SupplierList;
