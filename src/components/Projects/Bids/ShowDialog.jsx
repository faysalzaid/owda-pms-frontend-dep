import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import "./bid_detail_dialog.scss";
import {BsFillPatchCheckFill} from 'react-icons/bs';

import { MdClose } from 'react-icons/md';
import { Icon, IconButton } from '@mui/material';

import {GoBrowser} from 'react-icons/go';
import {AiOutlineDownload} from 'react-icons/ai';

import ApproveConfirm from './ApproveConfirm';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ShowDetail = ({open, handleClose, bidDetail, statuses, callBack}) => {

  const downloadFile = (link) => {
    fetch(link).then(response => {
            response.blob().then(blob => {
                const fileURL = window.URL.createObjectURL(blob);
                let alink = document.createElement('a');
                alink.href = fileURL;
                alink.download = link.split('/').pop();
                alink.click();
            })
        })
    }

  const stat = () => {
      let stts = "";
      const color = {text: bidDetail?.status === 1 ? "#cd3232" : "#046c4e", bg: bidDetail?.status===1 ? "#fde8e8" : "#def7ec"}
      statuses.map((st)=>{
          if(st.id === bidDetail?.status) {
              stts = <div className='stts' style={{backgroundColor: color.bg, color: color.text}}>{st.name}</div>;
          }
      });
      return stts;
  }
  let status = stat();

  const handleConfirmCallBack = () => {
     callBack(bidDetail?.id)
     handleClose();
  }

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleClickOpenConfirm = () => {
    setOpenConfirm(true);
    
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <div>
      <ApproveConfirm open={openConfirm} handleClose={handleCloseConfirm} callBack={handleConfirmCallBack}/>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="show-bid-detail"
      >
        <DialogTitle style={{ fontFamily: 'ubuntu', minWidth: 300, color: '#fff', background: "linear-gradient(to right, #7e3af2, #9164d1)", fontWeight: 'bold'}} >
            {"Bid Detail"}
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 10,
                top: 10,
                color: "#fff",
              }}
            >
              <MdClose onClick={handleClose}/>
            </IconButton>
        </DialogTitle>
        <DialogContent className='mt-3'>
          <DialogContentText id="show-bid-detail" className='pt-4'>
            <div className='bid-detail-dialog'>
              <table>
                <tbody>
                  <tr>
                    <td className='left-side'>Name </td>
                    <td className='right-side'>{bidDetail?.fullname}</td>
                  </tr>
                  <tr>
                    <td className='left-side'>Phone Number </td>
                    <td className='right-side'>{bidDetail?.phone}</td>
                  </tr>
                  <tr>
                    <td className='left-side' >Amount </td>
                    <td className='right-side'>{parseFloat(bidDetail?.amount).toLocaleString()+" ETB"}</td>
                  </tr>
                  <tr>
                    <td className='left-side' >Status </td>
                    <td className='right-side' >{stat}</td>
                  </tr>
                  {bidDetail?.license &&
                  <tr>
                    <td className='left-side'>Licence </td>
                    <td className='right-side'>
                      <div className='flex items-center justify-between' style={{color: '#172b4d',fontSize: 17}}>
                        LicenseFile
                        <div className='flex items-center gap-2'>
                           <IconButton 
                             onClick={()=>{
                               const link = bidDetail?.license;
                               window.open(link)
                             }}
                             style={{border: '1px solid rgba(0,130,130,.1)'}}>
                              <GoBrowser color="#4a5a74" fontSize={21}/>
                           </IconButton>
                           <IconButton 
                             onClick={()=>{
                                const link = bidDetail?.license;
                                //downloadFile(link);
                                var a = document.createElement('a');
                                a.href=link;
                                a.download = link.split('/').pop();
                                a.target = "_blank"
                                a.click();
                             }}
                             style={{border: '1px solid rgba(0,50,250,.1)'}}
                           >
                              <AiOutlineDownload color="#4a5a74" fontSize={22}/>
                           </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>}

                  {bidDetail?.performa &&
                  <tr>
                    <td className='left-side'>Performa </td>
                    <td className='right-side'>
                      <div className='flex items-center justify-between' style={{color: '#172b4d',fontSize: 17}}>
                        Performa file
                        <div className='flex items-center gap-2'>
                           <IconButton 
                             onClick={()=>{
                               const link = bidDetail?.performa;
                               window.open(link)
                             }}
                             style={{border: '1px solid rgba(0,130,130,.1)'}}>
                              <GoBrowser color="#4a5a74" fontSize={21}/>
                           </IconButton>
                           <IconButton 
                             onClick={()=>{
                                const link = bidDetail?.performa;
                                //downloadFile(link);
                                var a = document.createElement('a');
                                a.href=link;
                                a.download = link.split('/').pop();
                                a.target = "_blank"
                                a.click();
                             }}
                             style={{border: '1px solid rgba(0,50,250,.1)'}}
                           >
                              <AiOutlineDownload color="#4a5a74" fontSize={22}/>
                           </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>}

                  {bidDetail?.proposal &&
                  <tr>
                    <td className='left-side'>Proposal </td>
                    <td className='right-side'>
                      <div className='flex items-center justify-between' style={{color: '#172b4d',fontSize: 17}}>
                        Proposal file
                        <div className='flex items-center gap-2'>
                           <IconButton 
                             onClick={()=>{
                               const link = bidDetail?.proposal
                               window.open(link)
                             }}
                             style={{border: '1px solid rgba(0,130,130,.1)'}}>
                              <GoBrowser color="#4a5a74" fontSize={21}/>
                           </IconButton>
                           <IconButton 
                             onClick={()=>{
                                const link = bidDetail?.proposal;
                                //downloadFile(link);
                                var a = document.createElement('a');
                                a.href=link;
                                a.download = link.split('/').pop();
                                a.target = "_blank"
                                a.click();
                             }}
                             style={{border: '1px solid rgba(0,50,250,.1)'}}
                           >
                              <AiOutlineDownload color="#4a5a74" fontSize={22}/>
                           </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>}

                  {bidDetail?.companydoc && 
                  <tr>
                    <td className='left-side'>Company Document</td>
                    <td className='right-side'>
                      <div className='flex items-center justify-between' style={{color: '#172b4d',fontSize: 17}}>
                        Company Doc File
                        <div className='flex items-center gap-2'>
                           <IconButton 
                             onClick={()=>{
                               const link = "https://docs.google.com/gview?url="+bidDetail?.companydoc+"&embedded=true";
                               window.open(link)
                             }}
                             style={{border: '1px solid rgba(0,130,130,.1)'}}>
                              <GoBrowser color="#4a5a74" fontSize={21}/>
                           </IconButton>
                           <IconButton 
                             onClick={()=>{
                                const link = bidDetail?.companydoc;
                                //downloadFile(link);
                                var a = document.createElement('a');
                                a.href=link;
                                a.download = link.split('/').pop();
                                a.target = "_blank"
                                a.click();
                             }}
                             style={{border: '1px solid rgba(0,50,250,.1)'}}
                           >
                              <AiOutlineDownload color="#4a5a74" fontSize={22}/>
                           </IconButton>
                        </div>
                      </div>
                    </td>
                  </tr>}

                </tbody>
              </table>
            </div>
            {/* <div className='flex gap-4 items-center'>
              <GoAlert style={{
                color: 'orange',
                fontSize: 28
              }}/>
               <p className='font-san' style={{fontFamily: 'ubuntu'}}>
                 Are you sure you want to permanently remove this item?
               </p>
            </div> */}
          </DialogContentText>
        </DialogContent>
        <DialogActions className='mb-2 mt-8'>
          <Button 
            onClick={()=>{
              handleClickOpenConfirm();
            }}
            variant="contained" 
            color="success"
            size="medium"
           
            style={{
                fontFamily: 'ubuntu',
                marginRight: 10,
                marginBottom: 5,
                background: '#7e3af2'
            }}
            startIcon={<BsFillPatchCheckFill />}
          >Approve This Bid</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ShowDetail;