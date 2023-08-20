/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// import { Form, Button } from "react-bootstrap";
import Banner from "../components/banner";
import NavBar from "../components/navbar";
import  Footer  from "../components/footer";
import { useEffect } from "react";

 function JobApplicationForm() {
    useEffect(()=>{
        document.title = "OWDA | Apply";
    }, [])
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [resume, setResume] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Banner />
      <NavBar />
      <div className="container max-w-screen-lg custom-container mx-auto p-4">
        <div className=" my-5">
          <h2 className="text-2xl font-bold">Job Title</h2>
        </div>
        <form>
          <div className="flex  flex-col sm:flex-row items-center justify-between gap-4">
            <div className=" w-full">
              <label htmlFor="fname" className="block mb-2 text-lg font-medium">First Name</label>
              <input type="text" id="fname" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="First name" required />
            </div>
            <div className=" w-full">
              <label htmlFor="lname" className="block mb-2 text-lg font-medium">Last Name</label>
              <input type="text" id="lname" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="Last name" required />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row mt-4 items-center justify-between gap-4">
            <div className=" w-full">
              <label htmlFor="phone" className="block mb-2 text-lg font-medium">Phone Number</label>
              <input type="text" id="phone" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="Phone Number" required />
            </div>
            <div className=" w-full">
              <label htmlFor="email" className="block mb-2 text-lg font-medium">Email</label>
              <input type="email" id="email" className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="email" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="my-6 w-full">
              <label htmlFor="cv" className="block mb-2 text-lg font-medium">Resume / CV</label>
              <input type="file" id="cv"
                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                className=" border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-green-500 block w-full p-2 border-gray-600  placeh  focus:ring-blue-500  focus:border-blue-500" placeholder="" required />
            </div>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>

      </div>
      <Footer/>
      {/* <Banner/> */}
    </>
  );
}

export default JobApplicationForm;
