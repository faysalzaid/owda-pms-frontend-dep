import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TextField, Dropdown } from 'components/Projects/Inputs/Inputs';
import {A1, A2, A3, A4, A5, A6} from './avatars';
import { BsPersonPlus } from 'react-icons/bs';
import { useEffect } from 'react';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import { AuthContext } from 'hooks/authContext';
import { useContext } from 'react';



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const NewMessageDialog = ({open, handleClose, messages, setMessages,setOpenError,setOpenSuccess,setSlips,slips}) => {
  const {authState,settings} = useContext(AuthContext)
  const [formData, setFormData] = useState({
      to: {value: "", error: "", optional: false},
      ProjectId:{value:"",error:"",optional:""},
      UserId:{value:"",error:"",optional:""},
      subject: {value: "", error: "", optional: false},
      message: {value: "", error: "", optional: false},
  })

  const [projects,setProjects] = useState([])
  const [users, setUsers] = useState([
    {
      id: 1, 
      name: 'Ousman Seid',
      // url: A1
    },
    {
      id: 2,
      name: "Faysal Ali",
      // url: A2
    },
    {
      id: 3,
      name: "Khadar Baxar",
      // url: A3,
    }
  ])

  useEffect(()=>{
    axios.get(`${url}/projects`).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:"Error on Getting Projects"})
      }else{
        setProjects(resp.data.projects)
      }
    })
  },[])


  const handleSend = async() => {
    if(!formData.to.value || !formData.message.value || !formData.subject.value){
      setOpenError({open:true,message:"All Fields Required"})
      return
    }
     let msgs = messages;
     let pr = {}
     projects.map((prj)=>{
       if(prj.id === formData.ProjectId.value) {
          pr = {
            id: prj.id,
          }
       }
     })
     msgs.push(
        {
          to: formData.to.value,
          ProjectId:pr.id,
          subject: formData.subject.value,
          message: formData.message.value,
          time: "feb 2",
          read: false,
        }
     )
     const request={
      to: formData.to.value,
      ProjectId:pr.id,
      subject: formData.subject.value,
      message: formData.message.value,
      UserId:authState.id
    }
     console.log('new data',request);
     await axios.post(`${url}/slip`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:"Error Occurred"})
      }
      console.log(resp.data);
      setSlips([...slips,resp.data])
      setFormData({to: {value: "", error: "", optional: false},
      ProjectId:{value:"",error:"",optional:""},
      UserId:{value:"",error:"",optional:""},
      subject: {value: "", error: "", optional: false},
      message: {value: "", error: "", optional: false},})
     })
     setOpenSuccess({open:true,message:"Successfully added"})
     setMessages((prev)=>msgs)

     handleClose();
  }
  return (
    <div style={{minWidth: 300}}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="new-message"
        fullWidth="lg"
      >
        {/* {background: '#f2f6fc', color: '#041e49',} */}
        <DialogTitle style={{fontFamily: 'ubuntu'}} className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
            {"New Message"}
        </DialogTitle>
        <DialogContent className='dark:bg-gray-800'>
          <DialogContentText id="new-message" className='pt-4'>
            <div className=''>
                <Dropdown
                    formData={formData}
                    setFormData={setFormData}
                    label="ProjectId"
                    options={projects}
                    labelText="Project"
                    open={open}
                    // startIcon={<BsPersonPlus/>}
                    //selectText="Not Selected"
                    style={{
                      marginBottom: 10
                    }}
                />
                <TextField
                    formData={formData}
                    setFormData={setFormData}
                    label="subject"
                    labelText="Subject"
                    placeholder="Enter subject"
                    containerStyle={{
                       marginBottom: 10
                    }}
                />
                <TextField
                    formData={formData}
                    setFormData={setFormData}
                    label="to"
                    labelText="Name of the person it concerns"
                    placeholder="Enter subject"
                    containerStyle={{
                       marginBottom: 10
                    }}
                />
               
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mb-2'>
          <Button 
            onClick={handleClose}
            variant="contained" 
            color="error"
            size="small"
            style={{
                backgroundColor: '#747475',
                fontFamily: 'ubuntu'
            }}
          >Cancel</Button>
          <Button 
            onClick={()=>{
                handleSend()
            }}
            variant="contained" 
            color="success"
            size="small"
           
            style={{
                fontFamily: 'ubuntu',
                marginLeft: 20,
                marginRight: 15
            }}
          >Send message</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NewMessageDialog;