import Banner from "../components/banner";
import NavBar from "../components/navbar";
import Featured from "../components/featured";
import WhatBox from "../components/WhatWeDoBoxes";
import JoinUs from "../components/joinus";
import Footer  from "../components/footer";
import { Link } from "react-router-dom";
import StaticCarousel from "../components/staticCarousal";
import { useEffect } from "react";

export default function WhatWeDo() {
    useEffect(()=>{
        document.title = "OWDA | What We Do";
    }, [])
    return (
        <>
            <Banner />
            <NavBar />
            <StaticCarousel title='What We Do'/>
            <section className="who mt-4 mb-4 text-center container mx-auto px-2">
            <p className="mt-4 w-1/2 mx-auto text-lg text-center ">OWDA implements a huge diversity of programmes, designed to address specific causes of extreme poverty in communities across 9 regions. These programmes are guided by these six thematic focus areas.</p>
            </section>
            <section className="inthis-section">
                <div className="container mx-auto px-2">
                    <h1 className="green header-with-line">Our Programs</h1>
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
                </div>
            </section>
            <section className="inthis-section">
                <div className="container mx-auto px-2">
                    <h1 className="green header-with-line">Related Reading</h1>
                    <div className="flex-container mb-4 grid-container w-full">
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                        />
                        <Featured
                            title="Our History"
                            body="we have been working for the worlds most vulnerable people for over 50 years"
                        />
                        <Featured
                            title="Testimonials"
                            body="See what our friends and supporters across the globe have said about us."
                        />
                    </div>
                </div>
            </section>

            <JoinUs/>
            <Footer/>
        </>
    );
}