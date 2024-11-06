import React, { useState, useEffect } from 'react'
import { categories } from '../constants/categories'
import BlogCard from './BlogCard'
import { useFeedContext } from '../context/BlogContext'
import { useSearchContext } from '../context/SearchContext'

const BlogListContainer = () => {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [filteredBlogs, setFilteredBlogs] = useState([])

  const { feed } = useFeedContext()
  const { searchQuery } = useSearchContext()
  const blogs = feed;

  useEffect(() => {
    let filtered = blogs;

    if (selectedCategory !== "All") {
      filtered = blogs.filter((blog) => blog.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (searchQuery) {
      filtered = filtered.filter((blog) => {
        const title = blog.title || ''; // Default to empty string if undefined
        const description = blog.description || ''; // Default to empty string if undefined

        return title.toLowerCase().includes(searchQuery.toLowerCase()) ||
               description.toLowerCase().includes(searchQuery.toLowerCase());
      });
    }

    setFilteredBlogs(filtered);
  }, [selectedCategory, blogs, searchQuery]);

  return (
    <div className='mt-8 md:mt-10 flex flex-col gap-4 sm:max-w-[90%] mx-auto'>
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
      <div className='flex flex-col gap-2'>
        {filteredBlogs
          .filter(blog => selectedCategory === "All" || blog.category === selectedCategory)
          .map((blog, index) => {
            return (
              <React.Fragment key={index}>
                <BlogCard {...blog} />
                <div className='w-full h-[1px] bg-gray-300'></div>
              </React.Fragment>
            )
          }        
          )}
      </div>
    </div>
  )
}

export default BlogListContainer
