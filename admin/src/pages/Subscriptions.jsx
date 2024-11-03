import React, {useEffect, useState} from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import SubscriptionTableItem from '../components/SubscriptionTableItem'
import { subscribers } from '../constants/subscribers'

const Subscriptions = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [subscribers, setSubscribers] = useState([])

  useEffect(() => {
    window.scrollTo(0, 0)

    try{
      setIsLoading(true)
      
      const fetchSubscribers = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/subscribers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then((res) => res.json())

        setSubscribers(response.message)
      }

      fetchSubscribers()
    }catch(err){}finally{}
  }, [])

  return (
    <div className='flex flex-col sm:flex-row'>
        <Sidebar />
        <div className='w-full'>
          <Navbar />
          <div className='px-6 sm:px-10 pt-4 text-[12px] lg:text-[16px]'>
          <div className='grid grid-cols-[1fr,3fr,1fr,1fr] gap-2 mb-8'>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Name</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Email Id</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Subscribed at</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Action</div>
          </div>
          <div className='grid grid-cols-[1fr,3fr,1fr,1fr] gap-2 overflow-y-auto h-[80vh] scrollbar-hidden'>
            {subscribers.map((subscriber) => {
              return (
                <React.Fragment key={subscriber.id}>
                  <SubscriptionTableItem {...subscriber} />
                  <div className='col-span-4 h-[2px] bg-black'></div>
                </React.Fragment>
              )
            })}            
          </div>
        </div>
        </div>
    </div>
  )
}

export default Subscriptions