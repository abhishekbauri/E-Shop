import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import AdminMenu from "../../components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { useAuth } from "../../context/auth";
import { Modal } from "antd";
import Loader from "../../components/loader/Loader";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth] = useAuth();

  // for modal
  const [visible, setVisible] = useState(false);

  // for updating
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // for jwt token
  const token = auth?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/create-category`,
        {
          name,
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setName("");
      setLoading(false);

      if (data?.status === "success") {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong on input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/categories`,
      );
      if (data?.status === "success") {
        setCategory(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // update category
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (data.status === "success") {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/delete-category/${pid}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      if (data.status === "success") {
        toast.success(`Deleted Successfully`);
        getAllCategory();
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className="container-fluid mt-3 p-3">
        <div className="row">
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center text-capitalize text-bg-dark text-light pt-2 pb-2">
              manage category
            </h1>
            {loading ? (
              <Loader title="Please wait..." />
            ) : (
              <>
                <div className="p-3 ">
                  <CategoryForm
                    handleSubmit={handleSubmit}
                    value={name}
                    setValue={setName}
                  />
                </div>
                <div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col" className="text-center">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {category?.map((c) => (
                        <tr key={c._id}>
                          <td className="text-capitalize">{c.name}</td>
                          <td className="text-center">
                            <button
                              className="btn btn-outline-warning ms-2"
                              onClick={() => {
                                setVisible(true);
                                setUpdatedName(c.name);
                                setSelected(c);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-outline-danger ms-2"
                              onClick={() => {
                                handleDelete(c._id);
                              }}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
