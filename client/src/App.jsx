import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import BlogDetails from './pages/BlogDetails'
import UploadBlog from './pages/UploadBlog'
import Footer from './components/Footer'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/blog-details' element={<BlogDetails />} />
        <Route path='/upload-blog' element={<UploadBlog />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App