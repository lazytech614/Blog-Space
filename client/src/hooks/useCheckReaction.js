import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useCheckReaction = () => {
  const [status, setStatus] = useState("");
  const { authUser } = useAuthContext();

  const checkReaction = async (postId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/check-reaction/${
          authUser.userId
        }/${postId}`
      ).then((res) => res.json());

      if (response.success) setStatus(response.status);
    } catch (err) {}
  };
  return { checkReaction, status };
};

export default useCheckReaction;
