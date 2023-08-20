import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconButton, Divider, Grid } from "@mui/material";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { EditableTextContent, CustomDatePicker } from "./Inputs/EditableInputs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import * as constants from "constants.js";
import Loader from 'components/Loader';

import Tasks from './Tasks/Tasks';
import Budgets from "./Tasks/Budgets";
import {Bids} from "./Bids/Bids";
import { useEffect } from "react";
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from "config/urlConfig";

import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
function PaperComponent(props) {
  return (
      <Paper {...props} />
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ProjectDetail = ({ open, handleClose, successCallback, setOpenError, setOpenSuccess,id }) => {
const [projectData,setProjectData] = useState([])
const [selectedBid,setSelectedBid] = useState([])


  const [formData, setFormData] = useState({
    name: {value: "Project Management", error: "", optional: false},
    description: {value: "Interactive project add, project detail with live edit and update and tasks list UI with full crud functionality", error: "", optional: false},
    descriptionError: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    starttime:  {value: "", error: "", optional: false},
    endtime:  {value: "", error: "", optional: false},
    percentage:{value:"",error:"",option:false},
    year:{value:"",error:"",option:false},
    totalCost:{value:0,error:"",option:false},
    utilizedCost:{value:0,error:"",option:false},
    remainingCost:{value:"",error:"",option:false},
    physicalPerformance:{value:"",error:"",option:false},
    financialPerformance:{value:"",error:"",option:false},
    BidId:{value:"",error:"",option:false},
  });


  useEffect(()=>{
    axios.get(`${url}/projects/${id}`,{withCredentials:true}).then((resp)=>{
      const data = resp.data
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
      setProjectData(resp.data)

   
    })
  },[id])

  useEffect(()=>{
    axios.get(`${url}/bids`,{withCredentials:true}).then((resp)=>{
      setSelectedBid(resp.data.bid)
      // console.log(resp.data.bid);
    })
  },[])

  const [loading, setLoading] = useState(false);
  const statuses = [
    {
      id: 1,
      name: "Not Started",
    },
    {
      id: 2,
      name: "In Progress",
    },
    {
      id: 3,
      name: "In Review",
    },
    {
      id: 4,
      name: "Completed",
    },
  ];

  const validate = () => {
      let temp = [];
      temp.name = formData.name.value ? "" : "error";
      temp.description = formData.description.value ? "" : "error";
      temp.starttime = formData.starttime.value ? "" : "error";
      temp.endtime = formData.endtime.value ? "" : "error";
      
      let val = "error";
      statuses.map((op)=>{
          if(op.id === formData.status.value) {
              val = "";
          }
      });
      temp.status = val;
     
    
      setFormData({
        name: {...formData.name, error: temp.name},
        description: {...formData.description, error: temp.description},
        starttime: {...formData.starttime, error: temp.starttime},
        endtime: {...formData.endtime, error: temp.endtime},
        status: {...formData.status, error: temp.status},

      })
      return Object.values(temp).every((x) => x == "");
  };

  async function callBackFunc(text, label) {
      //console.log(text)
      const fd = {...formData, [label]: {...formData[label], value: text}};
      setFormData(fd)

      const request = {
        name:fd.name.value,
        year:fd.year.value,     
        description:fd.description.value,
        starttime:fd.starttime.value,
        endtime:fd.endtime.value,
        status:fd.status.value,
        percentage:fd.percentage.value ,
        totalCost:parseInt(fd.totalCost.value.replaceAll(',','')),
        utilizedCost:parseInt(fd.utilizedCost.value.replaceAll(',','')),
        physicalPerformance:fd.physicalPerformance.value,


      }
      console.log(request);
      axios.post(`${url}/projects/${id}`,request,{withCredentials:true}).then((resp)=>{
        console.log('respdata',resp.data)
        if(!resp.data.error){

      
        setFormData(
          {
            name: {value: resp.data.name, error: "", optional: false},
            description: {value: resp.data.description, error: "", optional: false},
            descriptionError: {value: "", error: "", optional: false},
            status:  {value: resp.data.status, error: "", optional: false},
            starttime:  {value:resp.data.starttime, error: "", optional: false},
            endtime:  {value: resp.data.endtime, error: "", optional: false},
            percentage:{value:resp.data.percentage,error:"",optional:false},
            year:{value:resp.data.year,error:"",option:false},
            totalCost:{value:parseFloat(resp.data.totalCost).toLocaleString()??0,error:"",option:false},
            utilizedCost:{value:parseFloat(resp.data.utilizedCost).toLocaleString()??0,error:"",option:false},
            remainingCost:{value:parseFloat(resp.data.remainingCost).toLocaleString()??0,error:"",option:false},
            physicalPerformance:{value:resp.data.physicalPerformance??0,error:"",option:false},
            financialPerformance:{value:resp.data.financialPerformance??0,error:"",option:false},
            BidId:{value:resp.data.BidId,error:"",option:false},
          }
        );
       
        setOpenSuccess((prev)=>({open:true,message:'successfully Updated'}))
      }else{
        setOpenError((prev)=>resp.data.error)
      }
      })
      console.log(text,label,id);
      
  }

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [bids, setBids] = useState({show: false})
  const [selectedWinner, setSelectedWinner] = useState();

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        //aria-labelledby="project-detail"
        style={{ backgroundColor: "rgba(0,50,255,.18)"}}
        TransitionComponent={Transition}
        //keepMounted
        fullWidth={true}
        fullScreen={true}
        maxWidth='xl'
        disableEscapeKeyDown 
      >
        <div className="dialog-detail bg-white dark:bg-gray-700" style={{ minWidth: 300,height: '100%', minHeight: 500, overflow:'auto' }}>
          
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            //style={{ cursor: "move", fontFamily: "ubuntu" }}
            id="project-detail"
            className="relative"
          >
            
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <MdClose />
            </IconButton>
          </DialogTitle>
          {/* <Divider /> */}
          <DialogContent>
          {loading && <div><Loader /></div>}
          <Grid container style={{marginTop: 20}}>
            <Grid item md={12} sm={12}>
              
              <EditableTextContent
                formData={formData}
                setFormData={setFormData}
                label="name"
                labelText="Project name"
                placeholder="Enter name"
                errorLabel="nameError"
                callBackFun={callBackFunc}
                width="90%"
                margin="0px 0px 0px 0px"
                fontSize={25}
                padding="5px 15px"
              />
            
              <EditableTextContent
                formData={formData}
                setFormData={setFormData}
                label="description"
                labelText="Project description"
                placeholder="Enter description"
                errorLabel="nameError"
                callBackFun={callBackFunc}
                width="90%"
                margin='0'
                padding="5px 15px"
                fontWeight="lighter"
                fontSize={20}
                fontFamily="ubuntu"
              />

            </Grid>
            <Grid item md={6} sm={12}>
              <CustomDatePicker
                  labelText="Start Date"
                  formData={formData}
                  setFormData={setFormData}
                  callBackFun={callBackFunc}
                  label="starttime"
                  type="desktop"
                  //views={['year']}
                  parentStyle={{
                    margin: "10px 15px"
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    fontFamily: 'ubuntu',
                  }}
                  inputStyle={{
                    marginLeft: 50,
                    fontFamily: 'ubuntu',
                    fontWeight: "bold",
                    fontSize: 15
                  }}
              />
              <CustomDatePicker
                  labelText="End Date"
                  formData={formData}
                  setFormData={setFormData}
                  callBackFun={callBackFunc}
                  label="endtime"
                  type="desktop"
                  //views={['year','month']}
                  parentStyle={{
                    margin: "10px 15px"
                  }}
                  labelStyle={{
                    fontWeight: "bold",
                    fontSize: 16,
                    fontFamily: 'ubuntu',
                  }}
                  inputStyle={{
                    marginLeft: 60,
                    fontFamily: 'ubuntu',
                    fontWeight: "bold",
                    fontSize: 15
                  }}
              />

            <div className="flex items-start" style={{marginLeft: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 45}}>Total Cost</label>
                <EditableTextContent
                  formData={formData}
                  setFormData={setFormData}
                  label="totalCost"
                  labelText="Total Cost"
                  placeholder="Enter total cost"
                  callBackFun={callBackFunc}
                  width="90%"
                  margin='0'
                  padding="5px 15px"
                  fontWeight="lighter"
                  fontSize={17}
                  fontFamily="ubuntu"
                  textShadow="0px 0px red"
                  minWidth={100}
                  type="number"
                />
            </div>

            <div className="flex items-start" style={{marginLeft: 15, marginTop: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 25}}>Utilized Cost</label>
                <EditableTextContent
                  formData={formData}
                  setFormData={setFormData}
                  label="utilizedCost"
                  labelText="Utilized Cost"
                  placeholder="Enter utilized cost"
                  callBackFun={callBackFunc}
                  width="90%"
                  margin='0'
                  padding="5px 15px"
                  fontWeight="lighter"
                  fontSize={17}
                  fontFamily="ubuntu"
                  textShadow="0px 0px red"
                  minWidth={100}
                  type="number"
                />
            </div>

            </Grid>
            <Grid item md={6} sm={12}>
             <div className="flex items-start" style={{marginLeft: 15, marginTop: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 68}}>Remaining Cost</label>
                <EditableTextContent
                    formData={formData}
                    setFormData={setFormData}
                    label="remainingCost"
                    labelText="Remaining Cost"
                    callBackFun={callBackFunc}
                    width="90%"
                    margin='0'
                    padding="5px 15px"
                    fontWeight="lighter"
                    fontSize={17}
                    fontFamily="ubuntu"
                    textShadow="0px 0px red"
                    minWidth={100}
                    type="number"
                  />
              </div>

              <div className="flex items-start" style={{marginLeft: 15, marginTop: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 25}}>Physical Performance</label>
                <EditableTextContent
                    formData={formData}
                    setFormData={setFormData}
                    label="physicalPerformance"
                    labelText="Physical Performance"
                    callBackFun={callBackFunc}
                    width="90%"
                    margin='0'
                    padding="5px 15px"
                    fontWeight="lighter"
                    fontSize={17}
                    fontFamily="ubuntu"
                    textShadow="0px 0px red"
                    minWidth={100}
                    type="number"
                  />
              </div>

              <div className="flex items-start" style={{marginLeft: 15, marginTop: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 20}}>Financial Performance</label>
                <EditableTextContent
                    formData={formData}
                    setFormData={setFormData}
                    label="financialPerformance"
                    labelText="Financial Performance"
                    callBackFun={callBackFunc}
                    width="90%"
                    margin='0'
                    padding="5px 15px"
                    fontWeight="lighter"
                    fontSize={17}
                    fontFamily="ubuntu"
                    textShadow="0px 0px red"
                    minWidth={100}
                    type="number"
                  />
              </div>

              <div className="flex items-start" style={{marginLeft: 15, marginTop: 15}}>
                <label className="dark:text-gray-100" style={{fontFamily:'ubuntu', fontWeight: 'bold', marginTop: 5, marginRight: 20}}>Status</label>
                <EditableTextContent
                    formData={formData}
                    setFormData={setFormData}
                    label="status"
                    labelText="Status"
                    callBackFun={callBackFunc}
                    width="90%"
                    margin='0'
                    padding="5px 15px"
                    fontWeight="lighter"
                    fontSize={17}
                    fontFamily="ubuntu"
                    textShadow="0px 0px red"
                    minWidth={100}
                    type="number"
                  />
              </div>


            </Grid>
            <Grid item md={12} sm={12}>
             <div className="detail-progress-container mt-5">
                <progress value={formData.percentage.value} max="100" className='progress'></progress>
                <p className='percentage dark:text-gray-300'>{formData.percentage.value}%</p>
             </div>
             <div className="tasks-container">
                <label className="task-label" style={{color: '#1faaea', fontSize: 20, fontWeight: 'bold'}}>Budget Detail</label>
                <Budgets budget={projectData} setOpenSuccess={setOpenSuccess} setOpenError={setOpenError}/>
             </div>
             <div className="tasks-container">
                <div className="flex items-center justify-between">
                   <label className="task-label" style={{color: '#a962e3', fontSize: 20, fontWeight: 'bold'}}>All Bids</label>
                  {!formData.BidId.value && <label className="bg-blue-300 px-4 text-white rounded-full font-bold hover:cursor-pointer" style={{fontSize:15,paddingTop:1, paddingBottom: 1}}>No winner selected</label>}
                 {formData.BidId.value && <label className="bg-blue-300 px-4 text-white rounded-full font-bold hover:cursor-pointer" style={{fontSize:15,paddingTop:1, paddingBottom: 1}}>{selectedBid?.map((bd)=>bd.id===formData.BidId.value?bd.fullname:"")}</label>}

                  <IconButton onClick={()=>setBids({show: !bids.show})}>
                    {!bids.show &&
                      <IoIosArrowForward
                        style={{
                            color: '#172b4d',
                            fontSize: 18
                        }}
                      />
                    }
                    {bids.show &&
                      <IoIosArrowDown
                        style={{
                            color: '#172b4d',
                            fontSize: 18
                        }}
                      />
                    }
                  </IconButton>
                </div>
                <Bids  setFormData={setFormData} projectId={id} showInterface={bids.show} setSelectedWinner={setSelectedWinner} Bid={projectData} setProject={setProjectData} setOpenSuccess={setOpenSuccess}/>
             </div>
             {!bids.show && <Divider />}
             <div className="tasks-container">
                <label className="task-label" style={{color: '#37c5ab', fontSize: 20, fontWeight: 'bold'}}>All Tasks</label>
                <Tasks task={projectData} setTask={setProjectData}/>
             </div>
            </Grid>
            
          </Grid>

          </DialogContent>      
         
        </div>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
