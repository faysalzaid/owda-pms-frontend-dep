import { useLocation } from "react-router-dom";
import Banner from "../components/banner";
import NavBar from "../components/navbar";
import JoinUs from "../components/joinus";
import Footer from "../components/footer";
import Featured from "../components/featured";
import { useEffect } from "react";

export default function Programs() {
    useEffect(()=>{
        document.title = "OWDA | Programs";
    }, [])
    const location = useLocation();
    const title = new URLSearchParams(location.search).get("title");
    const Img = new URLSearchParams(location.search).get("image");

    return (
        <>
            {/* <h1>{title}</h1>
            <img src={Img} alt="" /> */}
            <Banner />
            <NavBar />
            <div className="hero-section">
                <img className="w-full" src={Img} alt="" />
                <div className="container mx-auto p-2">
                    <h1 className="">{title}</h1>
                </div>
            </div>
            <div className="content container mx-auto p-2">
                <p className="lead text-2xl mt-4 py-4">OWDAs Livelihood Program is aimed at improving the economic
                    well-being of communities in the Somali region of Ethiopia. We believe that
                    providing livelihood opportunities is essential for reducing poverty and improving
                    the overall well-being of communities.</p>
                <p className="main mt-4 text-xl">In a region where the majority of the population is reliant
                    on pastoral- ism, and a significant number is dependent on agriculture, OWDA
                    strives to strengthen the resilience of the livelihoods of these pasto- ralists
                    and farmers in addition to supporting the development of alternative livelihood
                    options. The latest innovation from the food and livelihood sector has been
                    the village savings and lending associations (VSLA). These are groups
                    consisting of 10 to 20 members who contribute money to their VSLA fund. The
                    fund is then able to save the money and apply it to community needs as
                    necessary. These could be small business loans for a member, funeral costs,
                    school supplies, or other community needs. In times of crisis, OWDA is able to
                    deploy several forms of community assistance. These grants allow families to
                    meet their essential needs in times of crisis. Other notable accomplishments
                    in the Food Security and Livelihood Sector include: 1,250,000 heads of livestock
                    vaccinated benefiting 100,000 households ☞ Over 900,000 heads of livestock
                    treated benefiting 95,000 households ☞ 36,000 pastoralist households supported
                    with emergency livestock feed. ☞ 56,00 households supported with improved
                    emergency crop seeds ☞ 30 crop farming cooperatives established ☞ 120 credit
                    and saving cooperatives established and supported. ☞ 200 income-generating
                    groups supported ☞ More than 500 youth trained on life skills ☞ 35 DRR
                    committees established ☞ 46,000 marginalized households provided with cash
                    grants ☞ Over 1000 orphans supported to date</p>
            </div>
            <div className="donor-box p-2 container mx-auto">
                <h2 className="text-center text-2xl green">Program Donors</h2>
                <ul className="text-center">
                    <li>
                        <p>Lorem Ipsum</p>
                    </li>
                    <li>
                        <p>Lorem Ipsum</p>
                    </li>
                    <li>
                        <p>Lorem Ipsum</p>
                    </li>
                </ul>
            </div>

            <div className="container mx-auto">

                <h1 className="mb-4 text-2xl">Related Reading</h1>
            <div className="flex-container grid-container w-full">
                    <Featured
                        title="OWDA's Solar-Powered River Intake System: Transforming Water Accessibility in The Somali Region"
                        body="The importance of sustainable water management in rural communities cannot be overstated. In many areas of the world, access to clean water is a daily struggle, particularly in regions affected by wa..."
                        button=""
                        />
                </div>
                        </div>
            <JoinUs/>
            <Footer/>
        </>
    );
}