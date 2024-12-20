import React, {useState} from 'react'
import closeIcon from "/close-large-fill.svg"
import useSignIn from '../hooks/useSignIn'

const SignInForm = ({setIsOpenSignInModal}) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const handleCloseIconClick = () => {
        setIsOpenSignInModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const {signIn, isLoading} = useSignIn()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signIn(formData, setIsOpenSignInModal)
    }

  return (
    <div className='fixed z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] sm:w-[600px] mx-auto p-[20px] sm:p-[40px] bg-white  flex flex-col shadow-[-5px_5px_0px_#000000] rounded-md'>
        <img onClick={handleCloseIconClick} className='absolute top-6 right-6 cursor-pointer w-[20px]' src={closeIcon} alt="" />
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="username">Enter your username</label>
                <input 
                    id='username' 
                    type="text" 
                    placeholder='Username'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    className='border border-black rounded-md p-2 shadow-[-5px_5px_0px_#000000] outline-none'
                />
            </div>
            <div className='flex flex-col gap-2'>
                <label htmlFor="password">Enter your password</label>
                <input 
                    id='password' 
                    type="password" 
                    placeholder='Password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    className='border border-black rounded-md p-2 shadow-[-5px_5px_0px_#000000] outline-none' 
                />
            </div>
            <button className='px-4 py-2 mt-2 hover:bg-[#1E201E] hover:text-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] font-semibold' disabled={isLoading}>{isLoading ? "Signing In..." : "Sign In"}</button>
        </form>
    </div>
  )
}

export default SignInForm