import React from 'react'

const BlogTableItem = ({ id, title, category, created_at, onDelete }) => {
  const isoDate = created_at;
  const date = new Date(isoDate);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getUTCFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return (
    <>
      <div className='w-full py-2 px-4'>{title || "No title"}</div>
      <div className='w-full py-2 px-4'>{category || "No category"}</div>
      <div className='w-full py-2 px-4'>{formattedDate || "No date"}</div>
      <div className='w-full py-2 px-4 flex justify-start items-center gap-2 text-[12px]'>
        <button
          className='border border-[#FF0000] hover:bg-[#ff0000] hover:text-white hover:border-white duration-100 shadow-[-5px_5px_0px_#FF0000] p-2 rounded-md'
          onClick={onDelete}
        >
          <svg className='w-[12px] md:w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.5859 12L2.79297 4.20706L4.20718 2.79285L12.0001 10.5857L19.793 2.79285L21.2072 4.20706L13.4143 12L21.2072 19.7928L19.793 21.2071L12.0001 13.4142L4.20718 21.2071L2.79297 19.7928L10.5859 12Z"></path></svg>
          <span className='hidden'>Delete</span>
        </button>
        <button className='border border-[#00FF00] hover:bg-[#00ff00] hover:text-white hover:border-white duration-100 shadow-[-5px_5px_0px_#00FF00] p-2 rounded-md'>
          <svg className='w-[12px] md:w-[16px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM16.8201 17.0761C18.1628 15.8007 19 13.9981 19 12C19 8.13401 15.866 5 12 5C10.9391 5 9.9334 5.23599 9.03241 5.65834L10.0072 7.41292C10.6177 7.14729 11.2917 7 12 7C14.7614 7 17 9.23858 17 12H14L16.8201 17.0761ZM14.9676 18.3417L13.9928 16.5871C13.3823 16.8527 12.7083 17 12 17C9.23858 17 7 14.7614 7 12H10L7.17993 6.92387C5.83719 8.19929 5 10.0019 5 12C5 15.866 8.13401 19 12 19C13.0609 19 14.0666 18.764 14.9676 18.3417Z"></path></svg>
          <span className='hidden'>Update</span>
        </button>
      </div>
    </>
  )
}

export default BlogTableItem
