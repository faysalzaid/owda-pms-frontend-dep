import React, { useEffect } from 'react'

import ChartCard from '../components/Chart/ChartCard'
import { Doughnut, Line, Bar } from 'react-chartjs-2'
import ChartLegend from '../components/Chart/ChartLegend'
import PageTitle from '../components/Typography/PageTitle'



import {
  doughnutOptions,
  lineOptions,
  barOptions,
  doughnutLegends,
  lineLegends,
  barLegends,
} from '../utils/demo/chartsData'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from 'config/urlConfig'
import { useState } from 'react'

function Charts() {


const [projects,setProject] = useState([])



useEffect(()=>{
// axios.get(`${url}/projects`,{withCredentials:true}).then((resp)=>{
//   if(resp.data.error){
//     console.log(resp.data.error);
//   }
// setProject(resp.data.projects)


// })


},[])




const projectFinancialUtilized = {
  data: {
      datasets: [{
          data: projects?.map(pr=> pr.financialPerformance),
          /**
           * These colors come from Tailwind CSS palette
           * https://tailwindcss.com/docs/customizing-colors/#default-color-palette
           */
          backgroundColor: projects?.map(pr=>pr.color),
          label: 'performance',
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
const numFor = Intl.NumberFormat('en-US');    
// let budgets = projects.map((pr)=>numFor.format(pr.utilizedCost))
// console.log('budget',budgets);



const projectUtilizedCostGraph = {
  data: {
      datasets: [{
          data: projects?.map(pr=>pr.utilizedCost),
          backgroundColor: projects?.map(pr=>pr.color),
          label: 'utilizedCost',
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

const projectPercentileGraph = {
  data: {
      datasets: [{
          data: projects?.map(pr=> pr.physicalPerformance),
          backgroundColor: projects?.map(pr=>pr.color),
          label: 'Percentage',
      }, ],
      labels: projects.map((pr)=>pr.name),
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

      <PageTitle><p style={{fontSize:15}}>Projects Percentage Completion</p></PageTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
     

        <ChartCard title="Project Percent Graph">
          <Doughnut {...projectPercentileGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>

        <ChartCard title="Lines">
          <Line {...projectPercentileGraph} />
          <ChartLegend legends={projects}/>
        </ChartCard>


      </div>
      <PageTitle style={{fontSize:4}}><p style={{fontSize:15}}>Projects Utilized Cost</p></PageTitle>
      <div className='grid gap-6 mb-8 md:grid-cols-2'>
      <ChartCard title="Cost Utilized">
        <Bar {...projectUtilizedCostGraph} />
        <ChartLegend legends={projects} />
      </ChartCard> 
      <ChartCard title="Financial Performance">
        <Bar {...projectFinancialUtilized} />
        <ChartLegend legends={projects} />
      </ChartCard> 

      </div>
    </>
  )
}

export default Charts
