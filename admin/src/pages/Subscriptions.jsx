import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SubscriptionTableItem from '../components/SubscriptionTableItem';
import toast from 'react-hot-toast';

const Subscriptions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      setIsLoading(true);
      const fetchSubscribers = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/subscribers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json());
        setSubscribers(response.subscribers || []);
      };
      fetchSubscribers()
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/cancel-subscription/${id}`,
        { method: 'DELETE' }
      ).then((res) => res.json());
      if (response.message) {
        setSubscribers(subscribers.filter((subscriber) => subscriber.id !== id));
        toast.success("Subscription cancelled successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col sm:flex-row'>
      <Sidebar />
      <div className='w-full'>
        <Navbar />
        <div className='px-6 sm:px-10 pt-4 text-[12px] lg:text-[16px]'>
          <div className='grid grid-cols-[1fr,3fr,1fr,1fr] gap-2 mb-8'>
            {['Name', 'Email Id', 'Subscribed at', 'Action'].map((header) => (
              <div
                key={header}
                className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'
              >
                {header}
              </div>
            ))}
          </div>
          <div className='grid grid-cols-[1fr,3fr,1fr,1fr] gap-2 overflow-y-auto max-h-[80vh] scrollbar-hidden'>
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              subscribers.map((subscriber) => (
                <React.Fragment key={subscriber.id}>
                  <SubscriptionTableItem {...subscriber} onDelete={() => handleDelete(subscriber.id)} />
                  <div className='col-span-4 h-[2px] bg-black'></div>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
