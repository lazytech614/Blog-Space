import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogOut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logOut = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (response.ok) {
        localStorage.removeItem("userDetails");
        setAuthUser(null);
        toast.success("Logged out successfully!");
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { logOut, isLoading };
};

export default useLogOut;
