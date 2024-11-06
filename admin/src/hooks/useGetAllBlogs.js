import { useState } from "react";
import toast from "react-hot-toast";

const useGetAllBlogs = () => {
  const [blogList, setBlogList] = useState([]);
  const getAllBlogs = async () => {
    try {
      const fetchBlogs = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/blogs/all-blogs`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        ).then((res) => res.json());
        setBlogList(response.data);
      };
      fetchBlogs();
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  };
  return { getAllBlogs, blogList, setBlogList };
};

export default useGetAllBlogs;
