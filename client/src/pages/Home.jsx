import React from 'react'
import Hero from '../components/Hero'
import BlogListContainer from '../components/BlogListContainer'

const Home = () => {
  return (
    <div className='px-4 sm:px-10 md:px-20 py-6 bg-slate-100'>
      <Hero />
      <BlogListContainer />
    </div>
  )
}

export default Home