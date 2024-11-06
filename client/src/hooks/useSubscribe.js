import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSubscribe = () => {
  const { setIsSubscribed, authUser } = useAuthContext();
  if (!authUser) {
    return {
      subscribe: () => toast.error("Please log in to subscribe"),
    };
  }
  const subscribe = async (formData, setFormData) => {
    if (!formData.email) {
      toast.error("Please provide the email");
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/user/subscribe/${
          authUser.username
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      ).then((res) => res.json());

      if (response.success) {
        setIsSubscribed(true);
        toast.success(response.message || "Thank you for subscribing!");
        setFormData({
          email: "",
        });
      } else {
        toast.error(response.message || "Oops! Something went wrong");
        setFormData({
          email: "",
        });
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };
  return { subscribe };
};

export default useSubscribe;
