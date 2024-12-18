"use client";
import React from "react";
import Link from "next/link.js";
import { FaBoltLightning } from "react-icons/fa6";
import {
  TbHome as Home,
  TbCalendarEvent as Events,
  TbBrandFeedly as Feed2,
} from "react-icons/tb";

import { logout } from "../libs/features/authSlice.js";

import {
  LuLayoutDashboard as Home2,
  LuMessageSquare as Feedback,
  LuLogOut as Logout,
} from "react-icons/lu";

import { FiSend as SendIcon } from "react-icons/fi";
import {
  MdOutlineLocalLibrary as Library2,
  MdBook as Book,
  MdSchool as School,
  MdOutlineAssignment as Assign,
} from "react-icons/md";
import { removeItem } from "../utils/utils";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAppDispatch } from "@/libs/hook.js";

const SideBar = ({ route }) => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const data = [
    { name: "Home", icon: <Home2 className="text-xl" />, link: "/auth" },
    {
      name: "Timetable",
      icon: <Events className="text-xl" />,
      link: "/timetable",
    },
    {
      name: "Assignment",
      icon: <Assign className="text-xl" />,
      link: "/assignment",
    },
    {
      name: "Resources",
      icon: <Library2 className="text-xl" />,
      link: "/resources",
    },
    {
      name: "More",
      icon: <FaBoltLightning className="text-xl" />,
      link: "/more",
    },
  ];

  const handleLogout = () => {
    // signout from firebase
    const auth = getAuth();
    signOut(auth);
    // clear local storage
    removeItem("qitt-user");
    // clear state
    dispatch(logout());
    // Reload the current page
    window.location.reload();
  };

  return (
    <aside className="z-20 fixed sm:static sm:shadow-lg bottom-0 left-0 flex sm:flex-col sm:items-center bg-white py-1 sm:py-0 font-aeonik h-[70px] sm:h-screen w-full sm:w-[30%]">
      {/*[#4169E1]*/}
      <div className="hidden sm:flex h-[100px] w-full  justify-start sm:pl-5 sm:pb-[3%] items-end">
        <h2 className="font-black text-5xl text-left text-[#6962ad]">Qitt</h2>
      </div>

      {/* side panel / bottom nav*/}
      <div className="flex border-t-2 border-t-gray-100 mx-auto sm:border-0 bg-slate-6000 sm:flex-col w-full h-full justify-between sm:justify-around py-1 items-start">
        <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start sm:gap-4 xl:gap-5 h-full w-full px-3  sm:pt-6">
          {data.map((item, index) => {
            return (
              <Link
                key={index}
                href={item.link}
                className={`flex flex-col sm:flex-row text-gray-400 ${
                  item.name == route
                    ? "text-gray-900 sm:bg-gray-200"
                    : !route && item.name == "Home"
                    ? "text-gray-900 sm:bg-gray-200"
                    : ""
                } hover:text-black py-3 px-3 sm:hover:bg-gray-2000 gap-3 rounded-md items-center w-fit`}
              >
                {item.icon}
                {item.name}
                {/* <p className="text-gray-500 text-xs sm:text-[.85rem]"></p> */}
              </Link>
            );
          })}
        </div>

        <div
          className="hidden sm:flex gap-3 xl:mb-3 mb-2 text-red-500 hover:text-red-600 ml-5"
          onClick={handleLogout}
        >
          <Logout className="text-xl font-medium" />
          Logout
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
