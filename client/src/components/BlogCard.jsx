import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowRightImage from "/arrow-right-line.svg"

const BlogCard = ({ title, category, post, image }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/blog-details', {
      state: { title, category, post, image },
    });
  };

  return (
    <div className='group hover:scale-[1.05] transition-all duration-200 ease-in-out border border-black rounded-md overflow-hidden flex flex-col h-full hover:shadow-[-5px_5px_10px_#000000]'>
      <div className='h-32 sm:h-48 overflow-hidden'>
        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${image}`} alt="" className='w-full h-full object-cover scale-[1.2] group-hover:scale-100 transition-all duration-200 ease-in-out' />
      </div>
      <div className='p-4 space-y-2 sm:space-y-4 flex-1 flex flex-col'>
        <h2 className='bg-black text-white px-2 py-1 w-fit text-[12px] font-semibold rounded-sm'>{category}</h2>
        <div className='sm:space-y-2 flex-1'>
          <h1 className='font-semibold line-clamp-2 text-[12px] sm:text-[16px]'>{title}</h1>
          <p className='line-clamp-2 sm:line-clamp-3 text-[12px] sm:text-[16px]'>
            {post}
          </p>
        </div>
        <button onClick={handleReadMore} className='flex justify-center items-center gap-1 w-fit font-bold mt-auto text-[12px] sm:text-[16px]'>
          <span>Read more</span>
          <img src={arrowRightImage} alt="" className='w-6' />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
