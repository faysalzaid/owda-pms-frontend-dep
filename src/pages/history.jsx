import Banner from "../components/banner";
import Footer from "../components/footer";
import JoinUs from "../components/joinus";
import Navbar from "../components/navbar";
import StaticCarousel from "../components/staticCarousal";
import Famine from '../assets/famin.jpg'
import Featured from "../components/featured";

import { useEffect } from "react";

export default function History() {
    useEffect(()=>{
        document.title = "OWDA | History";
    }, [])
    return (
        <>
            <Banner/>
            <Navbar/>
            <StaticCarousel title='History'/>
            <div className="container mx-auto p-2">
                <div className="history mb-4">
                    <h1 className="text-xl font-bold">Over 22 years of fighting poverty. In 1999, a small group of people in somali region spearheaded a major aid operation in response to famine and conflict Over 22 years later, we’re still working with the somali region’s most vulnerable people to help reduce sufering and combat poverty and hunger.</h1>
                    <h2 className="py-3 green text-2xl font-bold">Responding to famine in Somali region</h2>
                    <p className="text-xl">OWDA was founded by mohamed sulub and other team 1999, in response to the famine in the breakaway province of somali region of ethiopia. The widespread conflict that followed Biafra’s attempt to secede from Nigeria caused the displacement of millions and a blockade of food, medicine and basic necessities by the Nigerian authorities. At the height of the crisis in the summer of 1968, it was estimated that 6,000 children were dying every week. </p>
                </div>
                <div className="images grid gap-8 md:grid-cols-2 mb-4 py-4">
                    <img className="w-full" src={Famine} alt="" />
                    <img className="w-full" src={Famine} alt="" />
                </div>
                <div className="history mb-4">
                    <h1 className="text-2xl font-bold green">Becoming OWDA</h1>
                    <p className="text-xl">Over time, it was not just aid that was delivered, but Concern volunteers – responding quickly with pragmatic and effective solutions – whose work became the impetus for taking the organisation in a new direction. In 1970, a huge cyclone hit East Pakistan, now Bangladesh, and the public was asked to respond. From these small beginnings, and equipped with practical and visionary leaders – Concern Worldwide was born. </p>
                    <h1 className="py-4 text-2xl font-bold green">A timeline of humanitarian response</h1>
                    <p className="text-xl py-2">From our beginnings in Biafra and Bangladesh, we continued to respond to major crises around the world with commitment and dedication, establishing a reputation for the effectiveness of our responses. Here is a look at some of the major emergencies that have defined Concern’s work in the decades that followed. </p>
                </div>

                <div className="flex-container pt-4 mb-4 grid-container w-full">
                        <Featured
                            title="What we stand for"
                            body="our mission is to end extreme poverty whatever it takes"
                            button=""
                        />
                        <Featured
                            title="Our History"
                            body="we have been working for the worlds most vulnerable people for over 50 years"
                            button=""
                        />
                        <Featured
                            title="Testimonials"
                            body="See what our friends and supporters across the globe have said about us."
                            button=""
                        />
                    </div>
            </div>

            <JoinUs/>
            <Footer/>
        </>
    )
}