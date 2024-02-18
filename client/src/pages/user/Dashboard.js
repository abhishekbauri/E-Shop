import React from "react";
import Layout from "../../components/layout/Layout";
import UserMenu from "../../components/layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Dashboard - User"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3 mb-3">
            <UserMenu />
          </div>
          <div className="col-md-9 ">
            <div className="card p-3">
              <h3 className=" text-capitalize">
                User Name: {auth?.user?.name}
              </h3>
              <h3>User Email: {auth?.user?.email}</h3>
              <h3 className=" text-capitalize">
                User Address: {auth?.user?.address}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
