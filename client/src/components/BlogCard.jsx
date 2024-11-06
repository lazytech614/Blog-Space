import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import likeIcon from "/thumb-up-line.svg"
import likeIconFill from "/thumb-up-fill.svg"
import dislikeIcon from "/thumb-down-line.svg"
import dislikeIconFill from "/thumb-down-fill.svg"
import DOMPurify from 'dompurify';
import useCheckReaction from '../hooks/useCheckReaction'
import { useAuthContext } from '../context/AuthContext'
import useReactClick from '../hooks/useReactClick'
import getFormattedDate from '../utils/getFormattedDate'

const BlogCard = ({ id,title, category, post, image, created_at }) => {
  const navigate = useNavigate();
  const cleanHtml = DOMPurify.sanitize(post);

  const {status, checkReaction} = useCheckReaction(id)
  const {authUser} = useAuthContext()
  const {react, likesCount, dislikesCount, setLikesCount, setDislikesCount} = useReactClick()

  const handleReadMore = () => {
    navigate('/blog-details', {
      state: { id,title, category, post, image, created_at },
    });
  };

  const handleReactClick = async (isLike) => {
    await react(status,isLike, id)
  };

  useEffect(() => {
      checkReaction(id);
  }, [likesCount, dislikesCount, authUser, checkReaction, id]);

  return (
    <div className='rounded-md overflow-hidden flex h-full'>
      <div className='overflow-hidden w-[30%] xl:w-[20%] flex flex-shrink-0 justify-center items-start px-0 py-4 sm:p-4'>
        <img src={`${import.meta.env.VITE_API_BASE_URL}/uploads/${image}`} alt="" className='h-32 sm:h-28 object-cover' />
      </div>
      <div className='p-4 space-y-2 sm:space-y-4 flex-1 flex flex-col'>
        <div className='space-y-2'>
          <h2 className='bg-black text-white px-2 py-1 w-fit text-[12px] font-semibold rounded-sm'>{category}</h2>
          <h3 className='text-[12px] sm:text-[12px]'>{getFormattedDate(created_at)}</h3>
        </div>
        <div className='sm:space-y-2 flex-1'>
          <h1 className='font-bold line-clamp-2 text-[12px] sm:text-[16px]'>{title}</h1>
          <div className='line-clamp-2 text-[12px] sm:text-[16px]' dangerouslySetInnerHTML={{ __html: cleanHtml }}>
          </div>
        </div>
        <button onClick={handleReadMore} className='group relative flex justify-center items-center hover:gap-1 w-fit font-bold mt-auto text-[12px] sm:text-[16px] overflow-hidden'>
          <span>Read more ...</span>
          <div className='absolute bottom-0 left-0 w-full -translate-x-[100%] group-hover:translate-x-0 transition-all duration-150 h-[2px] bg-black'></div>
        </button>
        <div className='flex justify-between items-center'>
          <div className='flex justify-center items-center gap-3'>
            <div className='flex gap-1'>
              <img onClick={() => handleReactClick(true)} className='w-[20px] cursor-pointer' src={status !== "none" ? status === "like" ? likeIconFill : likeIcon : likeIcon} alt="" /> 
              {/* <span className='text-[12px] text-gray-400'>{likesCount}</span> */}
            </div>
            <div className='flex gap-1'>
              <img onClick={() => handleReactClick(false)} className='w-[20px] cursor-pointer' src={status !== "none" ? status === "dislike" ? dislikeIconFill : dislikeIcon : dislikeIcon} alt="" />
              {/* <span className='text-[12px] text-gray-400'>{dislikesCount}</span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
