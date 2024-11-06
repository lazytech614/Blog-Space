import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteBlog = () => {
  const deleteBlog = async (selectedBlogId, setSelectedBlogId, setBlogList) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/blogs/delete-blog/${selectedBlogId}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response.success) {
        // Remove the deleted blog from the blogList
        setBlogList((prevList) =>
          prevList.filter((blog) => blog.id !== selectedBlogId)
        );
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog");
    } finally {
      setSelectedBlogId(null);
    }
  };
  return { deleteBlog };
};

export default useDeleteBlog;
