import React from 'react'

const SubscriptionTableItem = ({name,email, subscribedAt}) => {
  return (
    <>
      <div className='w-full py-2 px-4'>{name || "No name"}</div>
      <div className='w-full py-2 px-4'>{email || "No email"}</div>
      <div className='w-full py-2 px-4'>{subscribedAt || "No date"}</div>
      <div className='w-full py-2 px-4 flex justify-start items-center gap-4'>
        <button
          className='border border-[#FF0000] shadow-[-5px_5px_0px_#FF0000] p-2 rounded-md text-[12px]'
        //   onClick={onDelete}
        >
          Delete
        </button>
        <button className='border border-[#00FF00] shadow-[-5px_5px_0px_#00FF00] p-2 rounded-md text-[12px]'>
          Update
        </button>
      </div>
    </>
  )
}

export default SubscriptionTableItem