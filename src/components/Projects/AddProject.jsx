import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import { IconButton, Divider } from "@mui/material";
import Draggable from "react-draggable";
import { MdClose } from "react-icons/md";
import Slide from "@mui/material/Slide";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField, TextArea, Dropdown, DateInput, NumberInput } from "./Inputs/Inputs";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import * as constants from "constants.js";
import Loader from 'components/Loader';
import {url} from 'config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";


function PaperComponent(props) {
  return (
    <Draggable
      handle="#add-project"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddProject = ({ open, handleClose, successCallback, setOpenError, setOpenSuccess,pData,setData }) => {
const [users,setUsers ]= useState([])
  const [formData, setFormData] = useState({
    name: {value: "", error: "", optional: false},
    description: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    place:  {value: "", error: "", optional: false},
    percentage:  {value: "", error: "", optional: false},
    starttime:  {value: "", error: "", optional: false},
    endtime:  {value: "", error: "", optional: false},
    year:  {value: "", error: "", optional: false},
    consultant:  {value: "", error: "", optional: false},
    totalCost:  {value: "", error: "", optional: false},
    utilizedCost:  {value: "", error: "", optional: false},
    physicalPerformance:  {value: "", error: "", optional: false},
    engineer:{value:"",error:"",optional:false}
    
  });
  React.useEffect(()=>{
    axios.get(`${url}/users`,{withCredentials:true}).then((resp)=>{
      if(resp.data.error){

      }else{
        setUsers(resp.data)
      }
    })
  },[])
  const [loading, setLoading] = useState(false);
  const userNames=users.map((usr)=>({id:usr.id,name:usr.name}))

  const statuses = [
    {
      id: 1,
      name: "open",
    },
    {
      id: 2,
      name: "pending",
    },
    {
      id: 3,
      name: "active",
    },
    {
      id: 4,
      name: "completed",
    },
  ];
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const validate = () => {
      let temp = [];
      temp.name = formData.name.value ? "" : "error";
      temp.description = formData.description.value ? "" : "error";
      temp.starttime = formData.starttime.value ? "" : "error";
      temp.endttime = formData.endtime.value ? "" : "error";
      temp.place = formData.place.value ? "" : "error";
      temp.percentage = formData.percentage.value ? "" : "error";
      temp.year = formData.year.value ? "" : "error";
      temp.consultant = formData.consultant.value ? "" : "error";
      temp.totalCost = formData.totalCost.value ? "" : "error";
      temp.utilizedCost = formData.utilizedCost.value ? "" : "error";
      temp.physicalPerformance = formData.physicalPerformance.value ? "" : "error";
      
      let val = "error";
      statuses.map((op)=>{
          if(op.id === formData.status.value) {
              val = "";
          }
      });
      temp.status = val;
      setFormData({
        name: {...formData.name},
        description: {...formData.description, error: temp.description},
        starttime: {...formData.starttime, error: temp.starttime},
        endtime: {...formData.endtime, error: temp.endtime},
        status: {...formData.status, error: temp.status},
        place: {...formData.place, error: temp.place},
        percentage: {...formData.percentage, error: temp.percentage},
        year: {...formData.year, error: temp.year},
        consultant: {...formData.consultant, error: temp.consultant},
        totalCost: {...formData.totalCost, error: temp.totalCost},
        utilizedCost: {...formData.utilizedCost, error: temp.utilizedCost},
        physicalPerformance: {...formData.physicalPerformance, error: temp.physicalPerformance},

      })
      return Object.values(temp).every(x => x=="");
  };

  function handleSubmit(event) {
    event.preventDefault();
      // const successMessage = {open:true, message:"Successfully Added!"}
      // setOpenSuccess((prev)=>successMessage)
      const data = new FormData();

      let status =""
      statuses.map((op)=>{
        if(op.id == formData.status.value) {
            status = op.name;
        }
    });
 

      setLoading(true);
      data.append("name", formData.name.value);
      data.append("description", formData.description.value);
      data.append("starttime", formData.starttime.value);
      data.append("endtime", formData.endtime.value);
      data.append("status", status);
      data.append("percentage", formData.percentage.value);
      data.append("place", formData.place.value);
      data.append("year", formData.year.value);
      data.append("consultant", formData.consultant.value);
      data.append("totalCost", parseInt(formData.totalCost.value));
      data.append("utilizedCost", parseInt(formData.utilizedCost.value));
      data.append("physicalPerformance", formData.physicalPerformance.value);
      data.append("engineer",formData.engineer.value)
      
      // console.log('the data is ',formData.engineer.value);
      if(validate()) {
        submitToAPI(data);
      }
      else {
        setLoading(false);
        console.log('not validated');
      }
  }

  function submitToAPI(data) {

    axios.post(`${url}/projects`,data,{withCredentials:true}).then(data=>{
          if(!data.data.error) {
            setLoading((prev)=>false)
            setFormData(
              {
                name: {value: "", error: "", optional: false},
                description: {value: "", error: "", optional: false},
                status:  {value: 0, error: "", optional: false},
                place:  {value: "", error: "", optional: false},
                percentage:  {value: "", error: "", optional: false},
                starttime:  {value: "", error: "", optional: false},
                endtime:  {value: "", error: "", optional: false},
                year:  {value: "", error: "", optional: false},
                consultant:  {value: "", error: "", optional: false},
                totalCost:  {value: "", error: "", optional: false},
                utilizedCost:  {value: "", error: "", optional: false},
                physicalPerformance:  {value: "", error: "", optional: false},
                engineer:{value:"",error:"",optional:false}
              }
            );
            const successMessage = {open:true, message:"Successfully Added!"}
            setOpenSuccess((prev)=>successMessage)
            successCallback();
            setData([...pData,data.data])
            handleClose();
          }
          else {
            setLoading((prev)=>false);
            const errorMessage = {open:true, message:data.data.error}
            setOpenError((prev)=>errorMessage)
          }
      }).catch((error)=>{
        console.error(error);
        setLoading((prev)=>false);
        setOpenError({open:true, message:"Something went wrong!"})
      });
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="add-project"
        style={{ backgroundColor: "rgba(0,0,0,.2)"}}
        TransitionComponent={Transition}
        //keepMounted
        fullScreen={fullScreen}
      >
        <div className="bg-white dark:bg-gray-700" style={{ minWidth: !fullScreen ? 500 : 300, resize: "both", overflow:'auto' }}>
          
          <DialogTitle
            sx={{ m: 0, p: 2 }}
            style={{ cursor: "move", fontFamily: "ubuntu" }}
            id="add-project"
            className="text-gray-600 dark:text-gray-200 relative"
          >
            Add Project
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
              <MdClose onClick={handleClose}/>
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent>
          {loading && <div><Loader /></div>}
          
          {!loading && <>
            <div className="left-content-container">
              <div className="form-label dark:text-gray-200">
                <div>B</div>
                Basic project detail
              </div>
              <div className="project-add-form-container">
                <div className="parent">
                  <form>
                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="name"
                        labelText="Project name"
                        placeholder="Enter name"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="place"
                        labelText="Project Place"
                        placeholder="Place(jigjiga)"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextArea
                        formData={formData}
                        setFormData={setFormData}
                        label="description"
                        labelText="Project description"
                        placeholder="Enter description"
                      
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <DateInput
                        formData={formData}
                        setFormData={setFormData}
                        label="starttime"
                        labelText="Start date"
                        placeholder="Enter start date"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <DateInput
                        formData={formData}
                        setFormData={setFormData}
                        label="endtime"
                        labelText="End date"
                        placeholder="Enter end date"
                      />
                    </div>
                  </div>
                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <DateInput
                        formData={formData}
                        setFormData={setFormData}
                        label="year"
                        labelText="Project Year"
                        placeholder="Enter Project Year"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="percentage"
                        labelText="Project Percentage"
                        placeholder="Enter Percentage"
                       
                        errorLabel="nameError"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="consultant"
                        labelText="Project consultant"
                        placeholder="Enter consultant"
                       
                        errorLabel="nameError"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <NumberInput
                        formData={formData}
                        setFormData={setFormData}
                        label="totalCost"
                        labelText="Project Total Cost   "
                        placeholder="Enter Total Cost"
                   
                        errorLabel="nameError"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="utilizedCost"
                        labelText="Project Utilized Cost"
                        placeholder="Enter Utilized Cost"
                        errorLabel="nameError"
                      />
                    </div>
                  </div>
                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <TextField
                        formData={formData}
                        setFormData={setFormData}
                        label="physicalPerformance"
                        labelText="Project Physical Performance"
                        placeholder="Enter physical Performance"
                        errorLabel="nameError"
                      />
                    </div>
                  </div>
                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <Dropdown
                        formData={formData}
                        setFormData={setFormData}
                        label="engineer"
                        options={userNames}
                        labelText="Project Assigned Engineer"
                        placeholder="Enter Assigned Engineer"
                        errorLabel="nameError"
                      />
                    </div>
                  </div>

                  <div className="cat-container">
                    <div className="child"></div>
                    <div className="ch-child-item">
                      <Dropdown
                        formData={formData}
                        setFormData={setFormData}
                        label="status"
                        options={statuses}
                        labelText="Project status"
                        open={open}
                        //selectText="Not Selected"
                      />
                    </div>
                  </div>
                  </form>
                </div>
                
                <div className="dot1" style={{ width: 10, height: 10 }}></div>
              </div>
            </div>
          </>}
          </DialogContent>
          <Divider />
          <DialogActions
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "20px 30px",
            }}
          >
            <Button
              autoFocus
              onClick={handleClose}
              style={{ fontFamily: "ubuntu" }}
              color="error"
              className="dark:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={(handleSubmit)}
              variant="outlined"
              style={{ borderRadius: 20, fontFamily: "ubuntu" }}
              className="dark:text-white dark:bg-green-400"
            >
              Create
            </Button>
          </DialogActions>
         
        </div>
      </Dialog>
    </div>
  );
};

export default AddProject;
