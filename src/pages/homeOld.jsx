import React, { Component, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./file.css";
import { url } from "../config/urlConfig";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from 'axiosConfig';;
import { Badge } from "@windmill/react-ui";
import * as Yup from "yup";

function HomePage(props) {
  const [prData, setPrData] = useState([]);
  const [prForm, setPrForm] = useState({
    prlist: "",
    fullname: "",
    phone: "",
    license: "",
    performa: "",
    proposal: "",
    companydoc: "",
    amount: "",
  });
  let [successMessage, setSuccessMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    axios.get(`${url}/`).then((resp) => {
      if (resp.data.error) {
        errorMessage.current = resp.data.error;
        // console.log(resp.data.error);
      } else {
        setPrData(resp.data);
        console.log(resp.data);
      }
    });
  }, []);

  const validation = Yup.object().shape({
    prlist: Yup.string().required("Project is required"),
    fullname: Yup.string().min(5).max(15).required(),
    phone: Yup.number().min(9).typeError("Phone must be a number").required(),
    amount: Yup.number().min(4).typeError("amount must be a number").required(),
  });
  const initialValues = {
    prlist: "",
    fullname: "",
    phone: "",
    license: "",
    performa: "",
    proposal: "",
    companydoc: "",
    amount: "",
  };

  const addBid = async (data) => {
    // console.log('This is from bid data',prForm.fullname);

    if (
      prForm.license === "" ||
      prForm.performa === "" ||
      prForm.proposal === "" ||
      prForm.companydoc === ""
    ) {
      setErrorMessage("Please provide all data");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    } else {
      // console.log('prlist-value ',data.prlist);
      const grappedProject = await axios.get(
        `${url}/pr-list/name/${data.prlist}`
      );
      console.log("from grappedProject: ", grappedProject.data);
      const formData = new FormData();
      formData.append("prlist", grappedProject.data.id);
      formData.append("fullname", data.fullname);
      formData.append("phone", data.phone);
      formData.append("license", prForm.license);
      formData.append("performa", prForm.performa);
      formData.append("proposal", prForm.proposal);
      formData.append("companydoc", prForm.companydoc);
      formData.append("amount", data.amount);
      //   console.log('formdata: ',formData);

      const response = await axios
        .post("http://localhost:4000/", formData)
        .then((resp) => {
          if (resp.data.error) {
            setErrorMessage(resp.data.error);
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          } else {
            setPrForm({
              prlist: "",
              fullname: "",
              phone: "",
              license: "",
              performa: "",
              proposal: "",
              companydoc: "",
              amount: "",
            });
            setSuccessMessage(`Successfully Submitted`);
            props.history.push("/");
            setTimeout(() => {
              setSuccessMessage("");
            }, 9000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <link
        rel="shortcut icon"
        href="assetss/images/favicon.png"
        type="image/png"
      />

      <link rel="stylesheet" href="assetss/css/animate.css" />

      <link rel="stylesheet" href="assetss/css/tiny-slider.css" />

      <link
        rel="stylesheet"
        href="assetss/fonts/lineicons/font-css/LineIcons.css"
      />

      <link rel="stylesheet" href="assetss/css/tailwindcss.css" />

      <div className="preloader">
        <div className="loader">
          <div className="ytp-spinner">
            <div className="ytp-spinner-container">
              <div className="ytp-spinner-rotator">
                <div className="ytp-spinner-left">
                  <div className="ytp-spinner-circle"></div>
                </div>
                <div className="ytp-spinner-right">
                  <div className="ytp-spinner-circle"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="header_area">
        <div className="navbar-area bg-white">
          <div className="container relative">
            <div className="row items-center">
              <div className="w-full">
                <nav className="flex items-center justify-between py-4 navbar navbar-expand-lg">
                  <a className="navbar-brand mr-5" href="index.html">
                    <img src="assetss/images/logo.svg" alt="Logo" />
                  </Link>
                  <button
                    className="block navbar-toggler focus:outline-none lg:hidden"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarOne"
                    aria-controls="navbarOne"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                    <span className="toggler-icon"></span>
                  </button>

                  <div
                    className="absolute left-0 z-20 hidden w-full px-5 py-3 duration-300 bg-white lg:w-auto collapse navbar-collapse lg:block top-full mt-full lg:static lg:bg-transparent shadow lg:shadow-none"
                    id="navbarOne"
                  >
                    <ul
                      id="nav"
                      className="items-center content-start mr-auto lg:justify-end navbar-nav lg:flex bold"
                    >
                      <li className="nav-item ml-5 lg:ml-11">
                        <a className="page-scroll" href="#home">
                          Home
                        </Link>
                      </li>
                      <li className="nav-item ml-5 lg:ml-11">
                        <a className="page-scroll" href="#why">
                          About
                        </Link>
                      </li>
                      <li className="nav-item ml-5 lg:ml-11">
                        <a className="page-scroll" href="#services">
                          Projects
                        </Link>
                      </li>

                      <li className="nav-item ml-5 lg:ml-11">
                        <a className="page-scroll" href="#apply">
                          {" "}
                          <button className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            Apply Project
                          </button>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </div>

        <div
          id="home"
          className="header_hero bg-white relative z-10 overflow-hidden lg:flex items-center"
        >
          <div className="hero_shape shape_1">
            <img src="assetss/images/shape/shape-1.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_2">
            <img src="assetss/images/shape/shape-2.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_3">
            <img src="assetss/images/shape/shape-3.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_4">
            <img src="assetss/images/shape/shape-4.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_6">
            <img src="assetss/images/shape/shape-1.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_7">
            <img src="assetss/images/shape/shape-4.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_8">
            <img src="assetss/images/shape/shape-3.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_9">
            <img src="assetss/images/shape/shape-2.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_10">
            <img src="assetss/images/shape/shape-4.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_11">
            <img src="assetss/images/shape/shape-1.svg" alt="shape" />
          </div>
          <div className="hero_shape shape_12">
            <img src="assetss/images/shape/shape-2.svg" alt="shape" />
          </div>

          <div className="container">
            <div className="row">
              <div className="w-full lg:w-1/2">
                <div className="header_hero_content pt-150 lg:pt-0">
                  <h2 className="hero_title text-2xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-extrabold">
                    SRS-Road And Transport Beraue{" "}
                    <span className="text-theme-color">Projects</span>
                  </h2>
                  <p className="mt-8 lg:mr-8">
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                    diam nonumy eirmod tempor invidunt ut labore et dolore
                    magna.
                  </p>
                  <div className="hero_btn mt-10">
                    <a className="main-btn" href="#apply">
                      Start Applying
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="header_shape hidden lg:block"></div>

          <div className="header_image flex items-center">
            <div className="image 2xl:pl-25">
              <img src="assetss/images/header-image.svg" alt="Header Image" />
            </div>
          </div>
        </div>
      </section>

      <section id="why" className="about_area pt-120 relative">
        <div className="about_image flex items-end justify-end">
          <div className="image lg:pr-13">
            <img src="assetss/images/about.svg" alt="about" />
          </div>
        </div>
        <div className="container">
          <div className="row justify-end">
            <div className="w-full lg:w-1/2">
              <div className="about_content mx-4 pt-11 lg:pt-15 lg:pb-15">
                <div className="section_title pb-9">
                  <h5 className="sub_title">Office Info</h5>
                  <h4 className="main_title">Goals Of the Office</h4>
                </div>
                <p>
                  Nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat sed diam voluptua. At vero eos et accusam et
                  justo duo dolores et rebum. Stet clita kasd gubergren, no sea
                  takimata sanctus.{" "}
                </p>
                <ul className="about_list pt-3">
                  <li className="flex mt-5">
                    <div className="about_check">
                      <i className="lni lni-checkmark-circle"></i>
                    </div>
                    <div className="about_list_content pl-5 pr-2">
                      <p>
                        Vero eos et accusam et justo duo dolores et rebum. Stet
                        clita kasd gubergrenv
                      </p>
                    </div>
                  </li>
                  <li className="flex mt-5">
                    <div className="about_check">
                      <i className="lni lni-checkmark-circle"></i>
                    </div>
                    <div className="about_list_content pl-5 pr-2">
                      <p>
                        At vero eos et accusam et justo duo dolores et rebum.
                        Stet clita kasd gubergrenv
                      </p>
                    </div>
                  </li>
                  <li className="flex mt-5">
                    <div className="about_check">
                      <i className="lni lni-checkmark-circle"></i>
                    </div>
                    <div className="about_list_content pl-5 pr-2">
                      <p>
                        Dvero eos et accusam et justo duo dolores et rebum. Stet
                        clita kasd gubergrenv
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="services_area pt-120 pb-120">
        <div className="container">
          <div className="row justify-center">
            <div className="w-full lg:w-1/2">
              <div className="section_title text-center pb-6">
                <h5 className="sub_title">Offers From the Office</h5>
                <h4 className="main_title">Projects Available</h4>
              </div>
            </div>
          </div>
          {prData.length != 0 ? (
            <div className="row justify-center">
              {prData.map((data, i) => (
                <div className="w-full sm:w-10/12 md:w-6/12 lg:w-4/12" key={i}>
                  <div className="single_services text-center mt-8 mx-3">
                    <div className="services_icon">
                      <i className="lni lni-layout"></i>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="94"
                        height="92"
                        viewBox="0 0 94 92"
                      >
                        <path
                          className="services_shape"
                          id="Polygon_12"
                          data-name="Polygon 12"
                          d="M42.212,2.315a11,11,0,0,1,9.576,0l28.138,13.6a11,11,0,0,1,5.938,7.465L92.83,54.018A11,11,0,0,1,90.717,63.3L71.22,87.842A11,11,0,0,1,62.607,92H31.393a11,11,0,0,1-8.613-4.158L3.283,63.3A11,11,0,0,1,1.17,54.018L8.136,23.383a11,11,0,0,1,5.938-7.465Z"
                        />
                      </svg>
                    </div>
                    <div className="services_content mt-5 xl:mt-10">
                      <h3 className="services_title text-black font-semibold text-xl md:text-2xl lg:text-xl xl:text-3xl">
                        {data.name}
                      </h3>
                      <span>
                        Status{" "}
                        <Badge style={{ color: "green" }}>{data.status}</Badge>
                      </span>
                      <p className="mt-4">{data.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="row justify-center">
              <b>No Projects available now</b>
            </div>
          )}
        </div>
      </section>

      <section id="apply" className="contact_area relative pt-18 pb-120">
        <div className="contact_image flex items-center justify-end">
          <div className="image lg:pr-13">
            <img src="assetss/images/contact.svg" alt="about" />
          </div>
        </div>

        <div className="container">
          <div className="row justify-end">
            <div className="w-full lg:w-1/2">
              <div className="contact_wrapper mt-11">
                <div className="section_title pb-4">
                  <h5 className="sub_title">Project Section</h5>
                  <h4 className="main_title">Apply the Open Projects</h4>
                </div>

                <div className="contact_form">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={validation}
                    onSubmit={addBid}
                  >
                    <Form>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/3 px-3 mb-1 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1"
                            htmlFor="grid-state"
                          >
                            Choose Project
                          </label>
                          .
                          <div className="relative">
                            <Field
                              as="select"
                              name="prlist"
                              className="block appearance-none w-full bg-white-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state"
                            >
                              <option>Select One</option>
                              {prData.map((pr) => (
                                <option key={pr.id}>{pr.name}</option>
                              ))}
                            </Field>
                            <ErrorMessage
                              className="text-red-500 text-xs italic"
                              name="prlist"
                              component="p"
                            />
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg
                                className="fill-current h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                              >
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="w-full mt-6 md:w-1/3 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-first-name"
                          >
                            Full Name
                          </label>
                          <Field
                            name="fullname"
                            className="appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Your Full Name"
                          />
                          <ErrorMessage
                            className="text-red-500 text-xs italic"
                            name="fullname"
                            component="p"
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                            htmlFor="grid-first-name"
                          >
                            Phone
                          </label>
                          <Field
                            name="phone"
                            className="appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-red-500 text-xs italic"
                            name="phone"
                            component="p"
                          />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mt-2"
                            htmlFor="grid-first-name"
                          >
                            Amount
                          </label>
                          <Field
                            name="amount"
                            className="appearance-none block w-full bg-white-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-1 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                          />
                          <ErrorMessage
                            className="text-red-500 text-xs italic"
                            name="amount"
                            component="p"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            License
                          </label>
                          <input
                            name="license"
                            onChange={(e) =>
                              setPrForm({
                                ...prForm,
                                license: e.target.files[0],
                              })
                            }
                            className="custom-file-input appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="file"
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Performa
                          </label>
                          <input
                            name="performa"
                            onChange={(e) =>
                              setPrForm({
                                ...prForm,
                                performa: e.target.files[0],
                              })
                            }
                            className="custom-file-input appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="file"
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Proposal
                          </label>
                          <input
                            name="proposal"
                            onChange={(e) =>
                              setPrForm({
                                ...prForm,
                                proposal: e.target.files[0],
                              })
                            }
                            className="custom-file-input appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="file"
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full px-3">
                          <label
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                          >
                            Company Docs
                          </label>
                          <input
                            name="companydoc"
                            onChange={(e) =>
                              setPrForm({
                                ...prForm,
                                companydoc: e.target.files[0],
                              })
                            }
                            className="custom-file-input appearance-none block w-full bg-white-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="file"
                            placeholder="******************"
                          />
                        </div>
                      </div>
                      {errorMessage != "" ? (
                        <div class="bg-red-90 text-center rounded-full py-4 lg:px-4">
                          <div
                            class="p-2 bg-red-800 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex"
                            role="alert"
                          >
                            <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                              New
                            </span>
                            <span class="font-semibold mr-2 text-left flex-auto">
                              {errorMessage}
                            </span>
                            <svg
                              class="fill-current opacity-75 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      {successMessage != "" ? (
                        <div class="bg-indigo-90 text-center rounded-full py-4 lg:px-4">
                          <div
                            class="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
                            role="alert"
                          >
                            <span class="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3">
                              New
                            </span>
                            <span class="font-semibold mr-2 text-left flex-auto">
                              {successMessage}
                            </span>
                            <svg
                              class="fill-current opacity-75 h-4 w-4"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                            >
                              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <button
                        type="submit"
                        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        Apply Project
                      </button>
                    </Form>
                  </Formik>

                  {/* end of the form */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer id="footer" className="footer_area bg-black relative z-10">
        <div className="shape absolute left-0 top-0 opacity-5 h-full overflow-hidden w-1/3">
          <img src="assetss/images/footer-shape-left.png" alt="" />
        </div>
        <div className="shape absolute right-0 top-0 opacity-5 h-full overflow-hidden w-1/3">
          <img src="assetss/images/footer-shape-right.png" alt="" />
        </div>
        <div className="container">
          <div className="footer_widget pt-18 pb-120">
            <div className="row justify-center">
              <div className="w-full md:w-1/2 lg:w-3/12">
                <div className="footer_about mt-13 mx-3">
                  <div className="footer_logo">
                    <Link to="#">
                      <img src="assetss/images/logo-footer.svg" alt="" />
                    </Link>
                  </div>
                  <div className="footer_content mt-8">
                    <p className="text-white">
                      Lorem ipsum dolor sitco nsetetu nonumy eirmod tempor
                      invidunt ut labore et dolore magna uyam erat, sed diam.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 lg:w-5/12">
                <div className="footer_link_wrapper flex flex-wrap mx-3">
                  <div className="footer_link w-1/2 md:pl-13 mt-13">
                    <h2 className="footer_title text-xl font-semibold text-white">
                      Quick Links
                    </h2>
                    <ul className="link pt-4">
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          Company
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          Privacy Policy
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          About
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="footer_link w-1/2 md:pl-13 mt-13">
                    <h2 className="footer_title text-xl font-semibold text-white">
                      Resources
                    </h2>
                    <ul className="link pt-4">
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          Support
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          Contact
                        </Link>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="text-white mt-4 hover:text-theme-color"
                        >
                          Terms
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-2/3 lg:w-4/12">
                <div className="footer_subscribe mt-13 mx-3">
                  <h2 className="footer_title text-xl font-semibold text-white">
                    Newsletter
                  </h2>
                  <div className="subscribe_form text-right mt-9 relative">
                    <form action="#">
                      <input
                        type="text"
                        placeholder="Enter email"
                        className="w-full py-5 px-6 bg-white text-black rounded-full border-none"
                      />
                      <button className="main-btn subscribe-btn">
                        Subscribe
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer_copyright pt-3 pb-6 border-t-2 border-solid border-white border-opacity-10 sm:flex justify-between">
            <div className="footer_social pt-4 mx-3 text-center">
              <ul className="social flex justify-center sm:justify-start">
                <li className="mr-3">
                  <Link to="https://facebook.com/uideckHQ">
                    <i className="lni lni-facebook-filled"></i>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link to="https://twitter.com/uideckHQ">
                    <i className="lni lni-twitter-filled"></i>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link to="https://instagram.com/uideckHQ">
                    <i className="lni lni-instagram-original"></i>
                  </Link>
                </li>
                <li className="mr-3">
                  <Link to="#">
                    <i className="lni lni-linkedin-original"></i>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="footer_copyright_content pt-4 text-center">
              <p className="text-white">
                Designed and Developed by{" "}
                <a
                  href="https://uideck.com"
                  rel="nofollow"
                  className="text-white hover:text-theme-color"
                >
                  UIdeck
                </Link>{" "}
                and{" "}
                <a
                  href="https://tailwindtemplates.co"
                  rel="nofollow"
                  className="text-white hover:text-theme-color"
                >
                  Tailwind Templates
                </Link>
              </p>
            </div>
          </div>
        </div>
      </footer>

      <Link to="#" className="scroll-top">
        <i className="lni lni-chevron-up"></i>
      </Link>

      <section className="">
        <div className="container">
          <div className="row">
            <div className="col-lg-"></div>
          </div>
        </div>
      </section>

      <script src="assetss/js/tiny-slider.js"></script>

      <script src="assetss/js/wow.min.js"></script>

      <script src="assetss/js/main.js"></script>
    </div>
  );
}

export default HomePage;
