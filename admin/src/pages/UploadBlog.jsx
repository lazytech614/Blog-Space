import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import uploadIcon from '/upload-icon.png'
import toast from 'react-hot-toast'

const UploadBlog = () => {
    const [thumbnail, setThumbnail] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        post: "",
        category: "Technology", // Set default category to "Technology"
        thumbnail: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "thumbnail") {
            setThumbnail(e.target.files[0]);
            setFormData({
                ...formData,
                thumbnail: e.target.files[0]
            })
            return;
        }

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        data.append('title', formData.title);
        data.append('post', formData.post);
        data.append('category', formData.category);
        if (thumbnail) {
            data.append('thumbnail', thumbnail); // Ensure the file is added
        }
    
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/upload-blog`, {
                method: "POST",
                body: data, // Use FormData as the body
            });
            
            const result = await response.json();
            if (response.ok) {
                toast.success(result.message); // Adjust this based on your server's response
                setThumbnail(null);
                setFormData({
                    title: "",
                    post: "",
                    category: "Technology",
                    thumbnail: ""
                });
            } else {
                toast.error(result.error || "Failed to upload blog");
            }
        } catch (err) {
            console.error(err.message);
            toast.error(err.message || "An error occurred during upload");
        }
    };
    
    return (
        <div className='flex'>
            <Sidebar />
            <div className='w-full'>
                <Navbar />
                <form onSubmit={handleSubmit} className='px-10 py-4 flex flex-col gap-2'>
                    <div>
                        <p className='mb-2'>Upload Thumbnail</p>
                        <label htmlFor="image">
                            <img 
                                className='w-[100px] cursor-pointer' 
                                src={!thumbnail ? uploadIcon : URL.createObjectURL(thumbnail)} 
                                alt="Upload Thumbnail" 
                            />
                        </label>
                        <input 
                            id="image" 
                            name="thumbnail" 
                            type="file" 
                            className='hidden' 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <p className='mb-2'>Blog title</p>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title}
                            className='w-[60%] border border-black rounded-md px-2 py-2 outline-none' 
                            required 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <p className='mb-2'>Blog description</p>
                        <textarea 
                            name='post' 
                            value={formData.post}
                            cols="30" 
                            rows="10" 
                            className='w-[60%] border border-black rounded-md px-2 py-2 outline-none'
                            onChange={handleChange}
                        ></textarea>
                    </div>
                    <p className='mb-2'>Blog category</p>
                    <select 
                        name='category' 
                        value={formData.category} 
                        className='w-[60%] border border-black rounded-md px-2 py-2 outline-none'
                        onChange={handleChange}
                    >
                        <option value="Technology" className='text-black'>Technology</option>
                        <option value="Startup" className='text-black'>Startup</option>
                        <option value="Lifestyle" className='text-black'>Lifestyle</option>
                        <option value="Science" className='text-black'>Science</option>
                    </select>
                    <button className='px-8 py-2 w-fit mt-10 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000]' type="submit">Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default UploadBlog
