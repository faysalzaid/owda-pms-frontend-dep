import React, { useState, useEffect, useContext,createContext } from 'react'
import { Link, useParams,useHistory,useLocation } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import "./employee.css"
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'

import { Card, CardBody } from "@windmill/react-ui";
import 'config/custom-button.css'
import {
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'

import { AuthContext } from 'hooks/authContext';
import useAuth from 'hooks/useAuth';
import { FaTrashAlt } from 'react-icons/fa';
import { JobOfferSection } from 'components/EmplUploads/JobOffer';
import { AgreementSection } from 'components/EmplUploads/Agreement';
import { MedicalAllowanceSection } from 'components/EmplUploads/MedicalAllowance';
import { TimesheetSection } from 'components/EmplUploads/TimesheetsSection';
import { AppraisalSection } from 'components/EmplUploads/Appraisals';
import { ConnectProject } from 'components/EmplUploads/ConnectProjectSection';
import { PaymentHistoryComponent } from 'components/EmplUploads/PaymentHistory';









function EmployeeDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" })
    const [openError, setOpenError] = useState({ open: false, message: "" });
    const [offerFile,setOfferFile] = useState({file:"",status:false,id:""})
    const [appraisalFile,setAppraisalFile] = useState({files:[],status:false,})
    const [connectProject,setConnectProject] = useState(false)
    const [paymentHistory,setPaymentHistory] = useState({status:false})
    const [medicalFile,setMedicalFile] = useState({files:[],status:false})
    const [agreementFile,setAgreementFile] = useState({file:"",status:false,id:""})
    const [generalSettings,setGeneralSettings] = useState({status:true})
    const [timesheet,setTimesheet] = useState({status:false,id:""})
    const {settings,authState} = useAuth()
  


    const handleCloseSuccess = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenSuccess({ open: false, message: "" });
    };
  
  
    const handleCloseError = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
  
      setOpenError({ open: false, message: "" });
    };

  
    function closeModal() {
      setIsModalOpen(false)
    }





    const [imagePreview, setImagePreview] = useState(null);
    const [emplForm,setEmplForm] = useState({name:"",email:"",phone:"",status:"",image:"",DepartmentId:"",DesignationId:"", AreaId: "",
          hiredDate:"",
          ssn: "",
          passportNo: "",
          contactPhone: "",
          nationality: "Ethiopian",
          address: "",
          birthday:"",
          postCode:"",
          baseSalary:0,
          duration:0,
          currentSalary:0,
          pCategory:"",
          lastPayment:""
        
        })
    
    

    const [designationData,setDesignationData] = useState([])
    const [departmentData,setDepartmentData] = useState([])
    const [employeeData,setEmployeeData] = useState({})
    const [areaData,setAreaData] = useState([])

    
    const {id} = useParams()

    useEffect(()=>{
      const getData =async()=>{
        let isMounted = true
        if(isMounted){
          await axios.get(`${url}/employees/${id}`,{withCredentials:true}).then((resp)=>{
            // console.log('Employees',resp.data);
            if(resp.data.error){
              setOpenError({open:true, message:`${resp.data.error}`})
            }else{
              setEmployeeData(resp.data)
              setEmplForm(resp.data)
              setImagePreview(resp.data.image)
              setOfferFile({...offerFile,file:resp.data?.job_offer?.file,id:resp.data?.job_offer?.id})
              setAgreementFile({...agreementFile,file:resp.data?.agreement?.file,id:resp.data?.agreement?.id})
              setAppraisalFile({...appraisalFile,files:resp.data?.appraisals})
              setMedicalFile({...medicalFile,files:resp.data?.medical_allowances})
              // console.log(medicalFile.files);
            }
            
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })
        await axios.get(`${url}/departments`,{withCredentials:true}).then((resp)=>{
          setDepartmentData(resp.data)
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })
  
        await axios.get(`${url}/designations`,{withCredentials:true}).then((resp)=>{
          setDesignationData(resp.data)
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })

        await axios.get(`${url}/area`,{withCredentials:true}).then((resp)=>{
          setAreaData(resp.data.area)
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })
  
        }
        return ()=>{
          isMounted=false
        }
      }

      getData()
     
       
    },[])



    const handleImageChange = (e) => {
      // setLogo(e.target.files[0]);
      setEmplForm({...emplForm,image:e.target.files[0]})
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    };



    const updateEmployee =async(e)=>{
      e.preventDefault()
      if(emplForm.name==="" || emplForm.email===""||emplForm.phone===""||emplForm.status===""||emplForm.image===""||emplForm.DepartmentId===null||emplForm.DesignationId===null||emplForm.AreaId===null){
        setOpenError({open:true,message:"Please provide Dep,Des,Area and others  "})
      }else{

        
        const formData = new FormData()
        formData.append('name',emplForm.name)
        formData.append('email',emplForm.email)
        formData.append('phone',emplForm.phone) 
        formData.append('status',emplForm.status)
        formData.append('image',emplForm.image)
        formData.append('DepartmentId',emplForm.DepartmentId)
        formData.append('DesignationId',emplForm.DesignationId)
        formData.append('AreaId',emplForm.AreaId)
        formData.append('hiredDate',emplForm.hiredDate)
        formData.append('ssn',emplForm.ssn)
        formData.append('passportNo',emplForm.passportNo)
        formData.append('contactPhone',emplForm.contactPhone)
        formData.append('address',emplForm.address) 
        formData.append('birthday',emplForm.birthday)
        formData.append('postCode',emplForm.postCode)
        formData.append('nationality',emplForm.nationality)
        formData.append('baseSalary',emplForm.baseSalary)
        formData.append('duration',emplForm.duration)
        formData.append('pCategory',emplForm.pCategory)
        formData.append('lastPayment',emplForm.lastPayment)
        // console.log('The new formdata',formData);
         await axios.post(`${url}/employees/${id}`,formData,{withCredentials:true}).then((resp)=>{
          // console.log('from server',resp.data);
          if(resp.data.error){
            setOpenError({open:true, message:`${resp.data.error}`})
          }else{
              setEmployeeData(resp.data)
              setEmplForm(resp.data)
              closeModal()
              setOpenSuccess({open:true,message:"Successfully Updated"})
          
          }
        }).catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })  
      }
  }



  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen(false)
}
  const openDelete = ()=>{
    setIsDeleteOpen({open:true})
}

// 



//



    const deleteEmployee = ()=>{
      axios.get(`${url}/employees/delete/${id}`).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true, message:`${resp.data.error}`})
        }
        setOpenSuccess({open:true,message:"Successfully Deleted"})
        setTimeout(() => {
          props.history.goBack()
        }, 1000);
        closeModal()
       
       setOpenSuccess({open:true,message:"Deleted Successfully"})
       closeDelete()
      })
    }

    



    const openGeneralSettings =()=>{
      setPaymentHistory({status:false})
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:true})
      setTimesheet({...timesheet,status:false})
      setConnectProject(false)
    }

    const openAppraisal =()=>{
      setAppraisalFile({...appraisalFile,status:true})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(false)
      setPaymentHistory({status:false})
    }

    const openConnectProject =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(true)
      setPaymentHistory({status:false})
    }

    const openTimesheet =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:true})
      setConnectProject(false)
      setPaymentHistory({status:false})
    }

    const openAgreement =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:true})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(false)
      setPaymentHistory({status:false})
    }
    const openMedical =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:true})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(false)
      setPaymentHistory({status:false})
    }

    const openOffer =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:true})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(false)
      setPaymentHistory({status:false})
    }


    const openPaymentHistory =()=>{
      setAppraisalFile({...appraisalFile,status:false})
      setAgreementFile({...agreementFile,status:false})
      setMedicalFile({...medicalFile,status:false})
      setOfferFile({...offerFile,status:false})
      setGeneralSettings({status:false})
      setTimesheet({status:false})
      setConnectProject(false)
      setPaymentHistory({status:true})
    }
// DeleteSections
    const handleOfferDelete =async()=>{
      axios.delete(`${url}/joboffer/${offerFile.id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          setOfferFile({...offerFile,file:""})
          setOpenSuccess({open:true,message:"Successfully Deleted"})
        }
      }).catch((error)=>{
        setOpenError({open:true,message:`${error.response.data.error}`})
      })
    }

    const handleAgreementDelete = async()=>{
      axios.delete(`${url}/agreement/${agreementFile.id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          setAgreementFile({...agreementFile,file:""})
          setOpenSuccess({open:true,message:"Successfully Deleted"})
        }
      }).catch((error)=>{
        setOpenError({open:true,message:`${error.response.data.error}`})
      })
    }


    const handleMedicalDelete = async(mid)=>{
      axios.delete(`${url}/medical/${mid}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          const data = medicalFile.files.filter((id)=>id.id!==mid)
          setMedicalFile({...medicalFile,files:data})
          setOpenSuccess({open:true,message:"Successfully Deleted"})
        }
      }).catch((error)=>{
        setOpenError({open:true,message:`${error.response.data.error}`})
      })
    }

    const handleAppraisalDelete = async(mid)=>{
      axios.delete(`${url}/appraisal/${mid}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`})
        }else{
          const data = appraisalFile.files.filter((id)=>id.id!==mid)
          setAppraisalFile({...appraisalFile,files:data})
          setOpenSuccess({open:true,message:"Successfully Deleted"})
        }
      }).catch((error)=>{
        setOpenError({open:true,message:`${error.response.data.error}`})
      })
    }

// EndofDeleteSections

    return ( 
       <>
       <TitleChange name={`${employeeData.name} |${settings.name}`}/>
         {/* Delete Confirm section */}
         <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteEmployee}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}


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

       <PageTitle>Employee | {employeeData.name}</PageTitle>




          {/* Data section */}
    

          <div className="flex mt-6 main_container ">



      {/* <Sidebar /> */}
      <div className=" left_container bg-white-800 text-gray-100 flex flex-col w-64 ">
      <Input
            type="file"
            accept="image/*"
        
            className="hidden"
            id="file_input"
            onChange={handleImageChange}
            // value={settingsForm.logo}
          
          />
           <Label
            htmlFor="file_input"
            className="inline-block bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-bold cursor-pointer">
            Update Image
          </Label>
        {imagePreview && (
          <Card>
            <CardBody>
            <img
              className="h-200 mt-2 mb-4 object-contain"
              src={imagePreview}
              alt="Logo preview"
            
            />
            </CardBody>
            </Card>
          )}

        <div className=" text-gray-700 flex flex-col mt-2 rounded-md bg-white border border-gray-200 dark:border-transparent dark:bg-gray-800 ">
            <div className="flex flex-col flex-grow pt-2 px-2 pb-4 overflow-y-auto">
                <span
                
                  className={generalSettings.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                  // style={{ backgroundColor: "rgb(126, 58, 242)",color:'white' }}
                  onClick={openGeneralSettings}
                >
                  General Settings
                </span>
                <span
                onClick={openOffer}
                 className={offerFile.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Job Offer Letter
                  
                </span>
                <span
                 onClick={openMedical}
                 className={medicalFile.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100   dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100  dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Medical Allowance
                </span>
                <span
                 onClick={openTimesheet}
                 className={timesheet.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Timesheet
                </span>
                <span
                  onClick={openAppraisal}
                 className={appraisalFile.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Appraisals
                </span>
                <span
                  onClick={openAgreement}
                 className={agreementFile.status?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Agreement Letter
                </span>
                <span
                  onClick={openConnectProject}
                 className={connectProject?"px-4 py-2 mt-2 text-sm font-semibold text-gray-100  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Connect Project
                </span>

                <span
                  onClick={openPaymentHistory}
                 className={paymentHistory.status?"px-4 py-2 mt-2 text-sm font-semibold text-white-400  dark:text-gray-100 rounded-lg custom-button hover:bg-green-700 hover:text-white":"px-4 py-2 mt-2 text-sm font-semibold dark:text-gray-100 rounded-lg hover:bg-green-700 hover:text-white"}
                >
                  Payment History
                </span>
              </div>
            </div>

    </div>





            {/* Empform */}


            {/*  */}

            {/* SideMenu */}
             
    {/* EndOFSideMenu */}




    <div className=" right_container flex-grow ml-2 rounded-md">
      <div className="mb-6">
        <div className='flex'>
      
        <FaTrashAlt className='mt-4 ml-auto text-3xl ml-2 text-red-600' onClick={openDelete}/>
        </div>
      
      {generalSettings.status&&<Card className='w-full'>
      <CardBody>
      <form onSubmit={updateEmployee} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-2">
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Empl Name"  autoComplete='off' value={emplForm.name} onChange={(e)=>setEmplForm({...emplForm,name:e.target.value})}/>
          </Label>
          <Label>
            <span>Email</span>
              <Input type="text" className="mt-1" name="email" placeholder="Empl Email"  autoComplete='off' value={emplForm.email} onChange={(e)=>setEmplForm({...emplForm,email:e.target.value})}/>
          </Label>
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Empl Phone"  autoComplete='off' value={emplForm.phone} onChange={(e)=>setEmplForm({...emplForm,phone:e.target.value})}/>
          </Label>
          <Label className="mt-1">
          <span>Status</span>
          <Select className="mt-1" name="status"  value={emplForm.status} onChange={(e)=>setEmplForm({...emplForm,status:e.target.value})}>
          <option>Select</option>
            <option>active</option>
            <option>disabled</option>
            
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Department <span className='text-1xl font-bold text-red-500'>*</span></span>
          <Select className="mt-1" name="DepartmentId"  value={emplForm.DepartmentId} onChange={(e)=>setEmplForm({...emplForm,DepartmentId:e.target.value})} required>
          <option>Select</option>
          {departmentData.map((dep)=>
          <option key={dep.id} value={dep.id}>{dep.name}</option>
          )}
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Designation <span className='text-1xl font-bold text-red-500'>*</span> </span>
          <Select className="mt-1" name="DesignationId"  value={emplForm.DesignationId} onChange={(e)=>setEmplForm({...emplForm,DesignationId:e.target.value})} required>
          <option>Select</option>
          {designationData.map((des)=>
          <option key={des.id} value={des.id}>{des.name}</option>
          )}
            
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Area <span className='text-1xl font-bold text-red-500'>*</span></span>
          <Select  className="mt-1" name="AreaId"  value={emplForm.AreaId} onChange={(e)=>setEmplForm({...emplForm,AreaId:e.target.value})} required>
          <option>Select</option>
          {areaData.map((des)=>
          <option key={des.id} value={des.id}>{des.name}</option>
          )} 
            
          </Select>
        </Label>

          <Label>
            <span>Hired Date </span>
              <Input type="Date" className="mt-1" name="hiredDate" placeholder="Empl Hired Date"  autoComplete='off' value={emplForm.hiredDate} onChange={(e)=>setEmplForm({...emplForm,hiredDate:e.target.value})}/>
          </Label>
          <Label>

            <span>SSN</span>
              <Input type="text" className="mt-1" name="ssn" placeholder="Empl ssn"  autoComplete='off' value={emplForm.ssn} onChange={(e)=>setEmplForm({...emplForm,ssn:e.target.value})}/>
          </Label>

          <Label>
            <span>Passport Number</span>
              <Input type="text" className="mt-1" name="passportNo" placeholder="Empl passportNo"  autoComplete='off' value={emplForm.passportNo} onChange={(e)=>setEmplForm({...emplForm,passportNo:e.target.value})}/>
          </Label>

          <Label>
            <span>Contact Phone</span>
              <Input type="text" className="mt-1" name="contactPhone" placeholder="Empl contactPhone"  autoComplete='off' value={emplForm.contactPhone} onChange={(e)=>setEmplForm({...emplForm,contactPhone:e.target.value})}/>
          </Label>

          <Label>
            <span>Nationality</span>
              <Input type="text" className="mt-1" name="nationality" placeholder="Empl nationality"  autoComplete='off' value={emplForm.nationality} onChange={(e)=>setEmplForm({...emplForm,nationality:e.target.value})}/>
          </Label>
          <Label>
            <span>Address</span>
              <Input type="text" className="mt-1" name="address" placeholder="Empl address"  autoComplete='off' value={emplForm.address} onChange={(e)=>setEmplForm({...emplForm,address:e.target.value})}/>
          </Label>

          <Label>
            <span>BirthDate</span>
              <Input type="date" className="mt-1" name="birthday" placeholder="Empl birthday"  autoComplete='off' value={emplForm.birthday} onChange={(e)=>setEmplForm({...emplForm,birthday:e.target.value})}/>
          </Label>
          <Label>
            <span>PostCode</span>
              <Input type="text" className="mt-1" name="postCode" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.postCode} onChange={(e)=>setEmplForm({...emplForm,postCode:e.target.value})}/>
          </Label>

          <Label>
            <span>Base Salary (ETB) <span className='text-1xl font-bold text-red-500'>*</span>  </span>
              <Input type="text" className="mt-1" name="postCode" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.baseSalary} onChange={(e)=>setEmplForm({...emplForm,baseSalary:e.target.value})}/>
          </Label>

          <Label>
            <span>Last Payment</span>
              <Input type="date" className="mt-1" name="lastPayment" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.lastPayment} onChange={(e)=>setEmplForm({...emplForm,lastPayment:e.target.value})}/>
          </Label>


          <Label>
            <span>Duration (No of Months) <span className='text-1xl font-bold text-red-500'>*</span>  </span>
              <Input type="text" className="mt-1" name="postCode" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.duration} onChange={(e)=>setEmplForm({...emplForm,duration:e.target.value})} required/>
          </Label>

          <Label>
            <span>Current Salary</span>
              <Input disabled type="text" className="mt-1" name="postCode" placeholder="Empl Postcode"  autoComplete='off' value={emplForm.currentSalary}/>
          </Label>


          <Label className="mt-1">
          <span>Salary Category <span className='text-1xl font-bold text-red-500'>*</span></span>
          <Select  className="mt-1" name="pCategory"  value={emplForm.pCategory} onChange={(e)=>setEmplForm({...emplForm,pCategory:e.target.value})} required>
          <option>Select</option>
          <option value={'contributor'}>Contributor</option>
          <option value={'baser'}>Project Based</option>
          </Select>
        </Label>
      
          
          
        <Label className="mt-6 text-2xl w-full">
          <Button type="submit" className="custom-button">Save</Button>
        </Label>
        </div>
          </form>
              
          </CardBody>
          </Card>}
          {/* Job offer section */}
          {offerFile.status&&<JobOfferSection offerFile={offerFile} setOfferFile={setOfferFile} handleOfferDelete={handleOfferDelete} setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id}/>}
          {/* End of job offer section */}
          {/* Agreement Section */}
          {agreementFile.status&&<AgreementSection setAgreementFile={setAgreementFile} agreementFile={agreementFile} handleAgreementDelete={handleAgreementDelete} setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id}/>}
          {/* End of Agreement Section */}
          {/* Medical Section */}
          {medicalFile.status&&<MedicalAllowanceSection setMedicalFile={setMedicalFile} medicalFile={medicalFile} setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id} handleMedicalDelete={handleMedicalDelete}/>}
          {/* End of medical section */}
          {/* M.timesheet Section */}
          {timesheet.status&&<TimesheetSection mtimesheet={employeeData.Monthlytimesheets}/>}
          {/* End of M.timesheet Section */}
          {/* Appraisal section */}
          {appraisalFile.status&&<AppraisalSection appraisalFile={appraisalFile} setAppraisalFile={setAppraisalFile} setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id} handleAppraisalDelete={handleAppraisalDelete}/>}
          {/* end of appraisal section */}
          {/* connect to project section */}
          {connectProject&&<ConnectProject setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id} setEmployeeData={setEmployeeData} employeeData={employeeData}/>}
          {/* end of connect to project seciton */}
          {/* Payment History  */}
          {paymentHistory.status&&<PaymentHistoryComponent setOpenError={setOpenError} setOpenSuccess={setOpenSuccess} id={id} setEmployeeData={setEmployeeData} employeeData={employeeData}/>}

          {/* end of payment history  */}
          </div>


        </div>
        
    </div>
      {/* End of data section */}

   

    
        
        

         



      </>
     );
}

export default EmployeeDetail;

