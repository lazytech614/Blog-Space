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
      <div className='w-full py-2 px-4 flex justify-start items-center gap-2'>
        <button
          className='border border-[#FF0000] shadow-[-5px_5px_0px_#FF0000] p-2 rounded-md text-[12px]'
          onClick={onDelete}
        >
          Delete
        </button>
        <button className='border border-[#00FF00] shadow-[-5px_5px_0px_#00FF00] p-2 rounded-md text-[12px]'>
          Update
        </button>
      </div>
    </>
  )
}

export default BlogTableItem
