/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import Banner from "../components/banner";
import Footer from "../components/footer";
import JoinUs from "../components/joinus";
import NavBar from "../components/navbar";
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import Featured from "../components/featured";
import { useEffect } from "react";

export default function Resource() {
    useEffect(()=>{
        document.title = "OWDA | Resource";
    }, [])

    return (
        <>
            <Banner/>
            <NavBar/>


            <JoinUs/>
            <Footer/>
        </>
    )
}