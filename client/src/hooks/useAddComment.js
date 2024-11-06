import { useState } from "react";
import toast from "react-hot-toast";

const useAddComment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const userId =
    JSON.parse(localStorage.getItem("userDetails"))?.userId || null;
  if (!userId) {
    return {
      addComment: () => toast.error("Please login to add a comment"),
      isLoading,
      commentsCount,
      setCommentsCount,
    };
  }
  const addComment = async (id, content, setCommentContent, fetchComments) => {
    if (!content) {
      toast.error("Comment can't be empty");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/blogs/add-comment/${userId}/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content }),
        }
      ).then((res) => res.json());

      if (response.success) {
        toast.success(response.message || "Comment added successfully");
        setCommentsCount(commentsCount + 1);
        fetchComments(); // Refresh comments list
      } else {
        console.error(response.message || "Oops! Something went wrong");
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error(error.message || "Oops! Something went wrong");
    } finally {
      setIsLoading(false);
      setCommentContent("");
    }
  };
  return { addComment, isLoading, commentsCount, setCommentsCount };
};

export default useAddComment;
