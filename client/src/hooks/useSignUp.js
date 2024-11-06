import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useSignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signUp = async (formData, setIsOpenSignUpModal) => {
    setIsLoading(true);
    const success = checkInput(formData);

    if (!success) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      ).then((res) => res.json());
      if (response.success) {
        setIsOpenSignUpModal(false);
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

  return { isLoading, signUp };
};

export default useSignUp;

const checkInput = ({ name, username, password, email, confirmPassword }) => {
  const errors = {
    name: "Please provide your name.",
    username: "Please provide a username.",
    email: "Please provide a valid email address.",
    password: "Please set a password (minimum 6 characters).",
    confirmPassword: "Please confirm your password.",
  };

  // Check for empty required fields
  for (let field in errors) {
    if (!eval(field)) {
      toast.error(errors[field]);
      return false;
    }
  }

  // Additional validations
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password should be at least 6 characters long.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  return true;
};
