import React, { useState, useEffect } from 'react'
import { categories } from '../constants/categories'
import BlogCard from './BlogCard'
import { useFeedContext } from '../context/BlogContext'

const BlogListContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const { feed } = useFeedContext()
  const blogs = feed;

  useEffect(() => {
    if(selectedCategory === "All") {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()))
    }
  }, [selectedCategory, blogs])

  return (
    <div className='mt-8 md:mt-10 flex flex-col gap-4'>
      <div className='flex justify-center items-center gap-2 md:gap-4'>
        {categories.map((category, index) => (
          <div 
            onClick={() => setSelectedCategory(category)} 
            key={index} 
            className={`px-2 md:px-4 py-1 md:py-2 text-[12px] sm:text-[14px] md:text-[16px] ${selectedCategory.toLocaleLowerCase() === category.toLocaleLowerCase() ? "bg-black text-white" : "bg-white"} rounded-md border border-black cursor-pointer hover:bg-black hover:text-white duration-200`} 
          >
            {category}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {filteredBlogs
          .filter(blog => selectedCategory === "All" || blog.category === selectedCategory)
          .map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
      </div>
    </div>
  )
}

export default BlogListContainer
