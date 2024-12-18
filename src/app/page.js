"use client";
import React, { useEffect, useState } from "react";
import MainLayout from "../components/MainLayout.jsx";

import { FiSend as SendIcon } from "react-icons/fi";
import { HiHome as Home } from "react-icons/hi";
import { RiTimerFlashLine as Timer } from "react-icons/ri";
import { TbCalendarTime as Time } from "react-icons/tb";
import {
  MdBook as Book,
  MdOutlineLocationOn as Location,
  MdSchool as School,
  MdAssignment as Assign,
} from "react-icons/md";
import {
  BsFillCameraFill as Camera,
  BsPlus,
  BsTools as Tool,
  BsChat as Chat,
  BsCheckLg as Check,
  BsTrashFill as Trash,
  BsEmojiSmile as Emoji,
  BsChevronRight as Arrow,
} from "react-icons/bs";
import { ImAttachment as Attachement } from "react-icons/im";
import {
  baseUrl,
  formatCode,
  formatTime,
  formatTimetableEntry,
  getCurrentDay,
} from "../utils/utils.js";
import {
  FaUserFriends as Friends,
  FaFacebookMessenger as Message,
} from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTimetable } from "../libs/features/userSlice.js";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link.js";
import { useAppDispatch, useAppStore, useAppSelector } from "@/libs/hook.js";

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.auth.user);
  const { timetable } = useAppSelector((state) => state.users);

  const department = userData?.department?.value;

  const year = userData?.year;

  const currentDay = getCurrentDay();

  const currentDateTime = new Date();

  const currentTime =
    currentDateTime?.getHours() * 100 + currentDateTime?.getMinutes(); // Convert current time to a numeric

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/api/timetable/all/${department}/${year}`
        );
        console.log(response.data.allTimetables);
        dispatch(addTimetable(response.data.allTimetables));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  function convertTime(inputRange) {
    const formatTime = (time) => {
      const parts = time.split(/(?=[apm])/i).map((part) => part.trim());

      if (parts.length === 2) {
        const [hour, period] = parts;
        const formattedHour =
          period.toLowerCase() === "pm"
            ? parseInt(hour, 10) + 12
            : hour.padStart(2, "0");
        return `${formattedHour}:00${period.toLowerCase()}`;
      }
      // If parts are not in the expected format, return the original time
      return time;
    };

    const timeParts = inputRange
      .split("-")
      .map((time) => formatTime(time.trim()));

    if (timeParts.length === 2) {
      return `${timeParts[0]} - ${timeParts[1]}`;
    }

    // If time range is not in the expected format, return the original input
    return inputRange;
  }

  const timetableData = (timetable) => {
    const foundDay = timetable.filter(
      (item) => Object.keys(item)[0].toLowerCase() == currentDay
    );
    // timetable.find(dayObj => Object.keys(dayObj)[0] == currentDay);
    // return foundDay[0][currentDay.toUpperCase()]
    // console.log(foundDay)
    return foundDay[0] ? foundDay[0][currentDay.toUpperCase()] : [];
  };

  const sections = [
    {
      title: userData?.department?.value?.split("_")[0] || "Dept",
      description: "Top Educational Notch experience",
      image:
        "/assets/school.svg",
      link: "/department",
      gradientClass: "from-[#2ecc71] to-green-200",
    },
    {
      title: "Past Q/A",
      description: "Empower with seamless assessments",
      image: "/assets/doc.svg",
      link: "/pastQuestion?q=practice",
      gradientClass: "from-[#f06292] to-pink-200",
    },
    {
      title:
        "Cgpa \
		Calculator",
      description: "Quickly calculate your CGPA for academic success!",
      image: "/assets/result.svg",
      link: "/result",
      gradientClass: "from-[#ff9800] to-orange-200",
    },
    {
      title: "Forum",
      description: "Connect with others and share your thoughts.",
      image: "/assets/chat2.svg",
      link: "/forum",
      gradientClass: "from-[#3498db] to-blue-200",
    },
  ];

  const shadowStyle = {
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.15  )",
  };

  return (
    <MainLayout route="">
      {/* Properties Grid */}
      <section className="w-full h-full flex flex-col bg-gray-50  ">
        {/* inner Container*/}
        <div className="w-full h-[65%] pt-0 sm:pt-0 pb-2 grid grid-cols-2 grid-rows-2 gap-3 sm:gap-6">
          {/* Blocks */}
          {sections.map((section, index) => (
            <Link
              href={section.link}
              key={index}
              style={shadowStyle}
              className={`w-full bg-gray-50 border-gray-100 flex flex-col p-3 pt-4 {section.gradientClass} h-full sm:h-full  rounded-md`}
            >
              <div className="w-full">
                <h2 className="font-bold text-gray-900 text-xl sm:text-2xl capitalize">
                  {section.title}
                </h2>
                <p className="mt-1 text-sm font-normal text-gray-700">
                  {section.description}
                </p>
              </div>
              {/* Second Partition*/}
              <div className="w-full flex justify-end items-end h-full">
                <img
                  src={section.image}
                  className="h-[65px] sm:h-[70px]"
                  alt={`Section ${index}`}
                />
              </div>
            </Link>
          ))}
        </div>

        <h2 className="font-semibold text-xl mt-4 mb-2">
          Today's Classes
          {timetableData(timetable).length > 0 && (
            <span className="bg-blue-500 text-sm text-white rounded-full ml-3 px-2 py-1">
              {timetableData(timetable).length}
            </span>
          )}
        </h2>

        <div className="bg-white w-full flex gap-2 pb-1 overflow-x-auto">
          {timetable && timetableData(timetable)?.length > 0 ? (
            timetableData(timetable).map((item, index) => {
              const timetableStartTime = parseInt(
                item.time.split("-")[0].replace(":", "")
              ); // Convert timetable start time to a numeric format
              console.log("Timetable Start Time:", timetableStartTime);

              // Check if the current time is around the timetable start time
              const isCurrentTimeAround =
                Math.abs(currentTime - timetableStartTime) < 100; // Adjust the threshold as needed
              console.log(
                "Is Current Time Around Timetable Start Time:",
                isCurrentTimeAround
              );

              // Check if the current time is after the timetable start time
              const isTimePassed = currentTime > timetableStartTime;
              console.log(
                "Has Current Time Passed Timetable Start Time:",
                isTimePassed
              );

              console.log("Current Time : ", currentTime);

              return (
                <div
                  key={index}
                  className={`flex border-l-2 border-l-gray-400 flex-col gap-0 bg-gray-50 px-2 py-1 rounded border-2 border-gray-50 ${
                    isTimePassed ? "time-passed" : ""
                  }`}
                >
                  <p
                    className="font-bold pl-[.1rem] flex justify-between"
                    style={{ whiteSpace: "nowrap" }}
                  >
                    {formatCode(item.course)}{" "}
                    <span>
                      {isTimePassed ? "✅" : isCurrentTimeAround ? "🔥" : "⌛"}
                    </span>
                  </p>
                  <div className="flex items-center">
                    <Timer className="text-md text-[#FFDAB9]" />
                    <p
                      className="font-normal ml-2"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {formatTime(item.time)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Location className="text-lg text-[#8FBC8F]" />
                    <p className="ml-2" style={{ whiteSpace: "nowrap" }}>
                      {item.venue}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex justify-center items-center w-full h-20 text-gray-500">
              <p className="px-2 text-center">
                📅 Oops! It seems like there's no timetable available.{" "}
                <a href="/assignment">Add one now!</a>✨
              </p>
            </div>
          )}
        </div>
      </section>
      <Toaster />
    </MainLayout>
  );
};

export default HomeScreen;
