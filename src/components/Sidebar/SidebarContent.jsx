import React, { useEffect } from 'react'
import routes from '../../routes/sidebar'
import { NavLink, Route } from 'react-router-dom'
import * as Icons from '../../icons'
import SidebarSubmenu from './SidebarSubmenu'
import { Button } from '@windmill/react-ui'
import useAuth from 'hooks/useAuth'
import { useState } from 'react'
import { Link } from "react-router-dom";

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}



function SidebarContent() {
  const {authState,settings} = useAuth()
  const [newRoleRoutes,setNewRoleRoutes] = useState([])
  useEffect(()=>{
    const newRoute = routes
    if(authState.role=='admin'){  
      setNewRoleRoutes(routes)
      
    }else if(authState.role=='general_admin'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='general_admin'))  
      setNewRoleRoutes(n)
      // console.log(n);
    }else if(authState.role=='finance_admin'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='finance_admin'))  
      setNewRoleRoutes(n)
    }else if(authState.role=='logistic_admin'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='logistic_admin'))  
      setNewRoleRoutes(n)
    }else if(authState.role=='hr'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='hr'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='executive_director'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='executive_director'))  
      setNewRoleRoutes(n)
    } 
    else if(authState.role=='finance'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='finance'))  
      setNewRoleRoutes(n)
    }
    else if(authState.role=='engineer'){
      const n = newRoute.filter((r)=>r.roles?.find((r)=>r==='engineer'))  
      setNewRoleRoutes(n)
    }
    // newRoute.filter((r)=>r.roles.find((r)=>r==='admin'))
    // console.log(newRoute.filter((r)=>r.roles.find((r)=>r==='admin'))); 
  },[authState.role])

  return (
    <div className="py-6  text-gray-100   min-h-screen overflow-y-auto" style={{background:"#048b2b"}}>
      <Link className="ml-6 text-lg font-bold text-gray-100 dark:text-gray-200" to="/app/dashboard">
        {settings.name}
      </Link>
      <ul className="mt-6">
        {newRoleRoutes.map((route) =>
          route.routes ? (
            <SidebarSubmenu route={route} key={route.name} />
          ) : (
            <li className="relative px-6 py-3" key={route.name}>
              <NavLink
                exact
                to={route.path}
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                activeClassName="text-gray-100 dark:text-gray-100"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-gray-100 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon}/>
                <span className="ml-4">{route.name}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      {/* <div className="px-6 my-6">
        <Button>
          Create account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
      </div> */}
    </div>
  )
}

export default SidebarContent
