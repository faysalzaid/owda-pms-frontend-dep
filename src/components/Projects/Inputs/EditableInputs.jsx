import { useState, useRef, useEffect } from "react";
import "./editable_input.scss";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

import { MdClose, MdCheck } from "react-icons/md";
import { IconButton } from "@mui/material";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker, MobileDatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

export const EditableTextField = ({
  formData,
  setFormData,
  label,
  labelText,
  placeholder,
  callBackFun = () => {},
  width = "100%",
  margin = "0px",
}) => {
  const inputRef = useRef(null);
  const [edit, setEdit] = useState(false);
  return (
    <div className="editable-text-field-container">
      {!edit && (
        <div
          style={{
            width: width,
            margin: margin,
          }}
        >
          <div
            onClick={() => {
              if (!edit) {
                inputRef.current?.focus();
                setEdit(true);
              }
            }}
            style={{
              width: "100%",
            }}
            className="detail-title text-[#172b4d] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
          >
            {formData[label]?.value}
          </div>
        </div>
      )}
      {edit && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callBackFun(e);
            setEdit((prev) => false);
          }}
        >
          <div className="textfield-container">
            <input
              type="text"
              className="input-text-field dark:bg-gray-800 dark:text-gray-200"
              value={formData[label]?.value ?? ""}
              placeholder={placeholder ? placeholder : labelText}
              ref={inputRef}
              style={{
                border:
                  (formData[label]?.error ?? "") &&
                  (!formData[label]?.optional ?? false)
                    ? "1px solid red"
                    : "",
                outline:
                  (formData[label]?.error ?? "") &&
                  (!formData[label]?.optional ?? false)
                    ? "0px solid red"
                    : "",
              }}
              onChange={(e) => {
                const fd = {
                  ...formData,
                  [label]: {
                    ...formData[label],
                    value: e.target.value,
                    error: e.target.value ? "" : "error",
                  },
                };
                setFormData((prev) => fd);
              }}
            />
            {(formData[label]?.error ?? "") &&
              (!formData[label]?.optional ?? false) && (
                <label className="validate-error">
                  {labelText + " is required"}
                </label>
              )}
          </div>
        </form>
      )}
    </div>
  );
};

export const EditableTextContent = ({
  formData,
  setFormData,
  label,
  labelText,
  placeholder,
  callBackFun = () => {},
  width = "100%",
  margin = "0px 0px 0px 50px",
  fontFamily = "ubuntu",
  fontSize = 22,
  fontWeight = "bold",
  padding = "10px 15px",
  textShadow,
  minWidth,
  type="text",
  showButtons=true
}) => {
  const editableRef = useRef(null);
  const outRef = useRef(null);

  
  const [editable, setEditable] = useState(false);

  const submitEdit = (text) => {
    const fd = { ...formData, [label]: { ...formData[label], value: text } };
    setFormData((prev) => fd);
    callBackFun(text, label);
    setEditable((prev) => false);
  };

  const onCloseAway = (e)=>{
    if(outRef.current && editable && !outRef.current.contains(e.target)){
        console.log(formData[label].value+" clickaway")
        editableRef.current.innerText = formData[label].value;
        setEditable(false);
    }
}
// useEffect(()=>{
//   console.log(formData[label].value)
//   editableRef.current.innerText = formData[label].value
//   setFormData(formData)
// },[formData[label]?.value])

//document.addEventListener('mousedown',onCloseAway)

  return (
    <div className="editable-text-field-container">
      <div
        style={{
          width: width,
          margin: margin,
          minWidth: minWidth ? minWidth : ""
        }}
        ref={outRef}
        >
        <div
          contentEditable={editable}
          ref={editableRef}
          onClick={() => {
            //editableRef.current.innerText = parseFloat(formData[label].value);
            setEditable(true);
          }}
          onKeyDown={(e) => {
            const text =  e.target.innerText;
            if (e.key === "Enter") {
              submitEdit(text);
              setEditable(false);
            } else if (e.key === "Escape") {
              editableRef.current.innerText = formData[label]?.value;
              setEditable(false);
            }
          }}

          style={{
            outline: !editable ? "none" : "2px solid green",
            width: "100%",
            fontFamily: fontFamily?fontFamily : "",
            fontSize: fontSize,
            fontWeight: fontWeight,
            margin: margin,
            padding: padding,
            textShadow: textShadow?textShadow:"2px 1px rgba(0,0,255,.1)"
          }}
          className="detail-title text-[#172b4d] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
        >
          {formData[label]?.value}
        </div>
        {editable && showButtons && (
          <div className="flex justify-end">
            <IconButton>
              <MdClose
                onClick={() => {
                  editableRef.current.innerText = formData[label]?.value;
                  setEditable(false);
                }}
                className="bg-red-500 rounded-md text-white"
                style={{ padding: 2, fontSize: 25 }}
              />
            </IconButton>
            <IconButton>
              <MdCheck
                onClick={() => {
                  submitEdit(editableRef.current?.innerText);
                  //editableRef.current.innerText = "";
                }}
                className="bg-green-500 rounded-md text-white"
                style={{ padding: 2, fontSize: 25 }}
              />
            </IconButton>
          </div>
        )}
      </div>
    </div>
  );
};

export const EditableDate = ({
  formData,
  setFormData,
  label,
  labelText,
  parentStyle = { margin: "10px 10px" },
  inputStyle = { marginLeft: 50 },
  labelStyle,
  callBackFun = ()=>{}
}) => {
  return (
    <div className="editable-date-field-container" style={parentStyle}>
      <label className="dark:text-gray-200">
        {labelText ? (
          <p style={labelStyle}>{labelText}</p>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </label>
      <input
        type="date"
        value={formData[label]?.value}
        className="editable_date_input text-[#172b4d] bg-transparent dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
        style={{
          ...inputStyle,
          border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
          outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
        }}
        
        onChange={(e)=>{
          const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
          setFormData((prev) => fd);
          if(formData[label]?.value) {
            callBackFun(e.target.value, label);
          }
      }}
      />
    </div>
  );
};

export const EditableText = ({
  formData,
  setFormData,
  label,
  parentStyle = { margin: "0px 0px" },
  inputStyle = { marginLeft: 0 },
  crud=false,
  callBackFun = ()=>{},
  setSelected,
  type="text"
}) => {
  const inputRef = useRef(null);
  const onCloseAway = (e)=>{
    if(inputRef.current && !inputRef.current.contains(e.target)){
        setSelected({});
    }
}

document.addEventListener('mousedown',onCloseAway)
  return (
    <div className="editable-date-field-container" style={parentStyle}>
      
      <input
        type={type}
        ref={inputRef}
        className="editable_date_input text-[#172b4d] dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
        style={{
          ...inputStyle,
          border: (!crud && (formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : crud ? 0 : "",
          outline: (!crud && (formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : crud ? "1.5px solid #0052cc" :  "",

        }}
        value={formData[label]?.value}
        
        onChange={(e)=>{
          const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
          setFormData((prev) => fd);
         
      }}
      onKeyDown={(e)=>{
          if (e.key === 'Enter') {
            if(formData[label]?.value) {
              callBackFun(e.target.value, label, false);
            }
          }
          else if(e.key === 'Escape') {
            callBackFun(e.target.value, label, true);
          }
      }}
      />
    </div>
  );
};

export const CustomDatePicker = ({
  formData,
  setFormData,
  label,
  labelText,
  parentStyle = { margin: "10px 10px" },
  inputStyle = { marginLeft: 50 },
  labelStyle,
  minDate,
  maxDate,
  views=['day'],
  type="desktop",
  callBackFun = ()=>{},
  crud=false,
  value=Date.now(),
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const customInputRef = useRef();
  const customInputRef2 = useRef();
  const customInputRef3 = useRef();

  const [dateField, setDateField] = useState(formData[label]?.value);
  

  useEffect(()=>{
    const date = formData[label]?.value ?? Date.now();
    const dt = (crud) ? new Date(value) : new Date(date);
    let newDate = ('0' + (dt.getMonth()+1)).slice(-2)+" / "+ ('0' + dt.getDate()).slice(-2) + " / " + dt.getFullYear();
    if(type==="desktop" || type === "mobile") {
      let day = "";
      let month = "";
      let year = "";
      if(views.length === 1 && views[0] === "day") {
        newDate = newDate;
      } else {
      for(var i = 0; i < views.length; i++) {
        if(views[i] === "year") {
          year = dt.getFullYear();
        }
        else if(views[i] === "month") {
          month = dt.getMonth()+1;
        }
        else if(views[i] === "day") {
          day = dt.getDate();
        }
      }
    
      let nd = "";
      if(month != "") {
        nd = nd + ('0' + month).slice(-2);
      }
      if(day != "") {
        nd = nd + (month ? " / " : "") + ('0' + day).slice(-2);
      }
      
      if(year != "") {
        nd = nd + ((day || month) ? " / " : "") + year;
      }
      newDate = nd;
    }
  }
  else if(type === 'time') {
    let hour = dt.getHours();
    let minutes = dt.getMinutes();
    let am = hour >= 12 ? "PM" : "AM";
    hour = hour >= 12 ? hour - 12 : hour;
    hour = ('0' + hour).slice(-2);
    minutes = ('0' + minutes).slice(-2)
    newDate = hour + " : "+minutes+" "+am;
  }
  else if(type === "datetime") {
    let hour = dt.getHours();
    let minutes = dt.getMinutes();
    let am = hour >= 12 ? "PM" : "AM";
    hour = hour >= 12 ? hour - 12 : hour;
    hour = ('0' + hour).slice(-2);
    minutes = ('0' + minutes).slice(-2)
    newDate = newDate + "  at  " + hour + " : "+minutes+" "+am;
  }

  setDateField(newDate);

  },[formData[label]?.value])
  return (

    <div className="editable-date-field-container" style={parentStyle}>
    {!crud && <label className="dark:text-gray-200">
      {labelText ? (
        <p style={labelStyle}>{labelText}</p>
      ) : (
        <div style={{ display: "none" }}></div>
      )}
    </label>}
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      {type==="desktop" && 
      <DesktopDatePicker 
        onChange={(date)=>{
          //date = date.toLocaleDateString("en-US");
          const fd = {...formData, [label]: {...formData[label], value: date, error: date ? "" : "error"}};
          setFormData((prev) => fd);
          if(formData[label]?.value) {
            callBackFun(date, label);
          }
        }}
        label={labelText}
        //minDate={dayjs('2012-03-01')}
        views={views}
        onClose={() => {setIsOpen(false);}}
        open={isOpen}
        value={!crud ? formData[label]?.value : value} 
        PopperProps={{ anchorEl: customInputRef.current }}
        renderInput={({
          ref,
          inputProps,
          disabled,
          onChange,
          value,
          ...other
        }) => (
          <div ref={ref}>
            <input
              onChange={onChange}
              disabled={disabled}
              ref={customInputRef}
              {...inputProps}
              type="text"
              value={dateField}
              readOnly
              className="editable_date_input text-[#172b4d] focus:outline-none bg-transparent dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
              style={{
                ...inputStyle,
                border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
              }}
              
              onClick={() => {setIsOpen((prev)=>true);}}
            />
          </div>)} />
         }
         {type==="mobile" && 
          <MobileDatePicker 
            onChange={(date)=>{
              date = date.toLocaleDateString("en-US");
              const fd = {...formData, [label]: {...formData[label], value: date, error: date ? "" : "error"}};
              setFormData((prev) => fd);
              if(formData[label]?.value) {
                callBackFun(date, label);
              }
            }}
            label={labelText}
            //minDate={dayjs('2012-03-01')}
            views={views}
            onClose={() => {setIsOpen(false);}}
            open={isOpen}
            value={!crud ? formData[label]?.value : value} 
            PopperProps={{ anchorEl: customInputRef.current }}
            renderInput={({
              ref,
              inputProps,
              disabled,
              onChange,
              value,
              ...other
            }) => (
              <div ref={ref}>
                <input
                  onChange={onChange}
                  disabled={disabled}
                  ref={customInputRef}
                  {...inputProps}
                  type="text"
                  value={dateField}
                  readOnly
                  className="editable_date_input text-[#172b4d] focus:outline-none focus:border-indigo-500 bg-transparent dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
                  style={{
                    ...inputStyle,
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                  }}
                  
                  onClick={() => {setIsOpen((prev)=>true);}}
                />
              </div>)} />
            }
         {type==="time" && 
          <TimePicker 
            onChange={(date)=>{
              date = new Date(date);
              date = date.toISOString();
              const fd = {...formData, [label]: {...formData[label], value: date, error: date ? "" : "error"}};
              setFormData((prev) => fd);
              if(formData[label]?.value) {
                callBackFun(date, label);
              }
            }}
            label={labelText}
            //minDate={dayjs('2012-03-01')}
            //views= {views ? ['day', 'month', 'year'] : ''}
            onClose={() => {setIsOpen(false);}}
            open={isOpen}
            value={!crud ? formData[label]?.value : value} 
            PopperProps={{ anchorEl: customInputRef2.current }}
            renderInput={({
              ref,
              inputProps,
              disabled,
              onChange,
              value,
              ...other
            }) => (
              <div ref={ref}>
                <input
                  //style={{ display: 'none' }}
                  //value={date.toISOString()}
                  onChange={onChange}
                  disabled={disabled}
                  ref={customInputRef2}
                  {...inputProps}
                  type="text"
                  value={dateField}
                  readOnly
                  className="editable_date_input text-[#172b4d] focus:outline-none focus:border-indigo-500 bg-transparent dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
                  style={{
                    ...inputStyle,
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                  }}
                  
                  
                  onClick={() => {setIsOpen(!isOpen);}}
                />
              </div>)} />
            }
            {type==="datetime" && 
              <DateTimePicker 
                onChange={(date)=>{
                  date = new Date(date);
                  date = date.toISOString();
                  
                  const fd = {...formData, [label]: {...formData[label], value: date, error: date ? "" : "error"}};
                  setFormData((prev) => fd);
                  if(formData[label]?.value) {
                    callBackFun(date, label);
                  }
                }}
                label={labelText}
                //minDate={dayjs('2012-03-01')}
                //views= {views ? ['day', 'month', 'year'] : ''}
                onClose={() => {setIsOpen(false);}}
                open={isOpen}
                value={!crud ? formData[label]?.value : value} 
                PopperProps={{ anchorEl: customInputRef3.current }}
                renderInput={({
                  ref,
                  inputProps,
                  disabled,
                  onChange,
                  value,
                  ...other
                }) => (
                  <div ref={ref}>
                    <input
                      //style={{ display: 'none' }}
                      //value={date.toISOString()}
                      onChange={onChange}
                      disabled={disabled}
                      ref={customInputRef3}
                      {...inputProps}
                      type="text"
                      value={dateField}
                      readOnly
                      className="editable_date_input text-[#172b4d] focus:outline-none focus:border-indigo-500 bg-transparent dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 hover:cursor-pointer"
                      style={{
                        ...inputStyle,
                        border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                        outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                      }}
                      
                      
                      onClick={() => {setIsOpen(!isOpen);}}
                    />
                  </div>)} />
                }
    </LocalizationProvider>
    </div>
  );
};

