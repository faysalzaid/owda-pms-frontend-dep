import React, { useContext, useEffect } from 'react'
import { Link, useHistory, withRouter } from 'react-router-dom'
import 'config/custom-button.css'
import ImageLight from '../assets/img/login-office.jpeg'
import ImageDark from '../assets/img/login-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Label, Input, Button } from '@windmill/react-ui'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import {url} from '../config/urlConfig'
import { useState } from 'react'

import { AuthContext } from '../hooks/authContext'

import { ErrorAlert, SuccessAlert } from "components/Alert";import 'config/custom-button.css'
// 


function Login(props) {

  const [frontErrorMessage,setFrontErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const {authState,setAuthState,settings} = useContext(AuthContext)


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


 

  const validation = Yup.object().shape({
    email:Yup.string().email().min(5).required("Email is required"),
    password:Yup.string().min(3).max(25).required()
})


const onSubmit = async(data)=>{
  try {
    await axios.post(`${url}/login`,data,{ withCredentials: true }).then((response)=>{
      if(response.data.error){
          setOpenError({open:true,message:`${response.data.error}`})  
         
      }else{
        let data = response.data
        const userData ={
          id:data.id,
          username:data.name,
          email: data.email,
          image:data.image,
          email:data.email,
          role:data.role,
          state:true,
          // Add other properties as needed
        }
          const stringFied = JSON.stringify(userData?userData:undefined)
          setAuthState({id:data.id,username:data.name,email:data.email,image:data.image,role:data.role,state:true})
          setOpenSuccess({open:true,message:"Logged In Successfully"})
   
          // console.log(accessToken);
          // setCookie('accessToken', accessToken, { expires: 7, path: '/' })
          localStorage.setItem('User', stringFied); 
          props.history.push('/app/dashboard')

           
        
      }
    })
    
    
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      setOpenError({open:true,message:`${error.response.data.error}`});
    } else {
      setOpenError({open:true,message:"An unknown error occurred"});
    }
  }

}

// useEffect(()=>{
//   console.log('from login');
// },[])

const initialValues ={
  email:"",
  password:""
}
  return (

    <>
<TitleChange name={`Login | ${settings.name}`}/>
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


    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={settings.loginlogo}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={settings.loginlogo}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login 
              </h1>
              {!frontErrorMessage?<></>:<>
              <div role="alert">
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>{frontErrorMessage}.</p>
                </div>
              </div>
              
              </>}
              {!successMessage?<></>:<>
              <div role="alert">
                <div className="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                  <p>{successMessage}.</p>
                </div>
              </div>
              
              </>}
              <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
                <Form>
                  
           
              <Label className="mt-4">
                <span>Email</span>
                <Field name="email" className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="email" autoComplete="off" placeholder='YourEmal@gmail.com' />
                <ErrorMessage className="text-red-500 text-xs italic" name='email' component='p'/>
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Field name="password" className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="password" autoComplete="off" placeholder="******************" />
                <ErrorMessage className="text-red-500 text-xs italic" name='password' component='p'/>
              </Label>

              <Button type="submit" block className="mt-4 custom-button">
                Login
              </Button>
                </Form>

              </Formik>

              <hr className="my-8" />

              
            

              <p className="mt-4">
                {/* <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forget Password ?
                </Link> */}
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>

    </>
  )
}

export default withRouter(Login)
