import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Menu, MenuItem } from "@mui/material";

import { BsFillPatchCheckFill } from "react-icons/bs";

const FromChat = ({ avatar, chats, setChats, chat, url, to }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [edit, setEdit] = useState({ is: false, message: "" });

  const deleteChat = (e) => {
    fetch(url + "/chat/delete/" + chat.id + "/" + to, {
      credentials: "include",
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((resp) => {
        console.log(resp);
        if (resp?.error ?? false) {
          setChats((_) => chats);
          return;
        }
        let chts = [];
        resp.map((val) => {
          chts.push({
            id: val.id,
            message: val.message,
            type: val.type,
            me: val.me,
          });
        });
        setChats((_) => chts);
      });
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    fetch(url + "/chat/edit/" + chat.id + "/" + to, {
      credentials: "include",
      method: "PUT",
      body: JSON.stringify({ message: edit.message }),
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp?.error ?? false) {
          setChats((_) => chats);
          return;
        }
        let chts = [];
        resp.map((val) => {
          chts.push({
            id: val.id,
            message: val.message,
            type: val.type,
            me: val.me,
          });
        });
        setChats((_) => chts);
        const editProps = { is: false, message: "" };
        setEdit((_) => editProps);
      });
  };

  return (
    <div className="chat-div">
      <img src={avatar} className="chat-ui-avatar-from" />
      <div className="chatFrom">
        {!edit.is && (
          <div className="message bg-black bg-opacity-10 dark:bg-blue-300">
            <p>
              {chat.message}
              <span className="editChat" onClick={handleClick}>
                <MdKeyboardArrowDown />
              </span>
            </p>
          </div>
        )}
        {edit.is && (
          <form onSubmit={handleSubmitEdit}>
            <div className="message bg-black bg-opacity-10 dark:bg-blue-300">
              <p style={{ position: "relative" }}>
                <input
                  className="edit-input"
                  value={edit.message}
                  onChange={(e) => {
                    setEdit({ ...edit, message: e.target.value });
                  }}
                />
                <span className="send-edit-chat-btn" onClick={handleSubmitEdit}>
                  <BsFillPatchCheckFill />
                </span>
              </p>
            </div>
          </form>
        )}
      </div>
      <Menu
        id="menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem
          onClick={() => {
            setEdit({ is: true, message: chat.message });
            handleClose();
          }}
        >
          Edit Chat
        </MenuItem>
        <MenuItem
          onClick={() => {
            deleteChat();
            handleClose();
          }}
        >
          Delete Chat
        </MenuItem>
      </Menu>
    </div>
  );
};

export default FromChat;
