import { useState } from "react";
import toast from "react-hot-toast";

const useFetchEngagements = () => {
  const fetchEngagements = async (
    id,
    setCommentsCount,
    setLikesCount,
    setDislikesCount
  ) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/blogs/get-blog-engagements/${id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      ).then((res) => res.json());

      if (response.success) {
        setLikesCount(response.data.like_count);
        setDislikesCount(response.data.dislike_count);
        setCommentsCount(response.data.comment_count);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching engagement counts:", error);
    }
  };
  return { fetchEngagements };
};

export default useFetchEngagements;
