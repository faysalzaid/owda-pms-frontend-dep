import Img from '../assets/home-img.png'
import { PropTypes } from "prop-types";

export default function StaticCarousel(props){
    return (
        <>
             <div className="hero-section">
                <img className="w-full" src={Img} alt="" />
                <div className="container mx-auto p-2">
                    <h1 className="">{props.title}</h1>
                </div>
            </div>
        </>
    )
}

StaticCarousel.propTypes ={
    title: PropTypes.string.isRequired
}