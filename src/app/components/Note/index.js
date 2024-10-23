'use client';
import { useState, useEffect } from 'react';
import { FaRegWindowMinimize,FaRegWindowMaximize } from "react-icons/fa";
import { TfiClose } from "react-icons/tfi";


export function Note({ id, title, content, left, top, onDragEnd, onDelete }) {
  
  const [isDragging, setIsDragging] = useState(false)
  const [offset, setOffset] = useState({x:0, y:0})

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setOffset({
      x: e.clientX - left,
      y: e.clientY - top
    })
  }

  const handleMouseUp = () =>{
    setIsDragging(false)
  }

  useEffect(() => {
    const handleMouseMoveGlobal = (e) => {
      if (isDragging) {
        const newLeft = e.clientX - offset.x;
        const newTop = e.clientY - offset.y;
        onDragEnd(id, { left: newLeft, top: newTop });
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveGlobal);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMoveGlobal);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, offset.x, offset.y, onDragEnd, id]);


  return (
    <div
      className="flex flex-col justify-start gap-1 w-[250px] min-h-[200px] p-1 bg-gray-300 border-t-2 border-l-2 border-gray-100 shadow-btng"
      style={{ position: 'absolute', left, top }}
    >
      <div
        onMouseDown={handleMouseDown}
        className="flex justify-between items-center p-1 w-full bg-gradient-to-r from-blue-800 to-blue-300 cursor-grab select-none"
      >
        <h2 className={`font-bold text-white whitespace-nowrap overflow-hidden overflow-ellipsis ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}>
          {title}
        </h2>
        <div className="flex gap-1">
          <button className="p-1 bg-gray-300 border-t-2 border-l-2 text-xs border-gray-200 shadow-btn">
            <FaRegWindowMinimize />
          </button>
          <button className="p-1 bg-gray-300 border-t-2 border-l-2 text-xs border-gray-200 shadow-btn">
            <FaRegWindowMaximize />
          </button>
          <button onClick={() => onDelete(id)} className="p-1 bg-gray-300 border-t-2 border-l-2 text-xs border-gray-200 shadow-btn">
            <TfiClose />
          </button>
        </div>
      </div>
      <div className="flex gap-2">
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">File</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Edit</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Search</p>
              <p className="text-sm after:content-[''] after:w-2 after:h-[1px] after:block after:bg-gray-800 after:mt-[-2px] cursor-pointer">Help</p>
            </div>
      <div className="p-1 w-full bg-white border-t-2 border-l-2 border-gray-400 shadow-btnw flex-grow relative">
        <p>{content}</p>
      </div>
    </div>
  );
}
