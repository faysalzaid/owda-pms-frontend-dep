import React, { useState, useEffect } from 'react';import CountsSection from 'components/Counts/Counts' 

import CTA from '../components/CTA'
import InfoCard from '../components/Cards/InfoCard'
import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from '../hooks/authContext'
import { useContext } from 'react'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../icons'
import RoundIcon from '../components/RoundIcon'
import response from '../utils/demo/tableData'
import UnAuthorized from 'components/UnAuthorized/UnAuthorized'

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
} from '@windmill/react-ui'

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../utils/demo/chartsData'
import { withRouter } from 'react-router-dom'
import { url } from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";




function Dashboard(props) {
  const {authState,settings} = useContext(AuthContext)

  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  const [projects,setProject] = useState([])
  const [countsData,setCountsData] = useState({ projectCount:"",bidCount:"",activeProjects:"",completedProjects:""})
  const [authorization,setAuthorization] = useState(false)



  // console.log('data from app',authState);
    useEffect(()=>{
      const getData = async()=>{

        await axios.get(`${url}/project`,{withCredentials:true}).then((resp)=>{
          if(resp.data.error){
            console.log(resp.data.error);
          }
        setProject(resp.data)
    
        }).catch((err)=>{
          console.log(err);
        })

    
      }


      getData()

    // console.log(favicon);


},[])


  // pagination setup
  const resultsPerPage = 10
  const totalResults = response.length

  // pagination change control
  function onPageChange(p) {  
    setPage(p)
  }
  


const projectPercentileGraph = {
  data: {
      datasets: [{
          data: projects?.map(pr=> pr.percentage),
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: projects?.map(pr=>pr.color),
          label: 'Percentage',
      }, ],
      labels: projects?.map((pr)=>pr.name),
  },
  options: {
      responsive: true,
      cutoutPercentage: 80,
  },
  legend: {
      display: false,
  },
}


const projectUseAmountGraph = {
  data: {
      datasets: [{
          data: projects?.map(pr=> parseFloat(pr.inUseAmount)),
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: projects?.map(pr=>pr.color),
          label: 'Amount',
      }, ],
      labels: projects?.map((pr)=>pr.name),
  },
  options: {
      responsive: true,
      cutoutPercentage: 80,
  },
  legend: {
      display: false,
  },
}






  return (
    <>
    
      
      <PageTitle>Dashboard welcome  {authState.username}</PageTitle>

      {/* <CTA /> */}

      {/* <!-- Cards --> */}
      <CountsSection/>
     {/* End of cards */}

      <TableContainer>
      {/* Calendar section */}



      {/* end of calendar section */}
      </TableContainer>

      <PageTitle>Projects</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-2">
      <ChartCard title="Project Percent Graph">
          <Doughnut {...projectPercentileGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>

        <ChartCard title="Project In Use Amount">
          <Line {...projectUseAmountGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>

     
      </div>
    
    </>
  )
}

export default withRouter(Dashboard)
