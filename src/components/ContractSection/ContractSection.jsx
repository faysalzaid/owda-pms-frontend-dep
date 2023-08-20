import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableCell,Button,Badge,TableContainer  } from '@windmill/react-ui';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import { AiFillEye } from 'react-icons/ai';
import {FaRegEdit} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
function ContractSection({project,id}) {
  const [contracts,setContracts] = useState([])
useEffect(()=>{
  axios.get(`${url}/contract`,{withCredentials:true}).then((resp)=>{
    if(resp.data.error){

    }else{
      // console.log(resp.data);
      const data = resp.data.filter((dt)=>dt.ProjectId===id)
      setContracts(data)
     
    }
  })
},[id])

  return (
    <section className="contracts-section p-4 bg-white rounded-md shadow-md">
      <h2 className="text-xl font-medium mb-4">Contracts</h2>
      <TableContainer className="mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Contract Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>View</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
          {contracts.map((contract,i)=>
              <TableRow key={i}>
                
                <>
              
                <TableCell>
                  <div className="flex items-center text-sm">
                    <div>
                      <p className="font-semibold">{contract.subject}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{contract.contractValue.toLocaleString()}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{project.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm"></span>
                </TableCell>
           
             
                <TableCell>
                  <Badge style={{color:contract.status==='signed'?'green':'red'}}>{contract.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                  <Link to={`/app/contract/${contract.id}`}>
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
                    </>  
                    </TableRow>
                    )}
  
                    </TableBody>
                    </Table>
                    </TableContainer>
                    
    </section>
  );
}

export default ContractSection;
