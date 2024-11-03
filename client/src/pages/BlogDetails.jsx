import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import likeIcon from "/thumb-up-line.svg"
import dislikeIcon from "/thumb-down-line.svg"
import sendIcon from "/send-plane-fill.svg"
import Comment from '../components/Comment';

const BlogDetails = () => {
  const location = useLocation();
  const { title, category, post, image } = location.state || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  return (
    <div className='min-h-[calc(100vh-200px)] px-4 sm:px-10 md:px-20 py-6 lg:py-0 flex justify-center items-center'>
      <div className='bg-slate-100 w-full max-w-[1200px] p-4 rounded-md flex flex-col lg:flex-row justify-center items-start gap-y-4'>
        <div className='relative h-[70vh] w-full lg:w-[60%] bg-slate-200 p-4 rounded-md'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <h2 className='text-sm'>{category}</h2>
          <div className='h-[46vh] mt-4 bg-slate-100 overflow-y-auto scrollbar-hidden shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2'>
            {post}
          </div>
          <div className='absolute bottom-0 left-0 w-full p-4'>
            <div className='w-full h-[1px] bg-black my-4'></div>
            <div className='flex items-start gap-3'>
              <div>
                <img className='w-[30px] cursor-pointer' src={likeIcon} alt="" />
                <span className='text-xs'>1.2k likes</span>
              </div>
              <div>
                <img className='w-[30px] cursor-pointer' src={dislikeIcon} alt="" />
                <span className='text-xs'>19k dislikes</span>
              </div>
            </div>
          </div>
        </div>
        <div className='max-h-[70vh] w-full lg:w-[40%]  lg:ps-4 flex flex-col gap-4'>
          <div>
              <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex'><img className='w-full h-full' src="https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg" alt="" /></div>
              <h3 className='text-xl font-semibold'>Rupanjan De</h3>
              <p className='text-sm'>20th July, 2022</p>
          </div>
          <div className='w-full h-[1px] bg-black'></div>
          <div className='w-full h-[40px] border border-black rounded-3xl  flex justify-between items-center px-2'>
            <input type="text" className="bg-transparent w-[90%] h-full p-2 outline-none ps-4" placeholder="Write a comment" />
            <div className='w-[10%] h-full flex justify-center items-center cursor-pointer'>
              <img className='w-[20px]' src={sendIcon} alt="" />
            </div>
          </div>
          <div className='w-full flex flex-col gap-4'>
            <div className='shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2 flex flex-col gap-1'>
              <h3 className='text-md font-semibold'>Comments</h3>
              <p className='text-sm hidden'>No comments yet</p>
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto h-[340px] scrollbar-hidden shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2'>
              <Comment commentator="Rupanjan De" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas. "
              date="20th July, 2022"
              />   
              <Comment commentator="Payel De" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas. "
              date="20th November, 2021"
              />
              <Comment commentator="Payel De" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas. "
              date="20th November, 2021"
              />
              <Comment commentator="Payel De" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas.Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas. "
              date="20th November, 2021"
              />
              <Comment commentator="Riya De" 
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque, quas. "
              date="20th January, 2012"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
