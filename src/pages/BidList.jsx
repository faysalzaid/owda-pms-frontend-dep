import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
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
import { BellIcon, EditIcon, EyeIcon, EyeIconOne, OutlineCogIcon, SunIcon, TrashIcon } from '../icons'
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@windmill/react-ui'
import { Input, HelperText, Label, Select, Textarea } from '@windmill/react-ui'
import {ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons' 
import InfoCard from '../components/Cards/InfoCard'   
import RoundIcon from '../components/RoundIcon'
import { AuthContext } from '../hooks/authContext'
import { url,bidUrl } from 'config/urlConfig'
import UnAuthorized from 'components/UnAuthorized/UnAuthorized'

function BidList(props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
      setIsModalOpen(true)
    }
  
    function closeModal() {
      setIsModalOpen(false)
    }

    const [companyData,setCompanyData] = useState([]) 
    const [bidsData,setBidData] = useState([])
    const [errorMessage,setErrorMessage] = useState('')
    const [bidFormData,setBidFormData] = useState({fullname:"",phone:"",license:"",status:"",performa:"",proposal:"",companydoc:"",amount:"",bidUserPic:"",ProjectId:"",UserId:""})
    const [authorization,setAuthorization] = useState(false)
    const [successMessage,setSuccessMessage] = useState("")
    const [projects,setProjects] = useState([])
    const [bidCount,setBidCount] = useState(0)
    const [searchResult,setSearchResult] = useState([])
    const [searchTerm,setSearchTerm] = useState("")
    const [fetchedResult,setFetchedResult] = useState([])
    const [ users,setUsers] = useState([])
    const [showModal, setShowModal] = useState({show:false,id:""});
    const {authState,settings} = useContext(AuthContext)
    let [approved,setApproved] = useState(0) ;
    let [processing,setProcessing] = useState(0);
    let [rejected,setRejected] = useState(0);
    
    useEffect(()=>{

             axios.get(`${url}/bids`,{withCredentials:true}).then((resp)=>{
              if(resp.data.error) setErrorMessage(resp.data.error);
              setBidData(resp.data.bid)
              setBidCount(resp.data.count)
              setProcessing(resp.data.processing)
              setApproved(resp.data.approved)
              setRejected(resp.data.rejected)
              // console.log(resp.data.processing);
              
            })
            // console.log(response.data);
        
        axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }else{
            const data = resp.data.filter((usr)=>usr.role==='client')
            setUsers(data)
          }
        })
        // axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
        //   if(resp.data.error){
        //     setErrorMessage(resp.data.error)
        //   }else{

        //     setProjects(resp.data.projects)}
        //     // console.log(resp.data.projects);
          
        // })
 
      },[])
      

      useEffect(()=>{
        setFetchedResult(searchTerm.length<1?bidsData:searchResult)
      },[bidsData,searchTerm])


  const addBid =async(e)=>{
    e.preventDefault()
    // console.log('This is from bid data',bidFormData);
    if(bidFormData.fullname==="" || bidFormData.phone===""||bidFormData.license===""||bidFormData.status===""||bidFormData.performa===""||bidFormData.proposal===""||bidFormData.companydoc===""||bidFormData.amount==="",bidFormData.bidUserPic==="",bidFormData.ProjectId==="",bidFormData.UserId===""){
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
      formData.append('bidUserPic',bidFormData.bidUserPic)
      formData.append('amount',parseInt(bidFormData.amount))
      formData.append('ProjectId',bidFormData.ProjectId)
      formData.append('UserId',bidFormData.UserId)
      // console.log(formData);
       const response = await axios.post(`${url}/bids`,formData,{withCredentials:true}).then((resp)=>{
        
        if(resp.data.error){
          setErrorMessage(resp.data.error)
        }else{
            setBidData([...bidsData,resp.data])
            setBidFormData({fullname:"",phone:"",license:"",status:"",performa:"",proposal:"",companydoc:"",amount:"",bidUserPic:"",ProjectId:"",UserId:""})
          closeModal()
          setSuccessMessage("Successfully added")
          setTimeout(() => {
            setSuccessMessage("")
         }, 2000)
        }
      }).catch((err)=>{
      })
    }

}
const deleteBid =async(ids)=>{
  const response = await axios.get(`http://localhost:4000/bids/delete/${ids}`,{withCredentials:true}).then((resp)=>{
    
    if(resp.data.error){
      setErrorMessage(resp.data.error)
    }else{
      const newBid = bidsData.filter((d)=>d.id!==ids)
      setBidData(newBid)
      setSuccessMessage("Successfully deleted")
      setShowModal({show:false,id:""})
      setTimeout(() => {
        setSuccessMessage('')
        props.history.push('/app/bids')
      }, 2000);

      // props.history.push('/app/companies')
    }
  }).catch((err)=>{

  })
}


const searchHandler = async(search)=>{
  setSearchTerm(search)
  if(search!==0){
    const newBidList = bidsData.filter((bid)=>{
      return Object.values(bid).join(" ").toLowerCase().includes(search.toLowerCase())
    })
    // console.log(newBidList);
    setSearchResult(newBidList)
  }else{
    setSearchResult(bidsData)
  }
}





    return ( 
        <>
      
         <>
         <link rel="stylesheet" href="https://unpkg.com/flowbite@1.4.4/dist/flowbite.min.css" />
        <PageTitle>List of Bids Registered</PageTitle>
       
          {/* Delete MOdal section  */}
      {showModal.show ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Delete Confirm
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                   Are You sure you want to Delete This
                  </p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => deleteBid(showModal.id)}
                    style={{backgroundColor:'darkred'}}
                  >
                    Continue Deleting
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
      {/* End of Delete Modal Section */}

                {/* Search section */}
      <div className='mb-5'>
        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" strokeWidth="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <Input type="search" id="default-search" value={searchTerm} onChange={(e)=>searchHandler(e.target.value)} 
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
            dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Full-Name, Bids, Amount..." required />
        </div>
            
        </div>
        {/* End of search List */}
        
        <div>
          <Button onClick={openModal}>Add new Bid</Button>
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ModalHeader>Insert BidInfo Info</ModalHeader>
          <span style={{color:'red'}}>{errorMessage}</span>
          <ModalBody>
            
          <form onSubmit={addBid} encType="multipart/form-data">
          <div className="grid grid-cols-2 gap-4">
          <Label>
            <span>Fullname</span>
              <Input type="text" className="mt-1" name="fullname" placeholder="Full Name"  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,fullname:e.target.value})}/>
          </Label>
          <Label className="mt-1">
          <span>Project Name</span>
          <Select className="mt-1" name="ProjectId" value={bidFormData.ProjectId} onChange={(e)=>setBidFormData({...bidFormData,ProjectId:e.target.value})}>
          <option>Select</option>
          {projects.map((pr)=> <option key={pr.id} value={pr.id}>{pr.name}</option>)}
           
            
          </Select>
        </Label>
        <Label className="mt-1">
          <span>User</span>
          <Select className="mt-1" name="UserId" value={bidFormData.UserId} onChange={(e)=>setBidFormData({...bidFormData,UserId:e.target.value})}>
          <option>Select</option>
          {users.map((usr)=><option key={usr.id} value={usr.id}>{usr.name}</option>)}
           
            
          </Select>
        </Label>
         
          <Label>
            <span>Phone</span>
              <Input type="text" className="mt-1" name="phone" placeholder="Phone"  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,phone:e.target.value})}/>
          </Label>
          
          <Label>
            <span>Amount</span>
              <Input type="number" className="mt-1" name="amount"  autoComplete='off' onChange={(e)=>setBidFormData({...bidFormData,amount:e.target.value})}/>
          </Label>
          <Label>
            <span>License</span>
              <Input type="file" className="mt-1" name="license" onChange={(e)=>setBidFormData({...bidFormData,license:e.target.files[0]})}/>
          </Label>

          <Label className="mt-1">
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
              <Input type="file" className="mt-1" name="performa" onChange={(e)=>setBidFormData({...bidFormData,performa:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Proposal</span>
              <Input type="file" className="mt-1" name="proposal"  onChange={(e)=>setBidFormData({...bidFormData,proposal:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>CompanyDoc</span>
              <Input type="file" className="mt-1" name="companydoc" onChange={(e)=>setBidFormData({...bidFormData,companydoc:e.target.files[0]})}/>
          </Label>
          <Label>
            <span>Bid Owner Pic</span>
              <Input type="file" className="mt-1" name="bidUserPic" onChange={(e)=>setBidFormData({...bidFormData,bidUserPic:e.target.files[0]})}/>
          </Label>

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
           
          </ModalFooter>
        </Modal>
  
        <SectionTitle></SectionTitle>
        {/* Card Icons */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">


        <InfoCard title="Total Bids Registered" value={bidCount}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Processing Bids" value={processing}>
          <RoundIcon
            icon={OutlineCogIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Approved Bids" value={approved}>
          <RoundIcon
            icon={BellIcon}
            iconColorClass="text-yellow-500 dark:text-yellow-100"
            bgColorClass="bg-yellow-100 dark:bg-yellow-500"
            className="mr-4"
          />
        </InfoCard>
        
        <InfoCard title="Rejected Bids" value={rejected}>
          <RoundIcon
            icon={BellIcon}
            iconColorClass="text-red-500 dark:text-red-100"
            bgColorClass="bg-red-100 dark:bg-yellow-500"
            className="mr-4"
          />
        </InfoCard>


      </div> .  

      {/* End of Card Icons */}
        {successMessage?
        <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p className="text-sm">{successMessage}.</p>
      </div>:''}
      {errorMessage?
        <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
        <p className="text-sm">{errorMessage}.</p>
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
            {fetchedResult.map((bid, i) => (  
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{bid.fullname}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">{bid.job}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{projects.map(pr=>pr.id===bid.ProjectId?pr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      
                      <div>
                        <p className="font-semibold">{users.map(usr=>usr.id===bid.UserId?usr.name:"")}</p>
                        {/* <p className='font-semibold'>{bid.ProjectId}sdf</p> */}
                     
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{bid.phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{bid.amount.toLocaleString()} ETB</span>
                  </TableCell>
                  
                  <TableCell>
                  <Badge type={bid.status==='approved'?"success":"danger"}>{bid.status}</Badge>
                </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-4">
                      <Link to={{pathname:`/app/bids/${bid.id}`}}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                      </Link>
                      <Button onClick={()=>setShowModal({show:true,id:bid.id})} style={{color:'red'}} layout="link" size="icon" aria-label="Delete">
                        <TrashIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
          ))}
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
         
      </>
      
     );
     
}

export default BidList;