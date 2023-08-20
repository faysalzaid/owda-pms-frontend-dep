/* eslint-disable no-unused-vars */
import { PropTypes } from "prop-types";
import Logo from '../assets/logo-secondary.png';
export default function DonationCard(props){
    return (
        <>

                
                <div className="p-6 w-64 bg-white border border-gray-200 rounded-lg text-center shadow dark:border-gray-700">
                <img src={Logo} alt="" className="mx-auto"/>
                    <h5 className="mb-2 text-2xl font-semibold tracking-tight">{props.title}</h5>
                    <p className="mb-3 font-normal ">{props.number}</p>
                    
                </div>
        
        </>
    )
}

DonationCard.propTypes = {
    title: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired
}