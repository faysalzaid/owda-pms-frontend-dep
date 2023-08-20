/* eslint-disable no-unused-vars */

import axios  from 'axios'
import React, { lazy, useContext, useState } from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'
import { AuthContext } from './hooks/authContext'
import getCookie from './hooks/getCookie'
import { url } from './config/urlConfig'
import Header from './components/Header'
import { createContext } from 'react'
import ResetPassword from './pages/ResetPassword'
// import HomePage from './pages/homeOld'
import { QueryClientProvider,QueryClient } from '@tanstack/react-query'
import jwt_decode from 'jwt-decode'
import Chat from './components/Chat/Chat'
import { ref } from 'yup'
import setCookie from 'hooks/setCookie'

// import Home from './pages/home'
// import Jobs from './pages/job'
// import WhoWeAre from './pages/whoWeAre'
// import JobApplicationForm from './pages/apply'
// import JobList from './pages/jobList'
// import WhatWeDo from './pages/whatWeDo';
// import About from './pages/about';
// import Publications from './pages/publications'
// import Contact from './pages/contact'
// import Donate from './pages/donate';
// import Programs from './pages/programs';
// import Stories from './pages/stories'
// import History from './pages/history'

const Home = lazy(()=>import('./pages/home'))
const WhoWeAre = lazy(()=>import('./pages/whoWeAre'))
const Jobs = lazy(()=>import('./pages/job'))
const JobApplicationForm = lazy(()=>import('./pages/apply'))
const JobList = lazy(()=>import('./pages/jobList'))
const WhatWeDo = lazy(()=>import('./pages/whatWeDo'))
const About = lazy(()=>import('./pages/about'))
const Publications = lazy(()=>import('./pages/publications'))
const Contact = lazy(()=>import('./pages/contact'))
const Donate = lazy(()=>import('./pages/donate'))
const Programs = lazy(()=>import('./pages/programs'))
const Stories = lazy(()=>import('./pages/stories'))
const History = lazy(()=>import('./pages/history'))
const Resource = lazy(()=>import('./pages/resource'))

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

const queryClient = new QueryClient({defaultOptions:{
  queries:{
    refetchOnWindowFocus:false
  }
}})


const cookie = getCookie('accessToken')





function App(props) {
  let {authState,setAuthState} = useContext(AuthContext)






useEffect(()=>{
  if(!authState.state){
    props.history.push('/login')
  }


},[])





  return (
    <>

  
   
     
        <AccessibleNavigationAnnouncer />
        
        <Switch>
        <Route path="/reset-password/:id/:token" component={ResetPassword} />
        
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />

          {/* Place new routes over this */} 
          <Route path="/app" component={Layout} />  
        
          {/* <Route path="/headers" component={Header}/> */}

          {/* If you have an index page, you can remothis Redirect */}
          <Redirect exact from="/" to="/login" />

          
        </Switch>
       
      
      
    </>
     
  )
}

export default withRouter(App)
