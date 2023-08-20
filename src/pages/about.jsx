import Banner from "../components/banner";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Featured from "../components/featured";
import JoinUs from "../components/joinus";
import StaticCarousel from "../components/staticCarousal";
import { useEffect } from "react";

export default function About() {
    useEffect(()=>{
        document.title = "OWDA | About";
    }, [])
    return (
        <>
            <Banner />
            <NavBar />
            <StaticCarousel title='About Us'/>

            <section className="about container mx-auto px-2">
                <p className="text-xl mt-4 mb-4">The Organization for Welfare Development in
                    Action (OWDA) is a non-profit organization based
                    in the Somali region of Ethiopia. Our mission is
                    to provide support and improve access to basic
                    services, including health, education, economic
                    development and peace building initiatives,
                    throughout this region. poverty, fear and
                    oppression.</p>
                <p className="text-xl mt-4 mb-4">OWDA has gained recognition amongst international
                    aid organizations due their work within the local
                    communities of eastern Ethiopia since 1999 where
                    they have achieved great strides towards
                    sustainable long- term solutions such as poverty
                    eradication through food security interventions,
                    water projects that send clean drinking resources
                    directly into rural areas; improving nutrition
                    through access to improved seeds & animal
                    vaccinations; establishing new schools with
                    developing educational programming; providing
                    essential skills training and vocational
                    activities alongside microfinance operations so
                    individuals can and alternative livelihoods or
                    start up small businesses.</p>
            </section>
            <section className="development px-2">
                <div className="container max-w-screen-lg mx-auto text-left">
                    <h1 className="green text-left">What we stand for</h1>
                    <p className="text-left text-xl about">
                        Our goal is to promote conditions of sustainable human development through implementing programs/ projects on basic service delivery, economic opportunities, livelihood diversification, Disaster Risk Management and climate change adaptations as well as advocacy and protection.
                    </p>
                    <p className="text-left font-bold text-xl about">
                    For over 23 years we have been working with the community of East africa transforming their lives with sustainable development programs.
                    </p>
                    <p className="text-left text-xl about">
                    Today we are a team of over 400 highly skilled and dedicated professionals who share an exceptional depth and diversity of experience.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-2">
                    <div className="mb-4 w-full">
                    <div className="flex items-center mb-4 flex-col md:flex-row justify-between">
                        <p className="w-full md:w-1/2 text-2xl mb-4 md:mb-0 font-bold">Our Vision</p>
                        <p className="justify-self-start text-xl w-full md:w-1/2">OWDA aspires to see
                            Ethiopia where all people have attained sustainable
                            human development.</p>
                    </div>
                    <div className="flex items-center mb-4 flex-col md:flex-row justify-between">
                        <p className="w-full md:w-1/2 text-2xl mb-4 md:mb-0 font-bold">Our Mission</p>
                        <p className="justify-self-start text-xl w-full md:w-1/2">Maintain and strengthen
                            strategic capacities and partnerships to bring about
                            sustainable development in the lives of under-served
                            populations in Ethiopia.</p>
                    </div>
                    <div className="flex items-center mb-4 flex-col md:flex-row justify-between">
                        <p className="w-full md:w-1/2 text-2xl mb-4 md:mb-0 font-bold">Our Goal</p>
                        <p className="justify-self-start text-xl w-full md:w-1/2">
                            Promote conditions of sustainable human development
                            through implementing programs/ projects on basic service
                            delivery, economic opportunities, livelihood diversification,
                            Disaster Risk Management and climate change adaptations as
                            well as advocacy and protection.</p>
                    </div>
                    </div>
                </div>
            <section className="inthis-section">
                <div className="container mx-auto px-2">
                    <h1 className="green header-with-line">Related Reading</h1>
                    <div className="flex-container mb-4 grid-container w-full">
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                            button=''
                        />
                        <Featured
                            title="Our History"
                            body="we have been working for the worlds most vulnerable people for over 50 years"
                            button=''
                        />
                        <Featured
                            title="Testimonials"
                            body="See what our friends and supporters across the globe have said about us."
                            button=''
                        />
                    </div>
                </div>
            </section>

            <JoinUs />
            <Footer />
        </>
    );
}