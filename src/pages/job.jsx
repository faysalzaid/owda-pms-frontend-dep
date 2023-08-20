import Banner from "../components/banner";
import NavBar from "../components/navbar";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSuitcase, faList, faMale, faCalendar, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Footer from "../components/footer";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Jobs() {
    useEffect(()=>{
        document.title = "OWDA | Job Details";
    }, [])
    const [isMobView, setIsMobView] = useState(false);
    const toggleMobView = () => {
        setIsMobView(!isMobView);
    };
    return (
        <>
            <Banner />
            <NavBar />
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row">
                    <div className=" mx-4 mt-3 md:w-1/5 ">
                        <div className="p-2 bg-white flex items-center border-b-2 justify-between">
                            <h2 className="text-black font-bold text-2xl mb-2">Similar Jobs</h2>
                            <FontAwesomeIcon id="bars" onClick={toggleMobView} className="menu_btn mb-2 cursor-pointer text-black fa-2x hide" icon={faAngleDown} />
                        </div>

                        <div id="menu" className={isMobView ? 'p-2 bg-white' : 'p-2 mob-view bg-white'}>
                            <ul className="bg-white px-3 divide-y">
                                <li className="mb-2 p-2">
                                    <Link to="#">
                                        <h3 className="px-0">Job Title</h3>
                                    </Link>
                                    <p className="px-0">Posted Date</p>
                                </li>
                                <li className="mb-2 p-2">
                                    <Link to="#">
                                        <h3 className="px-0">Job Title</h3>
                                    </Link>
                                    <p className="px-0">Posted Date</p>
                                </li>
                                <li className="mb-2 p-2">
                                    <Link to="#">
                                        <h3 className="px-0">Job Title</h3>
                                    </Link>
                                    <p className="px-0">Posted Date</p>
                                </li>
                            </ul>
                        </div>
                    </div>


                    <div className="bg-white mt-3 md:w-4/5 mx-4 px-3">
                        <div className="flex justify-between border-b-2 mb-4">
                            <h2 className="font-bold text-2xl p-2">Job Title</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            <div className="main-info">
                                <ul className="px-0">
                                    <li className="py-2 text-lg"><FontAwesomeIcon icon={faSuitcase} /> Full time</li>
                                    <li className="py-2 text-lg"><FontAwesomeIcon icon={faList} /> Main Skill</li>
                                    <li className="py-2 text-lg"><FontAwesomeIcon icon={faMale} /> Number of required
                                        people</li>
                                    <li className="py-2 text-lg"><FontAwesomeIcon icon={faCalendar} /> deadline to
                                        apply</li>
                                </ul>
                                <Link to="./apply" className="btn my-3 inline-block">Apply</Link>
                            </div>

                        </div>
                        <div className="about my-4">
                            <h4 className="text-2xl py-2">About The Job</h4>
                            <p className="leading-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium nihil consequuntur est
                                adipisci unde porro consequatur, pariatur fugit quaerat dolor, exercitationem facilis quia
                                ducimus odio? Ea aut officia illum tempore corporis officiis sit. Ducimus ullam asperiores
                                debitis architecto. Delectus explicabo corrupti nisi rem numquam facilis ducimus minima
                                possimus dolorem velit.</p>
                            <h5 className="text-2xl py-2">Responsibilities</h5>
                            <ul className="list-disc ml-5">
                                <li>
                                    <p className="leading-8">Lorem ipsum dolor sit amet consectetur.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Voluptas illum esse beatae eum officia.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Consequuntur vero temporibus rem omnis laborum.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Porro omnis eos quaerat corporis recusandae!</p>
                                </li>
                                <li>
                                    <p className="leading-8">Beatae tempore placeat ipsum ad in!</p>
                                </li>
                                <li>
                                    <p className="leading-8">Maiores unde magni accusantium. Dignissimos, reiciendis.</p>
                                </li>
                            </ul>
                            <h5 className="text-2xl py-2">Requirements</h5>
                            <ul className="list-disc ml-5">
                                <li>
                                    <p className="leading-8">Lorem ipsum dolor sit amet consectetur.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Dolorem unde ipsum itaque adipisci explicabo!</p>
                                </li>
                                <li>
                                    <p className="leading-8">Fuga exercitationem dolores atque reiciendis laboriosam.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Id magni dolorem sequi officiis iure.</p>
                                </li>
                                <li>
                                    <p className="leading-8">Aspernatur libero quaerat architecto repellendus accusamus!</p>
                                </li>
                                <li>
                                    <p className="leading-8">Ab facere iusto nesciunt possimus velit?</p>
                                </li>
                                <li>
                                    <p className="leading-8">Quaerat, nemo non. Impedit, necessitatibus iure?</p>
                                </li>
                                <li>
                                    <p className="leading-8">Saepe optio at eos magni vel?</p>
                                </li>
                                <li>
                                    <p className="leading-8">Beatae aspernatur debitis est consequuntur cumque!</p>
                                </li>
                                <li>
                                    <p className="leading-8">Minima cum consequatur ducimus eum magni?</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}


