import React, { PropTypes } from "react";
import Layout from "../components/MainLayout.jsx";
import Imgg from "../../../assets/images/qi (1).jpg";

const AdminHomeScreen = ({ className }) => {
  return (
    <Layout screen="Home" title="Users">
      <div className="w-full h-96 bg-red-3000 px-2 py-1 flex overflow-y-auto flex-col gap-y-2">
        {[1, 5, 6, 7, 3, 4, 2].map((item) => {
          return (
            <div className="w-full h-20 bg-gray-300 px-3 py-2 rounded-xl flex justify-between items-center">
              <div className="text-white w-14 h-14 rounded-full bg-black text-center ">
                <img src={Imgg} className="w-full h-full rounded-full" />
              </div>

              <p>Joshua Boyi</p>

              <p className="font-bold text-5xl ">...</p>
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default AdminHomeScreen;
