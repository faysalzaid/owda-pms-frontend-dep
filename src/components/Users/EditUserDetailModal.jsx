import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box, IconButton } from '@mui/material';
import { MdClose, MdCached, MdCancel } from 'react-icons/md';

import { TextField, Dropdown } from 'components/Projects/Inputs/Inputs';
import { MdPhoneInTalk, MdPerson, MdOutlineMailOutline } from 'react-icons/md';
import {AiOutlineCheckCircle, AiOutlineMail} from 'react-icons/ai';
import { useEffect, useState } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const EditUserDetailDialog = ({open, handleClose, user}) => {

  const [formData, setFormData] = useState({
    fullName: {value: user.name, error: "", optional: false},
    phone: {value: user.phone, error: "", optional: false},
    status: {value: "", error: "", optional: false}

  });
  
  useEffect(()=>{

    setFormData({
      fullName: {value: user?.name, error: "", optional: false},
      phone: {value: user?.phone, error: "", optional: false},
      status: {value: user?.status, error: "", optional: false},
      email: {value: user?.email, error: "", optional: false},
    });

  },[user.id]);


  const statuses = [
    {
      id: "active",
      name: "Active"
    },
    {
      id: "disabled",
      name: "InActive"
    }
  ]

  const submitUpdate = () => {
    console.log('submitted');
      //copy formData to new FormData object and then bla bla bla bla...
      //after sumbit.then((bla)=>{bla bla...}) then call handleClose(); and reload user info from parent
      handleClose();
  }
  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="delete-budget"
      >
            <div style={{minWidth: 500}}>
                <DialogTitle style={{background: '#474950', color: '#fff', fontFamily: 'ubuntu'}}>
                  <Box display="flex" alignItems="center">
                      <img 
                       style={{width: 100, height: 100}}
                        src={user.image===null?'/uploads/profile.png':`/uploads/employees/${user.image}`}
                        className="rounded-full border-4 mr-6"/>
                      <Box flexGrow={1} style={{color: 'white', fontFamily: 'ubuntu', marginRight: 50}}>
                        <p style={{fontSize: 22}}>{user.name??""}</p>
                        {user.email && <p style={{fontSize: 14, color: 'rgba(255,255,255,.8', marginTop: -5}}>{user.email}</p>}
                      </Box>
                      <Box>
                          <IconButton onClick={handleClose}>
                                <MdClose style={{color: 'white'}}/>
                          </IconButton>
                      </Box>
                  </Box>
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="delete-budget" className='pt-4'>
                    
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
                    marginBottom: 30,
                    marginTop: 30
                  }}
                  startIcon={<MdPerson />}
            
                  />

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
                    marginBottom: 30,
                    marginTop: 30
                  }}
                  startIcon={<MdOutlineMailOutline />}
                />

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
                    marginBottom: 30,
                    
                  }}
                  className={``}
                  startIcon={<MdPhoneInTalk fontSize = {19}/>}
              />

              <Dropdown
                formData={formData}
                setFormData={setFormData}
                label="status"
                options={statuses}
                labelText="Status"
                open={open}
                //selectText="Not Selected"
                style={{
                  paddingBottom: 20
                }}
                inputStyle={{
                   
                }}
                startIcon={<AiOutlineCheckCircle fontSize={20}/>}
              />


                </DialogContentText>
                </DialogContent>
                <DialogActions className='mb-2'>
                <Button 
                    onClick={handleClose}
                    variant="contained" 
                    color="error"
                    size="medium"
                    style={{
                        backgroundColor: '#747475',
                        fontFamily: 'ubuntu'
                    }}
                    startIcon={<MdCancel/>}
                >Cancel</Button>
                <Button 
                    onClick={()=>{
                        submitUpdate();
                    }}
                    variant="contained" 
                    color="error"
                    size="medium"
                
                    style={{
                        backgroundColor: 'green',
                        fontFamily: 'ubuntu',
                        marginLeft: 20,
                        marginRight: 10,
                        marginBottom: 10,
                        marginTop: 10,
                    }}
                    startIcon={<MdCached/>}
                >Update</Button>
                </DialogActions>
            </div>
      </Dialog>
    </div>
  );
}

export default EditUserDetailDialog;