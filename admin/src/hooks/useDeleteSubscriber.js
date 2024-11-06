import { useState } from "react";
import toast from "react-hot-toast";

const useDeleteSubscriber = () => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteSubscriber = async (
    selectedSubscriberId,
    setSelectedSubscriberId,
    subscribers,
    setSubscribers
  ) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/user/cancel-subscription/${selectedSubscriberId}`,
        {
          method: "DELETE",
        }
      ).then((res) => res.json());

      if (response.success) {
        setSubscribers(
          subscribers.filter(
            (subscriber) => subscriber.id !== selectedSubscriberId
          )
        );
        toast.success(
          response.message || "Subscription cancelled successfully"
        );
      } else {
        toast.error(response.message || "Failed to cancel subscription");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setSelectedSubscriberId(null);
    }
  };
  return { deleteSubscriber, isLoading };
};

export default useDeleteSubscriber;
