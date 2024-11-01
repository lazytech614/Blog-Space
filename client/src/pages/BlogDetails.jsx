import React from 'react';
import { useLocation } from 'react-router-dom';

const BlogDetails = () => {
  const location = useLocation();
  const { title, category, description, imageUrl } = location.state || {};

  return (
    <div className='pb-10'>
      <div className='relative min-h-[360px] bg-[#F5F5F7] flex flex-col justify-center items-center'>
        <h1 className='text-center font-bold text-[28px] max-w-[800px]'>{title}</h1>
        <div className='h-[80px] w-[80px] rounded-full overflow-hidden flex justify-center items-center'>
          <img
            className='w-full rounded-full'
            src="https://th.bing.com/th/id/OIP.K8yunvrQA8a0MY5khxh_iQHaFR?w=900&h=640&rs=1&pid=ImgDetMain"
            alt=""
          />
        </div>
        <p>Rupanjan De</p>
      </div>
      <div className='relative pb-4 h-[100vh]'>
        <div className='absolute -top-[40px] left-1/2 -translate-x-1/2 h-[400px] w-1/2 bg-white p-1 rounded-md'>
          <img className='w-full rounded-sm' src={imageUrl} alt="" />
          <div className='mt-10'>{description}</div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
