import { useState, useEffect } from "react";

import axios from "axios";
import toast from "react-hot-toast";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  // get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BASEURL}/api/v1/category/categories`,
      );
      setCategories(data?.category);
    } catch (error) {
      toast.error("Error: Cannot fetch categories!");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return categories;
}
