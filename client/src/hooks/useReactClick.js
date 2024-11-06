import { useState } from "react";
import toast from "react-hot-toast";
import useCheckReaction from "./useCheckReaction";

const useReactClick = () => {
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);

  const userId =
    JSON.parse(localStorage.getItem("userDetails"))?.userId || null;
  if (!userId) {
    return {
      react: () => toast.error("Please login to react"),
      likesCount,
      dislikesCount,
      setLikesCount,
      setDislikesCount,
    };
  }

  const react = async (status, isLike, id) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/blogs/react-blog/${userId}/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isLike }),
        }
      ).then((res) => res.json());

      if (response.success) {
        if (isLike) {
          if (status === "none") {
            setLikesCount(likesCount + 1);
          } else if (status === "like") {
            setLikesCount(likesCount - 1);
          } else {
            setDislikesCount(dislikesCount - 1);
            setLikesCount(likesCount + 1);
          }
        } else {
          if (status === "none") {
            setDislikesCount(dislikesCount + 1);
          } else if (status === "like") {
            setLikesCount(likesCount - 1);
            setDislikesCount(dislikesCount + 1);
          } else {
            setDislikesCount(dislikesCount - 1);
          }
        }
      } else {
        console.error(response.message);
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  return { react, likesCount, dislikesCount, setLikesCount, setDislikesCount };
};

export default useReactClick;
