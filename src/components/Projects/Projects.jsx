import React from "react";
import { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ProjectUI from "./ProjectUI";
import ProjectUIList from "./ProjectUIList";
import "./projects.scss";
import { BsGrid, BsList } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { url } from "config/urlConfig";
import { BiSearch, BiAddToQueue } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import ShowPhoto from "./ShowPhoto";
import { MdClose } from "react-icons/md";

import AddProject from "./AddProject";
import ProjectDetail from "./ProjectDetail";

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const Projects = () => {
  const statuses = {
    not_started: "Not Started",
    ongoing: "Ongoing",
    done: "Done",
  };

  const [list, setList] = useState(false);
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const { isLoading, data } = useQuery(["project-list"], async () => {
    const resp = await axios.get(`${url}/projects`);
    return resp.data;
  });

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  let startProjects  = [];

  const loadProjects = () => {
     const resp = axios.get(`${url}/projects`,{withCredentials: true}).then((dt)=>{
      let prjs = [];
      dt?.data?.projects.map((pr)=>{
          let p = {};
          p.id = pr.id;
          p.name = pr.name;
          p.cateogry = "Category Name";
          p.description = pr.description;
          p.progress = pr.percentage;
          p.status = pr.status;
          p.startTime = pr.starttime;
          p.endtime = pr.endtime;
          p.BidId = pr.BidId;
          p.Bids = pr.Bids
          prjs.push(p);
        });
       
        
        setProjects(prjs);
        setSearchResult(prjs)
      });
      // console.log('prjs is ',startProjects);
  }

  useEffect(()=>{
    loadProjects();
    startProjects = projects
  },[])

  const handleCloseProfile = () => {
    setProfile({ title: "", url: "", open: false });
  };

  const [profile, setProfile] = useState({ title: "", url: "", open: false });

  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

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

  const [selectedProject, setSelectedProject] = useState({id: 0, show: false});
  const handleCloseDetail = () => {
    setSelectedProject({id: 0, show: false});
  };
  const handleOpenDetail = (id)=>{
    setSelectedProject({id, show:true})
  }

  return (
    <>
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
      <AddProject
        setData={setProjects}
        pData = {projects}
        open={openAdd}
        handleClose={handleCloseAdd} 
        successCallback={()=>{}}
        setOpenError={setOpenError}
        setOpenSuccess={setOpenSuccess}
      />
      <ProjectDetail
        open={selectedProject.show}
        id={selectedProject.id}
        handleClose={handleCloseDetail} 
        successCallback={()=>{}}
        setOpenError={setOpenError}
        setOpenSuccess={setOpenSuccess}
      />

      <ShowPhoto
        open={profile.open ?? false}
        handleClose={handleCloseProfile}
        profile={profile}
      />
      <div className="header">
        <div className="start dark:text-gray-100">All Projects</div>

        <div className="end">
          {!sm && <div className="search">
          <input
              placeholder="Search"
              value={search}
              onChange={(e) => {
                let s = e.target.value;
                if(s){
                  let pr = projects.filter((p) =>
                    p.name.toLocaleLowerCase().startsWith(s)
                  );
                  setProjects((prev) => pr);
                  setSearch((prev) => s);
                }else{
                  setProjects((prev)=>searchResult)
                  setSearch((prev)=>"")
                }
              }}
            />
            <BiSearch className="icon text-gray-400 dark:text-gray-500" />
            <MdClose
              onClick={() => {
                setProjects(searchResult);
                setSearch((prev) => "");
              }}
              className="close text-gray-400 dark:text-gray-500"
            />
          </div>}
          <div
            className={list ? "icon-div-list" : "icon-div"}
            onClick={() => setList(true)}
          >
            <BsList style={{ fontSize: 22 }} />
          </div>
          <div
            className={!list ? "icon-div-list" : "icon-div"}
            onClick={() => setList(false)}
          >
            <BsGrid style={{ fontSize: 20 }} />
          </div>
          {/* <div className={!list? "icon-div-list" : "icon-div"} onClick={()=>setList(false)}><BiAddToQueue style={{fontSize: 22}}/></div> */}
          <Button
            variant="contained"
            size="small"
            style={{
              borderRadius: 3,
              backgroundColor: "#0052cc",
              textTransform: "capitalize",
              fontSize: 14,
            }}
            onClick={handleClickOpenAdd}
            // onClick={()=>{
            //   setSelectedProject({id: 1, show: true});
            // }}
            color="success"
            startIcon={<AiOutlinePlus />}
          >
            <p style={{ marginTop: 0 }}>Add Project</p>
          </Button>
        </div>
      </div>
      {!list && (
        <div className="container-div">
          <Grid container spacing={2}>
            {projects.map((pro, index) => {
              return (
                <Grid
                  key={"pro" + index + "-" + pro.id}
                  item
                  xs={12}
                  sm={6}
                  lg={4}
                  xl={3}
                >
                  <ProjectUI
                    setProjects={setProjects}
                    projects={projects}
                    openDetail={handleOpenDetail}
                    setOpenSuccess={setOpenSuccess}
                    pr={pro}
                    key={"pro-item" + index + "-" + pro.id}
                    setProfile={setProfile}
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}

      {list && (
        <div className="container-div">
          <Grid container spacing={0.5}>
            {projects.map((pro, index) => {
              return (
                <Grid key={"pro" + index + "-" + pro.id} item xs={12}>
                  <ProjectUIList
                  openDetail={handleOpenDetail}
                    pr={pro}
                    key={"pro-item" + index + "-" + pro.id}
                    setProfile={setProfile}
              
                  />
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
      {(projects.length <= 0) && 
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 150,
        height: 80,
      }}>
        <p
          style={{
            color: 'white',
            borderRadius: 30,
            background: "green",
            padding: "10px 30px",
            fontFamily: 'ubuntu',
            fontSize: 20,
            boxShadow: "2px 4px rgba(0,0,0,.1)"
          }}
        >No project added!</p>
      </div>}
    </>
  );
};

export default Projects;
