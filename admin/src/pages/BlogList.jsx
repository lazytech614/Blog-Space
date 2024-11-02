import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import BlogTableItem from '../components/BlogTableItem'

const BlogList = () => {
  const [blogList, setBlogList] = useState([])

  useEffect(() => {
    try {
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/all-blogs`)
        .then((res) => res.json())
        .then((data) => setBlogList(data))
    } catch (error) {
      toast.error("Failed to fetch blogs");
    }
  }, [])

  // Define the delete handler function
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/delete-blog/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove the deleted blog from the blogList
        setBlogList((prevList) => prevList.filter((blog) => blog.id !== id));
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete the blog");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog");
    }
  };

  return (
    <div className='flex flex-col sm:flex-row'>
      <Sidebar />
      <div className='w-full'>
        <Navbar />
        <div className='px-6 lg:px-10 pt-4 text-[12px] lg:text-[16px]'>
          <div className='grid grid-cols-[3fr,1fr,1fr,1fr] gap-2 mb-8 '>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Title</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Category</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Created at</div>
            <div className='uppercase w-full py-2 px-2 md:px-4 rounded-md border border-black shadow-[-5px_5px_0px_#000000]'>Action</div>
          </div>
          <div className='grid grid-cols-[3fr,1fr,1fr,1fr] gap-2 overflow-y-auto h-[80vh] scrollbar-hidden'>
            {blogList.map((blog) => (
              <React.Fragment key={blog.id}>
                <BlogTableItem {...blog} onDelete={() => handleDelete(blog.id)} />
                <div className='col-span-4 h-[2px] bg-black'></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogList
