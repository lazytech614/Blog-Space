import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UploadBlog from './pages/UploadBlog'
import BlogList from './pages/BlogList'
import Subscriptions from './pages/Subscriptions'
import {Toaster} from 'react-hot-toast'
import Users from './pages/Users'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UploadBlog />} />
        <Route path='/add-blog' element={<UploadBlog />} />
        <Route path='/blog-list' element={<BlogList />} />
        <Route path='/users' element={<Users />} />
        <Route path='/subscriptions' element={<Subscriptions />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App