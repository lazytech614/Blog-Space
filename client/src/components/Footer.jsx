import React from 'react'
import instagramLogo from '/instagram-fill.svg'
import twitterLogo from '/twitter-x-line.svg'
import facebookLogo from '/facebook-circle-fill.svg'
import linkedinLogo from '/linkedin-box-fill.svg'

const Footer = () => {
  return (
    <div className='h-[100px] px-4 sm:px-10 md:px-20 bg-black text-white flex justify-between items-center'>
        <div className='text-[32px] font-bold'>Blog Space</div>
        <div className='absolute left-1/2 -translate-x-1/2 text-[12px]'>All rights reserved @2024</div>
        <div className='flex gap-2'>
            <div className='bg-white p-2 rounded-full cursor-pointer'>
                <img src={instagramLogo} alt="instagram" className='w-6' />
            </div>
            <div className='bg-white p-2 rounded-full cursor-pointer'>
                <img src={facebookLogo} alt="instagram" className='w-6' />
            </div>
            <div className='bg-white p-2 rounded-full cursor-pointer'>
                <img src={twitterLogo} alt="instagram" className='w-6' />
            </div>
            <div className='bg-white p-2 rounded-full cursor-pointer'>
                <img src={linkedinLogo} alt="instagram" className='w-6' />
            </div>
        </div>
    </div>
  )
}

export default Footer