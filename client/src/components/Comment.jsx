import React, { useState } from 'react';
import likeIcon from "/thumb-up-line.svg";
import dislikeIcon from "/thumb-down-line.svg";

const Comment = ({ commentator, content, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const getFormattedDate = (dateString) => {
    const isoDate = dateString;
    const date = new Date(isoDate);

    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = date.getUTCFullYear();

    const formattedDate = `${day}-${month}-${year}`;
    return formattedDate
  }

  const formattedDate = getFormattedDate(date);

  return (
    <div className="flex flex-col gap-1">
      <div>
        <h4 className="text-sm font-semibold">{commentator}</h4>
        <p className="text-xs">{formattedDate}</p>
      </div>
      <p
        className={`text-sm ${isExpanded ? '' : 'line-clamp-2'}`}
        onClick={handleToggleExpand}
      >
        {content}
      </p>
      <div className="flex gap-2">
        <img className="w-[16px] cursor-pointer" src={likeIcon} alt="like" />
        <img className="w-[16px] cursor-pointer" src={dislikeIcon} alt="dislike" />
      </div>
      <div className='w-full h-[1px] bg-gray-300'></div>
    </div>
  );
};

export default Comment;
