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
              <h3 className="text-capitalize">
                Admin Name: {auth?.user?.name}
              </h3>
              <h3>Admin Email: {auth?.user?.email}</h3>
              <h3 className="text-capitalize">
                Admin Contact: {auth?.user?.phone}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
