// import { Button } from '@mui/material'
import { url } from 'config/urlConfig'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { FaCloudUploadAlt } from 'react-icons/fa'
import { RiDeleteBin6Fill,RiDeleteBin6Line } from 'react-icons/ri'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { FaSignOutAlt } from "react-icons/fa";
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

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


export const ConnectProject = ({setOpenError,setOpenSuccess,id,setEmployeeData,employeeData}) => {
  const [project,setProject] = useState([])
  const [loopedBudget,setLoopedBudget] = useState([])
  const [clickables,setClickables] = useState({ProjectId:"",owdaBudgetLineId:"",owdaAccountId:"",percentage:""})
  // const [disconnectV,setDisconnectV] = useState({ProjectId:""})

  
  
  
  
  useEffect(()=>{
    // console.log(employeeData);
    const getData=async()=>{
      
      
      await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
        setProject(resp.data)
        // console.log(resp.data);
        // console.log(employeeData.pCategory==="baser");
        
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
          setOpenError({open:true,message:`${error.response.data.error}`});
        } else {
          setOpenError({open:true,message:"An unknown error occurred"});
        }
      })
      
    }
    
    // console.log(id);
    
    getData()
  },[])
  
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const requests = {
      ProjecId:parseInt(clickables.ProjectId),
      owdaAccountId:parseInt(clickables.owdaAccountId),
      owdaBudgetLineId:parseInt(clickables.owdaBudgetLineId)
    }
    console.log(requests);
    await axios.post(`${url}/employees/connect/${id}`,clickables,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setEmployeeData(resp.data)
        // console.log(resp.data);
        setOpenSuccess({open:true,message:"Successfully Connected"})
        closeModal()

    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })

  }

useEffect(()=>{
    const data = project.filter((pr)=>pr.id===parseInt(clickables.ProjectId))
    // console.log(clickables.ProjectId);
    setLoopedBudget(data[0]?.owda_budget_lines)
    setClickables({...clickables,owdaAccountId:data[0]?.owdaAccountId})
    // console.log(data[0]);
},[clickables.ProjectId])




const disconnectBaser =async()=>{
  // console.log(clickables.ProjectId);
    await axios.post(`${url}/employees/disconnect/${id}`,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        console.log(resp.data);
        setEmployeeData(resp.data)
        setOpenSuccess({open:true,message:"Successfully Disconnected"})
        closeModal()
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}


const disconnectContributor = async(prId)=>{
  const request = {
    ProjectId:prId
  }
  // console.log(request);
    await axios.post(`${url}/employees/disconnect/contributor/${id}`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
        setEmployeeData(resp.data)
        setOpenSuccess({open:true,message:"Successfully Disconnected"})
        closeModal()
    }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
}


  const [isOpen,setIsOpen] = useState(false)
  function closeModal(){
      setIsOpen(false)
  }
  function openModal(){
      setIsOpen(true)
  }


  return (

    <div>



<div className="flex flex-col gap-4 mt-4">
<Modal isOpen={isOpen} onClose={closeModal}>
      <ModalHeader>Register Activity</ModalHeader>
      <ModalBody>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          

      
         

          <Label>
            <span>Choose Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,ProjectId:e.target.value})}
              required
            >
              <option value="" >Select Project</option>
              {project?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>
              
              {employeeData.pCategory==="contributor" && 
                        <Label>
                        <span>Percentage</span>
                          <Input type="number"  step="0.01" className="mt-1" name="percentage" autoComplete='on' onChange={(e)=>setClickables({...clickables,percentage:e.target.value})}/>
                      </Label>
                      }

          <Label>
            <span>Budgets</span>
            <Select
              className="mt-1"
              name="owdaBudgetLineId"
            //   value={formValues.CompanyId}
              onChange={(e)=>setClickables({...clickables,owdaBudgetLineId:e.target.value})}
              required
            >
              <option value="" >Select Budget</option>
              {loopedBudget?.map((cp,i)=>(
                <option key={i} value={cp.id}>{cp.name}</option>
              ))}
              
            </Select>
          </Label>

    


        </div>
        <div className="hidden sm:block">

         <Button className="mt-6 custom-button" type="submit">Submit</Button>
        </div>
           <div className=" mt-2 block  sm:hidden">
<Button block size="large" type="submit" className="custom-button">
              Accept
            </Button>
          </div>
      
        </form>
      </ModalBody>
      <ModalFooter>
      <div className="hidden sm:block">
            <Button layout="outline" onClick={closeModal}>
              Cancel
            </Button>
        </div>
        <div className="block w-full sm:hidden">
            <Button block size="large" layout="outline" onClick={closeModal}>
              Cancel
            </Button>
          </div>

          {/* <div className="block w-full sm:hidden">
<Button block size="large" type="submit" className="custom-button">
              Accept
            </Button>
          </div> */}
      </ModalFooter>
    </Modal>



        </div>

  {/* End Files List */}
        {employeeData.pCategory==="baser"&&
         employeeData.owda_projects?.length>0?
        <Button size="small" onClick={disconnectBaser}>Disconnect from Project</Button>:
        <Button size="small" onClick={openModal}>Connect</Button>}
        

        <TableContainer className="bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-semibold">Project Name</TableCell>

            {employeeData.pCategory==="contributor"&&<TableCell className="font-semibold">Disconnect</TableCell>}
            <TableCell className="font-semibold text-center">Actions</TableCell>
          </TableRow>
        </TableHeader>
            {employeeData.owda_projects?.length>0?
        <TableBody>
              
                {employeeData.owda_projects?.map((pr)=>
              <TableRow key={pr.id}>
              
                <TableCell><span className="text-sm font-semibold"><Link to={`/app/projects/${pr.id}`}>{pr.name}</Link></span></TableCell>
                {employeeData.pCategory==="contributor"&&<TableCell><span className="text-sm font-semibold">
                  <FaSignOutAlt className='text-red-500 text-2xl' onClick={()=>disconnectContributor(pr.id)}/></span></TableCell>}
                <TableCell className="flex justify-center space-x-2">
                  <Link to={`/app/projects/${pr.id}`}>
                  <Button layout="link" size="small">
                    <EditIcon className="h-5 w-5 text-blue-600" />
                  </Button>
                  </Link>
                 
                </TableCell>
               
              </TableRow>
                )}  
         
        </TableBody>:
        <TableBody>
        <TableRow>
          <TableCell>No Projects Assigned</TableCell>
          </TableRow>
        </TableBody>
              }
      </Table>
    </TableContainer>

    </div>
  )
}
