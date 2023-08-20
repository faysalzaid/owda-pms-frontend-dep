import footerLogo from "../assets/footer-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faInbox,
  faFax,
} from "@fortawesome/free-solid-svg-icons";
import Banner from "./banner";
import { Link } from "react-router-dom";
import Img from "../assets/home-img.png";
function Footer() {
  return (
    <>
      <footer>
        <div className="container mx-auto px-2">
          <div className="footer-items">
            <div className="first-item">
              <div className="footer-logo">
                <img src={footerLogo} alt="footerlogo" />
              </div>
              <div className="head-loc">
                <p className="lead">Head Office | Addis Ababa, Ethiopia</p>
                <ul>
                  <li>
                    {" "}
                    <Link to="tel:+251115537041">
                      {" "}
                      <FontAwesomeIcon icon={faPhone} className="green" /> +251
                      11 553 7041
                    </Link>
                  </li>
                  <li>
                    <a href="mailto:info@owdaeth.org">
                      <FontAwesomeIcon icon={faEnvelope} className="green" />{" "}
                      info@owdaeth.org
                    </a>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faInbox} className="green" /> 1502
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faFax} className="green" /> +251
                    11553 7051
                  </li>
                </ul>
              </div>
              <div className="regional">
                <p className="lead">Regional Office | Jigjiga, Ethiopia</p>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faPhone} className="green" /> +251
                    25776 00 29
                  </li>
                  <li>
                    <a href="mailto:info@owdaeth.org">
                      <FontAwesomeIcon icon={faEnvelope} className="green" />{" "}
                      info@owdaeth.org
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="second-item">
              <h2 className="font-bold text-xl">About OWDA</h2>
              <ul>
                <li>
                  <Link to="/who">Who we are</Link>
                </li>
                <li>
                  <Link to="/what">What we stand for</Link>
                </li>
                <li>
                  <Link to="/history">Our history</Link>
                </li>
                <li>
                  <Link to="#">Testimonials</Link>
                </li>
              </ul>
            </div>
            <div className="third-item">
              <h2 className="font-bold text-xl">What we do</h2>
              <ul>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Livelihoods&image=${Img}`,
                    }}
                  >
                    {" "}
                    Livelihood{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Health and Nutrition&image=${Img}`,
                    }}
                  >
                    {" "}
                    Health and Nutrition{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Education&image=${Img}`,
                    }}
                  >
                    {" "}
                    Education{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Emergencies&image=${Img}`,
                    }}
                  >
                    {" "}
                    Emergencies{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Gender Equality&image=${Img}`,
                    }}
                  >
                    {" "}
                    Gender Equality{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=COVID-19&image=${Img}`,
                    }}
                  >
                    {" "}
                    COVID-19{" "}
                  </Link>
                </li>
                <li>
                  <Link
                    to={{
                      pathname: "/program",
                      search: `?title=Youth&image=${Img}`,
                    }}
                  >
                    {" "}
                    Youth{" "}
                  </Link>
                </li>
              </ul>
            </div>
            <div className="fourth-item">
              <h2 className="font-bold text-xl">Where we work</h2>
              <ul>
                <li>
                  <Link to="#impact">View all regions</Link>
                </li>
              </ul>
            </div>
            <div className="last-item">
              <ul>
                <li>
                  <Link to="/donate">Support out work</Link>
                </li>
                <li>
                  <Link to="/resources">Resources</Link>
                </li>
                <li>
                  <Link to="/vacancy">Bidding Jobs</Link>
                </li>
                <li>
                  <Link to="/vacancy">Work with us</Link>
                </li>
                <li>
                  <Link to="/donate">Donate</Link>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="socials">
            <div className="social">
              <ul>
                <li>
                  <Link to="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-instagram"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-linkedin"></i>
                  </Link>
                </li>
                <li>
                  <Link to="#">
                    <i className="fab fa-youtube"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Banner />
      </footer>
    </>
  );
}

export default Footer;
