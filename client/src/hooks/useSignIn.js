import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signIn = async (formData, setIsOpenSignInModal) => {
    setIsLoading(true);
    const success = checkInput(formData);
    if (!success) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signin`,
        {
          credentials: "include",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      ).then((res) => res.json());

      if (response.success) {
        setIsOpenSignInModal(false);
        const userDetails = {
          username: formData.username,
          userId: response.userId,
        };
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        setAuthUser(formData.username);
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, signIn };
};

export default useSignIn;

const checkInput = ({ username, password }) => {
  if (!username) {
    toast.error("Please provide the username");
    return false;
  }
  if (!password) {
    toast.error("Please provide the password");
    return false;
  }
  return true;
};
