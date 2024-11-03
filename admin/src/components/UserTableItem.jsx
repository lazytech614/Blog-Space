import React, { useEffect, useState} from 'react'
import toast from 'react-hot-toast'

const UserTableItem = ({id, name, username, email, is_subscribed, onDelete}) => {
  const [userId, setUserId] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  // console.log(typeof(id));

  // const handleDelete = async (id) => {
  //   // console.log(id);
  //   try {
  //     setIsLoading(true)
  //     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/delete-user/${id}`).then((res) => res.json())
  //     console.log(response);
  //     setIsLoading(false)
  //   } catch (error) {
  //     console.log(error.message);
  //     toast.error(error.message); 
  //   }
  // }
  
  return (
    <>
        <div className='w-full py-2 px-4'>{id || "No id"}</div>
        <div className='w-full py-2 px-4'>{name || "No name"}</div>
        <div className='w-full py-2 px-4'>{username || "No username"}</div>
        <div className='w-full py-2 px-4'>{email || "No email"}</div>
        <div className='w-full py-2 px-4'>{is_subscribed ? "Yes" : "No"}</div>
        <div className='w-full py-2 px-4 flex justify-start items-start gap-2 text-[12px]'>
            <button
            className='border border-[#FF0000] hover:bg-[#ff0000] hover:text-white hover:border-white duration-100 shadow-[-5px_5px_0px_#FF0000] p-2 rounded-md'
            onClick={onDelete}
            >
                <svg className='w-[12px] md:w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
                <span className='hidden'>Delete</span>
            </button>
            <button className='border border-[#00FF00] hover:bg-[#00ff00] hover:text-white hover:border-white duration-100 shadow-[-5px_5px_0px_#00FF00] p-2 rounded-md'>
                <svg className='w-[12px] md:w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
                <span className='hidden'>Update</span>
            </button>
        </div>
    </>
  )
}

export default UserTableItem