import React, {useState} from 'react'
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const Hero = () => {
  const [formData, setFormData] = useState({
    email: ""
  })

  const {isSubscribed} = useAuthContext()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);

    try{
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      if(response.ok){
        toast.success("Thank you for subscribing!")
        setFormData({
          email: ""
        })
      }
    }catch(err){
      console.log(err.message);
      toast.error(err.message);
    }
  }

  return (
    <div className='flex flex-col md:gap-4 items-center'>
        <h1 className='capitalize text-[24px] sm:text-[32px] md:text-[44px] font-semibold text-center'>Latest blogs</h1>
        <p className='text-center max-w-[800px] text-[12px] sm:text-[16px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa molestias qui amet atque perferendis dolorem facere voluptate cum ad nesciunt. Deserunt maiores esse fuga laborum molestiae corrupti dolorum cupiditate nulla!</p>
        {!isSubscribed && <form onSubmit={handleSubmit} className='relative w-[70%] sm:w-[60%] md:w-[500px] h-[32px] sm:h-[40px] md:h-[60px] mx-auto bg-[#FFFFFF] flex justify-between items-center border border-black shadow-[-7px_7px_0px_#000000] rounded-md mt-4 md:mt-6 overflow-hidden duration-200'>
            <input
                type="text" 
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Enter your email' 
                className='h-full w-[70%] bg-transparent text-[12px] sm:text-[16px] md:text-[20px] outline-none px-6'
            />
            <button className='w-[30%] h-full border-l border-black text-[12px] sm:text-[16px] md:text-[20px] hover:bg-black hover:text-white'>Subscribe</button>
        </form>}
    </div>
  )
}

export default Hero