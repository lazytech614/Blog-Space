import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSubscribe = () => {
  const { setIsSubscribed, authUser } = useAuthContext();
  if (!authUser) {
    return {
      subscribe: () => toast.error("Please log in to subscribe"),
    };
  }
  const subscribe = async (setFormData) => {
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
        }
      );

      if (response.ok) {
        setIsSubscribed(true);
        toast.success("Thank you for subscribing!");
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
