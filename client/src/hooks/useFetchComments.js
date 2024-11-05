import { useState } from "react";
import toast from "react-hot-toast";

const useFetchComments = () => {
  const fetchAllComments = async (id, setComments) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/get-comments/${id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      ).then((res) => res.json());

      if (response.success) {
        setComments(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return { fetchAllComments };
};

export default useFetchComments;
