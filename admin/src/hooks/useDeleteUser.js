import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteUser = async (
    selectedUserId,
    setSelectedUserId,
    users,
    setUsers
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/user/delete-user/${selectedUserId}`,
        { method: "DELETE" }
      ).then((res) => res.json());

      if (response.success) {
        toast.success(response.message || "User deleted successfully");
        setUsers(users.filter((user) => user.id !== selectedUserId));
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setSelectedUserId(null);
      setIsLoading(false);
    }
  };
  return { deleteUser, isLoading };
};

export default useDeleteUser;
