import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item bg-transparent list-group-item-action text-capitalize"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            className="list-group-item bg-transparent list-group-item-action text-capitalize"
          >
            orders
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
