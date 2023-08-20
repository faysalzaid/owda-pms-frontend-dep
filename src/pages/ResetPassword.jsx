import React from 'react'
import { Link, useParams } from 'react-router-dom'

import ImageLight from '../assets/img/forgot-password-office.jpeg'
import ImageDark from '../assets/img/forgot-password-office-dark.jpeg'
import { Label, Input, Button } from '@windmill/react-ui'
import { url } from '../config/urlConfig'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import { useState } from 'react'

import { useRef } from 'react'
import { AuthContext } from '../hooks/authContext'
import { useContext } from 'react'
import { useEffect } from 'react'



function ResetPassword(props) {
  let [ErrorMessage,setErrorMessage] = useState("")
  let [successMessage,setSuccessMessage] = useState("")
  let [form,setForm] = useState({password:"",confirmPassword:""})
  const [recievedData,setRecievedData] = useState({})
  const [authState] = useContext(AuthContext)



const {id,token} = useParams()
  useEffect(()=>{
    const getData = async()=>{
        await axios.get(`${url}/users/resetpassword/${id}/${token}`).then((resp)=>{
            // console.log(resp.data.error);
            if(resp.data.error){

                setErrorMessage(resp.data.error)
                setTimeout(() => {
                    setErrorMessage("")
                }, 3000);
            }else{
                setRecievedData(resp.data)
                setSuccessMessage(`Resetting password for ${resp.data.name}`)
                setTimeout(() => {
                    setSuccessMessage("")
                }, 3000);
            }
        })
    }
    getData()

  },[])

  useEffect(()=>{
    if(authState.state===true){
      props.history.push('/app/dashboard')
    }
  },[])
// console.log(`the id is ${id}. and the token is ${token}`);
  const handleResetPassword = async(e)=>{
    e.preventDefault()
    console.log('reached',form);
    await axios.post(`${url}/users/resetpassword/${id}/${token}`,form).then((resp)=>{
      // console.log('The main resp',resp.data);
      if(resp.data.error){
        console.log(resp.data);
        setErrorMessage(resp.data.error)
        setTimeout(() => {
          setErrorMessage("") 
        }, 3000);
      }else{
        setSuccessMessage('Successfully Resseted')
        setTimeout(() => {
          setSuccessMessage("")
          props.history.push("/login")
        }, 3000);
      }
    })
  }
  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Reset password
              </h1>
              {successMessage!==""?
                  <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                  <p className="text-sm">{successMessage}.</p>
                </div>:''}
                {ErrorMessage!==""?
                  <div className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3" role="alert">
                  <p className="text-sm">{ErrorMessage}.</p>
                </div>:''}
              <form onClick={handleResetPassword}>
              <Label>
                <span>Password</span>
                <Input type="password" className="mt-1" name="password" onChange={(e)=>setForm({password:e.target.value})}  />
              </Label>
              <Label>
                <span>Confirm Password</span>
                <Input type="password" className="mt-1" name="confirmPassword" onChange={(e)=>setForm({...form,confirmPassword:e.target.value})} />
              </Label>


              <Button type="submit" className="mt-4">
                Reset password
              </Button>
              </form>

            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
