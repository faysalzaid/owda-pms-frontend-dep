import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { IconButton, Grid } from '@mui/material';
import { MdClose, MdCached, MdCancel, MdDateRange } from 'react-icons/md';
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { TextField, Dropdown, RichTextInput, DateInput } from 'components/Projects/Inputs/Inputs';
import { MdPhoneInTalk, MdPerson, MdOutlineMailOutline } from 'react-icons/md';
import {AiOutlineCheckCircle, AiOutlineMail} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import {AiFillSetting, AiFillPlusCircle} from 'react-icons/ai';
import {BsFillPersonFill, BsFillShieldLockFill} from 'react-icons/bs';
import { TbColorPicker } from 'react-icons/tb';

import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import {Button} from '@windmill/react-ui'
import { url } from 'config/urlConfig';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



const AddEmployee = ({open, handleClose, user,setOpenError,setOpenSuccess}) => {



  const [dData,setDdata] = useState([])
  const [desData,setDesData] = useState([])
  const [areaData,setAreaData] = useState([])
  const [formData, setFormData] = useState({
    fullName: {value:"", error: "", optional: false},
    phone: {value: "", error: "", optional: false},
    status: {value: "", error: "", optional: false},
    email: {value: "", error: "", optional: false},
    DepartmentId: {value: "", error: "", optional: false},
    DesignationId: {value: "", error: "", optional: false},
    AreaId: {value: "", error: "", optional: false},
    hiredDate: {value: new Date(), error: "", optional: false},
    ssn: {value: "", error: "", optional: false},
    passportNo: {value: "", error: "", optional: false},
    contactPhone: {value: "", error: "", optional: false},
    nationality: {value: "", error: "", optional: false},
    address: {value: "", error: "", optional: false},
    birthday: {value: new Date(), error: "", optional: false},
    postCode: {value: "", error: "", optional: false},
    image: {value: "", error: "", optional: true},
   

  });

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  
  
  useEffect(()=>{

    const myAbortController = new AbortController();


    let isMounted = true
    if(isMounted){
        
        
    
        axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
            if(!resp?.data.error){
                setDdata(resp?.data)
            }else{
                setDdata([])
            }
        })
    
        axios.get(`${url}/designations`,{withCredentials:true}).then((resp)=>{
            if(!resp.data.error){
                setDesData(resp?.data)
            }else{
                setDesData([])
            }
    
        
        })
        axios.get(`${url}/area`,{withCredentials:true}).then((resp)=>{
            if(!resp.data.error){
                setAreaData(resp?.data.area)
            }else{
                setAreaData([])
            }
        })

        
    }


    return ()=>{
        // myAbortController.abort()
        isMounted=false
    }
   

 

  },[]);


  const statuses = [
    {
      id: "active",
      name: "Active"
    },
    {
      id: "inactive",
      name: "InActive"
    }
  ]
  const departmentOptions = dData

  const positionOptions = desData

  const employeeTypeOptions = [
    {
      id: 1,
      name: "Employee Type 1"
    },
    {
      id: 2,
      name: "Employee Type 2"
    }
  ]

  const areaOptions = areaData

  const genderOptions = [
    {
      id: 1,
      name: "Male"
    },
    {
      id: 2,
      name: "Female"
    }
  ]

  const submitAdd = () => {
    // console.log('clicked',formData);
    const nformData = new FormData()
    nformData.append('name',formData.fullName.value)
    nformData.append('phone',formData.phone.value)
    nformData.append('status',formData.status.value)
    nformData.append('email',formData.email.value)
    nformData.append('DepartmentId',formData.DepartmentId.value)
    nformData.append('DesignationId',formData.DesignationId.value)
    nformData.append('AreaId',formData.AreaId.value)
    nformData.append('hiredDate',formData.hiredDate.value)
    nformData.append('ssn',formData.ssn.value)
    nformData.append('passportNo',formData.passportNo.value)
    nformData.append('contactPhone',formData.contactPhone.value)
    nformData.append('nationality',formData.nationality.value)
    nformData.append('address',formData.address.value)
    nformData.append('birthday',formData.birthday.value)
    nformData.append('postCode',formData.postCode.value)
    nformData.append('image',formData.image.value)

    console.log('New form:',nformData);
    // axios.post(`${url}/employees/`,nformData,{withCredentials:true}).then((resp)=>{
    //     console.log('resp.data is :',resp.data);
    //     if(resp.data.error){
    //         const msg = resp.data.error
    //         setOpenError({open:true,message:msg})
    //         console.log(resp.data.error);
    //         handleClose();
    //     }else{
    //         const userData = resp.data 
    //         setFormData({
    //             fullName: {value: userData?.name, error: "", optional: false},
    //             phone: {value: userData?.phone, error: "", optional: false},
    //             status: {value: userData?.status, error: "", optional: false},
    //             email: {value: userData?.email, error: "", optional: false},
    //             DepartmentId: {value: userData?.DepartmentId, error: "", optional: false},
    //             DesignationId: {value: userData?.DesignationId, error: "", optional: false},
    //             AreaId: {value: userData?.AreaId, error: "", optional: false},
    //             hiredDate: {value: userData?.hiredDate, error: "", optional: false},
    //             ssn: {value: userData?.ssn, error: "", optional: false},
    //             passportNo: {value: userData?.passportNo, error: "", optional: false},
    //             contactPhone: {value: userData?.contactPhone, error: "", optional: false},
    //             nationality: {value: userData?.nationality, error: "", optional: false},
    //             address: {value: userData?.address, error: "", optional: false},
    //             birthday: {value: userData?.birthday, error: "", optional: false},
    //             postCode: {value: userData?.postCode, error: "", optional: false},
               
    //           });
    //         setOpenSuccess({open:true,message:"Updated Successfully"})
            
            
    //         handleClose()
    //     }
    // })
    //   copy formData to new FormData object and then bla bla bla bla...
    //   after sumbit.then((bla)=>{bla bla...}) then call handleClose(); and reload user info from parent
      handleClose();
  }

  const [tab, setTab]  = useState(1);
  
  return (
    <div>




      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        maxWidth="lg"
        fullWidth={true}
        fullScreen={fullScreen}
      >
            <div style={{minWidth: 500, fontFamily: 'ubuntu'}}>
   
                    <Grid container>
                        <Grid item xs={12} sm={4} style={{background: '#f1f1f1'}}>
                             <div className='flex  flex-col' style={{minHeight: '37vh'}}>
                                <div className='pt-6 w-full'>
                                    <div className='flex justify-center'>
                                        <div className='relative'>
                                            <img className="rounded-full border-4" style={{width: 110, height: 110}} src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"/>
                                            <IconButton
                                              style={{
                                                position: 'absolute',
                                                zIndex: 100,
                                                top: 0,
                                                right: -10,
                                                fontSize: 30,
                                                color: '#3fa6cf'
                                             }}
                                             onClick={()=>{

                                             }}
                                            >
                                                <AiFillPlusCircle />
                                            </IconButton>
                                        </div>
                                    </div>
                                    <p className= 'text-center text-lg text-gray-600 font-bold mt-1' style={{}}>Faysal Ali</p>
                                </div>
                                <div className='w-full mt-10'>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==1 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(1)}>
                                       <AiFillSetting fontSize={17} color={tab==1 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500 text-lg' style={{color: tab==1 ? "#3fa6cf" : '', fontSize: 16}}>Add Employee</p>
                                    </div>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==2 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(2)}>
                                       <BsFillPersonFill fontSize={17} color={tab==2 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500' style={{color: tab==2 ? "#3fa6cf" : '', ontSize: 16}}>Personal Information</p>
                                    </div>
                                    <div className={`flex justify-start items-center pb-1 pt-1 mb-4 ${tab==3 ? 'border-l-4': ''} cursor-pointer`} style={{borderColor: '#3fa6cf'}} onClick={()=>setTab(3)}>
                                       <BsFillShieldLockFill fontSize={17} color={tab==3 ? "#3fa6cf" : '#c7c7c7'} className='ml-5'/>
                                       <p className='ml-4 text-gray-500' style={{color: tab==3 ? "#3fa6cf" : '', fontSize: 16}}>Privacy </p>
                                    </div>
                                </div>
                            </div>
                            
                        </Grid>
                        <Grid item xs={12} sm={8} className='bg-[#ffffff]' style={{marginBottom: 50}}>
                             {tab==1 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Account Settings</p>
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="fullName"
                                                labelText={"Full Name"}
                                                placeholder="Enter name"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdPerson />}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="email"
                                                labelText={"Email"}
                                                placeholder="Enter email"
                                                style={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdOutlineMailOutline />}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="phone"
                                                labelText={"Phone number"}
                                                placeholder="Enter phone number"
                                                style={{
                                                    marginBottom: 2,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10,
                                                }}
                                                className={``}
                                                startIcon={<MdPhoneInTalk fontSize = {19}/>}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="status"
                                                options={statuses}
                                                labelText="Status"
                                                open={open}
                                                selectText="Select Status"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                className="mt-4 "
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="DepartmentId"
                                                options={departmentOptions}
                                                labelText="Department"
                                                open={open}
                                                selectText="Select Department"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                className="mt-4 "
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="DesignationId"
                                                options={positionOptions}
                                                labelText="Position"
                                                open={open}
                                                selectText="Select Position"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                className="mt-4 "
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <Dropdown
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="AreaId"
                                                options={areaOptions}
                                                labelText="Area"
                                                open={open}
                                                selectText="Select Area"
                                                style={{
                                                  paddingTop: 0,
                                                  marginTop: 10
                                                }}
                                                className="mt-4 "
                                                
                                                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
                                            />
                                        </Grid>
                                       
                                        <Grid item sm={12} lg={6}>
                                            <DateInput 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="hiredDate"
                                                labelText="Hired Date"
                                                type="desktop"
                                                inputStyle={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdDateRange />}
                                                endIcon={<TbColorPicker />}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <Input type='file' label="image"
                                            // formData={formData}
                                            // setFormData={setFormData}
                                           
                                            
                                            required
                                            onChange={(e)=>setFormData({...formData,image:{value: e.target.files[0], error: "", optional: false}})}/>
                                            
                                            </Grid>
                                     
                                        

                                    </Grid>
                             </div>}


                             {tab==2 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Personal Information</p>
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="ssn"
                                                labelText="SSN"
                                                placeholder="Enter ssn"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="passportNo"
                                                labelText="Passport number"
                                                placeholder="Enter passport no"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="contactPhone"
                                                labelText="Contact Phone"
                                                placeholder="Enter contact phone"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="nationality"
                                                labelText="Nationality"
                                                placeholder="Enter nationality"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="address"
                                                labelText="Address"
                                                placeholder="Enter address"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                        <Grid item sm={12} lg={6}>
                                            <DateInput 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="birthday"
                                                labelText="Birthday"
                                                type="desktop"
                                                inputStyle={{
                                                    marginBottom: 5,
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                                startIcon={<MdDateRange />}
                                                endIcon={<TbColorPicker />}
                                            />
                                        </Grid>
                                           
                                    </Grid>
                              </div>}

                              {tab==3 && <div className='flex justify-start pl-10 pt-10 items-center w-full'>
                                    <Grid container spacing={2} style={{marginRight: 25}}>
                                        <Grid item xs={12} style={{marginBottom: 10}}>
                                            <p className='text-xl'>Privacy</p>
                                        </Grid>

                                        <Grid item sm={12} lg={6}>
                                            <TextField 
                                                formData={formData}
                                                setFormData={setFormData}
                                                label="postCode"
                                                labelText="Postcode"
                                                placeholder="Enter postcode"
                                                style={{
                                                    marginBottom: 2,
                                                    
                                                }}
                                                containerStyle={{
                                                    marginBottom: 0,
                                                    marginTop: 10
                                                }}
                                            />
                                        </Grid>
                                          
                                       
                                    </Grid>
                                    
                              </div>}
                              <div className='mt-6 ml-8'>
                                                <Button onClick={submitAdd}>Update</Button>
                                            </div>

                        </Grid>
                                             
                    </Grid>

            </div>
      </Dialog>
    </div>
  );
}

export default AddEmployee;