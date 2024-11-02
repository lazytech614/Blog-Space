import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import UploadBlog from './pages/UploadBlog'
import Sidebar from './components/Sidebar'
import BlogList from './pages/BlogList'
import Subscriptions from './pages/Subscriptions'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<UploadBlog />} />
        <Route path='/add-blog' element={<UploadBlog />} />
        <Route path='/blog-list' element={<BlogList />} />
        <Route path='/subscriptions' element={<Subscriptions />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  )
}

export default App