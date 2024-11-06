import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import BlogDetails from './pages/BlogDetails'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Landing from './pages/Landing'

const App = () => {
  const { authUser } = useAuthContext()
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Landing />} />
        <Route path='/blog-details' element={<BlogDetails />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  )
}

export default App