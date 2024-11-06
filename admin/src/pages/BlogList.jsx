import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import toast from 'react-hot-toast'
import Navbar from '../components/Navbar'
import BlogTableItem from '../components/BlogTableItem'
import { WarningModal } from '../modal/WarningModal'
import useGetAllBlogs from '../hooks/useGetAllBlogs'

const BlogList = () => {
  
  const [selectedBlogId, setSelectedBlogId] = useState(null)
  const [isOpenWarningModal, setIsOpenWarningModal] = useState(false)

  const {getAllBlogs, blogList, setBlogList} = useGetAllBlogs()

  useEffect(() => {
    getAllBlogs()
  }, [])

  // Define the delete handler function
  const handleDelete = async (id) => {
    setSelectedBlogId(id)
    setIsOpenWarningModal(true)
  };

  const confirmDelete = async() => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/delete-blog/${selectedBlogId}`, {
        method: 'DELETE',
      }).then((res) => res.json());

      if (response.success) {
        // Remove the deleted blog from the blogList
        setBlogList((prevList) => prevList.filter((blog) => blog.id !== selectedBlogId));
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog");
    } finally{
      setSelectedBlogId(null)
    }
  }

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
          <div className='grid grid-cols-[3fr,1fr,1fr,1fr] gap-2 overflow-y-auto max-h-[80vh] scrollbar-hidden'>
            {blogList.map((blog) => (
              <React.Fragment key={blog.id}>
                <BlogTableItem {...blog} onDelete={() => handleDelete(blog.id)} />
                <div className='col-span-4 h-[2px] bg-black'></div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <WarningModal 
        warning="Are you sure you want to delete this blog?" 
        isOpenWarningModal={isOpenWarningModal} 
        setIsOpenWarningModal={setIsOpenWarningModal} 
        onConfirmDelete={confirmDelete} />
    </div>
  )
}

export default BlogList
