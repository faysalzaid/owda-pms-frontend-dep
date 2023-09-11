import React, { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import PageTitle from '../../components/Typography/PageTitle'
import SectionTitle from '../../components/Typography/SectionTitle'
import axios from 'axios'
import getCookie from 'hooks/getCookie'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
// import { EditIcon,EyeIcon,EyeIconOne, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import * as Yup from 'yup'
// import response from '../utils/demo/tableData'
import { useContext } from 'react'
import { AuthContext } from '../../hooks/authContext'
import { url } from 'config/urlConfig'
import { ErrorAlert, SuccessAlert } from "components/Alert";
import useAuth from 'hooks/useAuth'
import setCookie from 'hooks/setCookie'
import "config/custom-button.css"

// make a copy of the data, for the second table







function ProfilePage(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {settings,authState,setAuthState} = useContext(AuthContext)
  // console.log(authState);
  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }


  
  const {id} = useParams()



  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = (id)=>{
    setIsDeleteOpen({open:true,id:id})
}

    const cookie = localStorage.getItem('User');





    
    //COMAPNY DATA STATES
    const [companyData,setCompanyData] = useState([])
    const [companyFormData,setCompanyFormData] = useState({name:"",location:"",UserId:""})
    const [errorMessage,setErrorMessage] = useState('')
    const [frontErrorMessage,setFrontErrorMessage] = useState('')
    const [showModal, setShowModal] = useState({show:false,id:""});
    const [users,setUsers] = useState({})
    const [usersForm,setUsersForm] = useState({
      id:authState.id,
      name:authState.username,
      email:authState.email,
      image:authState.image,
      role:authState.role,
      password:""
    })

    //ENDOF COMPANY DATA
    let parseToken = JSON.parse(cookie)
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





  useEffect(()=>{
    const companyFetch = async()=>{
        const response = await axios.get(`${url}/companies/${id}`,{withCredentials:true})
        if(response.data.error) setFrontErrorMessage(response.data.error)
        setCompanyData(response.data)
        setCompanyFormData({name:response.data.name,location:response.data.location,UserId:response.data.UserId})
        // console.log(response.data);
        // console.log('this is from params',id);
        await axios.get(`${url}/users/${authState.id}`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
          }else{
            
            setUsers(resp.data)
            setUsersForm({
              id:resp.data.id,
              name:resp.data.name,
              email:resp.data.email,
              image:resp.data.image,
              role:resp.data.role,
              password:""

            })
          }
        })
    }

  
    companyFetch()
    
    // console.log(parseToken.token);
  },[])


  const updateProfile =async(e)=>{
    e.preventDefault()
    const formData = new FormData();
    formData.append("name", usersForm.name);
    formData.append("email", usersForm.email);
    formData.append("role", usersForm.role);
    formData.append("password", usersForm.password);
    formData.append("image",usersForm.image)
    // console.log(usersForm);
    const response = await axios.post(`${url}/users/${authState.id}`,formData,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          // console.log(parseToken?.token);
          // console.log(resp.data);
          const newData = {
          id: resp.data.id,
          token: parseToken?.token,
          username: resp.data.name,
          email: resp.data.email,
          image:resp.data.image,
          role: resp.data.role,
          state: true,
 
          }
          const newCookie = JSON.stringify(newData)
          localStorage.setItem('User', newCookie); 
          setAuthState({ 
            id:resp.data.id,
            username:resp.data.name, 
            email:resp.data.email,
            image:resp.data.image, 
            role:resp.data.role,
            state:true,
       
          })
          setUsersForm({ 
            id:resp.data.id,
            name:resp.data.name,
            image:resp.data.image,
            email:resp.data.email,
            role:resp.data.role,
            password:""
          })
        
          // console.log('passed the authstate');
          setOpenSuccess({open:true,message:"Successfully Added"})
          closeModal()
        }
      // console.log(companyFormData);
      })
    

}
const deleteCompany =async()=>{
  const response = await axios.get(`${url}/companies/delete/${id}`,{withCredentials:true}).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
      props.history.push('/app/companies')
      
    }
  })
}
  return (
    <>
      <PageTitle>{authState.username} | Profile Page</PageTitle>
        {/* Notification Section */}
        <ErrorAlert
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

      {/* Delete Confirm section */}
      <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteCompany}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}
     

      <div>
        <Button onClick={openModal} className="ml-1 custom-button">Update Profile</Button>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Update Profile Info</ModalHeader>
        <span style={{color:'red'}}>{errorMessage}</span>
        <ModalBody>
          
        <form onSubmit={e=>{updateProfile(e)}} encType="multipart/form-data">
        <Label>
          <span>Username</span>
            <Input type="text" className="mt-1" name="name" placeholder="Company Name" value={usersForm.name} autoComplete='off' onChange={e=>setUsersForm({...usersForm, name:e.target.value})}/>
        </Label>
        <Label>
          <span>email</span>
          <Input type="text" className="mt-1" name="email" placeholder="Jijiga"  value={usersForm.email} onChange={e=>setUsersForm({...usersForm,email:e.target.value})}/>
        </Label>

       
        <Label className="mt-4">
                <span>Update Image</span>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setUsersForm({ ...usersForm, image:e.target.files[0] })
                  }
                  className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1"
                />
              </Label>

        <Label>
          <span>
                  Password{" "}
                  <small style={{ color: "red" }}>
                    (write new password if you want to update it )
                  </small>
                </span>
          <Input type="text" className="mt-1" name="password"  value={usersForm.password} onChange={e=>setUsersForm({...usersForm,password:e.target.value})}/>
        </Label>
       

        <Button className="mt-4 custom-button" type="submit">Save</Button>
        </form>
            
   
        </ModalBody>
        <ModalFooter>
          {/* I don't like this approach. Consider passing a prop to ModalFooter
           * that if present, would duplicate the buttons in a way similar to this.
           * Or, maybe find some way to pass something like size="large md:regular"
           * to Button
           */}
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
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

  




                {/* Profile Detail */}

<div className="bg-gray-50 flex flex-col justify-center py-12 sm:px-9 lg:px-9">
  <div className="w-full">
    <div className="bg-white shadow-md rounded-md overflow-hidden">
      <div className="px-6 py-8">
        <div className="flex justify-between items-center">
          <div className=" items-center">
            <img src={authState.image} alt="Company Logo" style={{width:200}} className=" mr-2" />
            <h2 className="text-lg font-medium text-gray-900">Profile Info</h2>
          </div>
         
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">User Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">UserName:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.username}</p>
            </div>
            <div className="flex mt-2">
              <p className="text-sm font-medium text-gray-500">Email:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.email}</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-md font-medium text-gray-900">Role Information</h3>
          <div className="mt-2">
            <div className="flex">
              <p className="text-sm font-medium text-gray-500">Role Info:</p>
              <p className="ml-2 text-sm font-medium text-gray-900">{authState.role}</p>
            </div>
         
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
              



                {/* Endof Profiel detail */}
    </>
  )
}

export default ProfilePage
