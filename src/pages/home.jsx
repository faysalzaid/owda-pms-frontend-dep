/* eslint-disable no-unused-vars */

import Banner from "../components/banner";
import NavBar from "../components/navbar";
import Carousal from "../components/carousal";
import Counter from "../components/counter";
import WhatBox from "../components/WhatWeDoBoxes";
import Featured from "../components/featured";
import Footer from "../components/footer";
import Impact from "../components/impact";
import Partners from "../components/partners";
import JoinUs from "../components/joinus";
// import About from "../components/about";
// import Vacancy from "../components/vacancy";
// import Partners from "../components/partners";

import { Link, withRouter } from 'react-router-dom'
import { useEffect } from "react";

function Home() {
    useEffect(()=>{
        document.title = "OWDA | Home";
    }, [])


    return (
        <>
            <Banner />
            <NavBar />
            <Carousal />
            <section className="leading-title text-center mt-4 py-4">
                <h1 className="text-2xl font-bold">We’re leading local NGO working to create <br />
                    a future where everyone can prosper.</h1>
            </section>

            <section className="counter-container flex flex-col md:flex-row items-center justify-around py-4 bg-gray-200 px-2">
                <Counter number={23} text={'Years of service'} type={'+'} />
                <Counter number={100} text={'Trusted community service'} type={'%'} />
                <Counter number={400} text={'Projects completed'} type={'+'} />
            </section>
            <section className="mt-4 max-w-screen-xl mb-4 text-center items-center justify-center mx-auto container px-2">
                <h1 className="text-center mb-4 text-2xl font-bold" >What We Do</h1>
                <div className="mb-4 grid-container w-full">
                    <WhatBox title={'Livlihood'} />
                    <WhatBox title={'Wash'} />
                    <WhatBox title={'Health'} />
                    <WhatBox title={'Emergencies'} />
                    <WhatBox title={'Education'} />
                </div>
                <Link className="btn btn-secondary btn-programs" to='/program'>See All Programs</Link>
            </section>
            <section className="development">
                <div className="container max-w-screen-xl mx-auto text-center">
                    <h1 className="green center">For comprehensive development</h1>
                    <p className="center">
                        Our goal is to promote conditions of sustainable human development through implementing programs/ projects on basic service delivery, economic opportunities, livelihood diversification, Disaster Risk Management and climate change adaptations as well as advocacy and protection.
                    </p>
                </div>
            </section>
            <section className="featured mt-4 max-w-screen-xl mb-4  mx-auto container px-2">
                <div className="flex-container mb-4 grid-container w-full">
                    <Featured
                        title="OWDA's Solar-Powered River Intake System: Transforming Water Accessibility in The Somali Region"
                        body="The importance of sustainable water management in rural communities cannot be overstated. In many areas of the world, access to clean water is a daily struggle, particularly in regions affected by wa..."
                        button=""
                    />
                </div>
                <div className="center text-center">
                    <Link to="#" className="btn btn-secondary btn-programs">See More</Link>
                </div>

            </section>

            <section id="impact" className="impact bg-gray-200 container mx-auto">
                <Impact/>
            </section>
                <JoinUs/>
            <section className=" container mx-auto px-2">
                <Partners/>
            </section>
            <section className="">
                <Footer/>
            </section>
            {/*
      <About />
      <Partners />
      <Vacancy />
      <Footer /> */}
            {/* <Banner/>      */}
        </>
    );
}


export default withRouter(Home)