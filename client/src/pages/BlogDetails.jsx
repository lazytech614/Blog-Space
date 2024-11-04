import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import likeIcon from "/thumb-up-line.svg";
import dislikeIcon from "/thumb-down-line.svg";
import sendIcon from "/send-plane-fill.svg";
import Comment from '../components/Comment';
import DOMPurify from 'dompurify';
import toast from 'react-hot-toast';

const BlogDetails = () => {
  const location = useLocation();
  const { id, title, category, post, image } = location.state || {};
  const [commentContent, setCommentContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [likesCount, setLikesCount] = useState(0);
  const [dislikesCount, setDislikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const cleanHtml = DOMPurify.sanitize(post);

  const fetchEngagementCounts = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/get-blog-engagements/${id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      ).then((res) => res.json());

      if (response.success) {
        setLikesCount(response.data.like_count);
        setDislikesCount(response.data.dislike_count);
        setCommentsCount(response.data.comment_count);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error fetching engagement counts:", error);
    }
  };

  const handleReactClick = async (isLike) => {
    const userId = JSON.parse(localStorage.getItem("userDetails")).userId;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/react-blog/${userId}/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isLike })
        }
      ).then((res) => res.json());

      if (response.success) {
        toast.success(response.message);
        isLike ? setLikesCount(likesCount + 1) : setDislikesCount(dislikesCount + 1);
      } else {
        console.error(response.message); 
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.message);
    }
  };

  const handleCommentClick = async (e) => {
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem("userDetails")).userId;
    const content = commentContent;
    try {
      setIsLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/add-comment/${userId}/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content })
        }
      ).then((res) => res.json());

      if (response.success) {
        toast.success(response.message);
        setCommentsCount(commentsCount + 1);
        fetchComments(); // Refresh comments list
      } else {
        console.error(response.message); 
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Network or server error:", error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
      setCommentContent("");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/blogs/get-comments/${id}`,
        { method: "GET", headers: { "Content-Type": "application/json" } }
      ).then((res) => res.json());

      if (response.success) {
        setComments(response.data);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchComments();
    fetchEngagementCounts();
  }, []);

  return (
    <div className='min-h-[calc(100vh-200px)] px-4 sm:px-10 md:px-20 py-6 lg:py-0 flex justify-center items-center'>
      <div className='bg-slate-100 w-full max-w-[1200px] p-4 rounded-md flex flex-col lg:flex-row justify-center items-start gap-y-4'>
        <div className='relative h-[70vh] w-full lg:w-[60%] bg-slate-200 p-4 rounded-md'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <h2 className='text-sm'>{category}</h2>
          <div
            className='h-[46vh] mt-4 bg-slate-100 overflow-y-auto scrollbar-hidden shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2'
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          ></div>
          <div className='absolute bottom-0 left-0 w-full p-4'>
            <div className='w-full h-[1px] bg-black my-4'></div>
            <div className='flex items-start gap-3'>
              <div>
                <img onClick={() => handleReactClick(true)} className='w-[30px] cursor-pointer' src={likeIcon} alt="like" />
                <span className='text-xs'>{likesCount} likes</span>
              </div>
              <div>
                <img onClick={() => handleReactClick(false)} className='w-[30px] cursor-pointer' src={dislikeIcon} alt="dislike" />
                <span className='text-xs'>{dislikesCount} dislikes</span>
              </div>
            </div>
          </div>
        </div>
        <div className='max-h-[70vh] w-full lg:w-[40%] lg:ps-4 flex flex-col gap-4'>
          <div>
            <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex'>
              <img className='w-full h-full' src="https://i.pinimg.com/originals/df/5f/5b/df5f5b1b174a2b4b6026cc6c8f9395c1.jpg" alt="User Avatar" />
            </div>
            <h3 className='text-xl font-semibold'>Rupanjan De</h3>
            <p className='text-sm'>20th July, 2022</p>
          </div>
          <div className='w-full h-[1px] bg-black'></div>
          <form onSubmit={handleCommentClick} className='w-full h-[40px] border border-black rounded-3xl flex justify-between items-center px-2'>
            <input 
              type="text" 
              name='comment' 
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="bg-transparent w-[90%] h-full p-2 outline-none ps-4" 
              placeholder="Write a comment" 
            />
            <button className='w-[10%] h-full flex justify-center items-center cursor-pointer' disabled={isLoading}>
              <img className='w-[20px]' src={sendIcon} alt="Send" />
            </button>
          </form>
          <div className='w-full flex flex-col gap-4'>
            <div className='shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2 flex flex-col gap-1'>
              {comments.length === 0 ? (
                <p className='text-sm'>No comments yet</p>
              ) : (
                <h3 className='text-md font-semibold'>Comments ({commentsCount})</h3>
              )}
            </div>
            <div className='flex flex-col gap-2 overflow-y-auto h-[340px] scrollbar-hidden shadow-[-1px_1px_2px_rgba(0,0,0,0.25)] rounded-md p-2'>
              {comments.map((comment) => (
                <Comment 
                  key={comment.comment_id}
                  commentator={comment.name} 
                  content={comment.content}
                  date={comment.created_at}
                /> 
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
