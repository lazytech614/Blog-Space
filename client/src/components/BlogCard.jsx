import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowRightImage from "/arrow-right-line.svg"

const BlogCard = ({ title, category, description, imageUrl }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/blog-details', {
      state: { title, category, description, imageUrl },
    });
  };

  return (
    <div className='border border-black rounded-md overflow-hidden flex flex-col h-full'>
      <div className='h-48 overflow-hidden'>
        <img src={imageUrl} alt="" className='w-full h-full object-cover' />
      </div>
      <div className='p-4 space-y-4 flex-1 flex flex-col'>
        <h2 className='bg-black text-white px-2 py-1 w-fit text-[12px] font-semibold rounded-sm'>{category}</h2>
        <div className='space-y-2 flex-1'>
          <h1 className='font-semibold line-clamp-2'>{title}</h1>
          <p className='line-clamp-3'>
            {description}
          </p>
        </div>
        <button onClick={handleReadMore} className='flex justify-center items-center gap-1 w-fit font-bold mt-auto'>
          <span>Read more</span>
          <img src={arrowRightImage} alt="" className='w-6' />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
