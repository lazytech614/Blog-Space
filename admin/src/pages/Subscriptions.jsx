import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import SubscriptionTableItem from '../components/SubscriptionTableItem';
import { WarningModal } from '../modal/WarningModal';
import useGetAllSubscribers from '../hooks/useGetAllSubscribers';
import useDeleteSubscriber from '../hooks/useDeleteSubscriber';

const Subscriptions = () => {
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false);
  const [selectedSubscriberId, setSelectedSubscriberId] = useState(null);

  const {getAllSubscribers, isLoading, subscribers, setSubscribers} = useGetAllSubscribers()
  const {deleteSubscriber} = useDeleteSubscriber()

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllSubscribers()
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedSubscriberId(id);
    setIsOpenWarningModal(true);
  };

  const confirmDelete = async () => {
    deleteSubscriber(selectedSubscriberId, setSelectedSubscriberId, subscribers, setSubscribers);
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
                  <SubscriptionTableItem {...subscriber} onDelete={() => handleDeleteClick(subscriber.id)} />
                  <div className='col-span-4 h-[2px] bg-black'></div>
                </React.Fragment>
              ))
            )}
          </div>
        </div>
      </div>
      <WarningModal
        warning="Are you sure you want to cancel the subscription?"
        isOpenWarningModal={isOpenWarningModal}
        setIsOpenWarningModal={setIsOpenWarningModal}
        onConfirmDelete={confirmDelete}
      />
    </div>
  );
};

export default Subscriptions;
