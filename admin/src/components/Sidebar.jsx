import React from 'react';
import { Link, useLocation } from "react-router-dom";
import addBlogLogo from "/add-circle-line.svg";
import blogListLogo from "/booklet-line.svg";
import subscriptionLogo from "/mail-check-line.svg";

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className='h-[280px] sm:h-screen w-[100vw] sm:w-[30%] xl:w-[20%] bg-slate-100 flex flex-col sm:border-r border-black'>
      <div className='font-bold border-b border-black w-full lg:px-4 h-[80px] flex justify-start px-6 sm:justify-center items-center gap-2'>
        <img className='w-6 md:w-5 lg:w-8' src="https://img.icons8.com/?size=200&id=OENhm99NTnV6&format=png" alt="" />
        <span className='text-[20px] lg:text-[28px]'>Blog Space</span>
      </div>
      <div className='relative'>
        <div className='absolute sm:right-0 left-1/2 sm:left-auto -translate-x-1/2 sm:translate-x-0 top-4 w-[90%] sm:w-[70%] h-full space-y-4 sm:space-y-6 text-[12px] lg:text-[16px]'>
          <Link 
            to="/add-blog" 
            className={`w-full px-4 py-2 ${isActive("/add-blog") ? "bg-black text-white border-white" : ""} rounded-md sm:rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2`}
          >
            <img src={addBlogLogo} alt="" className='w-4 lg:w-6' />
            <span>Add Blog</span>
          </Link>
          <Link 
            to="/blog-list" 
            className={`w-full px-4 py-2 ${isActive("/blog-list") ? "bg-black text-white border-white" : ""} rounded-md sm:rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2`}
          >
            <img src={blogListLogo} alt="" className='w-4 lg:w-6' />
            <span>Blog List</span>
          </Link>
          <Link 
            to="/users" 
            className={`w-full px-4 py-2 ${isActive("/users") ? "bg-black text-white border-white" : ""} rounded-md sm:rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2`}
          >
            <img src={subscriptionLogo} alt="" className='w-4 lg:w-6' />
            <span>Users</span>
          </Link>
          <Link 
            to="/subscriptions" 
            className={`w-full px-4 py-2 ${isActive("/subscriptions") ? "bg-black text-white border-white" : ""} rounded-md sm:rounded-r-none border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2`}
          >
            <img src={subscriptionLogo} alt="" className='w-4 lg:w-6' />
            <span>Subscriptions</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
