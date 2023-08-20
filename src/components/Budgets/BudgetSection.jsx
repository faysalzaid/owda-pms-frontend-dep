import { EditIcon, TrashIcon } from 'icons';
import { useState,React } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Table, TableHeader, TableBody, TableRow, TableCell,Button,Badge,TableContainer  } from '@windmill/react-ui';
import '../overview/overview.css'
import { AiFillEye,AiFillDelete,AiFillEdit } from 'react-icons/ai';
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import PageTitle from 'components/Typography/PageTitle';
import { FaEdit,FaRemoveFormat } from "react-icons/fa";
import { FaPlusCircle,FaCheckCircle,FaRegMoneyBillAlt } from "react-icons/fa";
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig';
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css' 
import { useContext } from 'react';
import { AuthContext } from 'hooks/authContext';


function BudgetList({id,budgets,setBudgets,invoiceIds}) {
  const {authState,settings} = useContext(AuthContext)
  // console.log(budgets);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen,setIsOpen] = useState(false) 
  const [isPaymentOpen,setIsPaymentOpen] = useState({open:false,budgetId:"",paid:"",budgetTrackId:""})

  const [budgetForm,setBudgetForm] = useState({year:"",allocatedBudget:0,utilizedBudget:0})
  const [paymentForm,setPaymentForm] = useState({date:""})
  const [budgettrackForm,setBudgetTrackForm] = useState({date:"",utilized:""})
  const [isUtilized,setIsUtilized] = useState({open:false,id:"",date:"",allocatedBudget:"",utilizedBudget:"",year:""})


// Alert logic and initialization
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
// alert logic and initialization


const deleteBudget =async()=>{
  axios.get(`${url}/budget/delete/${isDeleteOpen.id}`).then((resp)=>{
    if(resp.data.error){
      setOpenError({open:true,message:"Error Occured"})
    }else{
      const newData = budgets.filter((bd)=>bd.id!==isDeleteOpen.id)
      setBudgets(newData)
      setOpenSuccess({open:true,message:"Successfully Deleted"})
      closeDelete()
    }
  })
}



const handleUtilization = async(event)=>{
  event.preventDefault()
  const newCalc = parseInt(isUtilized.utilizedBudget) + parseInt(budgettrackForm.utilized)
  const request ={
    year:isUtilized.year,
    allocatedBudget:parseInt(isUtilized.allocatedBudget),
    utilizedBudget:newCalc,
    ProjectId:id,
    date:budgettrackForm.date,
    utilized:parseInt(budgettrackForm.utilized),
    createdBy:authState.username
  }
  // console.log(request,isUtilized.id);
  await axios.post (`${url}/budget/${isUtilized.id}`,request,{withCredentials:true}).then((resp)=>{
    // console.log(resp.data);
    if(resp.data.error){
      setOpenError({open:true,message:`${resp.data.error}`})

    }else{
      setOpenSuccess({open:true,message:"Successfully Added"})
      onUtilizedClose()
    }
  })
 

  // console.log('this is id',isUtilized.id);

}



  async function handleSubmit(event) {
    event.preventDefault();
    
    const request ={
      year:budgetForm.year,
      allocatedBudget:parseInt(budgetForm.allocatedBudget),
      utilizedBudget:parseInt(budgetForm.utilizedBudget),
      ProjectId:id
    }

    await axios.post(`${url}/budget`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setBudgets((prev)=>[...prev,resp.data])
        setOpenSuccess({open:true,message:"Successfully Added"})
        onClose()
      }
    })
    
  }


  const handlePayment = async(e)=>{
    e.preventDefault()
    // console.log('clicked');
    const request ={
      date:paymentForm.date,
      amountReceived:parseInt(isPaymentOpen.paid),
      InvoiceId:invoiceIds,
      budgetId:isPaymentOpen.budgetId,
      invoiced:1,
      budgetTrackId:isPaymentOpen.budgetTrackId,
      createdBy:authState.username
    }   
    // console.log(request);
    await axios.post(`${url}/payment`,request,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){
        setOpenError({open:true,message:`${resp.data.error}`})
      }else{
        setOpenSuccess({open:true,message:"Invoiced Payment Successfully"})
        onPaymentClose()
      }
      
    })
   
    
  }

  const onClose = ()=>{
    setIsOpen(false)
  }

  const onOpen = ()=>{
    setIsOpen(true)
  }


  const onPaymentOpen =()=>{
    setIsPaymentOpen(true)
  }

  const onPaymentClose =()=>{
    setIsPaymentOpen(false)
  }




  const onUtilizedClose =()=>{
    setIsUtilized({open:false})
  }

  const onUtilizedOpen =(data)=>{
    setIsUtilized({open:true})
  }




  const [isDeleteOpen,setIsDeleteOpen] = useState({open:false,id:""})

  const closeDelete = ()=>{
    setIsDeleteOpen({open:false})
}
//   const openDelete = (id)=>{
//     setIsDeleteOpen({open:true,id:id})
// }




  return (


    
    <>


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

             {/* Delete Confirm section */}
             <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
          <ModalHeader>Confirm Action</ModalHeader>
          <ModalBody>
            <span>Are you sure you want to perform this action?</span>
          </ModalBody>
          <ModalFooter>
            <button className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600" onClick={deleteBudget}>
              Confirm
            </button>
          </ModalFooter>
      </Modal>

        {/* End of delete Section */}
{/* Modal Payment section */}
    <Modal isOpen={isPaymentOpen.open} onClose={onPaymentClose}>
      <form onSubmit={handlePayment}>
        <ModalHeader>
          <span className="text-lg font-medium text-gray-700">Add Payment</span>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
          <label className="mt-2 block text-gray-700 font-bold mb-2" htmlFor="year">
            <span>Date</span>
            </label>
            <input
            className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            type='date'
            name="date"
            onChange={(e)=>setPaymentForm({...paymentForm,date:e.target.value})}
              required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Make Payment"}
          </Button>
        </ModalFooter>
      </form>
      </Modal>
{/* Modal Payment section */}


{/* Modal Utilization section */}
<Modal isOpen={isUtilized.open} onClose={onUtilizedClose}>
      <form onSubmit={handleUtilization}>
        <ModalHeader>
          <span className="text-lg font-medium text-gray-700">Utilize Budget</span>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
          <label className="mt-2 block text-gray-700 font-bold mb-2" htmlFor="year">
            <span>Date</span>
            </label>
            <input
            className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            type='date'
            name="date"
            onChange={(e)=>setBudgetTrackForm({...budgettrackForm,date:e.target.value})}
              required
            />
            <input
            className="mt-2 form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            type='number'
            name="utilized"
            onChange={(e)=>setBudgetTrackForm({...budgettrackForm,utilized:e.target.value})}
            placeholder="Utilizing"
            required
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Make Payment"}
          </Button>
        </ModalFooter>
      </form>
      </Modal>
{/* Modal Utilization section */}



{/* Modal section */}
  <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalHeader>
          <span className="text-lg font-medium text-gray-700">Add New Budget</span>
        </ModalHeader>
        <ModalBody>
          <div className="mb-4">
          <label className="mt-2 block text-gray-700 font-bold mb-2" htmlFor="year">
            <span>Year</span>
            </label>
            <input
            className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            type='date'
            name="year"
            onChange={(e)=>setBudgetForm({...budgetForm,year:e.target.value})}
              required
            />
            <label className="mt-2 block text-gray-700 font-bold mb-2" htmlFor="year">
            <span>Allocated Budget</span>
            </label>
            <input
            type="number"
            className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
            name="allocatedBudget"
            onChange={(e)=>setBudgetForm({...budgetForm,allocatedBudget:e.target.value})}
            required
            />

            <label className="mt-2 block text-gray-700 font-bold mb-2" htmlFor="year">
            <span>Utilized Budget</span>
            </label>
            <input
              type="number"
              className="form-input block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50"
              name="utilizedBudget"
              onChange={(e)=>setBudgetForm({...budgetForm,utilizedBudget:e.target.value})}
       
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            className="bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Make Payment"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
{/* Modal section */}

    
    <PageTitle>Budgets  <Button className="ml-4" size="small" onClick={onOpen}>add Budget</Button></PageTitle>
    <div>
   
    </div>


    <div className="flex flex-col ">
      <div className="-my-2 overflow-x-auto sm:-mx-9 lg:-mx-8">
        <div className="py-2 sm:px-9 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Allocated Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilized Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Remaining Budget
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilize
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Edit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delete
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expand
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">View details</span>
                  </th>
                </tr>
              </thead>
              {budgets?.map((row, rowIndex) => (
              <tbody className="bg-white divide-y divide-gray-200" key={rowIndex}>
               
                  <>
                    <tr >
                      <td className="px-6 py-4 whitespace-nowrap">{row.year}</td>
                      <td className="px-6 py-4 whitespace-nowrap">ETB {row.allocatedBudget.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">ETB {row.utilizedBudget.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">ETB {row.remainingBudget.toLocaleString()}</td>
                      {row.remainingBudget===0?
                      <td className="px-6 py-4 whitespace-nowrap"><Badge type="blue">Fully Paid</Badge> </td>
                      :<td className="px-6 py-4 whitespace-nowrap"><Badge type="danger">Partially </Badge></td>}
                      <td className=" px-6 py-4 whitespace-nowrap" style={{color:'green'}}><FaRegMoneyBillAlt className='ml-3' onClick={()=>setIsUtilized({open:true,id:row.id,year:row.year,allocatedBudget:row.allocatedBudget,utilizedBudget:row.utilizedBudget})}/></td>
                      <td className=" px-6 py-4 whitespace-nowrap" style={{color:"blue"}}><FaEdit className='ml-3'/></td>
                      <td className=" px-6 py-4 whitespace-nowrap" style={{color:'red'}}><AiFillDelete className='ml-4' onClick={()=>setIsDeleteOpen({open:true,id:row.id})}/></td>
                      <td className=" px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          className="text-indigo-600 hover:text-indigo-900 focus:outline-none"
                          onClick={() => setIsExpanded(!isExpanded)}
                        >
                          {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                        </button>
                      </td>
                    </tr>
                    {isExpanded&&( 
                   <tr>
                   <td colSpan="5" className="px-6 py-4 whitespace-nowrap">
                     <div className="overflow-x-auto">
                       <table className="min-w-full divide-y divide-gray-200">
                         <thead>
                           <tr>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Date
                             </th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Utilized
                             </th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Created By
                             </th>
                             <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Add To Payment
                             </th>
                             <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                               Delete
                             </th>
                            
                           </tr>
                         </thead>
                         <tbody className="bg-white divide-y divide-gray-200">
                           {row.bugetTracks?.map((detail, index) => (
                             <tr key={index}>
                               <td className="px-6 py-4 whitespace-nowrap">{detail.date}</td>
                               <td className="px-6 py-4 whitespace-nowrap">ETB {detail.utilized.toLocaleString()}</td>
                               <td className="px-6 py-4 whitespace-nowrap">{detail.createdBy}</td>
                             
                               {detail.invoiced===0?
                                <td className="px-6 py-4 whitespace-nowrap"><Badge type="danger"><FaPlusCircle onClick={()=>setIsPaymentOpen({open:true,paid:detail.utilized,budgetTrackId:detail.id})} className='mt-1 mr-1'/>Invoice </Badge> </td>
                                :<td className="px-6 py-4 whitespace-nowrap"><Badge><FaCheckCircle className='mt-1 mr-1'/>Invoiced </Badge></td>}
                               <td style={{color:'red'}} className="mr-6 px-6"><AiFillDelete /></td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   </td>
                 </tr>

                )}
                
                  </>
              
                    </tbody>
                    ))}
                    </table>
                    </div>
                </div>
            </div>
        </div>





        </section>
        </>
  )
    }



    export default BudgetList