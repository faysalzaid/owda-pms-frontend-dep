/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Img from '../assets/home-img.png'
import { PropTypes } from "prop-types";

export default function Featured(props) {
    return (
        <>
					<div className="box text-left h-full">
						<div className="">
							<img src={Img} alt="Emergency" />
						</div>
						<h3 className="font-bold">
                        { props.title }
						</h3>
						<p className="mb-4">
							{props.body}
						</p>
						{props.button === 'Download' ? <Link to="#" className="btn btn-green">Download</Link> 
						: <Link to={{ pathname: '/stories', search: `?title=${props.title}&image=${Img}` }} className="btn btn-green">Read More</Link>}
					
					</div>
					
			
			
        </>
    )
}

Featured.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
	button: PropTypes.string.isRequired,
}
