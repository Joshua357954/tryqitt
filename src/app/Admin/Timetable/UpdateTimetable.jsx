import React, { PropTypes } from "react";
import { Link } from "react-router-dom";

import Layout from "../components/MainLayout.jsx";

const UpdateTimetable = ({ className }) => {
  const courses = ["MTH 124", "MTH 142", "PHY 114"];
  const venues = ["Mba 1", "Mba 2", "Tetfund 7 in 1"];

  return (
    <Layout
      screen={"Update Timetable Screen"}
      title="Update Timetable"
      $return="/admin/timetable"
    >
      <div className="w-full h-96 pl-6 pr-2 flex flex-col overflow-y-auto gap-y-2">
        {[1, 2, 3, 4, 5].map((item) => {
          return (
            <figure className="w-full rounded bg-white px-2 h-32 py-1 flex justify-between items-center">
              {/* First Side */}
              <div className="w-[49%] h-full justify-between py-1 pl-2 flex flex-col">
                <label className="flex flex-col w-fit font-bold">
                  Start
                  <input
                    type="time"
                    className="w-fit rounded px-2 border-[1px] border-gray-400"
                  />
                </label>

                <label className="flex flex-col w-fit font-bold ">
                  End
                  <input
                    type="time"
                    className="border-[1px] border-gray-400 w-fit rounded px-2 "
                  />
                </label>
              </div>

              <div className="w-1 h-full bg-blue-400 rounded-md"></div>

              {/* Second Side */}
              <div className="w-[49%] h-full flex flex-col pl-4 py-1 justify-between items-start">
                <div className="flex flex-col">
                  <p className="font-bold">Course</p>
                  <select
                    className="border-[1px] border-gray-400 rounded px-1 py-[1px] bg-white w-fit flex focus:outline-none"
                    name="course"
                  >
                    {courses.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                </div>

                <div className="flex flex-col">
                  <p className="font-bold">Venue</p>
                  <select
                    className="border-[1px] border-gray-400 rounded px-1 py-[1px] bg-white w-fit flex focus:outline-none"
                    name="course"
                  >
                    {venues.map((item) => {
                      return <option value={item}>{item}</option>;
                    })}
                  </select>
                </div>
              </div>
            </figure>
          );
        })}
      </div>
    </Layout>
  );
};

export default UpdateTimetable;
