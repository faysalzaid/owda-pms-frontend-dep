import React, { useState, useEffect, useRef } from "react";
import { A1, A2, A3, A4, A5, A6, A7, A8, A9 } from "../../files";
import "./chat.scss";
import FromChat from "./FromChat";
import ToChat from "./ToChat";

import * as constants from "constants.js";

const ChatUIList = ({ to, toUser }) => {
  let ref = useRef(null);

  const [msg, setMsg] = useState("");

  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchChats = async () => {
    fetch(`${constants.url}/chat/get/${to}`, { credentials: "include" })
      .then((res) => res.json())
      .then((resp) => {
        let chts = [];
        resp.map((val) => {
          chts.push({
            id: val.id,
            message: val.message,
            type: val.type,
            me: val.me,
          });
        });
        setChats((ch) => chts);
      });
  };

  const fetchChatUsers = () => {
    fetch(`${constants.url}/chat/userslist/fetch/${to}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resp) => {
        setUsers((_) => resp);
      });
  };

  useEffect(() => {
    fetchChats();
    fetchChatUsers();
  }, [to]);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [to, chats]);

  const sendMessage = (e) => {
    e.preventDefault();

    fetch(`${constants.url}/chat/send`, {
      method: "POST",
      body: JSON.stringify({ to: to, message: msg }),
      credentials: "include",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resp) => {
        let chts = [];
        resp?.map((val) => {
          chts.push({
            id: val.id,
            message: val.message,
            type: val.type,
            me: val.me,
          });
        });

        setChats((_) => chts);
      });

    setMsg((_) => "");
  };

  const fetchNewMessage = () => {
    fetch(`${constants.url}/chat/count/${to}`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.count > 0) {
          fetchChats();
        }
      })
      .catch((error) => console.log(error));
  };

  const interval = useRef();

  useEffect(() => {
    interval.current = setInterval(() => {
      fetchNewMessage();
    }, 4000);

    return () => clearInterval(interval.current);
  }, [to]);

  return (
    <div>
      <div className="chat-with  dark:text-gray-100">
        Chat with{" "}
        <span style={{ color: "green", fontWeight: "bold" }}>
          {"" + toUser}
        </span>
      </div>
      <div style={{ overflowY: "auto", minHeight: "calc(100vh - 300px)" }}>
        {chats.length <= 0 && (
          <div className="no-chat-found">
            <p>No messages yet!</p>
          </div>
        )}
        {chats.map((chat, index) => {
          let isFrom = chat.me;
          let avatar = "";
          let toAvatar = "";

          users?.map((user) => {
            if (user.id !== to) {
              avatar = user.image;
            } else {
              toAvatar = user.image;
            }
          });
          return (
            <div key={index}>
              {isFrom && (
                <FromChat
                  avatar={avatar}
                  key={"from" + index}
                  chats={chats}
                  setChats={setChats}
                  chat={chat}
                  url={constants.url}
                  to={to}
                />
              )}
              {!isFrom && (
                <ToChat
                  avatar={toAvatar}
                  key={"to" + index}
                  chats={chats}
                  setChats={setChats}
                  chat={chat}
                  url={constants.url}
                  to={to}
                />
              )}
            </div>
          );
        })}
        <div ref={ref}></div>
      </div>

      <form onSubmit={sendMessage} className="msg-div">
        <input
          type="text"
          className="msg-inp"
          value={msg}
          onChange={(e) => {
            setMsg(e.target.value);
          }}
          placeholder="Send message..."
        />
        <button type="submit" className="msg-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatUIList;
