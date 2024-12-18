import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/MainLayout.jsx";
import PageNav from "../../../components/PageNav.jsx";
import { BsChevronLeft as Arrow } from "react-icons/bs";
import Selection from "../components/Selection.jsx";

const Timetable = ({ className }) => {
  const [day, setDay] = useState("monday");

  const courses = [
    {
      time: "8:00am - 10:00am",
      color: "bg-red-300",
      course: "CHEM 132",
      venue: "MBA 2",
    },
    {
      time: "1:00pm - 3:00pm ",
      color: "bg-orange-300",
      course: "MATH 125",
      venue: "FOS ",
    },
    {
      time: "3:00pm - 4:00pm",
      color: "bg-yellow-400",
      course: "STA 116",
      venue: "MBA 1",
    },
    {
      time: "4:00pm - 6:00pm",
      color: "bg-green-400",
      course: "CSC 132",
      venue: "NSA",
    },
  ];

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  return (
    <Layout
      screen="Timetable Screen"
      title="Timetable"
      $return="/admin/timetable"
      selection={<Selection />}
    >
      {
        <Link to="/admin/updateTimetable" className="text-black pl-10">
          {" "}
          Update Timetable{" "}
        </Link>
      }

      {/* Contaienr */}
      <div className="w-full h-full flex flex-col items-center justify-center  ">
        <div className="w-full bg-gray-200 sm:w-[100%] h-full bg-blac pl-8 flex flex-col items-center bg-yellow-10 pt-5">
          {/* Days */}
          <div className="w-full px-2 h-[7%] mb-7 sm:h-10 overflow-x-auto flex sm:justify-start gap-x-2">
            {days.map((item, idx) => {
              return (
                <div
                  onClick={() => setDay(item)}
                  className={`capitalize flex text-black select-none justify-center px-2 font-bold text-sm items-center  ${
                    item === day
                      ? "bg-blue-200 border-[1px] border-black"
                      : "bg-gray-50"
                  } rounded-xl`}
                >
                  {" "}
                  {item}{" "}
                </div>
              );
            })}
          </div>

          {/* Classes */}
          <div className="px-2 flex flex-col items-center sm:items-start w-full ">
            {courses.map((item, idx) => {
              return (
                <div className="flex w-full sm:w-[70%] mt-2 items-center justify-between bg-gray-100 py-1 px-2">
                  <p className="w-[24%]"> {item.time}</p>
                  <div
                    className={`${item.color}  font-black rounded  h-full w-[5px] text-center`}
                  ></div>
                  <div className="flex flex-col w-[40%]">
                    <p className="font-bold">{item.course}</p>
                    <p className="font-light truncate">{item.venue}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Timetable;
