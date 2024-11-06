import React, {useEffect} from 'react'
import Hero from '../components/Hero'
import BlogListContainer from '../components/BlogListContainer'

const Home = () => {
  return (
    <div className='min-h-[100vh] px-4 sm:px-10 md:px-20 py-4 sm:py-6 bg-[#F7F4ED]'>
      <Hero />
      <BlogListContainer />
    </div>
  )
}

export default Home