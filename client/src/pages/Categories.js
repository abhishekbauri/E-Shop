import React from "react";
import Layout from "../components/layout/Layout.js";
import useCategory from "../hooks/useCategory.js";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCategory();
  return (
    <Layout title={"All Categories"}>
      <div className="container-fluid">
        <div className="row mt-5">
          <div className=" d-flex justify-content-center flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-outline-primary text-capitalize"
                key={c._id}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
