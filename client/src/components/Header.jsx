import React, {useState, useEffect} from 'react'
import loginImage from "/login-box-line.svg"
import logoutImage from "/logout-box-r-line.svg"
import arrowRightImage from "/arrow-right-double-fill.svg"
import menuImage from "/menu-3-line.svg"
import closeImage from "/close-large-fill.svg"
import Sidebar from './Sidebar'
import {useNavigate} from 'react-router-dom'
import { SignInModal } from '../modal/SignInModal'
import { SignUpModal } from '../modal/SignUpModal'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'
import useLogOut from '../hooks/useLogOut'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isOpenSignInModal, setIsOpenSignInModal] = useState(false)
    const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false)
    // const [isLoading, setIsLoading] = useState(false)

    const {authUser} = useAuthContext()
    const {logOut, isLoading} = useLogOut()

    const navigate = useNavigate()

    const handleSignInClick = () => {
        setIsOpenSignInModal(true)
    }

    const handleSignUpClick = () => {
        setIsOpenSignUpModal(true)
    }

    const handleLogOutClick = async() => {
        logOut()
    }

  return (
    <nav className='sticky top-0 sm:h-[100px] px-4 sm:px-10 md:px-20 py-6 sm:py-0 bg-slate-100 w-full flex justify-between items-center shadow-[-1px_1px_4px_#000000] z-[10]'>
       <div onClick={() => navigate("/")} className='text-[24px] sm:text-[32px] font-bold cursor-pointer flex justify-center items-center gap-2'>
            <img className='w-6 sm:w-8 md:w-10' src="https://img.icons8.com/?size=200&id=OENhm99NTnV6&format=png" alt="" />
            <span>Blog Space</span>
       </div> 
       {authUser ? (
        <div className='hidden sm:flex gap-10'>
            <button onClick={handleLogOutClick} className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2' disabled={isLoading}>
                <span>{isLoading ? "Logging out..." : "Logout"}</span>
                <img src={logoutImage} alt="login" className='w-6' /> 
            </button>
        </div>
       ) : (
        <div className='hidden sm:flex gap-6 lg:gap-10'>
            <button onClick={handleSignInClick} className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                <span>Login</span>
                <img src={loginImage} alt="login" className='w-6' /> 
            </button>
            <button onClick={handleSignUpClick} className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                <span>Get Started</span>
                <img src={arrowRightImage} alt="login" className='w-6' /> 
            </button>
        </div>
       ) }
       {isMenuOpen && <Sidebar />}

       <div className='sm:hidden cursor-pointer'>
        {!isMenuOpen ? (
            <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={menuImage} alt="menu" className='w-6' />
        ) : (
            <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={closeImage} alt="close" className='w-6' />
        )}
       </div>
       <SignInModal isOpenSignInModal={isOpenSignInModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
       <SignUpModal isOpenSignUpModal={isOpenSignUpModal} setIsOpenSignUpModal={setIsOpenSignUpModal}/>
    </nav>
  )
}

export default Header