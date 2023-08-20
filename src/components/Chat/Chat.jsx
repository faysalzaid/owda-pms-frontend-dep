import React, { useState, useEffect } from "react";
import "./chat.scss";

import { motion } from "framer-motion";
import { Grid, Card, TextField, InputAdornment } from "@mui/material";
import { A1, A2, A3, A4, A5, A6, A7, A8, A9 } from "../../files";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IoSearch } from "react-icons/io5";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import ChatUIList from "./ChatUI";
import * as constants from "constants.js";

const ChatUI = () => {
  const [sideBar, setSideBar] = useState(true);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState({ id: 0, name: "" });

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("lg"));

  const [initialChts, setInitialChts] = useState([]);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (sm) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  }, [sm]);

  useEffect(() => {
    let chts = initialChts.filter((ch) =>
      ch.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setChats(chts);
  }, [search]);

  const fetchUsers = async () => {
    fetch(`${constants.url}/chat/userslist/show`, { credentials: "include" })
      .then((res) => res.json())
      .then((resp) => {
        let users = [];
        resp?.sort((a, b) => a.name.localeCompare(b.name))
        resp?.map((val) => {
          users.push({
            id: val.id,
            name: val.name,
            avatar: val.image,
            lastMessage: val.lastChat??'',
            new: val.new??0
          });
        });
        setInitialChts((ic) => users);
        setChats((ch) => users);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, [selectedUser.id]);
  return (
    <>
      {sm && (
        <motion.div
          initial={{
            width: 0,
            margin: 0,
          }}
          animate={sideBar ? { width: 350 } : { width: 0 }}
          className="sidebar position"
        >
          <Card
            className="drop-shadow-xl border-l-2 border-green-400 border-solid dark:bg-gray-700 dark:border-transparent"
            style={{
              minHeight: "100vh",
              borderRadius: 0,
            }}
          >
            {sm && (
              <IoIosArrowDropleftCircle
                onClick={() => {
                  setSideBar(false);
                }}
                className="hover:cursor-pointer "
                style={{
                  fontSize: 30,
                  marginLeft: -16,
                  color: "darkcyan",
                  float: "right",
                }}
              />
            )}
            <Grid container>
              <TextField
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: 10,
                  marginTop: 20,
                  marginBottom: 10,
                  marginTop: 0,
                  borderBottom: "1px solid rgba(0,0,0,.1)",
                }}
                size="small"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoSearch className="searchIcon" />
                    </InputAdornment>
                  ),
                }}
              />
              {chats.map((chat, index) => {
                const label = "chat" + chat.id;
                return (
                  <motion.div
                    className="hover:cursor-pointer"
                    key={index}
                    onClick={() => {
                      let usr = { id: chat.id, name: chat.name };
                      setSelectedUser((su) => usr);
                      setSideBar((sBar) => false);
                      setSelected({ [label]: true });
                    }}
                    style={{
                      borderRight:
                        selected[label] ?? false ? "5px solid orange" : "",
                      width: "100%",
                      marginRight: 5,
                      borderRadius: 10,
                      background:
                        selected[label] ?? false ? "rgba(0,0,0,.06)" : "",
                    }}
                  >
                    <Grid item xs={12} className="item-container border-b" key={"grid"+index}>
                      <Grid container spacing={0} alignItems="center">
                        <Grid item style={{ width: 50, marginRight: 10 }}>
                          <img src={chat.avatar} className="img" />
                        </Grid>
                        <Grid item style={{ width: 150 }}>
                          <p className="name dark:text-gray-300">{chat.name}</p>
                          <div
                            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: 260 }}
                          >
                            
                            <p className="status dark: text-gray-400">
                              {chat.lastMessage}
                            </p>
                            {chat.new > 0 && <p
                              className="dot"
                              style={{
                                backgroundColor:"purple",
                              }}
                            ><p>{chat.new}</p></p>}

                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </motion.div>
                );
              })}
            </Grid>
          </Card>
        </motion.div>
      )}
      <div style={{ display: "flex" }} className=" mt-5">
        {!sm && (
          <motion.div
            initial={{
              width: 0,
              margin: 0,
            }}
            animate={sideBar ? { width: 350 } : { width: 0 }}
            className="sidebar"
          >
            <Card
              className="drop-shadow-xl bg-white border-l-2 border-green-400 border-solid dark:bg-gray-700 dark:border-transparent"
              style={{
                minHeight: "100vh",
                borderRadius: 0,
              }}
            >
              <Grid container>
                <TextField
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 25,
                    marginBottom: 10,
                    borderBottom: "1px solid rgba(0,0,0,.1)",
                  }}
                  size="small"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoSearch className="searchIcon" />
                      </InputAdornment>
                    ),
                  }}
                />
                {chats.map((chat,index) => {
                  const label = "chat" + chat.id;
                  //if (chat.id === userId) return;
                  return (
                    <motion.div
                    key={index}
                      className="hover:cursor-pointer"
                      onClick={() => {
                        const usr = {id: chat.id, name: chat.name}
                        setSelectedUser((su) =>usr);
                        setSelected({ [label]: true });
                      }}
                      style={{
                        // borderLeft:
                        //   selected[label] ?? false ? "5px solid orange" : "",
                          
                        width: "100%",
                        marginRight: 5,
                        borderRadius: 5,
                        background:
                          selected[label] ?? false ? "rgba(0,200,0,.15)" : "",
                      }}
                    >
                      <Grid
                        item
                        xs={12}
                        className="item-container border-b"
                      >
                        <Grid container spacing={0} alignItems="center">
                          <Grid item style={{ width: 50, marginRight: 10 }}>
                            <img src={chat.avatar} className="img" />
                          </Grid>
                          <Grid item style={{ width: 150 }}>
                            <p className="name dark:text-gray-100">
                              {chat.name}
                            </p>
                            <div
                              style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', width: 181 }}
                            >
                              <p className="status dark: text-gray-400">
                              {chat.lastMessage}
                            </p>
                            {chat.new > 0 && <p
                              className="dot"
                              style={{
                                backgroundColor:"purple",
                              }}
                            ><p>{chat.new}</p></p>}
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </motion.div>
                  );
                })}
              </Grid>
            </Card>
          </motion.div>
        )}
        <motion.div style={{ width: "100%" }}>
          {sideBar ? (
            !sm && (
              <IoIosArrowDropleftCircle
                onClick={() => {
                  setSideBar(false);
                }}
                className="hover:cursor-pointer "
                style={{
                  fontSize: 30,
                  marginLeft: -16,
                  color: "darkcyan",
                  position: "absolute",
                  //left: sm ? 345 : '',
                }}
              />
            )
          ) : (
            <IoIosArrowDroprightCircle
              onClick={() => {
                setSideBar(true);
              }}
              className="hover:cursor-pointer"
              style={{
                fontSize: 30,
                marginLeft: 16,
                marginTop: 10,
                color: "darkcyan",
                position: "absolute",
              }}
            />
          )}

          <div style={{ padding: 40 }}>
            <Grid container>
              <Grid item xs={12}>
                {selectedUser.id === 0 ? (
                  <div className="no-user">
                    <p>Select user to chat!</p>
                  </div>
                ) : (
                  <ChatUIList to={selectedUser.id} toUser={selectedUser.name} />
                )}
              </Grid>
            </Grid>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ChatUI;
