
import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 

import CTA from '../CTA'
import InfoCard from '../Cards/InfoCard'
import ChartCard from '../Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../Chart/ChartLegend'
import PageTitle from '../Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon, TrashIcon, EditIcon } from '../../icons'
import RoundIcon from '../RoundIcon'
import response from '../../utils/demo/tableData'
import { IoIosEye, IoIosEyeOff } from 'react-icons/io';
import { FaList } from 'react-icons/fa';


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
  Button
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/demo/chartsData'
import { Link, useParams, withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import NewInvoice from './SingleInvoice'




const InvoiceDetailPage = () => {
    const {authState,settings} = useContext(AuthContext)
    const [showPayments, setShowPayments] = useState(false);
    const [invoiceData, setInvoiceData] = useState({})
    const [mode,setMode] = useState([])
    const [data, setData] = useState([])
    const [project,setProject] = useState([])
    const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  
    const {id} = useParams()
  
    const [isShowingPayments, setIsShowingPayments] = useState(false);

    function togglePayments() {
    setIsShowingPayments(!isShowingPayments);
  }

    // console.log('data from app',authState);
      useEffect(()=>{

        const getData = async()=>{
        
  
          await axios.get(`${url}/invoice/${id}`,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              
            }else{
              setInvoiceData(resp.data)
              // console.log(resp.data);
          
            }
          })
        }

      getData()




      },[])
  
  


 
    
  const [isTableVisible, setIsTableVisible] = useState(false);

  const toggleTableVisibility = () => {
    setIsTableVisible((prevState) => !prevState);
  };


   



  
    return (
      <>

       
  
        <span className='flex'>
        <Badge onClick={()=>isTableVisible?setIsTableVisible(false):setIsTableVisible(true)} style={{color:'green'}} className="text-2xl ml-2">

       
        </Badge>
        </span>
       
        {/* <CTA /> */}
  
        {/* <!-- Cards --> */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
         
        </div>
  
        <TableContainer>

        </TableContainer>
  
       

     
        
 

    <div className="dropdown overflow-hidden" >
 


        <NewInvoice invoiceData={invoiceData} mode={mode} project={project}/>
    </div>

      </>
    )


   

}




export default InvoiceDetailPage