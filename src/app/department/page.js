"use client";
import { useEffect, useState } from "react";

import PageNav from "../../components/PageNav.jsx";
import MainLayout from "../../components/MainLayout.jsx";
import { BsChevronLeft as Arrow } from "react-icons/bs";
import Nothing from "../Admin/Nothing.jsx";
import { baseUrl } from "../../utils/utils.js";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCoursemates } from "../../libs/features/userSlice.js";
import Link from "next/link.js";

const NameInitial = ({ name }) => {
  // Extract the first letter of the name
  const initial = name ? name.charAt(0).toUpperCase() : "";

  return (
    <div className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white font-bold rounded-full">
      {initial}
    </div>
  );
};

const Department = ({ className }) => {
  const dispatch = useDispatch();
  const [section, setSection] = useState("class");
  const { courseName } = useSelector((state) => state.user);
  const { coursemates } = useSelector((state) => state.users);
  const userData = useSelector((state) => state.auth.user);

  const clas = [
    { name: "Joshua", pix: "", exco: "" },
    { name: "Divine", pix: "", exco: "Course Rep." },
    { name: "David", pix: "", exco: "" },
  ];

  const dept = userData?.department.value;

  const courses =
    dept === "computer_science" ? [
          { name: "MTH270.1", description: "Numerical analysis" },
          { name: "MTH210.1", description: "Linear Algebra" },
          {
            name: "STA260.1",
            description: "Introduction to probability and statistics",
          },
          {
            name: "CSC280.1",
            description: "Introduction to Computer programming (Fortran)",
          },
          { name: "CSC281.1", description: "Computer system fundamentals" },
          {
            name: "CSC283.1",
            description:
              "Introduction to information systems and File structures",
          },
          { name: "CSC284.1", description: "Introduction to Logic Design" },
          { name: "CSC288.1", description: "Structured programming" },
        ]
      : [];

  const excoss = [];

  useEffect(() => {
    const getUsersByDepartment = async (department) => {
      try {
        const response = await Axios.get(
          `${baseUrl}/api/user/getUsers/${department}`
        );
        const users = response.data;
        console.log(users);
        dispatch(addCoursemates(users));
      } catch (error) {
        console.error("Error fetching users:", error.message);
      }
    };
    getUsersByDepartment(userData?.department.value);
  }, [section == "class", coursemates == []]);

  return (
    <MainLayout
      route={`Department (${userData?.department.value.split("_")[0]})`}
    >
      <section className="flex flex-col items-center  w-full">
        <div className="w-full h-14 max-h-14 flex justify-center items-center mt-2">
          <div className="w-[80%] h-full py-1 bg-purple-50 flex justify-between items-center px-2 rounded text-center ">
            <div
              onClick={() => setSection("class")}
              className={`w-[33%]  text-lg flex justify-center items-center text-black ${
                section == "class" ? "bg-purple-400 font-extrabold" : ""
              } h-full rounded`}
            >
              {" "}
              Class{" "}
            </div>
            <div
              onClick={() => setSection("excos")}
              className={`w-[33%]  text-lg flex justify-center items-center text-black ${
                section == "excos" ? "bg-purple-400 font-extrabold" : ""
              } h-full rounded`}
            >
              {" "}
              Excos{" "}
            </div>
            <div
              onClick={() => setSection("courses")}
              className={`w-[33%]  text-lg flex justify-center items-center text-black ${
                section == "courses" ? "bg-purple-400 font-extrabold" : ""
              } h-full rounded px-1 `}
            >
              {" "}
              Courses{" "}
            </div>
          </div>
        </div>

        {section == "class" ? (
          <section className="w-full">
            <div className="px-4 h-[6%] bg-gren-100 flex gap-x-5 my-4">
              <Link
                href="/timetable"
                className="text-gray-600 underline underline-offset-2"
              >
                Timetable
              </Link>
              <Link
                href="/assignment"
                className="text-gray-600 underline underline-offset-2"
              >
                Assignments
              </Link>
              {/* <p className="underline underline-offset-2">Student(280)</p> */}
            </div>

            <div className="w-ful bg-gray-3000 h-[60%] pt-1 overscroll-y-auto">
              {coursemates &&
                coursemates?.map((item, idx) => {
                  return (
                    <div
                      key={idx}
                      className="pb-2 flex items-center gap-x-4 px-2 pl-4"
                    >
                      {/* <div className="w-14 h-14 rounded-full shadow-lg border-2 border-purple-300  bg-purple-100">
										<img src={item.imgUrl} className='w-full h-full object-cover rounded-full'/>
									</div> */}
                      <NameInitial name={item.name} />
                      <div className="flex flex-col">
                        <div className="font-bold">{item.name}</div>
                        {!item.exco ? (
                          ""
                        ) : (
                          <div className="font-light">{item.exco}</div>
                        )}
                      </div>
                    </div>
                  );
                })}

              <div className="p-4">
                <p className="mb-2 text-lg font-semibold text-gray-800">
                  Ensure the class list is complete by inviting your course
                  mates to join.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Alternatively, you can also{" "}
                  <a
                    href="https://api.whatsapp.com/send?text=📚 Stay%20up%20to%20date%20with%20school%20activities%20by%20joining%20Qitt%20at%20https://qitt.com.ng"
                    target="_blank"
                    className="text-blue-500"
                  >
                    send a WhatsApp message
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}

        {section == "excos" ? (
          // <section className="w-full pt-5">

          // 	{ excoss.map((item,idx) => {
          // 		return <div key={idx} className="pb-2 flex items-center gap-x-4 px-2">
          // 				<div className="w-14 h-14 rounded-full  bg-gray-600"></div>
          // 				<div className="flex flex-col">
          //     				<div className="font-bold">{item.name}</div>
          //     				<div className="font-light">{item.title}</div>
          //     			</div>
          // 			</div>
          // 		})
          // 	}
          // </section>

          <Nothing name="Excos" />
        ) : (
          ""
        )}

        {section == "courses" ? (
          <section className="w-full">
            <div className="w-full pt-5 pl-1">
              {courses.length > 0 ? (
                courses.map((item, idx) => (
                  <div
                    key={idx}
                    className="mb-3 border-l-[4px] border-gray-500 hover:bg-gray-50 pl-3 py-2 flex items-center gap-y-4"
                  >
                    {/* <div className="max-w-14 max-h-14 rounded-xl bg-blue-900">
									<img src={item.imgUrl} className='w-full h-full object-cover rounded-full' alt={`Course ${idx + 1}`} />
									</div> */}
                    <div className="flex flex-col">
                      <div className="font-black text-lg">{item.name}</div>
                      <div className="font-light">{item.description}</div>
                      {/* {item.lecturers[0] && <div className="flex gap-x-2 items-center font-bold"><div className="w-3 h-3 rounded-full bg-blue-500"></div>{item.lecturers[0]}</div>} */}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-600 flex flex-col gap-y-2 mt-2 items-center justify-center">
                  <p> Oops! No courses or outlines available right now.</p>
                  <p>
                    👋 Reach out on WhatsApp to add or update courses! We're
                    here to assist you.
                    <br />
                    <a
                      href="https://api.whatsapp.com/send?phone=+2349034954069&text=Hi!%20I%20want%20to%20update%20the%20course%20outline."
                      target="_blank"
                      className="text-blue-500"
                    >
                      Click here to update the course outline on WhatsApp 🚀
                    </a>
                  </p>
                </div>
              )}
            </div>
          </section>
        ) : (
          ""
        )}
      </section>
    </MainLayout>
  );
};
export default Department;
