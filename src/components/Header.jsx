import React, { useContext, useState, useEffect, useRef } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { FiEye } from 'react-icons/fi';
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../icons";
import {
  Avatar,
  // Badge,
  Button,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui";
import 'config/custom-button.css'

import { Badge } from "@mui/material";
import { MdMailOutline } from "react-icons/md";
import { styled } from "@mui/material/styles";
import * as constants from "../constants";

import removeCookie from "../hooks/removeCookie";
import { AuthContext } from "../hooks/authContext";
import { Link, useHistory, withRouter } from "react-router-dom";
import axios from "axios";
import { url } from "config/urlConfig";
import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'

function Header(props) {
  const { authState, setAuthState } = useContext(AuthContext);
  // let history = useHistory()
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);

  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }



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



  const handleLogout = async() => {
    await axios.post(`${url}/login/logout`,{id:authState.id},{withCredentials:true}).then((resp)=>{
      if(resp.data.error) return setOpenError({open:true,message:`${resp.data.error}`})
      localStorage.removeItem('User')
      setAuthState({ id: "", username: "", email: "", role: "", state: false });
      props.history.push("/login");
      setOpenSuccess({open:true,message:"Successfully Logged Out"})
    })
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 3,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  }));

  const [newMessages, setNewMessages] = useState(0);

  const fetchNewMessage = () => {
    fetch(`${constants.url}/chat/count`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.count != newMessages) {
          setNewMessages((prev) => resp.count);
        }
      })
      .catch(() => {});
    // .catch((error) => console.log(error));
  };

  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      fetchNewMessage();
    }, 7000);

    return () => clearInterval(interval.current);
  }, [newMessages]);

  // console.log(authState.image);

  return (
    <header className="header_nav z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">

    <ErrorAlert
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

      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          {/* <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>
            <Input
              className="pl-8 text-gray-700"
              placeholder="Search for "
              aria-label="Search"
            />
          </div> */}
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline text-green-600 "
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              {/* <BellIcon className="w-5 h-5" aria-hidden="true" /> */}

              {/* <!-- Notification badge --> */}

              {/* <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span> */}
              <Link to={"/app/chat"}>
                {newMessages > 0 && (
                  <StyledBadge badgeContent={newMessages} color="success">
                    <MdMailOutline color="action" style={{ fontSize: 21 }} className="text-green-600" />
                  </StyledBadge>
                )}
                {newMessages <= 0 && (
                  <MdMailOutline color="action" style={{ fontSize: 21 }} className="text-green-600"/>
                )}
              </Link>
            </button>

          </li>
          {/* <!-- Profile menu --> */}
          <li className="relative flex">
            <Link to={"/app/profile"}>
              <button
                className="rounded-full focus:shadow-outline-purple focus:outline-none text-xs px-0 py-2"
                // onClick={handleProfileClick}
                aria-label=""
                // aria-hidden="true"
                aria-haspopup="true"
              >
                <Avatar
                  className="align-middle"
                  src={authState.image}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </Link>

            <button
              className="ml-4 rounded-full focus:shadow-outline text-green-600 focus:outline-none text-xs px-0 py-2"
              onClick={handleLogout}
              aria-label=""
              // aria-hidden="true"
              aria-haspopup="true"
            >
              <OutlineLogoutIcon
                className="w-5 h-5"
                aria-hidden="true"
                onClick={handleLogout}
              />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default withRouter(Header);
