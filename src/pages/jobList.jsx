import Banner from "../components/banner";
import NavBar from "../components/navbar";
import Footer from "../components/footer";
import Box from "../components/box";
import { useEffect } from "react";

function JobList() {
    useEffect(()=>{
        document.title = "OWDA | Open Positions";
    }, [])
  return (
    <>
      <Banner />
      <NavBar />
      <section id="vacancy" className="py-3 pb-5">
        <div className="container mx-auto max-w-screen-xl p-4">
          <h2 className="text-center py-2 my-5 fw-bold">Current Openings</h2>
          <div className="flex-container mt-4">
            <Box title={'Job Title 1'} />
            <Box title={'Job Title 2'} />
            <Box title={'Job Title 3'} />
            <Box title={'Job Title 4'} />
            <Box title={'Job Title 5'} />
            <Box title={'Job Title 6'} />
            <Box title={'Job Title 7'} />
            <Box title={'Job Title 8'} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default JobList;