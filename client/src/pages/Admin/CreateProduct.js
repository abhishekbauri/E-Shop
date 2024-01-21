import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";

const CreateProduct = () => {
  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1> All Products</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
