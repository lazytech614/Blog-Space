import { useState } from "react";
import toast from "react-hot-toast";

const useUploadBlog = () => {
  const [isLoading, setIsLoading] = useState(false);
  const uploadBlog = async (data, setThumbnail, setFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/upload-blog`,
        {
          method: "POST",
          body: data, // Use FormData as the body
        }
      ).then((res) => res.json());

      // const result = await response.json();
      if (response.success) {
        toast.success(response.message || "Blog uploaded successfully"); // Adjust this based on your server's response
        setThumbnail(null);
        setFormData({
          title: "",
          post: "",
          category: "Technology",
          thumbnail: "",
        });
      } else {
        toast.error(response.message || "Failed to upload blog");
      }
    } catch (err) {
      console.error(err.message);
      toast.error(err.message || "An error occurred during upload");
    }
  };
  return { uploadBlog, isLoading };
};

export default useUploadBlog;
