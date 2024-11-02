import React, { useState } from 'react'
import loginImage from "/login-box-line.svg"
import arrowRightImage from "/arrow-right-double-fill.svg"
import { SignInModal } from '../modal/SignInModal'
import { SignUpModal } from '../modal/SignUpModal'
import { useAuthContext } from '../context/AuthContext'

const Sidebar = () => {
  const [isOpenSignInModal, setIsOpenSignInModal] = useState(false)
  const [isOpenSignUpModal, setIsOpenSignUpModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {authUser, setAuthUser} = useAuthContext()

  const handleSignInClick = () => {
    setIsOpenSignInModal(true)
  }

  const handleSignUpClick = () => {
    setIsOpenSignUpModal(true)
  }

  return (
    <div className='absolute left-0 top-0 h-screen w-[60%] bg-slate-100 flex flex-col justify-start items-start gap-4 px-4 pt-40'>
        <div className='absolute top-6 text-[24px] sm:text-[32px] font-bold'>Blog Space</div> 
        <button onClick={handleSignInClick} className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
            <span>Login</span>
            <img src={loginImage} alt="login" className='w-6' /> 
        </button>
        <button onClick={handleSignUpClick} className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
            <span>Get Started</span>
            <img src={arrowRightImage} alt="login" className='w-6' /> 
        </button>
        <SignInModal isOpenSignInModal={isOpenSignInModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
       <SignUpModal isOpenSignUpModal={isOpenSignUpModal} setIsOpenSignUpModal={setIsOpenSignUpModal}/>
    </div>
  )
}

export default Sidebar