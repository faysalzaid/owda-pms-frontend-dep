import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {GoAlert} from 'react-icons/go';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ApproveConfirm = ({open, handleClose, id, callBack}) => {
 

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="delete-budget"
        style={{
          zIndex: 100000
        }}
      >
        <DialogTitle style={{background: '#474950', color: '#fff', fontFamily: 'ubuntu'}}>
            {"Confirm Approve"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-budget" className='pt-4'>
            <div className='flex gap-4 items-center'>
              <GoAlert style={{
                color: 'orange',
                fontSize: 28
              }}/>
               <p className='font-san' style={{fontFamily: 'ubuntu'}}>
                 Are you sure you want to approve this guy?
               </p>
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
                callBack(id);
                handleClose();
            }}
            variant="contained" 
            color="warning"
            size="small"
           
            style={{
                backgroundColor: '#e8384f',
                fontFamily: 'ubuntu',
                marginLeft: 20
            }}
          >Approve</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ApproveConfirm;