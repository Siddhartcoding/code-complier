import React, { useState } from "react";
import { HiChevronDoubleLeft } from "react-icons/hi2";
import { FaSearchengin } from "react-icons/fa6";
import { MdHome } from "react-icons/md";
import { motion } from "framer-motion";
import { Link, Route, Routes } from "react-router-dom";
import logo from "../assits/logo.png";
import { Projects, SignUp } from "../container";
import { useSelector } from "react-redux";
import { UserProfileDetails } from "../components";
const Home = () => {
  const [isSideMenu, SetisSideMenu] = useState(false);
  const user = useSelector((state) => state.user?.user);
  return (
    <>
      <div
        className={`w-2 ${isSideMenu ? "w-2" : " flex-[.2] xl: flex-[.2]"}
        min-h-screen max-h-screen  bg-secondary relative px-3 py-6 flex flex-col 
        items-center justify-start gap-4 transiton-all duration-200 ease-in-out`}
      >
        {/*anchor */}
        <motion.div
          whileTap={{ scale: 0.9 }}
          onClick={() => SetisSideMenu(!isSideMenu)}
          className="w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg 
        absolute -right-6 flex items-center justify-center cursor-pointer"
        >
          {" "}
          <HiChevronDoubleLeft className="text-white text-xl" />
        </motion.div>

        {/* -------------------------------------logo section ---------------------------*/}
        <div className="overflow-hidden w-full flex flex-col gap-4">
          <Link to={"home"}>
            <img
              src={logo}
              alt="logo"
              className="bg-white object-contain w-72 h-auto"
            />
          </Link>

          {/*---------------------------------- start coding  section -------------------------*/}
          <Link to={"/newProject"}>
            <div
              className="px-6 py-3 flex items-center justify-center
          rounded-xl border border-gray-400 cursor-pointer
           group hover:border-gray-200"
            >
              <p
                className="text-gray-400 group-hover:text-gray-200
            capitalize"
              >
                Start Coding
              </p>
            </div>
          </Link>

          {/*home Nav */}
          {user && (
            <Link
              to={"/home/project"}
              className="flex items-center 
                justify-center gap-4"
            >
              <MdHome className=" text-primaryText text-xl" />
              <p className="text-lg text-primaryText"> Home</p>
            </Link>
          )}
        </div>
      </div>

      {/*---------------------------- Right-side - section ----------------------*/}

      <div
        className="flex-1 min-h-screen max-h-screen orverflow-y-scroll
            h-full flex flex-col items-start justify-start px-4 md:px-12 py-4 md:py-12"
      >
        {/*------------------------------ Top section-------------------------- */}

        <div className="w-full flex item-center justify-between gap-3">
          {/*------------------------ searchbar------------------ */}
          <div
            className="bg-secondary w-full px-4 py-4 rounded-md flex
           item-center justify-center gap-3"
          >
            <FaSearchengin className=" text-2xl text-primaryText" />
            <input
              type="text"
              className="flex-1 px-4 py1 text-xl 
              bg-transparent outline-none border-none text-primaryText
              placeholder:text-gray-600"
              placeholder="Search here..."
            />
          </div>
          {/*------------------------ Profile Section------------------ */}

          {!user && (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center gap-3"
            >
              <Link
                to={"/home/auth"}
                className="bg-emerald-500 px-6 py-2 rounded-md
            cursor-pointer hover:bg-emerald-700"
              >
                SignUp
              </Link>
            </motion.div>
          )}
        </div>
        {user && <UserProfileDetails />}
        <div className="w-full">
          <Routes>
            <Route path="/*" element={<Projects />} />
            <Route path="/auth" element={<SignUp />} />
          </Routes>
        </div>
      </div>
    </>
  );
};
export default Home;