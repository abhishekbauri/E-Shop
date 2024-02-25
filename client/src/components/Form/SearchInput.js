import React from "react";
import { useSearch } from "../../context/Search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/product/search/${values.keyword}`,
      );
      setValues({ ...values, results: data?.result, keyword: "" });
      navigate("/search");
    } catch (error) {
      toast.error(error.message || "Oops items not found!");
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
      </form>
    </div>
  );
};

export default SearchInput;
