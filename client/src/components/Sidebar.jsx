import React from 'react'
import loginImage from "/login-box-line.svg"
import arrowRightImage from "/arrow-right-double-fill.svg"

const Sidebar = () => {
  return (
    <div className='absolute left-0 top-0 h-screen w-[60%] bg-slate-100 flex flex-col justify-start items-start gap-4 px-4 pt-40'>
        <div className='absolute top-6 text-[24px] sm:text-[32px] font-bold'>Blog Space</div> 
        <button className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
            <span>Login</span>
            <img src={loginImage} alt="login" className='w-6' /> 
        </button>
        <button className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
            <span>Get Started</span>
            <img src={arrowRightImage} alt="login" className='w-6' /> 
        </button>
    </div>
  )
}

export default Sidebar