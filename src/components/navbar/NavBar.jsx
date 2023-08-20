import React from 'react'
import { CgMenuGridR } from 'react-icons/cg'
import { BiCheckCircle, BiTime } from 'react-icons/bi'
import { IoIosRocket } from 'react-icons/io'
import { VscFiles } from 'react-icons/vsc'
import { FaCommentDots } from 'react-icons/fa'
import { GrTextAlignLeft } from 'react-icons/gr'
import { AiFillFile, AiOutlineFile } from 'react-icons/ai'
import { HiOutlineScale} from 'react-icons/hi'
import { BsExclamationLg } from 'react-icons/bs'
// import { AiFillCheckCircle } from 'react-icons/ai'
import './navbar.css'

function NavBar() {

    function handleActiveLink() {
        let navLink = document.querySelectorAll('.nav-link')

        navLink.forEach(link => {
            link.addEventListener('click', function(){
                navLink.forEach(li => li.classList.remove('active'))
                this.classList.add('active')
                console.log('object')
            })
        })
    }
    setTimeout(() => {
        handleActiveLink()
    }, 1000);

    function handleOverview(){
      let overview = document.querySelector('.overview-section')
      let task = document.querySelector('.task-summary-section')
      let blankPage = document.querySelector('.blank-section')
      let contracts = document.querySelector('.contracts-section')
      overview.classList.add('show')
      task.classList.remove('show')
      blankPage.classList.remove('show')
      contracts.classList.remove('show')
    }

    function handleTask(){
      let overview = document.querySelector('.overview-section')
      let task = document.querySelector('.task-summary-section')
      let blankPage = document.querySelector('.blank-section')
      let contracts = document.querySelector('.contracts-section')
      overview.classList.remove('show')
      task.classList.add('show')
      blankPage.classList.remove('show')
      contracts.classList.remove('show')
    }

    function handleBlank(){
      let overview = document.querySelector('.overview-section')
      let task = document.querySelector('.task-summary-section')
      let blankPage = document.querySelector('.blank-section')
      let contracts = document.querySelector('.contracts-section')
      overview.classList.remove('show')
      task.classList.remove('show')
      blankPage.classList.add('show')
      contracts.classList.remove('show')
    }

    function handleContracts(){
      let contracts = document.querySelector('.contracts-section')
      let overview = document.querySelector('.overview-section')
      let task = document.querySelector('.task-summary-section')
      let blankPage = document.querySelector('.blank-section')
      overview.classList.remove('show')
      task.classList.remove('show')
      blankPage.classList.remove('show')
      contracts.classList.add('show')
    }

    const handleMenu = () => {
      let menu = document.querySelector('.menu')
      let navWrapper = document.querySelector('.nav-list-wrapper')
      menu.classList.toggle('active')
      navWrapper.classList.toggle('active')
    }

    const hideNav = () => {
      let menu = document.querySelector('.menu')
      let navWrapper = document.querySelector('.nav-list-wrapper')
      menu.classList.remove('active')
      navWrapper.classList.remove('active')
    }

  return (
    <nav className='nav-one'>
      <div className='nav-list-wrapper'>
        <ul className='nav-list-ul'>
            <li className='nav-link active' onClick={()=>{handleOverview(); hideNav()}}><CgMenuGridR/>Overview</li>
            <li className='nav-link' onClick={()=>{handleTask(); hideNav()}}><BiCheckCircle/> Tasks</li>
            <li className='nav-link' onClick={()=>{handleContracts(); hideNav()}}><VscFiles />Bids</li>
            <li className='nav-link' onClick={()=>{handleBlank(); hideNav()}}><FaCommentDots />Discussions</li>
            <li className='nav-link' onClick={()=>{handleBlank(); hideNav()}}><GrTextAlignLeft />Gantt</li>
            <li className='nav-link' onClick={()=>{handleContracts(); hideNav()}}><AiFillFile />Contracts</li>

        </ul>
      </div>
      <div className='menu' onClick={handleMenu}>
        <span className='bar'></span>
        <span className='bar'></span>
        <span className='bar'></span>
      </div>
    </nav>
  )
}

export default NavBar
