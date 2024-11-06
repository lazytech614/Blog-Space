import React, {useState} from 'react'
import { SignInModal } from '../modal/SignInModal'
import { SignUpModal } from '../modal/SignUpModal'
import book from "/book.png"

const Landing = () => {
    const [isOpenSignInModal, setIsOpenSignInModal] = useState(false)

    const handleClick = () => {
        setIsOpenSignInModal(true)
    }
  return (
    <div className='bg-[#F7F4ED] min-h-[calc(100vh-200px)] px-4 sm:px-10 md:px-20 flex justify-between items-center'>
        <div>
            <img src={book} alt="" />
        </div>
        <div className='flex flex-col items-start gap-4'>
            <h1 className='capitalize text-[24px] sm:text-[32px] md:text-[52px] font-bold'>Ideas for a better tomorrow.</h1>
            <p className='text-[24px]'>A space for discovery, creativity, and growth.</p>
            <button className='bg-black text-white px-6 py-2 rounded-full flex justify-center items-center' onClick={handleClick}>Start Reading</button>
        </div>
        <SignInModal isOpenSignInModal={isOpenSignInModal} setIsOpenSignInModal={setIsOpenSignInModal}/>
    </div>
  )
}

export default Landing