import { useState } from "react";
import toast from "react-hot-toast";

const useGetAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllUsers = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/users`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());
      setUsers(response.users);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { getAllUsers, users, setUsers };
};

export default useGetAllUsers;
