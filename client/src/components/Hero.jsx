import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col gap-4 items-center'>
        <h1 className='capitalize text-[44px] font-semibold text-center'>Latest blogs</h1>
        <p className='text-center max-w-[800px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa molestias qui amet atque perferendis dolorem facere voluptate cum ad nesciunt. Deserunt maiores esse fuga laborum molestiae corrupti dolorum cupiditate nulla!</p>
        <div className='relative w-[500px] h-[60px] mx-auto bg-[#FFFFFF] flex justify-between items-center border border-black shadow-[-7px_7px_0px_#000000] rounded-md mt-6 overflow-hidden duration-200'>
            <input type="text" placeholder='Enter your email' className='h-full w-[70%] bg-transparent outline-none px-6'/>
            <button className='w-[30%] h-full border-l border-black text-[20px] hover:bg-black hover:text-white'>Subscribe</button>
        </div>
    </div>
  )
}

export default Hero