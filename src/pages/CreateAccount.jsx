import React from 'react'
import { Link } from 'react-router-dom'

import ImageLight from '../assets/img/create-account-office.jpeg'
import ImageDark from '../assets/img/create-account-office-dark.jpeg'
import { GithubIcon, TwitterIcon } from '../icons'
import { Input, Label, Button } from '@windmill/react-ui'
import * as Yup from 'yup'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import axios from 'config/axiosConfig';import TitleChange from "components/Title/Title";

import {url} from '../config/urlConfig'
import { useState } from 'react'

function Login(props) {
  const [frontErrorMessage,setFrontErrorMessage] = useState("")
  const [successMessage,setSuccessMessage] = useState("")
  const validation = Yup.object().shape({
    name:Yup.string().min(3).max(15).required(),
    email:Yup.string().email().min(5).required("Email is required"),
    password:Yup.string().min(8).max(25).required()
})
const onSubmit = async(data)=>{
    await axios.post(`${url}/users`,data).then((response)=>{
      if(response.data.error){
          setFrontErrorMessage(response.data.error)
          setTimeout(() => {
            setFrontErrorMessage("")
          }, 3000);
      }else{
          setSuccessMessage("Successfully resitered Your account")
          setTimeout(() => {
            setSuccessMessage("")
            props.history.push('/login')
          }, 3000);
      }
    })
}

const initialValues ={
  name:"",
  email:"",
  password:""
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
                Create account
              </h1>
              {!frontErrorMessage?<></>:<>
              <div role="alert">
                <div class="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>{frontErrorMessage}.</p>
                </div>
              </div>
              
              </>}
              {!successMessage?<></>:<>
              <div role="alert">
                <div class="border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700">
                  <p>{successMessage}.</p>
                </div>
              </div>
              
              </>}
              <Formik initialValues={initialValues} validationSchema={validation} onSubmit={onSubmit}>
                <Form>
                  
              <Label className="mt-4">
                <span>Name</span>
                <Field name="name" className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="text" placeholder='Your Name' />
                <ErrorMessage className="text-red-500 text-xs italic" name='name' component='p'/>
              </Label>
              <Label className="mt-4">
                <span>Email</span>
                <Field name="email" className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="email" placeholder='YourEmal@gmail.com' />
                <ErrorMessage className="text-red-500 text-xs italic" name='email' component='p'/>
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Field name="password" className="block w-full text-sm focus:outline-none dark:text-gray-300 form-input leading-5 focus:border-purple-400 dark:border-gray-600 focus:shadow-outline-purple dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700 mt-1" type="password" placeholder="******************" />
                <ErrorMessage className="text-red-500 text-xs italic" name='password' component='p'/>
              </Label>

              <Button type="submit" block className="mt-4">
                Create account
              </Button>
                </Form>

              </Formik>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Github
              </Button>
              <Button block className="mt-4" layout="outline">
                <TwitterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Twitter
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
