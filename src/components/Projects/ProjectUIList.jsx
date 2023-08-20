import * as React from 'react';
import {useState, useEffect} from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi'; 
import { Divider, Button } from '@mui/material';
import {Avatar} from '@mui/material';
import {MdOutlineTaskAlt} from 'react-icons/md';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import {MdModeEditOutline, MdOutlineDeleteOutline} from 'react-icons/md';
import { useQuery } from '@tanstack/react-query';
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';

const ProjectUIList = ({pr, setProfile, openDetail}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
      setAnchorEl(event.currentTarget);  
  };
  const handleClose = () => {
      setAnchorEl(null);
  };

  const fkurl = 'https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745'


  let bidDatas = {}
  const {isLoading,data} = useQuery(['bid-data'],()=>{
    return axios.get(`${url}/bids`).then((resp)=>resp.data)
    
  })
  // if(!isLoading){
  //   bidDatas = bidData
  //   console.log(bidDatas);
  // }
  // bidDatas = bidData

  // console.log(data?.bid.Bids.map((bid)=>bid.fullname));
  // console.log(pr.Bids.map((bid)=>bid.id==pr.BidId?bid.fullname:""));

  return (
    <>
      <div class="rounded overflow-hidden shadow-lg bg-green-50 dark:bg-gray-700 project">
        <div className='project-header-list'>
            <div className='project-icon'>{pr.name[0]}</div>
            <div className='body'>
              <div className='project-name dark:text-gray-200'>{pr.name}</div>
              <div className='user hover:cursor-pointer'
                onClick={() => {
                  setProfile({title: 'faysalali', url: url, open: true, job: 'software developer', phone: '09242323', email: 'f@gmail.com', address: 'jijiga'});
                }}
              >
                <Avatar sx={{ width: 32, height: 32 }} src={''} />
                <div style={{ marginLeft: 5, fontFamily: 'ubuntu', fontSize: 15 }} className="name dark:text-gray-300">{pr?.Bids?.map((bid)=>bid.id==pr.BidId?bid.fullname:"")}</div>
              </div>
              <progress id="file" value={pr.percentage} max="100" className='progress'></progress>
              <div className='category'>
                  {pr.category}
              </div>
              <div className='project-status'>{pr.status}</div>
            </div>

            <div className='right'>
              <BiDotsVerticalRounded className="hover: cursor-pointer dark:text-gray-300 three-dot" style={{fontSize: 20}} onClick={handleClick}/>
              <Menu
                id="fade-menu"
                MenuListProps={{
                 'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem  onClick={()=>openDetail(pr.id)} autoFocus={false}><MdModeEditOutline style={{fontSize: 20, marginRight: 10}}/><p style={{fontFamily: 'ubuntu'}}>Edit Project</p></MenuItem>
                <MenuItem onClick={handleClose} autoFocus={false}><MdOutlineDeleteOutline style={{fontSize: 20, marginRight: 10}} /><p style={{fontFamily: 'ubuntu'}}>Delete Project</p></MenuItem>
              </Menu>
            </div>
        </div>
        <Divider style={{marginTop: 10}}/>
      </div>
      
    </>
  );
}

export default ProjectUIList;