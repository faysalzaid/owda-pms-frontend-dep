/* eslint-disable no-unused-vars */
import { useLocation } from "react-router-dom";
import Banner from "../components/banner";
import Footer from "../components/footer";
import JoinUs from "../components/joinus";
import NavBar from "../components/navbar";
import {FaFacebookF, FaTwitter, FaInstagram, FaLinkedin, FaYoutube} from 'react-icons/fa'
import Featured from "../components/featured";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Stories() {
    useEffect(()=>{
        document.title = "OWDA | Stories";
    }, [])
    const location = useLocation();
    const title = new URLSearchParams(location.search).get('title');
    const Img = new URLSearchParams(location.search).get('image');
    return (
        <>
            <Banner/>
            <NavBar/>

            <div className="max-w-screen-xl container mx-auto p-2">
                <h2 className="font-bold mt-4">2023-05-22</h2>
                <h1 className="text-2xl mt-2 font-bold">{title}</h1>
                <img src={Img} alt="" className="w-full mt-4" />
                <div className="social-icons mt-2 gap-4 flex items-center justify-end">
                    <Link className="text-2xl" href=""><FaTwitter/></Link>
                    <Link className="text-2xl" href=""><FaFacebookF/></Link>
                    <Link className="text-2xl" href=""><FaInstagram/></Link>
                    <Link className="text-2xl" href=""><FaLinkedin/></Link>
                    <Link className="text-2xl" href=""><FaYoutube/></Link>
                </div>
                <hr className="mt-4"/>
                <div className="story mt-4 py-4">
                    <p className="mb-4">The importance of sustainable water management in rural communities cannot be overstated. In many areas of the world, access to clean water is a daily struggle, particularly in regions affected by war, natural disasters, and poverty. The lack of access to clean water has a profound impact on human health, agricultural productivity, and economic growth. Fortunately, there are organizations like OWDA that are working to address this issue head-on, through innovative solutions like the solar-powered river intake system.</p>
                    <p className="mb-2">OWDAs river intake system is a game-changer for communities struggling with water scarcity, such as those in Somalia. By harnessing the power of the sun, OWDAs system can pump water from rivers to storage tanks, where it can be accessed by local farmers and herders for irrigation and livestock watering. This project has significantly impacted communities like KAYANE, where access to clean water was previously a major challenge. Thanks to OWDAs partnership with local communities, the river intake system has not only improved access to clean water but has also led to improvements in health and sanitation.</p>
                    <h2 className="font-bold py-2 text-xl">OWDAs Solar-Powered River Intake: An Innovative Solution for Water Scarcity in Somali Region of Ethiopia</h2>
                    <p className="mb-4">The Solar-Powered River Intake System is a game-changer for rural communities in the Somali region. Traditionally, accessing water in these areas has been a tedious and risky process, involving long walks to distant to the river, and exposure to water-borne diseases not to mention crocodile attacks. The Solar-Powered River Intake System, on the other hand, provides a reliable and safe source of water that is accessible within short distances from homes and farms. The system consists of a solar panel array that powers a submersible pump, which draws water from the river and sends it to a storage tank.</p>
                    <p className="mb-4">What makes the Solar-Powered River Intake System unique is its use of renewable energy. By harnessing solar power, OWDA can reduce the systems cost and environmental impact, as well as increase its resilience to power outages and fuel shortages. Moreover, the system is designed to be modular and scalable, so it can be adapted to different contexts and expanded as needed.</p>
                    <h2 className="font-bold py-2 text-xl">The Positive Impact of OWDAs River Intake System on Health and Sanitation in KAYANE Village</h2>
                    <p className="mb-4">Access to clean water is not only important for drinking and irrigation but also for sanitation and hygiene. In rural areas, open defecation, poor handwashing, and lack of proper toilets are common practices, which contribute to the spread of diseases and environmental pollution. The Solar-Powered River Intake System addresses these issues by providing clean water for washing, cooking, and toilet use, as well as promoting hygiene education and behavior change.</p>
                    <p className="mb-2">In KAYANE village, for example, OWDA has implemented a community-led total sanitation (CLTS) program, which aims to eliminate open defecation and promote hygiene practices, such as hand-washing, latrine use, and solid waste management. The program has been successful in mobilizing the community to build their own latrines and improve their hygiene practices by providing essential materials, which has led to a significant reduction in water-borne diseases, such as diarrhea and typhoid.</p>
                    <h2 className="font-bold py-2 text-xl">The Economic Benefits of OWDAs Solar-Powered River Intake System for Local Farmers and Entrepreneurs</h2>
                    <p className="mb-4">One of the key advantages of the Solar-Powered River Intake System is its potential to generate economic benefits for local farmers and entrepreneurs. By providing reliable and affordable water for irrigation, animal husbandry, and farming, the system can increase the productivity and profitability of these activities, and create new opportunities for value addition and marketing. Moreover, the system can stimulate the growth of other businesses, such as food processing, transport, and new market, which can contribute to the local economy and employment.</p>
                    <p className="mb-4">For example, in the village of KAYANE, the Solar-Powered River Intake System has enabled women to start their own fish processing and marketing business, which has increased their income and empowered them socially. The women have formed a cooperative and received training from OWDA on how to process, package, and sell vegetables, as well as on hygiene and quality control. They have also received microcredit support from OWDA to purchase equipment and inputs. The cooperative now supplies fresh vegetables to local markets and restaurants and has become a role model for other women in the surrounding areas.</p>
                    <p className="mb-4">OWDAs solar-powered river intake system has revolutionized the way rural communities in the Somali region access and manage their water resources. By providing a sustainable solution to water scarcity, OWDAs system has improved agriculture and livestock practices, impacted health and sanitation positively, and stimulated the local economy. Through its partnership with local communities and commitment to environmental sustainability, OWDA has set a model for sustainable development that can be replicated in other regions of the Somali region and beyond.</p>
                    <p className="mb-4">However, scaling up OWDAs system presents challenges that require innovative solutions and a collaborative effort with international NGOs. OWDAs approach to monitoring and evaluation ensures the long-term success of water infrastructure projects, and its commitment to environmental sustainability provides valuable lessons for other development projects.</p>
                </div>
                <hr className="mt-4" />
                <div className="related-articles">
                    <h1 className="text-2xl text-center py-4 font-bold">Related Articles</h1>
                    <div className="flex-container mb-4 grid-container w-full">
                    <Featured
                        title="OWDA's Solar-Powered River Intake System: Transforming Water Accessibility in The Somali Region"
                        body="The importance of sustainable water management in rural communities cannot be overstated. In many areas of the world, access to clean water is a daily struggle, particularly in regions affected by wa..."
                        button=""
                    />
                </div>
                </div>
                <div className="news-letter custom-container mx-auto p-2">
                    <h1 className="py-4 text-2xl text-center font-bold">Signup to our Newsletter</h1>
                    <form action="#">
                        <input type="email" id="email" placeholder="Yourname@email.com" required />
                        <input type="submit" className="btn" value="Subscribe" />
                     </form>
                </div>
            </div>

            <JoinUs/>
            <Footer/>
        </>
    )
}