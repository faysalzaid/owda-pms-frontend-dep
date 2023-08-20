/* eslint-disable no-unused-vars */
import Featured from "../components/featured"
import JoinUs from "../components/joinus"
import Footer from "../components/footer"
import NavBar from "../components/navbar"
import Banner from "../components/banner"
import Img from '../assets/home-img.png'
import { Link } from "react-router-dom"
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import StaticCarousel from "../components/staticCarousal"
import { useEffect } from "react";

export default function Publications() {
    useEffect(()=>{
        document.title = "OWDA | Publications";
    }, [])
    return (
        <>
        <Banner/>
        <NavBar/>
        <StaticCarousel title='Publications'/>
            <section className="publication container mx-auto px-2">
            <div className="desc  mg-t-5">
   
                <p className="lead w-full md:w-1/2">Our objectives, activities and achievements 
                    in 2021 can be found in our annual report.</p>
                <h3>Reaching Thousands</h3>
                <p className="w-full md:w-1/2">In 2021, Concern helped 39 million of the worlds poorest and most 
                    vulnerable people to alleviate poverty and hunger. We responded to
                     66 different emergencies in 24 countries.</p>
       
        </div>
        <div className="download desc mg-t-5  md:w-1/2">
         
                <h1>Download our latest annual report</h1>

                <p>Our latest annual reports are available to view and 
                    download in the list below.</p>
                <div className="download-link">
                    <p>2021 annual report</p>
                    <Link to="#" className="green">Download</Link>
                </div>
     
        </div>
            </section>

       

            <div className="slideshow px-2 mt-4 container mx-auto">
                <h1 className="py-4 text-xl font-bold">Higlights of 2022 in picture</h1>
            <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
                    <div className="swiper mySwiper">
                        <div className="swiper-wrapper">
                            <SwiperSlide>
                            <div className="swiper-slide">
                                <img src={Img} alt="" />
                                <div className="img-desc">
                                    <h2>In 2021</h2>
                                    <p>OWDA helped 4 million people in 24 
                                        of the somali region’s poorest and most vulnerable people
                                        to alleviate poverty and hunger.</p>
                                </div>
                            </div>
                            </SwiperSlide>
                            <SwiperSlide>
                            <div className="swiper-slide">
                                <img src={Img} alt="" />
                                <div className="img-desc">
                                    <h2>In 2021</h2>
                                    <p>OWDA helped 4 million people in 24 
                                        of the somali region’s poorest and most vulnerable people
                                        to alleviate poverty and hunger.</p>
                                </div>
                            </div>
                            </SwiperSlide>
                           
                        </div>
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div>
                </div>
                </Swiper>
            </div>
            <section className="inthis-section mt-4">
                <div className="container mx-auto px-2">
                    <h1 className="green header-with-line">View Previous Annual Reports</h1>
                    <div className="flex-container mb-4 grid-container w-full">
                        <Featured
                            title=""
                            body=""
                            button="Download"
                        />
                        <Featured
                            title=""
                            body=""
                            button="Download"
                        />
                        <Featured
                            title=""
                            body=""
                            button="Download"
                        />
                    </div>
                </div>
            </section>
            <div className="contact container mx-auto px-2">
                <p className="text-xl mb-4" style={{width: '50%'}}>If you have any questions, comments or queries about our reports, or if you would like a copy of an older report, we would be delighted to hear from you.</p>
                <Link to='/contact' className="btn btn-orange">Contact Us</Link>
            </div>

            <section className="inthis-section mt-4">
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
            <JoinUs />
            <Footer />
        </>
    )
}