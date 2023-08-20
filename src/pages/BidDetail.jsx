/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 
import { Link, useParams } from 'react-router-dom'
import PageTitle from '../components/Typography/PageTitle'
import SectionTitle from '../components/Typography/SectionTitle'
import InfoCard from '../components/Cards/InfoCard'
import RoundIcon from '../components/RoundIcon'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import {FaBullseye,FaDownload,FaCloudUploadAlt} from 'react-icons/fa'
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { MdArrowForward } from "react-icons/md";
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
import { useContext } from 'react'
import { AuthContext } from '../hooks/authContext'
import { bidUrl, url } from 'config/urlConfig'
import { RiDeleteBin6Line } from 'react-icons/ri'

function BidDetail(props) {
    const {id} = useParams()
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [bidsData,setBidData] = useState({})
    const [errorMessage,setErrorMessage] = useState('')
    const [bidFormData,setBidFormData] = useState({
        fullname:"",phone:"",license:"",status:"",performa:"",
        proposal:"",companydoc:"",amount:"",
        bidUserPic:"",ProjectId:"",UserId:"",
        score:"",description:"",evaluationFile:"",evaluationStatus:""
  
  })

    const [successMessage,setSuccessMessage] = useState("")
    const [projects,setProjects] = useState([])
    const [ users,setUsers] = useState([])
    const [showModal, setShowModal] = useState({show:false,id:""});
    const {authState,settings} = useContext(AuthContext)

    




    useEffect(()=>{
        const bidsFetch = async()=>{
            await axios.get(`${url}/bids/${id}`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) setErrorMessage(resp.data.error);
              // console.log('from the main response',resp.data);

              setBidData(resp.data)
              setBidFormData({fullname:resp.data.fullname,
                phone:resp.data.phone,
                license:resp.data.license,
                status:resp.data.status,
                performa:resp.data.performa,
                proposal:resp.data.proposal,
                companydoc:resp.data.companydoc,
                amount:resp.data.amount,
                bidUserPic:resp.data.bidUserPic,
                ProjectId:resp.data.ProjectId,
                UserId:resp.data.UserId,
                score:resp.data.score,
                description:resp.data.description,
                evaluationStatus:resp.data.evaluationStatus,
                evaluationFile:resp.data.evaluationFile
              
              })
            //   console.log('from bidformdata',bidFormData);
              
            }).catch((err)=>{
              console.log(err.response);
            })
            // console.log(response.data);
        }
        axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            setErrorMessage(resp.data.error)
          }else{

            setProjects(resp.data.projects)}
          
        })

        axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }else{
            const data = resp.data.filter((usr)=>usr.role==='client')
            setUsers(data)
          }
        })


        bidsFetch()
      },[])
      


  const editBid =async(e)=>{
    e.preventDefault()
    
    if(bidFormData.fullname==="" || bidFormData.phone===""||bidFormData.license===""||bidFormData.status===""||bidFormData.performa===""||bidFormData.proposal===""||bidFormData.companydoc===""||bidFormData.amount===""||bidFormData.bidUserPic===""||bidFormData.ProjectId===""||bidFormData.UserId===""){
      setErrorMessage('Please Provide all data')
    }else{
      const formData = new FormData()
      formData.append('fullname',bidFormData.fullname)
      formData.append('phone',bidFormData.phone)
      formData.append('license',bidFormData.license)
      formData.append('status',bidFormData.status)
      formData.append('performa',bidFormData.performa)
      formData.append('proposal',bidFormData.proposal)
      formData.append('companydoc',bidFormData.companydoc)
      formData.append('amount',bidFormData.amount)
      formData.append('bidUserPic',bidFormData.bidUserPic)
      formData.append('ProjectId',bidFormData.ProjectId)
      formData.append('UserId',bidFormData.UserId)
      formData.append('score',bidFormData.score)
      formData.append('description',bidFormData.description)
      // console.log(formData);

       const response = await axios.post(`http://localhost:4000/bids/${id}`,formData,{withCredentials:true}).then((resp)=>{
        // console.log('From resp.data',resp.data);
        if(resp.data.error){
          setOpenError({open:true,message:`${resp.data.error}`});
        }else{
            const rfs = resp.data
            setBidData(rfs)
            closeModal()
            setOpenSuccess({open:true,message:`Successfully Updated`});
            
        }
      }).catch((err)=>{
        console.log(err);
      })
    }

}
        const deleteBid =async()=>{
          const response = await axios.get(`${url}/bids/delete/${id}`,{withCredentials:true}).then((resp)=>{
            
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`});
            }else{
              setBidData("")  
              setShowModal({show:false,id:""})
              setOpenSuccess({open:true,message:`Successfully Deleted`});
              closeDelete()
              setTimeout(() => {
                props.history.goBack()
              }, 1000);

              // props.history.push('/app/companies')
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




        const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

        const closeDelete = ()=>{
          setIsDeleteOpen({open:false,id:""})
        }
        const openDelete = (id)=>{
          setIsDeleteOpen({open:true,id:id})

        }



      const [evModel,setEvModal] = useState(false)
        function openEvModel() {
          setEvModal(true)
        }

        function closeEvModal() {
          setEvModal(false)
        }


        const onEvaluate =async(e)=>{
          e.preventDefault()
          if(bidFormData.evaluationFile===null){
            setOpenError({open:true,message:"Evaluation File is required"})
            return
          }
          const formData = new FormData()
          formData.append('score',bidFormData.score)
          formData.append('evaluationFile',bidFormData.evaluationFile)
          formData.append('evaluationStatus',bidFormData.evaluationStatus)
          console.log(formData);
          await axios.post(`${url}/bids/evaluate/${id}`,formData,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setOpenError({open:true,message:`${resp.data.error}`})
            }else{
              setBidData(resp.data)
              setBidFormData({fullname:resp.data.fullname,
                phone:resp.data.phone,
                license:resp.data.license,
                status:resp.data.status,
                performa:resp.data.performa,
                proposal:resp.data.proposal,
                companydoc:resp.data.companydoc,
                amount:resp.data.amount,
                bidUserPic:resp.data.bidUserPic,
                ProjectId:resp.data.ProjectId,
                UserId:resp.data.UserId,
                score:resp.data.score,
                description:resp.data.description,
                evaluationStatus:resp.data.evaluationStatus,
                evaluationFile:resp.data.evaluationFile
              
              })
              setOpenSuccess({open:true,message:'Successfully Evaluated'})
              closeEvModal()
            }
          }).catch((error)=>{
            if (error.response && error.response.data && error.response.data.error) {
                console.log(error.response.data.error);
                setOpenError({open:true,message:`${error.response.data.error}`})
              } else {
               setOpenError({open:true,message:"An Error Occured"})
              }
        })
        }



    return ( 
      
        <>
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


        <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <PageTitle>Bid From {bidsData.fullname}</PageTitle>

                 {/* Delete MOdal section  */}
        <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to perform this action?</p>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteBid}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

          {/* End of Delete Modal Section */}
     
{/* Evalutation Modal */}
<Modal isOpen={evModel} onClose={closeEvModal}>
          <ModalHeader>Evaluate</ModalHeader>
          <ModalBody>
          <form onSubmit={onEvaluate} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4">
        
          <Label className="mt-4">
          <span>Evaluation Status</span>
          <Select className="mt-1" name="status" value={bidFormData.evaluationStatus} onChange={(e)=>setBidFormData({...bidFormData,evaluationStatus:e.target.value})}>
          <option>Select</option>
            <option>YES</option>
            <option>NO</option>
            
          </Select>
        </Label>
          <Label>
            <span>Score</span>
              <Input type="number" className="mt-1" name="score" value={bidFormData.score}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,score:e.target.value})}/>
          </Label>


          <label htmlFor="file" className="w-full p-4 rounded-lg shadow-lg cursor-pointer text-center bg-gradient-to-r from-purple-400 to-pink-500 text-black hover:from-pink-500 hover:to-purple-400 transition duration-300">
                <FaCloudUploadAlt className="w-8 h-8 mx-auto mb-2" />
                <span className="text-lg font-semibold">Evaluation File</span>
              </label>
              <input
                
                type="file"
                id="file"
                className="hidden"
                name="evaluationFile"
                onChange={(e)=>setBidFormData({...bidFormData,evaluationFile:e.target.files[0]})}
              />
              <Button  type="submit" className="ml-auto px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-600">
              Evaluate
            </Button>
          </div>
      
          </form>
          </ModalBody>
          <ModalFooter>
           
          </ModalFooter>
      </Modal>

            {/* End of Evaluation Modal */}


        
        <div className=''>
          <Button onClick={openModal}>Edit Bid</Button>
          {bidsData.evaluationStatus==='YES'?
                <button className="mt-2 bg-green-500 text-white font-bold py-2 px-4 rounded-xl h-8 flex items-center" onClick={()=>openEvModel()}>
                <span>Bid is Evaluated</span>
                <MdArrowForward className="ml-1" size={20} />
              </button>
            :<button className="mt-2 bg-red-500 text-white font-bold py-2 px-4 rounded-xl h-8 flex items-center" onClick={()=>openEvModel()}>
            <span>Evaluate Bid</span>
            <MdArrowForward className="ml-1" size={20} />
          </button>}

        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert Client Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={editBid} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
          <Label>
            <span>Fullname</span>
              <Input type="text" className="mt-1" name="fullname" placeholder="Full Name" value={bidFormData.fullname} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,fullname:e.target.value})}/>
          </Label>

        <Label>
            <span>Project</span>
            <Select
              className="mt-1"
              name="ProjectId"
              value={bidFormData.ProjectId}
              onChange={(e)=>setBidFormData({...bidFormData,ProjectId:e.target.value})}
              required
            >
              <option value="">Select a Project</option>
              {projects.map((ctr,i)=>(
                <option key={i} value={ctr.id}>{ctr.name}</option>
              ))}
              
            </Select>
          </Label>
        <Label className="mt-4">
          <span>User</span>
          <Select className="mt-1" name="UserId" value={bidFormData.UserId}  onChange={(e)=>setBidFormData({...bidFormData,UserId:e.target.value})}>
          {users.map((usr,i)=>( <option key={i} value={usr.id}>{usr.name}</option>))}
          </Select>
        </Label>
         
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone" value={bidFormData.phone} autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,phone:e.target.value})}/>
          </Label>
          <Label>
            <span>Amount</span>
              <Input type="number" className="mt-1" name="amount" value={bidFormData.amount}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,amount:e.target.value})}/>
          </Label>
          <Label>
            <span>Score</span>
              <Input type="number" className="mt-1" name="score" value={bidFormData.score}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,score:e.target.value})}/>
          </Label>
          <Label>
            <span>License</span>
              <Input type="file" className="mt-1" name="license"   onChange={(e)=>setBidFormData({...bidFormData,license:e.target.files[0]})}/>
          </Label>

          <Label className="mt-4">
          <span>Status</span>
          <Select className="mt-1" name="status" value={bidFormData.status} onChange={(e)=>setBidFormData({...bidFormData,status:e.target.value})}>
          <option>Select</option>
            <option>processing</option>
            <option>approved</option>
            <option>rejected</option>
            
          </Select>
        </Label>
        <Label>
            <span>Performa</span>
              <Input type="file" className="mt-1" name="performa"   onChange={(e)=>setBidFormData({...bidFormData,performa:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Proposal</span>
              <Input type="file" className="mt-1" name="proposal"   onChange={(e)=>setBidFormData({...bidFormData,proposal:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>CompanyDoc</span>
              <Input type="file" className="mt-1" name="companydoc"  onChange={(e)=>setBidFormData({...bidFormData,companydoc:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Bid Owner Pic</span>
              <Input type="file" className="mt-1" name="bidUserPic" onChange={(e)=>setBidFormData({...bidFormData,bidUserPic:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Description</span>
              <Textarea type="text" className="mt-1" name="description" value={bidFormData.description}  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,description:e.target.value})}/>
          </Label><br />
        <Label className="mt-4">
          <Button type="submit">Save</Button>
        </Label>
        </div>
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
  
        <SectionTitle></SectionTitle>
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>Full Name</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Owner</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </tr>
            </TableHeader>
            <TableBody>
              
                <TableRow key={bidsData.id}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bidsData.fullname}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{bidsData.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{projects.map(pr=>pr.id===bidsData.ProjectId?pr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{users.map(usr=>usr.id===bidsData.UserId?usr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{bidsData.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{parseFloat(bidsData?.amount).toLocaleString()} ETB</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={bidsData.status==='approved'?"success":"danger"}>{bidsData.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      
                      <Button onClick={()=>setIsDeleteOpen({open:true})}  style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
            
            </TableBody>
          </Table>
          <TableFooter>
          </TableFooter>
        </TableContainer>

          {/* Files section */}
          <div className=" flex flex-col gap-4 mt-0">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><Link to={`${bidsData.license}`} target='_blank'>License</Link></div>
              <button  className="text-red-500 hover:text-red-600">
              <Link to={`${bidsData.license}`} target='_blank'>
                <FaDownload />
                </Link>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><Link to={`${bidsData.performa}`} target='_blank'>Performa</Link></div>
              <button  className="text-red-500 hover:text-red-600">
              <Link to={`${bidsData.performa}`} target='_blank'>
                <FaDownload />
                </Link>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><Link to={`${bidsData.proposal}`} target='_blank'>Proposal</Link></div>
              <button  className="text-red-500 hover:text-red-600">
              <Link to={`${bidsData.proposal}`} target='_blank'>
                <FaDownload />
                </Link>
                
              </button>
            </div>
        </div>

        <div className=" flex flex-col gap-4 mt-2">
            <div className="relative flex justify-between items-center bg-white rounded-md p-4 shadow-md">
              <div className="flex-1 truncate"><Link to={`${bidsData.companydoc}`} target='_blank'>Company Doc</Link></div>
              <button  className="text-red-500 hover:text-red-600">
              <Link to={`${bidsData.companydoc}`} target='_blank'>
                <FaDownload />
                </Link>
                
              </button>
            </div>
        </div>
 {/* End of files section */}

{/* Evaluation section */}

            <div className="bg-white-200 items-center justify-center">
              <div className="bg-white rounded-md shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Evaluation Details</h2>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Evaluation File:</p>
                  <p className="text-sm font-semibold"><Link to={`${bidsData.evaluationFile}`} target='_blank'>
                     <FaDownload className='mt-2'/>
                  </Link>
                </p>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-600">Evaluation Status:</p>
                  {bidsData.evaluationStatus==='YES'?
                 <p className="text-sm font-semibold text-green-600">Evaluated</p>:  
                 <p className="text-sm font-semibold text-red-600">Not Evaluated</p>
                 }
            
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Score:</p>
                  <p className="text-2xl font-semibold text-blue-600">{bidsData.score}%</p>
                </div>
              </div>
            </div>
{/* End of evaluation section */}


       

      </>
     );
}

export default BidDetail;