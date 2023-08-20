import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Box, IconButton} from '@mui/material';
import {MdClose} from 'react-icons/md';



import * as constants from '../../constants.js';

const ShowPhoto = ({handleClose, profile}) => {

const url = constants.url;


  return (
    <div>
      <Dialog open={profile.open??false} onClose={handleClose}>
      <DialogTitle disableTypography style={{backgroundColor: '#0052cc'}}>
           <Box display="flex" alignItems="center">
           <img src={profile.url} className="pro-user-modal-img"/>
                <Box flexGrow={1} style={{color: 'white', fontFamily: 'ubuntu', marginRight: 50}}>
                  <p style={{fontSize: 22}}>{profile.title??""}</p>
                  {profile.job && <p style={{fontSize: 14, color: 'rgba(255,255,255,.8', marginTop: -5}}>{profile.job}</p>}
                </Box>
                <Box>
                    <IconButton onClick={handleClose}>
                          <MdClose style={{color: 'white'}}/>
                    </IconButton>
                </Box>
          </Box>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
             <div style={{display: "flex", justifyContent: 'start', flexDirection:'column',gap: 10, marginTop: 30,marginBottom: 20, marginLeft: 30, fontFamily:'ubuntu'}}>
               {profile.phone && <p><span style={{fontWeight: 'bold', color: '#0052cc'}}>Phone:</span> {profile.phone}</p>}
               {profile.email && <p><span style={{fontWeight: 'bold', color: '#0052cc'}}>Email:</span> {profile.email}</p>}
               {profile.address && <p><span style={{fontWeight: 'bold', color: '#0052cc'}}>Address:</span> {profile.address}</p>}
             </div>
          </DialogContentText>
        </DialogContent>
        {/*<DialogActions>
          <Button onClick={handleClose}>MdClose</Button>
        </DialogActions>*/}
      </Dialog>
    </div>
  );
}
export default ShowPhoto;
