import Img from '../assets/home-img.png';
import { Link } from 'react-router-dom';
export default function JoinUs() {
    return (
        <>
		<section className="join-us container mx-auto px-2">
				<div className="join-us-elements">
					<img src={Img} alt="join-us" />
					<div className="detail text-center">
						<p>Join us in building a more equitable world.</p>
						<Link to="/donate" className="bg-red-700 hover:bg-red-800 text-white py-3 px-5">Donate</Link>
					</div>
				</div>
		</section>
        </>
    );
}