import React, {useState} from 'react'
import loginImage from "/login-box-line.svg"
import arrowRightImage from "/arrow-right-double-fill.svg"
import menuImage from "/menu-3-line.svg"
import closeImage from "/close-large-fill.svg"
import Sidebar from './Sidebar'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='relative px-4 sm:px-10 md:px-20 py-6 sm:py-10 bg-[#F5F5F7] w-full flex justify-between items-center shadow-[-1px_1px_4px_#000000]'>
       <div className='text-[24px] sm:text-[32px] font-bold'>Blog Space</div> 
        <div className='hidden sm:flex gap-10'>
            <button className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                <span>Login</span>
                <img src={loginImage} alt="login" className='w-6' /> 
            </button>
            <button className='px-4 py-2 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] flex items-center gap-2'>
                <span>Get Started</span>
                <img src={arrowRightImage} alt="login" className='w-6' /> 
            </button>
        </div>

       {isMenuOpen && <Sidebar />}

       <div className='sm:hidden'>
        {!isMenuOpen ? (
            <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={menuImage} alt="menu" className='w-6' />
        ) : (
            <img onClick={() => setIsMenuOpen(!isMenuOpen)} src={closeImage} alt="close" className='w-6' />
        )}
       </div>
    </nav>
  )
}

export default Header