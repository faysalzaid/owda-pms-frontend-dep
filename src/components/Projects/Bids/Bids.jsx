import { purple } from '@mui/material/colors';
import React, {useEffect, useState} from 'react'
import './bids.scss';
import {TbListSearch} from 'react-icons/tb';
import {IconButton} from '@mui/material';
import ShowDetail from './ShowDialog';
import {IoMdCall} from 'react-icons/io';
import axios from '../../../config/axiosConfig';
import { url } from 'config/urlConfig';

export const Bids = ({showInterface, setSelectedWinner,Bid,setProject,setFormData,setOpenSuccess}) => {
    
let bidsData = Bid.Bids


//   let [bids, setBids] = useState([
//     {
//         id: 1,
//         name: "Ousman Seid",
//         phone: "+251921114160",
//         amount: 51345,
//         status:1,
//         license: "http://www.pdf995.com/samples/pdf.pdf",
//         performa: "http://www.pdf995.com/samples/pdf.pdf",
//         proposal: "http://www.pdf995.com/samples/pdf.pdf",
//         company: "http://www.pdf995.com/samples/pdf.pdf"
//     },
//     {
//         id: 2,
//         name: "Faysal Ali",
//         phone: "+251928124254",
//         amount: 23643,
//         status:1,
//         license: "http://www.pdf995.com/samples/pdf.pdf",
//         performa: "http://www.pdf995.com/samples/pdf.pdf",
//         proposal: "http://www.pdf995.com/samples/pdf.pdf",
//         company: "http://www.pdf995.com/samples/pdf.pdf"
//     },
//     {
//         id: 3,
//         name: "Khadar Baxar",
//         phone: "+251910342343",
//         amount: 53235,
//         status: 1,
//         license: "http://www.pdf995.com/samples/pdf.pdf",
//         performa: "http://www.pdf995.com/samples/pdf.pdf",
//         proposal: "http://www.pdf995.com/samples/pdf.pdf",
//         company: "http://www.pdf995.com/samples/pdf.pdf"
//     },

//   ]);

  const statuses = [
    {
        id: 1,
        name: "processing"
    },
    {
        id: 2,
        name: "rejected "
    },
    {
        id: 3,
        name: "approved"
    }
  ]
  
  const [open, setOpen] = useState({show: false, id: 0});

  const handleClickOpen = (id) => {
    let bidDetail = {};
    bidsData.map((bid)=>{
        if(bid.id === id) {
            bidDetail = bid;
        }
    })
    setOpen({show: true, bidDetail: bidDetail});
  };

  const handleClose = () => {
    setOpen({show: false, id: 0});
  };

  const selectBid = (id) => {
     let bds = bidsData;
     bds = bidsData.map((bd)=>bd.id===id ? bd.fullname:"");
     setSelectedWinner(bds);
    let request = {
        name:Bid.name,
        year:Bid.year,
        description:Bid.description,
        place:Bid.place,
        starttime:Bid.starttime,
        endtime:Bid.endtime,
        status:Bid.status,
        percentage:Bid.percentage,
        totalCost:Bid.totalCost,
        utilizedCost:Bid.utilizedCost,
        physicalPerformance:Bid.physicalPerformance,    
        financialPerformance:Bid.financialPerformance,
        BidId:id,
        engineer:Bid.engineer
    }
    console.log(request);

    axios.post(`${url}/projects/${Bid.id}`,request,{withCredentials:true}).then((resp)=>{
      
        // setProject(resp.data)
        let data = resp.data
        setFormData(
            {
              name: {value: data.name, error: "", optional: false},
              description: {value: data.description, error: "", optional: false},
              descriptionError: {value: "", error: "", optional: false},
              status:  {value: data.status, error: "", optional: false},
              starttime:  {value:data.starttime, error: "", optional: false},
              endtime:  {value: data.endtime, error: "", optional: false},
              percentage:{value:data.percentage,error:"",optional:false},
              year:{value:data.year,error:"",option:false},
              totalCost:{value:parseFloat(data.totalCost).toLocaleString()??0,error:"",option:false},
              utilizedCost:{value:parseFloat(data.utilizedCost).toLocaleString()??0,error:"",option:false},
              remainingCost:{value:parseFloat(data.remainingCost).toLocaleString()??0,error:"",option:false},
              physicalPerformance:{value:data.physicalPerformance??0,error:"",option:false},
              financialPerformance:{value:data.financialPerformance??0,error:"",option:false},
              BidId:{value:data.BidId,error:"",option:false},
              
            }
          );
          setOpenSuccess((prev)=>({open:true,message:'successfully Selected Winner Bid'}))
    })
  }


  useEffect(()=>{
    bidsData?.map((bd)=> {
        if(bd.status===3) setSelectedWinner(bd.name)
    })
  },[bidsData])

  return (
    <div className='crud-container-bid mt-5' style={{height:showInterface?'auto':0, display: showInterface?"block": "none"}}>
        <ShowDetail open={open.show} handleClose={handleClose} bidDetail={open.bidDetail} statuses={statuses} callBack={selectBid}/>
        <table style={{minWidth: 700, overflowX: 'scroll'}} >
            
            <tbody className='dark:border-gray-400'>
                {bidsData?.length <= 0 && 
                  <tr>
                    <td></td>
                    <td></td> 
                    <td align='left' style={{minWidth: '300px', height: 100, clear:'both'}} className="dark:text-gray-200">
                        No Data
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                }
                {bidsData?.map((bid, index)=>{

                    let stts = "";
                    const color = {text: bid.status == 'processing' ? "#cd3232" : "#046c4e", bg: bid.status=='processing' ? "#fde8e8" : "#def7ec"}
                    statuses.map((st)=>{
                        if(bid.status === 'processing') {
                            stts = <div className='stts' style={{backgroundColor: 'yellow', color: 'black'}}>Proccessing</div>;
                        }else if(bid.status==='approved'){
                            stts = <div className='stts' style={{backgroundColor: 'green', color: 'white'}}>Approved</div>;
                        }else if(bid.status==="rejected"){
                            stts = <div className='stts' style={{backgroundColor: 'red', color: 'white'}}>Rejected</div>;
                        }
                    })
                    return (
                        <tr className='dark:border-transparent'>
                            <td className='td-year'>    
                                <div className='crud-title'>
                                <p 
                                    style={{paddingLeft: 10, color:"#4a5a74",}}
                                    className="dark:text-gray-100 font-bold text-orange-400">{bid.name}
                                </p>
                                </div>
                            </td>
                            <td className='td-allocated'>    
                            <div className='crud-title flex items-center'>
                                <IoMdCall fontSize={15} color="#4a5a74"/>
                                <p 
                                    style={{paddingLeft: 5, color:"#4a5a74"}}
                                    className="dark:text-gray-100 text-purple-500" >{bid.phone}
                                </p>
                                </div>
                            </td>
                            <td className='td-utilized'>    
                                <div className='crud-title'>
                                    <p 
                                        style={{paddingLeft: 10, color:"#4a5a74"}}
                                        className="dark:text-gray-100 text-pink-500">{parseFloat(bid.amount).toLocaleString()+" ETB"}
                                    </p>
                                </div>
                            </td>
                            <td className='td-remaining'>
                            <div className='crud-title'>
                                <p 
                                    style={{paddingLeft: 10, color:"#4a5a74"}}
                                    className="dark:text-gray-100">{stts}
                                </p>
                                </div>
                            </td>
                            <td align='center'>
                                <IconButton
                                  onClick={()=>{
                                    handleClickOpen(bid.id);
                                  }}
                                >
                                   <TbListSearch className='text-blue-400 dark:text-gray-100' color="#4a5a74"/>
                                </IconButton>
                            </td>
                           
                        </tr>
                    );
                })}
               
            </tbody>            
        </table>
    </div>
  )
}
export default Bids;
