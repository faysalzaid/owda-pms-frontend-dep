import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from '@windmill/react-ui'
import { EditIcon, EyeIconOne, TrashIcon } from '../icons'    
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'

function DepartmentDetail(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    // const [companyData,setCompanyData] = useState([]) 
    const [depForm,setDepForm] = useState({name:""}) 
    const [errorMessage,setErrorMessage] = useState('')
    const [successMessage,setSuccessMessage] = useState("")
    const [departmentData,setDepartmentData] = useState({})

    const {id} = useParams()
    

    const {authState,settings} = useContext(AuthContext)

    

    useEffect(()=>{
      
        axios.get(`${url}/departments/${id}`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
                setErrorMessage(resp.data.error)
            }
            
            setDepartmentData(resp.data)
            setDepForm(resp.data)
            
            // console.log(departmentData);
        }).catch((err)=>{
            setErrorMessage(err.message)
        })
    },[])



    const editDepartment = (e)=>{
      e.preventDefault()
      axios.post(`${url}/departments/${id}`,depForm,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
            setErrorMessage(resp.data.error)
        }else{
            // console.log('this is from depform',depForm);
            let newdata = resp.data
            setDepartmentData(newdata)
            // console.log('this is from resp.data',resp.data);
            closeModal()
            setSuccessMessage("Successfully Updated")
            setTimeout(() => {
              setSuccessMessage("")
            }, 2000);            
        }

      })
    }

    const deleteDepartment = (e)=>{
        e.preventDefault()
        axios.get(`${url}/departments/delete/${id}`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
              setErrorMessage(resp.data.error)
          }
          setDepartmentData({})
          closeModal()
          setSuccessMessage("Successfully Deleted")
          setTimeout(() => {
            setSuccessMessage("")
            props.history.push('/app/departments')
          }, 1000);
        })
      }

 

    return ( 
        <>
        <PageTitle>List of Departments </PageTitle>
        <p></p>
        <div>
          <Button onClick={openModal}>Update Department</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={editDepartment}>
          <Label>
            <span>Name</span>
              <Input type="text" className="mt-1" name="name" placeholder="Department Name" value={depForm.name} autoComplete='off' onChange={(e)=>setDepForm({name:e.target.value})}/>
          </Label>
          
        <Label className="mt-4">
          <Button type="submit">Save</Button>
        </Label>
          </form>
              
     
          </ModalBody>
          <ModalFooter>
            {/* I don't like this approach. Consider passing a prop to ModalFooter
             * that if present, would duplicate the buttons in a way similar to this.
             * Or, maybe find some way to pass something like size="large md:regular"
             * to Button
             */}
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
            <div className="block w-full sm:hidden">
              <Button block size="large">
                Accept
              </Button>
            </div>
          </ModalFooter>
        </Modal>
  
        <SectionTitle>{errorMessage}</SectionTitle>
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Name</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow key={departmentData.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{departmentData.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{departmentData.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{departmentData.createdAt}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{departmentData.job}</p>
                      </div>
                    </div>
                  </TableCell>


                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Button onClick={deleteDepartment}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
         
            </TableBody>
          </Table>
          <TableFooter>
            {/* <Pagination
              // totalResults={totalResults}
              // resultsPerPage={resultsPerPage}
              // onChange={onPageChangeTable2}
              // label="Table navigation"
            /> */}
          </TableFooter>
        </TableContainer>
      </>
     );
}

export default DepartmentDetail;