
import React, { useState, useEffect,Fragment } from 'react';import CountsSection from 'components/Counts/Counts' 
import { Card, CardBody } from "@windmill/react-ui";
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'

import PageTitle from '../../components/Typography/PageTitle'



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


import { Link, useHistory, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";





const Settings = () => {
    const {authState,setSettings,settings} = useContext(AuthContext)
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
    const [settingsData,setSettingsData] = useState({ logo:"", name:"", loginlogo:"", address1:"", address2:"" })
    const [logoPreview, setLogoPreview] = useState(null);
    const [loginLogoPreview, setLoginLogoPreview] = useState(null);




    const history = useHistory();
    const currentUrl = history.location.pathname;
    // console.log(currentUrl);

    const [settingsForm,setSettingsForm] = useState({ logo:"", name:"", loginlogo:"", address1:"", address2:"" })

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
           
          
            await axios.get(`${url}/settings/1`,{withCredentials:true}).then((resp)=>{
                  const data = resp.data
                  setSettingsData({id:data.id,logo:data.logo, name:data.name, loginlogo:data.loginlogo, address1:data.address1, address2:data.address2})
                  setSettingsForm({logo:data.logo, name:data.name, loginlogo:data.loginlogo, address1:data.address1, address2:data.address2})
                  setLogoPreview(data.logo)
                  setLoginLogoPreview(data.loginlogo)
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
        // console.log('this is settings id',settingsData.id);
        const formData = new FormData()
        formData.append('name',settingsForm.name)
        formData.append('logo',settingsForm.logo)
        formData.append('loginlogo',settingsForm.loginlogo)
        formData.append('address1',settingsForm.address1)
        formData.append('address2',settingsForm.address2)
        // console.log(formData);
        await axios.put(`${url}/settings/1`,formData,{withCredentials:true}).then((resp)=>{
             console.log(resp.data)
          if(resp.data.error){
            setOpenError({open:true,message:`${resp.data.error}`})
          }else{
         ;
            
            setSettingsData({logo:resp.data.logo, name:resp.data.name, loginlogo:resp.data.loginlogo, address1:resp.data.address1, address2:resp.data.address2})
            setSettingsForm({logo:resp.data.logo, name:resp.data.name, loginlogo:resp.data.loginlogo, address1:resp.data.address1, address2:resp.data.address2})
            setSettings({logo:resp.data.logo, name:resp.data.name, loginlogo:resp.data.loginlogo, address1:resp.data.address1, address2:resp.data.address2})
            setLogoPreview(resp.data.logo)
            setLoginLogoPreview(resp.data.loginlogo)
            setOpenSuccess({open:true,message:"Successfully Updated"})
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

      

  
  




    const handleLogoChange = (e) => {
      // setLogo(e.target.files[0]);
      setSettingsForm({...settingsForm,logo:e.target.files[0]})
      setLogoPreview(URL.createObjectURL(e.target.files[0]));
    };
  
    const handleLoginLogoChange = (e) => {
      // setLoginLogo(e.target.files[0]);
      setSettingsForm({...settingsForm,loginlogo:e.target.files[0]})
      setLoginLogoPreview(URL.createObjectURL(e.target.files[0]));
    };









  // Delete row




  
    return (
      <>
  
        <PageTitle>Settings</PageTitle>
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



    <div className="flex mt-2">
      {/* <Sidebar /> */}
      <div className="bg-white-800 text-gray-100 flex flex-col w-64">
      
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
        <Link
          to={"/settings/profile"}
          className="px-4 py-2 mt-2 text-sm font-semibold text-gray-400 rounded-lg hover:bg-purple-700 hover:text-white"
          style={{ backgroundColor: "rgb(126, 58, 242)",color:'white' }}
        >
          General Settings
        </Link>
        <Link
          to="/settings/account"
          className="px-4 py-2 mt-2 text-sm font-semibold text-gray-400 rounded-lg hover:bg-purple-700 hover:text-white"
        >
          Account
        </Link>
       
      </div>
    </div>

      <div className="flex-grow ml-6">




      <div className="mb-6">
      <h2 className="text-2xl font-bold mb-6 mt-3">Settings</h2>
      <Card className='w-full'>
      <CardBody>
      <form onSubmit={handleSubmit}>
        <Label className="mb-4">
          <span className="block text-gray-700 font-bold mb-2">Name</span>
          <Input
            className="shadow-sm"
            type="text"
            placeholder="Enter name"
            value={settingsForm.name}
            onChange={(e) => setSettingsForm({...settingsForm,name:e.target.value})}
          />
        </Label>
        <Label className="mb-4">
          <span className="block text-gray-700 font-bold mb-2">Logo</span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="hidden"
            id="logo"
            // value={settingsForm.logo}
          
          />
          <Label
            htmlFor="logo"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold cursor-pointer"
          >
            Select Logo
          </Label>
          {logoPreview && (
            <img
              className="h-20 mt-2 mb-4 object-contain"
              src={logoPreview}
              alt="Logo preview"
            />
          )}
        </Label>
        <Label className="mb-4">
          <span className="block text-gray-700 font-bold mb-2">Login Logo</span>
          <Input
            type="file"
            accept="image/*"
            onChange={handleLoginLogoChange}
            className="hidden"
            id="login-logo"
            // value={settingsForm.loginlogo}
          />
          <Label
            htmlFor="login-logo"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold cursor-pointer"
          >
            Select Login Logo
          </Label>
          {loginLogoPreview && (
            <img
              className="h-20 mt-2 mb-4 object-contain"
              src={loginLogoPreview}
              alt="Login Logo preview"
            />
          )}
        </Label>
        <Label className="mb-4">
          <span className="block text-gray-700 font-bold mb-2">Address</span>
          <Input
            className="shadow-sm"
            type="text"
            placeholder="Enter address"
            value={settingsForm.address1}
            onChange={(e) => setSettingsForm({...settingsForm,address1:e.target.value})}
          />
        </Label>
        <Label className="mb-4">
          <span className="block text-gray-700 font-bold mb-2">
            Address 2

            </span>
            <Input
            className="shadow-sm"
            type="text"
            placeholder="Enter address"
            value={settingsForm.address2}
            onChange={(e) => setSettingsForm({...settingsForm,address2:e.target.value})}
          />
          </Label>
          <Button type='submit'>Submit</Button>
          </form>
          </CardBody>
          </Card>
          </div>







        </div>
    </div>
        

      </>
    )


   

}




export default Settings