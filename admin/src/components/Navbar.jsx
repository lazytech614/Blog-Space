import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full'>
            <div className='h-[80px] px-6 lg:px-10 bg-slate-100 w-full border-b border-black flex justify-between items-center'> 
                <h1 className='text-[20px]'>Admin Panel</h1>
                <div className='h-[80px] w-[80px] rounded-full overflow-hidden flex justify-center items-center'>
                    <img
                        className='w-full rounded-full'
                        src="https://th.bing.com/th/id/OIP.K8yunvrQA8a0MY5khxh_iQHaFR?w=900&h=640&rs=1&pid=ImgDetMain"
                        alt=""
                    />
                </div>
            </div>
        </nav>
  )
}

export default Navbar