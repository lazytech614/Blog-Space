import React from 'react'
import { useNavigate } from 'react-router-dom'
import arrowRightImage from "/arrow-right-line.svg"
import likeIcon from "/thumb-up-line.svg"
import dislikeIcon from "/thumb-down-line.svg"
import commentIcon from "/discuss-fill.svg"

const BlogCard = ({ title, category, post, image }) => {
  const navigate = useNavigate();

  const handleReadMore = () => {
    navigate('/blog-details', {
      state: { title, category, post, image },
    });
  };

  return (
    <div className='border border-black rounded-md overflow-hidden flex flex-col h-full sm:hover:shadow-[-5px_5px_10px_#000000] duration-150'>
      <div className='h-32 sm:h-28 overflow-hidden'>
        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${image}`} alt="" className='w-full h-full object-cover' />
      </div>
      <div className='p-4 space-y-2 sm:space-y-4 flex-1 flex flex-col'>
        <h2 className='bg-black text-white px-2 py-1 w-fit text-[12px] font-semibold rounded-sm'>{category}</h2>
        <div className='sm:space-y-2 flex-1'>
          <h1 className='font-semibold line-clamp-2 text-[12px] sm:text-[16px]'>{title}</h1>
          <p className='line-clamp-2 text-[12px] sm:text-[16px]'>
            {post}
          </p>
        </div>
        <button onClick={handleReadMore} className='group relative flex justify-center items-center hover:gap-1 w-fit font-bold mt-auto text-[12px] sm:text-[16px] overflow-hidden'>
          <span>Read more ...</span>
          <div className='absolute bottom-0 left-0 w-full -translate-x-[100%] group-hover:translate-x-0 transition-all duration-150 h-[2px] bg-black'></div>
        </button>
        <div className='w-full h-[1px] bg-black'></div>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center gap-3'>
            <img className='w-[20px] cursor-pointer' src={likeIcon} alt="" /> 
            <img className='w-[20px] cursor-pointer' src={dislikeIcon} alt="" />
          </div>
          {/* <div>
            <img className='w-[20px] cursor-pointer' src={commentIcon} alt="" />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
