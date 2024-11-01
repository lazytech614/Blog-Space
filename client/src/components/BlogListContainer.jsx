import React, { useState, useEffect } from 'react'
import { categories } from '../constants/categories'
import BlogCard from './BlogCard'
import { blogs } from '../constants/blogList'

const BlogListContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredBlogs, setFilteredBlogs] = useState([])

  useEffect(() => {
    if(selectedCategory === "All") {
      setFilteredBlogs(blogs)
    } else {
      setFilteredBlogs(blogs.filter((blog) => blog.category.toLocaleLowerCase() === selectedCategory.toLocaleLowerCase()))
    }
  }, [selectedCategory])

  return (
    <div className='mt-10 flex flex-col gap-4'>
      <div className='flex justify-center items-center gap-4'>
        {categories.map((category, index) => (
          <div 
            onClick={() => setSelectedCategory(category)} 
            key={index} 
            className={`px-4 py-2 ${selectedCategory.toLocaleLowerCase() === category.toLocaleLowerCase() ? "bg-black text-white" : "bg-white"} rounded-md border border-black cursor-pointer hover:bg-black hover:text-white duration-200`} 
          >
            {category}
          </div>
        ))}
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
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
