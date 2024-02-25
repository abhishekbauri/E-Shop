import React from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import { useAuth } from "../../context/auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - Admin"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card p-3">
              <h3 className="text-capitalize fw-light">
                Admin Name: <span className="fw-bold"> {auth?.user?.name}</span>
              </h3>
              <h3 className=" fw-light">
                Admin Email:
                <span className="fw-bold"> {auth?.user?.email}</span>
              </h3>
              <h3 className="text-capitalize fw-light">
                Admin Contact:
                <span className="fw-bold"> {auth?.user?.phone}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
