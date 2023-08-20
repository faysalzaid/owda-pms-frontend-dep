import React, { useEffect, useState } from 'react'
import { RiSettings3Fill } from 'react-icons/ri'
import { ImCross } from 'react-icons/im'
import './overview.css'
import { Link } from 'react-router-dom'
import { AiFillDelete } from 'react-icons/ai'
import { EditIcon, EyeIcon, EyeIconOne } from 'icons'
import { FiEdit } from 'react-icons/fi'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig'

function OverView({project,setProject,companyData,id}) {
  let companyUrl = companyData.map((cp)=>cp.id===project.CompanyId?`/app/companies/${cp.id}`:``)
  const [invoiceData, setInvoiceData] = useState({total:"",totalPaid:"",amountDue:"",id:""});

  useEffect(()=>{
    axios.get(`${url}/invoice`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){

      }else{
        const data = resp.data.filter((inv)=>inv.ProjectId===id)
        setInvoiceData(data[0])
       
      }
    })
  },[])



  return (
    <section className="overview-section show p-4 bg-white rounded-md shadow-md">
    <div className="left-overview">
      <div>
        <span id="overview-title" className="text-lg font-bold">OVERVIEW</span>
      </div>
      <div className="project-overview">
        <div className="project-title">
          <ul>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Project #</p>
                <p className="font-bold">{project.name}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Customer</p>
              
                <p id="customer" className="font-bold"> <Link to={`${companyUrl[0]}`}>{companyData.map((cp)=>cp.id===project.CompanyId?cp.name:"")}   </Link></p>
             
            
              </div>
            </li>
            
            <li>
              <div className="project-title-div">
                <p className="font-medium">Total Rate</p>
                <p className="font-bold">{project?.totalCost?.toLocaleString()}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Status</p>
                <p className="font-bold">{project?.status}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Date Created</p>
                <p className="font-bold">{project?.starttime}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Started Date</p>
                <p className="font-bold">{project?.starttime}</p>
              </div>
            </li>
            <li>
              <div className="project-title-div">
                <p className="font-medium">Deadline</p>
                <p className="font-bold">{project?.endtime}</p>
              </div>
            </li>
          
            <li>
              <div className="project-title-div">
                <p className="font-medium">Financial Performance</p>
                <p className="font-bold">{project?.financialPerformance }</p>
              </div>
            </li>
          
          </ul>
        </div>
        <div className="project-progress">
          <p className="font-medium">Project Progress</p>
          <div className='progress-container'>
                    <div className='circle-progress' style={{background:`conic-gradient(#80c617 ${project.physicalPerformance*3.6}deg, #f5f5f5 0deg)`}} >
                        <div className='progress-value'>{project.physicalPerformance}%</div>
                    </div>
                </div>
        </div>
      </div>
      <div className="description-div">
        <span id="description-title" className="text-lg font-bold">Description</span>
        <p className="text-gray-500">{project?.description}</p>
      </div>
      <div className="members-div">
        <div className="members-title flex items-center justify-between">
          <span className="text-lg font-bold">Members</span>
          <RiSettings3Fill id="setting-icon" className="text-gray-500" />
        </div>
        <div className="member-card-container">
          <div className="member flex items-center justify-between">
            <div className="member-left flex items-center">
              <div className="user-image w-10 h-10 rounded-full bg-gray">
                <span className='font-semibold'>Faysal Ali</span>
            </div>
            </div>
      
            </div>
            </div>
            </div>
            </div>
            <div className="right-overview">
      

      {invoiceData &&
      <div className="right-overview-div-2">
          <div className="expenses-div-container">
              <div className="expenses-div">
                  <p id="total-expenses">INVOICE</p>
                  <p className="expenses-cost">ETB{invoiceData?.total.toLocaleString()}</p>
              </div>
              <div className="expenses-div">
                  <p id="billabe-expenses">PAID</p>
                  <p className="expenses-cost">ETB{invoiceData?.totalPaid.toLocaleString()}</p>
              </div>
              <div className="expenses-div">
                  <p id="billed-expenses">REMAINING</p>
                  <p className="expenses-cost">ETB{invoiceData?.amountDue.toLocaleString()}</p>
              </div>
              <div className="expenses-div">
                  <p id="unbilled-expenses">VIEW</p>
                  <Link to={`/app/invoice/${invoiceData?.id}`}>
                  <p className="expenses-cost"><FiEdit /></p>
                  </Link>
              </div>
          </div>
      </div>
      }


  </div>
  
  
            </section>
  
  )
}

export default OverView
