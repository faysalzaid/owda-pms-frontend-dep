import { purple } from '@mui/material/colors';
import React, {useState} from 'react'
import './budgets.scss';
import { MdAdd } from 'react-icons/md';
import { CustomDatePicker, EditableText } from "../Inputs/EditableInputs";
import {MdDeleteOutline} from 'react-icons/md';
import {IconButton} from '@mui/material';
import DeleteDialog from './DeleteConfirm';
import { useEffect } from 'react';
import axios from '../../../config/axiosConfig';
import { url } from 'config/urlConfig';

export const Budgets = ({budget,setOpenSuccess,setOpenError}) => {
  let [budgets, setBudgets] = useState([]);

 
  const [show, setShow] = useState({add: false, edit: false});
  const [selected, setSelected] = useState({});

  const [addBudget, setAddBudget] = useState({
    year: {value: "", error: "", optional: false},
    allocatedBudget: {value: "", error: "", optional: false},
    utilizedBudget: {value: "", error: "", optional: false},
   
  });
  const [editBudget, setEditBudget] = useState({
    year: {value: "", error: "", optional: false},
  })

//   UseEffect for catching Budgets
  useEffect(()=>{
    setBudgets(budget.yearlyBudgets)
    // console.log('from budget',budget);
  },[budget.yearlyBudgets])

//   End of usestate for catching budgets

  async function callBackFuncEdit(value, label, escape = false) {
    console.log('escape:',escape,'value:',value,'label:',label);
    if(escape) {
        setSelected({});
        return;
    }
    var data = {[label]: value}
    if(value !== editBudget[label]) {
        console.log(editBudget.allocatedBudget.value);
        const request = {
            year:editBudget.year.value,
            allocatedBudget:editBudget.allocatedBudget.value,
            utilizedBudget:parseInt(editBudget.utilizedBudget.value)  ,
            ProjectId:budget.id
        }
        // console.log('New Data',request);
        // console.log('Edit:BUdget',editBudget);
        await axios.post(`${url}/budget/${editBudget.id}`,request,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
              setEditBudget({
              year: {value: editBudget.year.value, error: "", optional: false},
              allocatedBudget:{value: " ", error: "", optional: false},
            })
              console.log(editBudget)
              setOpenError((prev)=>({open:true,message:`${resp.data.error}.`}))
                
            }else{
              setOpenSuccess((prev)=>({open:true,message:"Successfully inserted"}))
              
            }
        })
        // console.log('budget new:',text);
      //  update data to server .then

    }

    setBudgets(budgets?.map(budget=>budget.id ===editBudget.id ? {...budget, [label]: value} : budget))
    setSelected({});
  }

  const handleDeleteCallBack = (id) => {
    axios.get(`${url}/budget/delete/${id}`,{withCredentials:true}).then((resp)=>{
      const bd = budgets?.filter(b=>b.id !== id);
     
      setBudgets(bd)
    })
    
    //  setBudgets(bd);
  }

  const [open, setOpen] = useState({show: false, id: 0});

  const handleClickOpen = (id) => {
    setOpen({show: true, id: id});
  };

  const handleClose = () => {
    setOpen({show: false, id: 0});
  };

  return (
    <div className='crud-container-budget' style={{minWidth: 700}}>
        <DeleteDialog open={open.show} handleClose={handleClose} id={open.id} callBack={handleDeleteCallBack}/>
        <table>
            <thead className='dark:border-gray-400'>
                <tr>
                    <th align="center">Year</th>
                    <th align="left">Budget Allocated</th>
                    <th align='left'>Budget Utilized</th>
                    <th align='left'>Budget Remaining</th>
                    <th align='center'>Actions</th>

                </tr>
            </thead>
            <tbody className='dark:border-gray-400'>
                {budgets?.length <= 0 && 
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
                {budgets?.map((budget, index)=>{
                    
                    const allocated = "allocated"+budget.id;
                    const utilized = "utilized"+budget.id;
                    const year = "year"+budget.id;
                    return (
                        <tr className='dark:border-transparent'>
                            <td className='td-year'
                              onClick={()=>{
                                const sh = {[year]: true};
                                setSelected((prev)=>sh);
                                setEditBudget({
                                    id: budget.id,
                                    allocatedBudget: {...editBudget.allocatedBudget, value: budget.allocatedBudget},
                                    utilizedBudget: {...editBudget.utilizedBudget, value: budget.utilizedBudget},
                                    remainingBudget: {...editBudget.remainingBudget, value: budget.remainingBudget},
                                    year: {...editBudget.year, value: budget.year}
                                })
                            }}
                            >    
                                <div className='crud-title'>
                                
                                <CustomDatePicker
                                    labelText="Select Year"
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    label="year"
                                    type="mobile"
                                    views={['year']}
                                    callBackFun={callBackFuncEdit}
                                    
                                    parentStyle={{
                                        margin: "10px 0px"
                                    }}
                                    labelStyle={{
                                        fontWeight: "bold",
                                        fontSize: 16,
                                        fontFamily: 'ubuntu',
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        fontWeight: "bold",
                                        fontSize: 15,
                                        backgroundColor:'transparent',
                                        textAlign: 'center',
                                        width: '100%'
                                    }}
                                    crud={true}
                                    value={budget.year}
                                />
                                
                                </div>
                            </td>
                            <td className='td-allocated'>    
                                <div className='crud-title'>
                                {!selected[allocated] && 
                                <p 
                                 style={{paddingLeft: 10}}
                                 onClick={()=>{
                                    const sh = {[allocated]: true};
                                    setSelected((prev)=>sh);
                                    setEditBudget({
                                        id: budget.id,
                                        allocatedBudget: {...editBudget.allocatedBudget, value: budget.allocatedBudget},
                                        utilizedBudget: {...editBudget.utilizedBudget, value: budget.utilizedBudget},
                                        year: {...editBudget.year, value: budget.year}
                                    }) 
                                }} className="dark:text-gray-100">{parseFloat(budget.allocatedBudget).toLocaleString()}</p>}
                                {selected[allocated] && 
                                  <EditableText
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    callBackFun={callBackFuncEdit}
                                    label="allocatedBudget"
                                    parentStyle={{
                                       padding: "10px 10px",
                                       width: '100%'
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 16,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />}
                                </div>
                            </td>
                            <td className='td-utilized'>    
                                <div className='crud-title'>
                                {!selected[utilized] && <p style={{paddingLeft: 10}} onClick={()=>{
                                    const sh = {[utilized]: true};
                                    setSelected((prev)=>sh);
                                    setEditBudget({
                                        id: budget.id,
                                        allocatedBudget: {...editBudget.allocatedBudget, value: budget.allocatedBudget},
                                        utilizedBudget: {...editBudget.utilizedBudget, value: budget.utilizedBudget},
                                        year: {...editBudget.year, value: budget.year}
                                    })
                                }} className="dark:text-gray-100">{parseFloat(budget.utilizedBudget).toLocaleString()}</p>}
                                {selected[utilized] && 
                                  <EditableText
                                    formData={editBudget}
                                    setFormData={setEditBudget}
                                    callBackFun={callBackFuncEdit}
                                    label="utilizedBudget"
                                    parentStyle={{
                                       padding: "10px 10px"
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 16,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />}
                                </div>
                            </td>
                            <td className='td-remaining'>
                            <p className="dark:text-gray-100">{(parseFloat(budget.allocatedBudget) - parseFloat(budget.utilizedBudget)).toLocaleString()}</p>
                            </td>
                            <td align='center'>
                                <IconButton
                                  onClick={()=>{
                                    handleClickOpen(budget.id);
                                  }}
                                >
                                   <MdDeleteOutline className='text-gray-600 dark:text-gray-100'/>
                                </IconButton>
                            </td>
                           
                        </tr>
                    );
                })}
               
            </tbody>            
        </table>
        <div  onClick={async()=>{
            let bds = budgets;
            const dt = new Date();
            const year = dt.toLocaleDateString('en-us')
            const ProjectId = budget.id
          
            const request = {year:year,ProjectId:ProjectId}
            await axios.post(`${url}/budget`,request,{withCredentials:true}).then((resp)=>{
                setBudgets([...budgets,resp.data])
                setOpenSuccess((prev)=>({open:true,message:"Successfully Added, Provide other data"}))
            })

         
            setSelected({})
        }} className="add-budget dark:text-gray-100" style={{marginTop: 10, display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 18 }}><MdAdd style={{marginRight: 5, fontSize: 22}} />Add new budget</div>
    </div>
  )
}
export default Budgets;
