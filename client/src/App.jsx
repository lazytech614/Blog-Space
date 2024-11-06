import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import BlogDetails from './pages/BlogDetails'
import Footer from './components/Footer'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'
import Landing from './pages/Landing'
import { SearchProvider } from './context/SearchContext'

const App = () => {
  const { authUser } = useAuthContext()
  return (
    <SearchProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Landing />} />
          <Route path='/blog-details' element={authUser ? <BlogDetails /> : <Landing />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App