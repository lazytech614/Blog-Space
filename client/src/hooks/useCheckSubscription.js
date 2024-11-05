import { useState } from "react";

const useCheckSubscription = () => {
  const checkSubscription = async (authUser, setIsSubscribed) => {
    if (authUser) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/check-subscription/${
            authUser.username
          }`
        );
        if (response.ok) {
          const data = await response.json();
          setIsSubscribed(data.isSubscribed);
        } else {
          setIsSubscribed(false); // or handle error appropriately
        }
      } catch (error) {
        console.error("Failed to check subscription:", error);
      }
    } else {
      setIsSubscribed(null); // reset if no user is authenticated
    }
  };
  return { checkSubscription };
};

export default useCheckSubscription;
