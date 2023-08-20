import homeImg from '../assets/home-img.png';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


export default function Carousal() {

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={false}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-container">
            <img src={homeImg} className="" alt="..." />
            <div className="text">
              <h3 className='text-center text-white'>First Slide</h3>
              <p className='text-center text-white'>Some representative placeholder content for the first slide.</p>
              <Link to='/stories' className='text-center btn'>Read More</Link>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="slide-container">
            <img src={homeImg} className="" alt="..." />
            <div className="text">
              <h3 className='text-center text-white'>Second Slide</h3>
              <p className='text-center text-white'>Some representative placeholder content for the Second slide.</p>
              <Link to='/stories' className='text-center btn'>Read More</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img src={homeImg} className="" alt="..." />
            <div className="text">
              <h3 className='text-center text-white'>Third Slide</h3>
              <p className='text-center text-white'>Some representative placeholder content for the Third slide.</p>
              <Link to='/stories' className='text-center btn'>Read More</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img src={homeImg} className="" alt="..." />
            <div className="text">
              <h3 className='text-center text-white'>Fourth Slide</h3>
              <p className='text-center text-white'>Some representative placeholder content for the Fourth slide.</p>
              <Link to='/stories' className='text-center btn'>Read More</Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="slide-container">
            <img src={homeImg} className="" alt="..." />
            <div className="text">
              <h3 className='text-center text-white'>Fifth Slide</h3>
              <p className='text-center text-white'>Some representative placeholder content for the Fifth slide.</p>
              <Link to='/stories' className='text-center btn'>Read More</Link>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

    </>
  );
}