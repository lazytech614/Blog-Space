import React, { useState } from 'react';
import likeIcon from "/thumb-up-line.svg";
import dislikeIcon from "/thumb-down-line.svg";
import getFormattedDate from '../utils/getFormattedDate';

const Comment = ({ commentator, content, date }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

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
