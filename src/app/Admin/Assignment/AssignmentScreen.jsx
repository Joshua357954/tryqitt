import React, { PropTypes } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/MainLayout.jsx";
import Selection from "../components/Selection.jsx";

const Assignment = ({ className }) => {
  return (
    <Layout
      screen={"Assignment Screen"}
      title="Assignment"
      selection={<Selection />}
    >
      <section className="h-full w-full pl-8 ">
        <Link to="/admin/updateAssignment" className="underline">
          Update Assignment
        </Link>
      </section>
    </Layout>
  );
};

export default Assignment;
