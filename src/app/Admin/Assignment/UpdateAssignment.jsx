import React, { PropTypes } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/MainLayout.jsx";

const UpdateAssignment = ({ className }) => {
  return (
    <Layout screen="Assignment Screen" title="Update Assignment">
      <section className="w-full h-full pl-8">
        <Link to="/admin/assignment" className="underline">
          Back to Assignment
        </Link>
      </section>
    </Layout>
  );
};

export default UpdateAssignment;
