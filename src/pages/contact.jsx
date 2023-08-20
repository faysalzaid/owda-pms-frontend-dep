/* eslint-disable no-unused-vars */
import Banner from "../components/banner";
import Footer from "../components/footer";
import JoinUs from "../components/joinus";
import NavBar from "../components/navbar";
import Logo from "../assets/logo-contact.png"
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function Contact() {
    useEffect(()=>{
        document.title = "OWDA | Contact";
    }, [])
    return (
        <>
            <Banner/>
            <NavBar/>
            <div className="container grid max-w-screen-lg grid-cols-1 md:grid-cols-2 mx-auto p-2">
            <div className="p-4 flex items-center justify-center flex-col">
                <div className="bg-gray-100 w-1/2 flex flex-col items-center p-4">
                    <img src={Logo} alt="" width={200} />
                    <p className="text-center mt-4 text-lg">info@owdaeth.org</p>
                    <ul className="flex items-center mt-4 justify-center w-full text-green-900">
                        <li className="mx-1">
                            <Link className="text-2xl" to=""><FaTwitter/></Link>
                        </li>
                        <li className="mx-1">
                            <Link className="text-2xl" to=""><FaFacebookF/></Link>
                        </li>
                        <li className="mx-1">
                            <Link className="text-2xl" to=""><FaInstagram/></Link>
                        </li>
                        <li className="mx-1">
                            <Link className="text-2xl" to=""><FaLinkedin/></Link>
                        </li>
                        <li className="mx-1">
                            <Link className="text-2xl" to=""><FaYoutube/></Link>
                        </li>
                    </ul>
                </div>
            </div>

    
            <div className="p-4">
        <div className=" my-5">
          <h2 className="text-2xl font-bold">Contact Us</h2>
        </div>
        <form>
          <div className="flex  flex-col sm:flex-row items-center justify-between gap-4">
            <div className=" w-full">
              <label htmlFor="fname" className="block mb-2 text-lg font-medium">Full Name</label>
              <input type="text" id="fname" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="Full name" required />
            </div>
            <div className=" w-full">
            <label htmlFor="email" className="block mb-2 text-lg font-medium">Email</label>
              <input type="email" id="email" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="Email" />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="my-6 w-full">
              <label htmlFor="msg" className="block mb-2 text-lg font-medium">Message</label>
              <textarea type="file" id="msg"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="" required />
            </div>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>

      </div>
      </div>
            <JoinUs />
            <Footer/>
        </>
    )
}