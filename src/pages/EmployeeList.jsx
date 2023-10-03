import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "components/Alert";
import "./employee.css";
import { EmplFileDownload } from "../config/urlConfig";
import "config/custom-button.css"
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui";
import { EditIcon, EyeIconOne, TrashIcon } from "../icons";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@windmill/react-ui";
import { Input, HelperText, Label, Select, Textarea } from "@windmill/react-ui";
import { url } from "../config/urlConfig";
import EditUser from "components/Users/EditUser";
import { useRef } from "react";
import AddEmployee from "components/Users/AddEmployee";
import { FaCloudUploadAlt,FaFileDownload } from "react-icons/fa";
import TitleChange from "components/Title/Title";
import { AuthContext } from "hooks/authContext";
import useAuth from "hooks/useAuth";

function EmployeeList(props) {
  const { settings } = useAuth(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState({ open: false, props: {} });
  const [openAdd, setOpenAdd] = useState({ open: false, props: {} });
  const [uplModal, setUplModal] = useState(false);

  const [openSuccess, setOpenSuccess] = useState({ open: false, message: "" });
  const [openError, setOpenError] = useState({ open: false, message: "" });

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess({ open: false, message: "" });
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError({ open: false, message: "" });
  };

  const handleCloseEdit = () => {
    setOpenEdit({ open: false, props: {} });
  };
  const handleCloseAdd = () => {
    setOpenAdd({ open: false, props: {} });
  };

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setIndexNumber(0);
    setStep(1);
    setProgress(0);
  }

  function openUploadModal() {
    setUplModal(true);
  }

  function closeUploadModal() {
    setUplModal(false);
  }

  // const [companyData,setCompanyData] = useState([])
  const [emplForm, setEmplForm] = useState({
    name: "",
    email: "",
    phone: "",
    status: "",
    image: "",
    DepartmentId: "",
    DesignationId: "",
    AreaId: "",
    hiredDate: "",
    ssn: "",
    passportNo: "",
    contactPhone: "",
    nationality: "Ethiopian",
    address: "",
    birthday: "",
    postCode: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [designationData, setDesignationData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchedResult, setFetchedResult] = useState([]);
  const [areaData, setAreaData] = useState([]);

  // const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      let isMounted = true;
      if (isMounted) {
        await axios
          .get(`${url}/employees/`, { withCredentials: true })
          .then((resp) => {
            // console.log('Employees',resp.data);
            if (resp.data.error) {
              setErrorMessage(resp.data.error);
            } else {
              setEmployeeData(resp.data);
              // setIma
            }
          })
          .catch((error) => {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          });
        await axios
          .get(`${url}/departments`, { withCredentials: true })
          .then((resp) => {
            setDepartmentData(resp.data);
          })
          .catch((error) => {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          });

        await axios
          .get(`${url}/designations`, { withCredentials: true })
          .then((resp) => {
            setDesignationData(resp.data);
          })
          .catch((error) => {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          });

        await axios
          .get(`${url}/area`, { withCredentials: true })
          .then((resp) => {
            setAreaData(resp.data.area);
          })
          .catch((error) => {
            setOpenError({
              open: true,
              message: `${error.response.data.error}`,
            });
          });
      }
      return () => {
        isMounted = false;
      };
    };

    getData();
  }, []);

  const searchHandler = async (search) => {
    setSearchTerm(search);
    if (search !== 0) {
      const newEmployeeList = employeeData.filter((empl) => {
        return Object.values(empl)
          .join(" ")
          .toLowerCase()
          .includes(search.toLowerCase());
      });
      // console.log(newEmployeeList);
      setSearchResult(newEmployeeList);
    } else {
      setSearchResult(employeeData);
    }
  };

  const uploadEmployee = async (e) => {
    e.preventDefault();
    // console.log(e.target[0].files[0]);
    const file = e.target[0].files[0];
    const formData = new FormData();
    formData.append("file", file);
    await axios
      .post(`${url}/employees/upload/file`, formData, { withCredentials: true })
      .then((resp) => {
        if (resp.data.error) {
          setOpenError({ open: true, message: `${resp.data.error}` });
        }
        // console.log(resp.data);
        setEmployeeData([...employeeData, ...resp.data]);
        setUplModal(false);
        setOpenSuccess({ open: true, message: "Successfully Uploaded" });
      })
      .catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    })
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    if (
      emplForm.name === "" ||
      emplForm.email === "" ||
      emplForm.phone === "" ||
      emplForm.status === "" ||
      emplForm.DepartmentId === "" ||
      emplForm.DesignationId === ""||
      emplForm.AreaId===""
    ) {
      setOpenError({open:true,message:"Please Provide all data"});
     
    } else {
      const formData = new FormData();
      formData.append("name", emplForm.name);
      formData.append("email", emplForm.email);
      formData.append("phone", emplForm.phone);
      formData.append("status", emplForm.status);
      formData.append("image", emplForm.image);
      formData.append("DepartmentId", emplForm.DepartmentId);
      formData.append("AreaId", emplForm.AreaId);
      // formData.append("hiredDate", emplForm.hiredDate);
      formData.append("ssn", emplForm.ssn);
      formData.append("passportNo", emplForm.passportNo);
      formData.append("contactPhone", emplForm.contactPhone);
      formData.append("address", emplForm.address);
      formData.append("postCode", emplForm.postCode);
      formData.append("nationality", emplForm.nationality);
      formData.append("DesignationId", emplForm.DesignationId);

      await axios
        .post(`${url}/employees`, formData, { withCredentials: true })
        .then((resp) => {
          // console.log('from server',resp.data);
          if (resp.data.error) {
            setOpenError({ open: true, message: `${resp.data.error}` });
          } else {
            setEmployeeData((prev) => [...prev, resp.data]);
            closeModal();
            setOpenSuccess({ open: true, message: "Successfully Added" });
          }
        })
        .catch((error)=>{
          if (error.response && error.response.data && error.response.data.error) {
              setOpenError({open:true,message:`${error.response.data.error}`});
            } else {
              setOpenError({open:true,message:"An unknown error occurred"});
            }
      })
    }
  };

  const [isDeleteOpen, setIsDeleteOpen] = useState({ open: false, id: "" });

  const closeDelete = () => {
    setIsDeleteOpen(false);
  };
  const openDelete = (id) => {
    setIsDeleteOpen({ open: true, id: id });
  };

  //
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      setFetchedResult(searchTerm.length < 1 ? employeeData : searchResult);
    }
    return () => {
      isMounted = false;
    };
    // console.log('runned fetched result');
  }, [employeeData, searchTerm]);

  const deleteEmployee = async () => {
    await axios
      .get(`${url}/employees/delete/${isDeleteOpen.id}`)
      .then((resp) => {
        if (resp.data.error) {
          setErrorMessage(resp.data.error);
        }
        const newEmployee = employeeData.filter(
          (emp) => emp.id !== isDeleteOpen.id
        );
        setEmployeeData(newEmployee);
        closeModal();
        // setSuccessMessage("Successfully Deleted");
        setOpenSuccess({ open: true, message: "Deleted Successfully" });
        closeDelete();
      }).catch((error)=>{
        if (error.response && error.response.data && error.response.data.error) {
            setOpenError({open:true,message:`${error.response.data.error}`});
          } else {
            setOpenError({open:true,message:"An unknown error occurred"});
          }
    });
  };

  // Moving between form Sections start
  const [indexNumber, setIndexNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  const ShowNext = () => {
    setIndexNumber((indexNumber) => indexNumber + 100);
    setStep((setp) => setp + 1);
    setProgress((progress) => progress + 33.3);

  };
  const ShowPrev = () => {
    setIndexNumber((indexNumber) => indexNumber - 100);
    setStep((step) => step - 1);
    setProgress((progress) => progress - 33.3);
  };
  // Moving between form Sections end

  return (
    <>
      <TitleChange name={`Employees | ${settings.name}`} />
      {/* Delete Confirm section */}
      <Modal isOpen={isDeleteOpen.open} onClose={closeDelete}>
        <ModalHeader>Confirm Action</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to perform this action?</p>
        </ModalBody>
        <ModalFooter>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
            onClick={deleteEmployee}
          >
            Confirm
          </button>
        </ModalFooter>
      </Modal>

      {/* End of delete Section */}

      <ErrorAlert
        open={openError.open}
        handleClose={handleCloseError}
        message={openError.message}
        horizontal="right"
      />
      <SuccessAlert
        open={openSuccess.open}
        handleClose={handleCloseSuccess}
        message={openSuccess.message}
        horizontal="right"
      />

      <PageTitle>List of Employees</PageTitle>
      <div>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              strokeWidth="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <Input
            type="search"
            id="default-search"
            value={searchTerm}
            onChange={(e) => searchHandler(e.target.value)}
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Mockups, Logos..."
            required
          />
        </div>
      </div>

      <div className="flex">
        <div className="mt-6">
          <Button onClick={() => openModal()} className="custom-button">Register Employee</Button>
        </div>
        <div className="mt-5 ml-4">
          <FaCloudUploadAlt
            onClick={openUploadModal}
            className="text-5xl"
            style={{ color: "#642BD9" }}
          />
        </div>
        <div className="mt-6 ml-4">
          <a href={`${EmplFileDownload}`} target='_blank'>
          <FaFileDownload
            // onClick={EmplFileDownload}
            className="text-3xl mt-1"
            style={{ color: "#642BD9" }}
          />
          </a>
          
        </div>
      </div>

      {/* Add new employee form start */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>Insert Employee Info</ModalHeader>
        <ModalBody>
          <div className=" form_container w-full ">
            <section className=" progress_bar">
              <section
                className="progress"
                style={{ width: progress + "%" }}
              ></section>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 custom-button"
                style={
                  step >= 1
                    ? { background: "#08a46b", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 1"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 2
                    ? { background: "#08a46b", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 2"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 3
                    ? { background: "#08a46b", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 3"
              ></div>
              <div
                className="progress_step bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-400 "
                style={
                  step >= 4
                    ? { background: "#08a46b", color: "white" }
                    : { background: "", color: "" }
                }
                data-title="Step 4"
              ></div>
            </section>
            <form
              onSubmit={addEmployee}
              encType="multipart/form-data"
              className=" insert_person_form"
              style={{ transform: "translateX(-" + indexNumber + "%)" }}
            >
              {/* section 1 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>Name <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="name"
                      placeholder="Empl Name"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, name: e.target.value })
                      }
                    />
                    
                  </Label>

                  <Label>
                    <span>Email <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="email"
                      placeholder="Empl Email"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, email: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Phone <span className="text-red-600 text-1xl">*</span></span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="phone"
                      placeholder="Empl Phone"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, phone: e.target.value })
                      }
                    />
                  </Label>

                  <Label className="mt-1">
                    <span>Status <span className="text-red-600 text-1xl">*</span></span>
                    <Select
                      className="mt-1"
                      name="status"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, status: e.target.value })
                      }
                    >
                      <option>Select</option>
                      <option>active</option>
                      <option>disabled</option>
                    </Select>
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowNext}
                  >
                    Next
                  </button>
                </div>
              </section>

              {/* section 2 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label className="mt-1">
                    <span>Department <span className="text-red-600 text-1xl">*</span></span>
                    <Select
                      className="mt-1"
                      name="DepartmentId"
                      onChange={(e) =>
                        setEmplForm({
                          ...emplForm,
                          DepartmentId: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      {departmentData.map((dep) => (
                        <option key={dep.id} value={dep.id}>
                          {dep.name}
                        </option>
                      ))}
                    </Select>
                  </Label>

                  <Label className="mt-1">
                    <span>Position <span className="text-red-600 text-1xl">*</span></span>
                    <Select
                      className="mt-1"
                      name="DesignationId"
                      onChange={(e) =>
                        setEmplForm({
                          ...emplForm,
                          DesignationId: e.target.value,
                        })
                      }
                    >
                      <option>Select</option>
                      {designationData.map((des) => (
                        <option key={des.id} value={des.id}>
                          {des.name}
                        </option>
                      ))}
                    </Select>
                  </Label>

                  <Label className="mt-1">
                    <span>Area <span className="text-red-600 text-1xl">*</span></span>
                    <Select
                      className="mt-1"
                      name="AreaId"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, AreaId: e.target.value })
                      }
                    >
                      <option>Select</option>
                      {areaData.map((des) => (
                        <option key={des.id} value={des.id}>
                          {des.name}
                        </option>
                      ))}
                    </Select>
                  </Label>

                  <Label>
                    <span>Hired Date</span>
                    <Input
                      type="Date"
                      className="mt-1"
                      name="hiredDate"
                      placeholder="Empl Hired Date"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, hiredDate: e.target.value })
                      }
                    />
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowPrev}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowNext}
                  >
                    Next
                  </button>
                </div>
              </section>

              {/* section 3 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>SSN</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="ssn"
                      placeholder="Empl ssn"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, ssn: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Passport Number</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="passportNo"
                      placeholder="Empl passportNo"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, passportNo: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Contact Phone</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="contactPhone"
                      placeholder="Empl contactPhone"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({
                          ...emplForm,
                          contactPhone: e.target.value,
                        })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Nationality</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="nationality"
                      value="Ethiopian"
                      placeholder="Empl nationality"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({
                          ...emplForm,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowPrev}
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowNext}
                  >
                    Next
                  </button>
                </div>
              </section>

              {/* section 4 */}
              <section className=" form_section">
                <div className=" grid grid-cols-1 gap-2">
                  <Label>
                    <span>Address</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="address"
                      placeholder="Empl address"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, address: e.target.value })
                      }
                    />
                  </Label>
                  <Label>
                    <span>BirthDate</span>
                    <Input
                      type="date"
                      className="mt-1"
                      name="birthday"
                      placeholder="Empl birthday"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, birthday: e.target.value })
                      }
                    />
                  </Label>
                  <Label>
                    <span>PostCode</span>
                    <Input
                      type="text"
                      className="mt-1"
                      name="postCode"
                      placeholder="Empl Postcode"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, postCode: e.target.value })
                      }
                    />
                  </Label>

                  <Label>
                    <span>Image</span>
                    <Input
                      type="file"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-1 
              file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
              file:bg-white-50 file:text-blue-700 hover:file:bg-white-100"
                      id="file_input"
                      name="image"
                      autoComplete="off"
                      onChange={(e) =>
                        setEmplForm({ ...emplForm, image: e.target.files[0] })
                      }
                    />
                  </Label>
                </div>

                <div className=" flex justify-end gap-2">
                  <button
                    type="button"
                    className=" form_button"
                    onClick={ShowPrev}
                  >
                    Previous
                  </button>
                  <button type="submit" className=" form_button">
                    Save
                  </button>
                </div>
              </section>
            </form>
          </div>
        </ModalBody>
      </Modal>
      {/* Add new employee form end */}

      {/* EXCEL UPLOAD MODAL */}
      <Modal isOpen={uplModal} onClose={closeUploadModal}>
        <ModalHeader>Upload Excel file</ModalHeader>
        <span style={{ color: "red" }}>{errorMessage}</span>
        <ModalBody>
          <form onSubmit={uploadEmployee} encType="multipart/form-data">
            <Label>
              <span>Excel</span>
              <Input
                type="file"
                className="mt-1 block w-full text-sm text-gray-500 file:mr-1 
                    file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold 
                    file:bg-white-50 file:text-blue-700 hover:file:bg-white-100"
                id="file_input"
                name="file"
              />
            </Label>

            <Label className="mt-4">
              <Button type="submit">Save</Button>
            </Label>
          </form>
        </ModalBody>
        <ModalFooter>
          <div className="hidden sm:block">
            <Button layout="outline" onClick={closeUploadModal}>
              Cancel
            </Button>
          </div>

          <div className="block w-full sm:hidden">
            <Button
              block
              size="large"
              layout="outline"
              onClick={closeUploadModal}
            >
              Cancel
            </Button>
          </div>
          <div className="block w-full sm:hidden">
            <Button block size="large">
              Accept
            </Button>
          </div>
        </ModalFooter>
      </Modal>

      {/* END OF UPLOAD MODAL */}

      <SectionTitle></SectionTitle>
      {successMessage ? (
        <div
          className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
          role="alert"
        >
          <p className="text-sm">{successMessage}.</p>
        </div>
      ) : (
        ""
      )}

      {errorMessage ? (
        <div
          className="bg-red-100 border-t border-b border-red-500 text-red-700 px-4 py-3"
          role="alert"
        >
          <p className="text-sm">{errorMessage}.</p>
        </div>
      ) : (
        ""
      )}

      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Employee</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Designation</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {fetchedResult.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={user.image}
                      alt="User"
                    />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {user.job}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{user.phone}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {designationData.map((des) =>
                      des.id === user.DesignationId ? des.name : ""
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Link to={`/app/employees/${user.id}`}>
                      <Button layout="link" size="icon" aria-label="Edit">
                        <EditIcon className="w-5 h-5" aria-hidden="true" />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => openDelete(user.id)}
                      style={{ color: "red" }}
                      layout="link"
                      size="icon"
                      aria-label="Delete"
                    >
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter></TableFooter>
      </TableContainer>
    </>
  );
}

export default EmployeeList;
