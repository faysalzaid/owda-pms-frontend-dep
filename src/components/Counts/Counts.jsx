import axios from "config/axiosConfig";
import { useState } from "react";
import { useEffect } from "react";
import InfoCard from "components/Cards/InfoCard";
// import InfoCard from './components/Cards/InfoCard'
import ChartCard from 'components/Chart/ChartCard'
import { Doughnut, Line } from 'react-chartjs-2'
import { AuthContext } from 'hooks/authContext'
import { useContext } from 'react'
import ChartLegend from 'components/Chart/ChartLegend'
import PageTitle from 'components/Typography/PageTitle'
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from 'icons'
import RoundIcon from 'components/RoundIcon'
import { url } from "config/urlConfig";



function CountsSection() {
    const [countsData,setCountsData] = useState({ projectCount:"",pgroup:"",store:"",purchaseRequest:""})

    useEffect(()=>{
        const getData = async()=>{
            await axios.get(`${url}/counts`,{withCredentials:true}).then((resp)=>{
                const data = resp.data
                // console.log(resp.data);
                setCountsData({ projectCount:data.projectsCount,pgroup:data.pgroup,store:data.store,purchaseRequest:data.purchaseRequest})
              }).catch((err)=>{
                console.log(err);
              })
        }
        getData()
    },[])
    return ( 
    <>
     {/* <!-- Cards --> */}
     <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Projects " value={countsData.projectCount}>
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Purchases" value={countsData.purchaseRequest}>
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Purchase Groups" value={countsData.pgroup}>
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Store Items" value={countsData.store}>
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

    
    </> 
    );
}

export default CountsSection;