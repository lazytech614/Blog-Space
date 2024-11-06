import { useState } from "react";
import toast from "react-hot-toast";

const useGetAllSubscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllSubscribers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/subscribers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      if (!response.success) {
        toast.error(response.message || "Failed to fetch subscribers");
        return;
      }
      setSubscribers(response.subscribers || []);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { getAllSubscribers, isLoading, subscribers, setSubscribers };
};

export default useGetAllSubscribers;
