const useGetAllBlogs = () => {
  const fetchFeed = async (setFeed) => {
    try {
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/all-blogs`, {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => setFeed(data.data));
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };
  return { fetchFeed };
};

export default useGetAllBlogs;
