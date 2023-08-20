import Banner from "../components/banner";
import NavBar from "../components/navbar";
import Featured from "../components/featured";
import JoinUs from "../components/joinus";
import Footer  from "../components/footer";
import StaticCarousel from "../components/staticCarousal";
import { useEffect } from "react";
import { Link, useHistory, withRouter } from 'react-router-dom'

function WhoWeAre() {
    useEffect(()=>{
        document.title = "OWDA | Who We Are";
    }, [])
    return (
        <>
            <Banner />
            <NavBar />
            <StaticCarousel title='Who We Are'/>
            {/* <Carousal /> */}
            <section className="who mt-4 mb-4 text-left container mx-auto px-2">
                <div>
                    <p className="lead mt-4 w-1/2 text-2xl">We are an local humanitarian organisation that strives for a world free from poverty, fear and oppression.</p>
                    <p className="mt-4 text-lg w-1/2">We deliver life-saving and life-changing interventions to the worlds poorest and most vulnerable people. From rapid emergency response to innovative development programming, we go to the hardest to reach places to make sure that no-one is left behind.</p>
                </div>
            </section>
            <section className="inthis-section">
                <div className="container mx-auto px-2">
                    <h1 className="green header-with-line">In this section</h1>
                    <div className="flex-container mb-4 grid-container w-full">
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                        />
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                        />
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                        />
                    </div>
                </div>
            </section>

            <JoinUs/>
            <Footer/>
        </>
    );
}

export default withRouter(WhoWeAre)