import { purple } from '@mui/material/colors';
import React, {useState} from 'react'
import './tasks.scss';
import { MdAdd } from 'react-icons/md';
import { EditableTextContent, EditableText } from "../Inputs/EditableInputs";
import { TextField, TextArea, Dropdown, DateInput } from "../Inputs/Inputs";
import axios from '../../../config/axiosConfig';
import { url } from 'config/urlConfig';
import { useEffect } from 'react';

export const Tasks = ({task,setTask}) => {
   
  const [taskData, setTasks] = useState([]);
  useEffect(()=>{
    setTasks(task.Tasks)
  },[task.Tasks])
  const statuses = [
    {
        id: 1,
        name: "Not Started",
        color: "#e8384f"
    },
    {
        id: 2,
        name: "In Progress",
        color: "#1faaea"
    },
    {
        id: 3,
        name: "In Review",
        color: "#a962e3"
    },
    {
        id: 4,
        name: "Done",
        color: "#37c5ab"
    },
  ];


  const [formData, setFormData] = useState({
    name: {value: "Project Management", error: "", optional: false},
    description: {value: "Interactive project add, project detail with live edit and update and tasks list UI with full crud functionality", error: "", optional: false},
    descriptionError: {value: "", error: "", optional: false},
    status:  {value: 0, error: "", optional: false},
    startDate:  {value: "", error: "", optional: false},
    endDate:  {value: "", error: "", optional: false},
  });

  const [show, setShow] = useState({add: false, edit: false});
  const [selected, setSelected] = useState({});

  const [addTask, setAddTask] = useState({
    name: {value: "", error: "", optional: false},
    status: {value: 1, error: "", optional: false},
    startDate: {value: "", error: "", optional: false},
    endDate: {value: "", error: "", optional: false},
  });
  const [editTask, setEditTask] = useState({
    name: {value: "", error: "", optional: false},
    status: {value: "", error: "", optional: false},
    startDate: {value: "", error: "", optional: false},
    endDate: {value: "", error: "", optional: false},
  })

  function callBackFuncEdit(text, label, escape = false) {
    if(escape) {
        setSelected({});
        return;
    }
    var data = {[label]: text}
    if(text !== editTask.name) {
        // console.log('the update task:',text);
        const request = {
            name:text,
            pid:task.id
        }
        // console.log('id is ',editTask.id);
        axios.post(`${url}/tasks/${editTask.id}`,request,{withCredentials:true}).then((resp)=>{
            if(resp.data.error){
                console.log(resp.data.error);
            }else{
                // setTasks([...taskData,resp.data])
            }
        })
    }

    setTasks(taskData?.map(task=>task.id ===editTask.id ? {...task, [label]: text} : task))
    setSelected({});
  }
  function callBackFuncAdd(text, label, escape=false) {
    //   let newTasks = tasks;
    //   console.log('the add task:',text);
      const request = {
        name:text,
        pid:task.id
    }
    // console.log('id is ',editTask.id);
    axios.post(`${url}/tasks/`,request,{withCredentials:true}).then((resp)=>{
        if(resp.data.error){
            console.log(resp.data.error);
        }else{
            setTasks([...taskData,resp.data])
        }
    })
  }
  return (
    <div className='crud-container' style={{minWidth: 700}}>
        <table>
            <tbody className='dark:border-gray-400'>
                {taskData?.map((task, index)=>{
                    let stts = "";
                    statuses.map((st)=>{
                        if(st.id === task.status) {
                            stts = <div className='stts' style={{backgroundColor: st.color}}>{st.name}</div>;
                        }
                    })
                    const label = "label"+task.id;
                    return (
                        <tr className='dark:border-transparent'>
                            <td className="td-number">
                               
                                <div className='number-avatar'>{index+1}</div>
                            </td>
                            <td className='td-name dark:text-gray-100'>    
                                <div className='crud-title'>
                                {!selected[label] &&<p onClick={()=>{
                                    const sh = {[label]: true};
                                    setSelected((prev)=>sh);
                                    setEditTask({
                                        id: task.id,
                                        name: {...editTask.name, value: task.name}
                                    })
                                }} style={{ maxWidth: '60vw'}}>{task.name}</p>}
                                {selected[label] && <EditableText
                                    formData={editTask}
                                    setFormData={setEditTask}
                                    callBackFun={callBackFuncEdit}
                                    label="name"
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
                           
                            <td className="td-status">
                                <div className='crud-title'>{stts}</div>
                            </td>
                        </tr>
                    );
                })}
                {show.add && <tr>
                            <td className="td-number">
                                <div className='number-avatar'>{taskData?.length+1}</div>
                            </td>
                            <td className='td-name'>
                                <div className='crud-title'>
                                <EditableText
                                    formData={addTask}
                                    setFormData={setAddTask}
                                    callBackFun={callBackFuncAdd}
                                    label="name"
                                    parentStyle={{
                                        padding: "5px 5px"
                                    }}
                                    inputStyle={{
                                        marginLeft: 0,
                                        fontFamily: 'ubuntu',
                                        //fontWeight: "bold",
                                        fontSize: 17,
                                        backgroundColor: 'transparent',
                                        width: "100%",
                                    }}
                                    crud={true}
                                    setSelected={setSelected}
                                />
                                </div>
                            </td>
                           
                            <td className="td-status">
                               <div className='stts' style={{backgroundColor: statuses[0]?.color}}>{statuses[0].name}</div>
                            </td>
                        </tr>}
            </tbody>            
        </table>
        <div className="add-task dark:text-gray-100" onClick={()=>{setShow({add: true, edit: false})}} style={{marginTop: 10, display: 'flex', justifyContent: 'start', alignItems: 'center', fontSize: 18 }}><MdAdd style={{marginRight: 5, fontSize: 22}}/>Add new task</div>
    </div>
  )
}
export default Tasks;
