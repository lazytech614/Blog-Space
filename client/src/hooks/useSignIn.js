import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signIn = async (formData, setIsOpenSignInModal) => {
    setIsLoading(true);
    const success = checkInput(formData);
    if (!success) {
      setIsLoading(false);
      return;
    }

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
        setAuthUser(userDetails);
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
  const validations = {
    username: "Please provide the username",
    password: "Please provide the password",
  };

  // Check for empty fields
  for (let field in validations) {
    if (!eval(field)) {
      toast.error(validations[field]);
      return false;
    }
  }

  // Additional password length check
  if (password.length < 6) {
    toast.error("Password should be at least 6 characters long");
    return false;
  }

  return true;
};
