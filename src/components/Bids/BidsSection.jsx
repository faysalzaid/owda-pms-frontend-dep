import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell,Button,Badge,TableContainer,Label,Select  } from '@windmill/react-ui';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import { AiFillEye } from 'react-icons/ai';
import {FaRegEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import PageTitle from 'components/Typography/PageTitle';
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css' 


function BidSection({bid,project,users,setBids,setProject}) {
  const [contracts,setContracts] = useState([]) 
  const [ bidSelect,setBidSelect] = useState({open:false,id:""})
  const [isLoading, setIsLoading] = useState(false);

  const onBidSelect =()=>{
    setBidSelect({open:true})
  }



  const onBidClose =()=>{
    setBidSelect({open:false})
  }


  const handleSelection =async(event)=>{
    event.preventDefault()
    const request={
      BidId:bidSelect.id
    }
    // console.log(request);
    await axios.post(`${url}/projects/bidselect/${project?.id}`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        // console.log(resp.data);
        setProject(resp.data)
        setOpenSuccess({open:true,message:"successfully selected"})
        onBidClose()
      }
    })
    
  }




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



  return (
    <section  className="contracts-section p-4 bg-white rounded-md shadow-md">

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


      
      {/* Modal Payment section */}
    <Modal isOpen={bidSelect.open} onClose={onBidClose}>
      <form onSubmit={handleSelection}>
        <ModalHeader>
          <span className="text-lg font-medium text-gray-700">Select Winner Bid</span>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
          <Label>
            <span>Status</span>
            <Select
              className="mt-1"
              name="status"
              // value={formValues.status}
              onChange={(e)=>setBidSelect({...bidSelect,id:e.target.value})}
              required
            >
              <option  >Select a Status</option>
               {bid.map((bi)=> <option key={bi.id} value={bi.id}>{bi.fullname}</option>)}
                 
            </Select>
          </Label>

          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Select"}
          </Button>
        </ModalFooter>
      </form>
      </Modal>
{/* Modal Payment section */}
<PageTitle>Bids<Button className="ml-4"  size="small" onClick={onBidSelect}>Select winner Bid</Button></PageTitle>
     
      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Winner</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
          {bid.map((bids)=>
              <TableRow key={bids.id}>
                <TableCell >
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{bids.fullname}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{users?.map((usr)=>usr.id===bids.UserId?usr.name:"")}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{bids.phone}</span>
                </TableCell>
           
                <TableCell>
                  <span className="text-sm">{bids.amount.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <Badge style={{color:project.BidId===bids.id?"blue":"red"}}>{project.BidId===bids.id?"Selected":"Not Selected"}</Badge>
                </TableCell>
                <TableCell>
                  <Badge style={{color:bids.status==='signed'?'green':'red'}}>{bids.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                  <Link to={`/app/bids/${bids.id}`}>
                    <Button 
                     layout="link"
                     size="icon"
                     aria-label="View"
                     style={{color:'red'}}
                     >
                      <AiFillEye className="w-5 h-5" aria-hidden="true" /> 
                                       
                   </Button>
                   </Link>  
                    </div>
                    </TableCell>
                
                    </TableRow>
                    )}
  
                    </TableBody>
                    </Table>
                    </TableContainer>
                    
    </section>
  );
}

export default BidSection;
