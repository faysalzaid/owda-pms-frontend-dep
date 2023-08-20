
import React, { useState, useEffect, Fragment, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FaCheckCircle, FaFileDownload } from 'react-icons/fa';
import { TableBody, TableContainer, Table, TableHeader, TableCell, TableRow, Button } from '@windmill/react-ui';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui';
import { Input, Label, Select } from '@windmill/react-ui';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
import { ErrorAlert, SuccessAlert } from 'components/Alert';
import 'config/custom-button.css'
import { AuthContext } from 'hooks/authContext';


const SupplierDetail = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fetchedResult, setFetchedResult] = useState([]);
  const [suppliers, setSuppliers] = useState({});
  const {authState,settings} = useContext(AuthContext);

  const [formValues, setFormValues] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
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
      await axios
        .get(`${url}/suppliers/${id}`, { withCredentials: true })
        .then((resp) => {
          if (resp.data.error) return setOpenError({ open: true, message: 'Error Occurred' });
          setSuppliers(resp.data);
          setFormValues({
            name: resp.data.name,
            phone: resp.data.phone,
            address: resp.data.address,
            email: resp.data.email,
          })
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

      <Button onClick={openModal} className='mt-6 custom-button'>
        Update Supplier
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

<div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">

  <h2 className="text-xl font-semibold mb-4">Supplier Details</h2>
  <p className="text-gray-600 font-bold dark:text-gray-300 mb-2"><span className="font-semibold">Name:</span> {suppliers.name}</p>
  <p className="text-gray-600 font-bold dark:text-gray-300 mb-2"><span className="font-semibold">Phone:</span> {suppliers.phone}</p>
  <p className="text-gray-600 font-bold dark:text-gray-300 mb-2"><span className="font-semibold">Email:</span> {suppliers.email}</p>
  <p className="text-gray-600 font-bold dark:text-gray-300 mb-4"><span className="font-semibold">Address:</span> {suppliers.address}</p>

  <h2 className="text-xl font-semibold mb-2">Related Files</h2>
      <ul className="text-gray-600 dark:text-gray-100 space-y-2">
        <li className="flex items-center">
          <FaFileDownload className="mr-2" />
          <a href="#" className="hover:text-green-600 font-bold">
            Invoice - ABC123.pdf
          </a>
        </li>
       
      </ul>
</div>


     

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalHeader>Update Supplier</ModalHeader>
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

export default SupplierDetail;
