import somali from '../assets/somali.png'
export default function Impact() {
    return (
        <>
            <div className="impact">
                <h2>Our Impact</h2>
                <div className="impact-desc">
					<div className="impact-detail">
						<div className="box">
							<p className="number green">5,236,488</p>
							<p className="green">Individuals</p>
							<p>
								since it's founding, OWDA has supported
							</p>
						</div>
						<div className="box">
							<p className="number green">2.8 million</p>
							<p className="green">People Reached</p>
							<p>with essential health education plans</p>
						</div>
						<div className="box">
							<p className="number green">1 Million+</p>
							<p className="green">School aged children supported</p>
							<p>OWDA saw a direct need for an innovative
education intervention in its target communities.</p>
						</div>
						<div className="box">
							<p className="number green">2.5 Million</p>
							<p className="green">People Reached</p>
							<p>with hygiene and sanitation
promotion campaigns</p>
						</div>
					</div>
					<div className="impact-img">
						<img src={somali} alt="impact" />
					</div>
				</div>
            </div>
        </>
    )
}