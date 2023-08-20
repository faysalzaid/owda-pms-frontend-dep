// import { Button } from '@mui/material'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiDeleteBin6Fill,RiDeleteBin6Line } from 'react-icons/ri'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { FaSignOutAlt } from "react-icons/fa";
import {
    TableBody,
    TableContainer, 
    Table,
    TableHeader,
    TableCell,
    TableRow,
    TableFooter,
    Avatar,
    Badge,
    Pagination,
    Button,
  } from '@windmill/react-ui'
import { EditIcon, TrashIcon } from 'icons'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'


export const PaymentHistoryComponent = ({setOpenError,setOpenSuccess,id,setEmployeeData,employeeData}) => {
  const [project,setProject] = useState([])
  const [loopedBudget,setLoopedBudget] = useState([])
  const [clickables,setClickables] = useState({ProjectId:"",owdaBudgetLineId:"",owdaAccountId:"",percentage:""})
  // const [disconnectV,setDisconnectV] = useState({ProjectId:""})








  const [isOpen,setIsOpen] = useState(false)
  function closeModal(){
      setIsOpen(false)
  }
  function openModal(){
      setIsOpen(true)
  }


  return (

    <div>


  {/* End Files List */}

        

        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Date</TableCell>
            <TableCell className="font-semibold">Amount</TableCell>
            <TableCell className="font-semibold">Project</TableCell>
            <TableCell className="font-semibold">BudgetLine</TableCell>
            <TableCell className="font-semibold">BL.Code</TableCell>

          </TableRow>
        </TableHeader>
            {employeeData.owda_payrolls?.length>0?
        <TableBody>
              
                {employeeData.owda_payrolls?.map((pr)=>
              <TableRow key={pr.id}>
              
                <TableCell><span className="text-sm font-semibold">{pr.date}</span></TableCell>
                <TableCell><span className="text-sm font-semibold">{parseFloat(pr?.amount).toLocaleString()}</span></TableCell>
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/projects/${pr.owda_project?.id}`}>{pr?.owda_project?.name}</Link></span></TableCell>
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/budgetLines/${pr?.owda_budget_line?.id}`}>{pr?.owda_budget_line?.name}</Link></span></TableCell>
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/budgetLines/${pr?.owda_budget_line?.id}`}>{pr?.owda_budget_line?.code}</Link></span></TableCell>
                
            
               
              </TableRow>
                )}  
         
        </TableBody>:
        <TableBody>
        <TableRow>
          <TableCell>No Payroll Data Found</TableCell>
          </TableRow>
        </TableBody>
              }
      </Table>
    </TableContainer>

    </div>
  )
}
