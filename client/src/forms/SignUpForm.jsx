import React, {useState} from 'react'
import closeIcon from "/close-large-fill.svg"
import toast from 'react-hot-toast'
import { useAuthContext } from '../context/AuthContext'

const SignUpForm = ({setIsOpenSignUpModal}) => {
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [isLoading, setIsLoading] = useState(false)

    const {setAuthUser} = useAuthContext()

    const handleCloseIconClick = () => {
        setIsOpenSignUpModal(false)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            setIsLoading(true)
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(response.ok){
                setIsOpenSignUpModal(false)
                localStorage.setItem("username", JSON.stringify(formData.username))
                setAuthUser(formData.username)
                toast.success("Logged in successfully!")
            }
        }catch(err){
            console.log(err.message);
            toast.error(err.message);
        }finally{
            setIsLoading(false)
        }
    }


  return (
    <div className='fixed z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[80%] sm:w-[600px] mx-auto p-[20px] sm:p-[40px] bg-white flex flex-col shadow-[-5px_5px_0px_#000000] rounded-md'>
        <img onClick={handleCloseIconClick} className='absolute top-6 right-6 cursor-pointer w-[20px]' src={closeIcon} alt="" />
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <label htmlFor="name">Enter your name</label>
                <input 
                    id='name' 
                    type="text" 
                    placeholder='Name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className='border border-black rounded-md p-2 shadow-[-5px_5px_0px_#000000] outline-none'
                />
            </div>
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
                <label htmlFor="email">Enter your email</label>
                <input 
                    id='email' 
                    type="email" 
                    placeholder='E-mail'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className='border border-black rounded-md p-2 shadow-[-5px_5px_0px_#000000] outline-none' 
                />
            </div>
            <div className='flex w-full justify-between gap-4'>
                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="password">Password</label>
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
                <div className='flex flex-col gap-2 w-1/2'>
                    <label htmlFor="confirmPassword">Confirm password</label>
                    <input 
                        id='confirmPassword' 
                        type="password" 
                        placeholder='Confirm password'
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className='border border-black rounded-md p-2 shadow-[-5px_5px_0px_#000000] outline-none' 
                    />
                </div>
            </div>
            <button className='px-4 py-2 mt-2 hover:bg-[#1E201E] hover:text-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] font-semibold' disabled={isLoading}>{isLoading ? "Loading..." : "Sign Up"}</button>
        </form>
    </div>
  )
}

export default SignUpForm