import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import uploadIcon from '/upload-icon.png'
import toast from 'react-hot-toast'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

    const handleQuillChange = (value) => {
        setFormData({
            ...formData,
            post: value
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
            }).then((res) => res.json());
            
            // const result = await response.json();
            if (response.success) {
                toast.success(response.message || "Blog uploaded successfully"); // Adjust this based on your server's response
                setThumbnail(null);
                setFormData({
                    title: "",
                    post: "",
                    category: "Technology",
                    thumbnail: ""
                });
            } else {
                toast.error(response.message || "Failed to upload blog");
            }
        } catch (err) {
            console.error(err.message);
            toast.error(err.message || "An error occurred during upload");
        }
    };
    
    return (
        <div className='flex flex-col sm:flex-row'>
            <Sidebar />
            <div className='w-full'>
                <Navbar />
                <form onSubmit={handleSubmit} className='px-6 lg:px-10 py-4 flex flex-col gap-2 w-full sm:w-[90%] md:w-[80%] xl:w-[60%]'>
                    <div>
                        <p className='mb-2 text-[12px] sm:text-[16px]'>Upload Thumbnail</p>
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
                        <p className='mb-2 text-[12px] sm:text-[16px]'>Blog title</p>
                        <input 
                            type="text" 
                            name="title" 
                            value={formData.title}
                            className='w-full border border-black rounded-md px-2 py-2 outline-none' 
                            required 
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <p className='mb-2 text-[12px] sm:text-[16px]'>Blog description</p>
                        <ReactQuill 
                            value={formData.post}
                            onChange={handleQuillChange}
                            theme="snow"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                                    [{ 'indent': '-1'}, { 'indent': '+1' }],
                                    ['link'],
                                    ['clean']                                        
                                ]
                            }}
                            className='bg-white border border-black rounded-md max-h-[300px] overflow-y-auto scrollbar-hidden'
                        />
                    </div>
                    <p className='mb-2 text-[12px] sm:text-[16px]'>Blog category</p>
                    <select 
                        name='category' 
                        value={formData.category} 
                        className='w-full border border-black rounded-md px-2 py-2 outline-none text-[12px] sm:text-[16px]'
                        onChange={handleChange}
                    >
                        <option value="Technology" className='text-black'>Technology</option>
                        <option value="Startup" className='text-black'>Startup</option>
                        <option value="Lifestyle" className='text-black'>Lifestyle</option>
                        <option value="Science" className='text-black'>Science</option>
                    </select>
                    <button className='px-8 py-2 w-fit mt-10 bg-white rounded-md border border-black shadow-[-5px_5px_0px_#000000] text-[12px] sm:text-[16px]' type="submit">Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default UploadBlog
