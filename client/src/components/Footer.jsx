import React from 'react'
import instagramLogo from '/instagram-fill.svg'
import twitterLogo from '/twitter-x-line.svg'
import facebookLogo from '/facebook-circle-fill.svg'
import linkedinLogo from '/linkedin-box-fill.svg'

const Footer = () => {
  return (
    <div className='relative h-[100px] px-4 sm:px-10 md:px-20 bg-black text-white flex justify-between items-center'>
        <div className='flex flex-col sm:flex-row justify-center items-start sm:items-center gap-2'>
            <div className='bg-white rounded-full p-2'>
                <img className='w-4 sm:w-6 md:w-8' src="https://img.icons8.com/?size=200&id=OENhm99NTnV6&format=png" alt="" />
            </div>
            <div className='sm:text-[24px] md:text-[32px] font-bold'>Blog Space</div>
        </div>
        <div className='absolute left-1/2 -translate-x-1/2 text-[8px] sm:text-[10px] md:text-[12px] text-gray-500'>All rights reserved @2024</div>
        <div className='flex gap-2'>
            <div className='bg-white p-1 sm:p-2 rounded-full cursor-pointer'>
                <img src={instagramLogo} alt="instagram" className='w-4 sm:w-6' />
            </div>
            <div className='bg-white p-1 sm:p-2 rounded-full cursor-pointer'>
                <img src={facebookLogo} alt="instagram" className='w-4 sm:w-6' />
            </div>
            <div className='bg-white p-1 sm:p-2 rounded-full cursor-pointer'>
                <img src={twitterLogo} alt="instagram" className='w-4 sm:w-6' />
            </div>
            <div className='bg-white p-1 sm:p-2 rounded-full cursor-pointer'>
                <img src={linkedinLogo} alt="instagram" className='w-4 sm:w-6' />
            </div>
        </div>
    </div>
  )
}

export default Footer