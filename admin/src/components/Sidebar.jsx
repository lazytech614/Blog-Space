import React, {useState} from 'react'
import addBlogLogo from "/add-circle-line.svg"
import blogListLogo from "/booklet-line.svg"
import subscriptionLogo from "/mail-check-line.svg"
import {Link} from "react-router-dom"

const Sidebar = () => {
    const [slectedBox, setSlectedBox] = useState("Add Blog")
  return (
    <div className='h-screen w-[20%] bg-slate-100 flex flex-col border-r border-black'>
        <div className='text-[28px] font-bold border-b border-black w-full px-4 h-[80px] flex justify-center items-center'>
            Blog Space
        </div>
        <div className='relative'>
            <div className='absolute right-0 top-4 w-[70%] h-full space-y-6'>
                <Link to="/add-blog" className='w-full px-4 py-2 bg-white rounded-md rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                    <img src={addBlogLogo} alt="" className='w-6' />
                    <span>Add Blog</span>
                </Link>
                <Link to="/blog-list" className='w-full px-4 py-2 bg-white rounded-md rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                    <img src={blogListLogo} alt="" className='w-6' />
                    <span>Blog List</span>
                </Link>
                <Link to="/subscriptions" className='w-full px-4 py-2 bg-white rounded-md rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                    <img src={subscriptionLogo} alt="" className='w-6' />
                    <span>Subscriptions</span>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar