import "./inputs.scss";
import {useState, useRef, useEffect} from 'react';
import {MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp} from 'react-icons/md';


import parse from 'html-react-parser'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker, MobileDatePicker, TimePicker, DateTimePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

const DOMPurify = require('dompurify')(window);

export const TextField = ({formData, setFormData, label, labelText, placeholder, style, className, containerStyle, startIcon, endIcon}) => {
  return (
   <div className="text-field-container" style={{...containerStyle}}>
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative">
                <input 
                    //type="text"
                    className={`input-text-field dark:bg-gray-800 dark:text-gray-200 ${className}`}
                    value={formData[label]?.value??""}
                    placeholder={placeholder ? placeholder : labelText}
                    style={{
                        border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                        outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                        paddingLeft: startIcon ? 42 : "",
                        paddingRight: endIcon ? 40 : "",
                        marginBottom: 2,
                    ...style
                    }}
                    onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                        setFormData((prev) => fd);
                    }}
                />
                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}

            </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const TextArea = ({formData, setFormData, label, labelText, placeholder, errorLabel, optional = false, style, startIcon, endIcon}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative"> 
            <textarea 
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                rows={3}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 42 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...style
                }}
                onChange={(e)=>{
                    const fd = {...formData, [label]: {...formData[label], value: e.target.value, error: e.target.value ? "" : "error"}};
                    setFormData((prev)=>fd);
                }}
                ></textarea>
                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '15px'}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '15px'}}>{endIcon}</div>}
                </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}

export const NumberInput = ({formData, setFormData, label, labelText, placeholder, style, startIcon, endIcon}) => {
    return (
    <div className="text-field-container">
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            <div className="relative">
            <input 
                type="number"
                className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                placeholder={placeholder ? placeholder : labelText}
                value={formData[label]?.value??""}
                style={{
                    border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                    outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                    paddingLeft: startIcon ? 42 : "",
                    paddingRight: endIcon ? 40 : "",
                    ...style
                }}
                onChange={(e)=>{
                    let num = e.target.value;
                    num = parseFloat(num);
                    const fd = {...formData, [label]: {...formData[label], value: num, error: e.target.value ? "" : "error"}};
                    setFormData((prev) => fd);
                }}
            />
            {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
            {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
            </div>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}




export const Dropdown = ({formData, setFormData, label, labelText, options, selectText, open, style, inputStyle, className, startIcon, endIcon}) => {
    const catMenu = useRef(null);
    const [show, setShow] = useState(false)
    const closeOpenMenus = (e)=>{
        if(catMenu.current && show && !catMenu.current.contains(e.target)){
            setShow(false)
        }
    }
    const inputRef = useRef();
    const [avatar, setAvatar] = useState("")
    
    document.addEventListener('mousedown',closeOpenMenus)
    useEffect(()=>{
        let val = selectText ? selectText :"Not Selected";
        let url;
        options.map((op)=>{
            if(op.id == formData[label]?.value) {
                val = op.name;
                if(op.url) {
                    url = op.url
                }
            }
        });
        if(inputRef.current) {
           inputRef.current.value = val;
           if(url) {
            
           }
           setAvatar((prev)=>url)
        }

    },[inputRef.current,formData[label]])
    
    return (
        <div className="text-field-container" style={{...style}}>
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            
            <div className="dropdown relative" ref={catMenu} style={{marginBottom: show ? 0 : ''}}>
                {!show && <MdOutlineKeyboardArrowDown className="arrow-icon"/>}
                {show && <MdOutlineKeyboardArrowUp className="arrow-icon"/>}
                <div className="">
                <input 
                 // type="text" 
                 ref={inputRef}
                 className={`textBox dark:bg-gray-800 dark:text-gray-200 ${className}`}
                 placeholder="Select item" 
                 //value={"Select Item"}
                 readOnly
                 style={{
                     border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                     outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                     paddingLeft:  avatar ? 55 : startIcon ? 45 : "",
                     paddingRight: endIcon ? 40 : "",
                     ...inputStyle
                    }}
                    onClick={()=>{
                        setShow(!show)
                    }}
                    />
                {avatar && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-38%)"}}><img src={avatar} style={{width: 35, height: 35, borderRadius: '50%'}} className="border"/></div>}
                {(startIcon && !avatar) && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-25%)"}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '40%'}}>{endIcon}</div>}
                </div>
                 {show && <div 
                    className="option dark:bg-gray-800 dark:text-gray-200"
                    style={{
                        height: show ?"auto" : 0,
                        paddingTop: 7,
                        paddingBottom: 5,
                    }}
                    >
                    {
                        options.map((option,index)=>{
                            return (
                                <>
                            <div
                              key={"dropdown"+index}
                              onClick={()=>{
                                  setShow((prev)=>!prev)
                                  if(formData[label] != option.id) {
                                      inputRef.current.value = option.name;
                                      setFormData({...formData, [label]: {...formData[label], value: option.id, error: ""}})
                                    } 
                                }}
                                className="option-select dark:bg-gray-800 dark:text-gray-200"
                                style={{
                                    backgroundColor: (formData[label]?.value === option.id) ? "#deebff" : "",
                                    color: (formData[label]?.value === option.id) ? "#0052cc" : "",
                                    borderLeft: (formData[label]?.value === option.id) ? "3px solid green" : "",
                                    padding: "10px 15px",
                                }}
                                >
                                    <div className="flex items-center justify-start gap-2" style={{height: 30}}>
                                       {option.url && <img src={option.url} style={{width: 40, height: 40, borderRadius: '50%'}} className="border"/>}
                                       {option.name}
                                    </div>
                            </div>
                            
                            </>
                            );
                        })
                    }
                    
                  </div>
                }                 
                    
            </div>
            
        </div>
    </div>
    );
}




   
    



export const DateInput = ({
    formData,
    setFormData, 
    label, 
    labelText, 
    placeholder, 
    style, 
    startIcon, 
    endIcon,
    containerStyle = { },
    inputStyle = { marginLeft: 0 },
    labelStyle,
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
  if(newDate == "aN / aN / NaN") {
    newDate = "mm / dd / yyyy"
  }
  setDateField(newDate);

  },[formData[label]?.value])


    return (
    <div className="text-field-container" style={{...containerStyle}}>
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                {type==="desktop" && 
                <DesktopDatePicker 
                    onChange={(date)=>{
                    //date = date.toLocaleDateString("en-US");
                    const fd = {...formData, [label]: {...formData[label], value: date, error: date ? "" : "error"}};
                    setFormData((prev) => fd);
                    
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
                        <div className="relative">
                        <input
                            onChange={onChange}
                            disabled={disabled}
                            ref={customInputRef}
                            //{...inputProps}
                            value={dateField}
                            readOnly
                            className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                            style={{
                                border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                                outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                                paddingLeft: startIcon ? 45 : "",
                                paddingRight: endIcon ? 40 : "",
                                ...inputStyle,
                            }}
                            
                            onClick={() => {setIsOpen((prev)=>true);}}
                            />
                            {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                            {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
                        </div>
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
                            <div className="relative">
                                <input
                                    onChange={onChange}
                                    disabled={disabled}
                                    ref={customInputRef}
                                    //{...inputProps}
                                    value={dateField}
                                    readOnly
                                    className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                                    style={{
                                        border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                                        outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                                        paddingLeft: startIcon ? 45 : "",
                                        paddingRight: endIcon ? 40 : "",
                                        ...inputStyle,
                                    }}
                                    
                                    onClick={() => {setIsOpen((prev)=>true);}}
                                />
                                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
                            </div>
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
                            <div className="relative">
                                <input
                                    onChange={onChange}
                                    disabled={disabled}
                                    ref={customInputRef}
                                    //{...inputProps}
                                    value={dateField}
                                    readOnly
                                    className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                                    style={{
                                        border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                                        outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                                        paddingLeft: startIcon ? 45 : "",
                                        paddingRight: endIcon ? 40 : "",
                                        ...inputStyle,
                                    }}
                                    
                                    onClick={() => {setIsOpen((prev)=>true);}}
                                />
                                {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
                            </div>
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
                                <div className="relative">
                                    <input
                                        onChange={onChange}
                                        disabled={disabled}
                                        ref={customInputRef}
                                        //{...inputProps}
                                        value={dateField}
                                        readOnly
                                        className="input-text-field dark:bg-gray-800 dark:text-gray-200"
                                        style={{
                                            border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                                            outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                                            paddingLeft: startIcon ? 45 : "",
                                            paddingRight: endIcon ? 40 : "",
                                            ...inputStyle,
                                        }}
                                        
                                        onClick={() => {setIsOpen((prev)=>true);}}
                                    />
                                    {startIcon && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{startIcon}</div>}
                                    {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '50%', transform: "translateY(-50%)"}}>{endIcon}</div>}
                                </div>
                            </div>)} />
                            }
                </LocalizationProvider>
            {((formData[label]?.error??"") && (!formData[label]?.optional??false)) && <label className="validate-error">{labelText+" is required"}</label>}
        </div>
    </div>
    );
}


export const DropdownMultiple = ({formData, setFormData, label, labelText, options, selectText, open, style, inputStyle, className, startIcon, endIcon}) => {
    const catMenu = useRef(null);
    const [show, setShow] = useState(false)
    const closeOpenMenus = (e)=>{
        if(catMenu.current && show && !catMenu.current.contains(e.target)){
            setShow(false)
        }
    }
    const inputRef = useRef();
    const [avatar, setAvatar] = useState("")
    
    document.addEventListener('mousedown',closeOpenMenus)
    useEffect(()=>{
        let val = selectText ? selectText :"Not Selected";
        let url;
        options.map((op)=>{
            if(op.id == formData[label]?.value) {
                val = op.name;
                if(op.url) {
                    url = op.url
                }
            }
        });
        if(inputRef.current) {
           inputRef.current.value = val;
           if(url) {
            
           }
           setAvatar((prev)=>url)
        }

    },[inputRef.current,formData[label]])
    
    return (
        <div className="text-field-container" style={{...style}}>
        <div className="textfield-container">
            <label className="dark:text-gray-200">{labelText?labelText : <div style={{marginBottom: 30}}></div>}</label>
            
            <div className="dropdown relative" ref={catMenu} style={{marginBottom: show ? 0 : ''}}>
                {!show && <MdOutlineKeyboardArrowDown className="arrow-icon"/>}
                {show && <MdOutlineKeyboardArrowUp className="arrow-icon"/>}
                <div className="">
                <input 
                 // type="text" 
                 ref={inputRef}
                 className={`textBox dark:bg-gray-800 dark:text-gray-200 ${className}`}
                 placeholder="Select item" 
                 //value={"Select Item"}
                 readonly
                 style={{
                     border: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '1px solid red' : "",
                     outline: ((formData[label]?.error??"") && (!formData[label]?.optional??false)) ? '0px solid red' : "",
                     paddingLeft:  avatar ? 55 : startIcon ? 45 : "",
                     paddingRight: endIcon ? 40 : "",
                     ...inputStyle
                    }}
                    onClick={()=>{
                        setShow(!show)
                    }}
                    />
                {avatar && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-38%)"}}><img src={avatar} style={{width: 35, height: 35, borderRadius: '50%'}} className="border"/></div>}
                {(startIcon && !avatar) && <div style={{position: 'absolute', left: 15, fontSize: 19, top: '50%', transform: "translateY(-25%)"}}>{startIcon}</div>}
                {endIcon && <div style={{position: 'absolute', right: 15, fontSize: 19, top: '40%'}}>{endIcon}</div>}
                </div>
                 {show && <div 
                    className="option dark:bg-gray-800 dark:text-gray-200"
                    style={{
                        height: show ?"auto" : 0,
                        paddingTop: 7,
                        paddingBottom: 5,
                    }}
                    >
                    {
                        options.map((option,index)=>{
                            return (
                                <>
                            <div
                              key={"dropdown"+index}
                              onClick={()=>{
                                  setShow((prev)=>!prev)
                                  if(formData[label] != option.id) {
                                      inputRef.current.value = option.name;
                                      setFormData({...formData, [label]: {...formData[label], value: option.id, error: ""}})
                                    } 
                                }}
                                className="option-select dark:bg-gray-800 dark:text-gray-200"
                                style={{
                                    backgroundColor: (formData[label]?.value === option.id) ? "#deebff" : "",
                                    color: (formData[label]?.value === option.id) ? "#0052cc" : "",
                                    borderLeft: (formData[label]?.value === option.id) ? "3px solid green" : "",
                                    padding: "10px 15px",
                                }}
                                >
                                    <div className="flex items-center justify-start gap-2" style={{height: 30}}>
                                       {option.url && <img src={option.url} style={{width: 40, height: 40, borderRadius: '50%'}} className="border"/>}
                                       {option.name}
                                    </div>
                            </div>
                            
                            </>
                            );
                        })
                    }
                    
                  </div>
                }                 
                    
            </div>
            
        </div>
    </div>
    );
}