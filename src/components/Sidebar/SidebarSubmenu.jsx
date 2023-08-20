import React, { useState } from 'react'
import { Link, Route, useLocation, useParams, withRouter } from 'react-router-dom'
import { DropdownIcon } from '../../icons'
import * as Icons from '../../icons'
import { Transition } from '@windmill/react-ui'

function Icon({ icon, ...props }) {
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarSubmenu({ route },props) {
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false)

  function handleDropdownMenuClick() {
    setIsDropdownMenuOpen(!isDropdownMenuOpen)
  }

  const location = useLocation() 

  return (
    <li className="relative px-6 py-3 " key={route.name} >
      <button
        className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
        onClick={handleDropdownMenuClick}
        aria-haspopup="true"
      >
        <span className="inline-flex items-center">
          <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon} />
          <span className="ml-4">{route.name}</span>
        </span>
        <DropdownIcon className="w-4 h-4" aria-hidden="true" />
      </button>
      <Transition
        show={isDropdownMenuOpen}
        enter="transition-all ease-in-out duration-300"
        enterFrom="opacity-25 max-h-0"
        enterTo="opacity-100 max-h-xl"
        leave="transition-all ease-in-out duration-300"
        leaveFrom="opacity-100 max-h-xl"
        leaveTo="opacity-0 max-h-0"
      >
        <ul
          className="p-2 mt-2 space-y-2 overflow-hidden text-sm font-medium text-gray-700 rounded-md shadow-inner bg-gray-100 dark:text-gray-100"
          aria-label="submenu"
        >
          {route.routes.map((r) => (
            
            <li
              className="px-1 py-1 transition-colors duration-150 hover:text-green-600 dark:hover:text-green-700 dark:text-gray-600"
              key={r.name}
            >
              
               <div className='flex'>
              
              <Icon className="w-5 h-5 " aria-hidden="true" icon={r.icon} style={{color:`${r.path===location.pathname?'green':''}`}}/>
              {/* {console.log(r)} */}
              <Link className=" pl-2 pr-2 py-1 font-semibold" to={r.path} style={{color:`${r.path===location.pathname?'green':''}`}}>
                
                {r.name}
              </Link>
              </div>
            </li>
          ))}
        </ul>
      </Transition>
    </li>
  )
}

export default withRouter(SidebarSubmenu)
