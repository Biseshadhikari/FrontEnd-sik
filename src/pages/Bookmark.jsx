import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
// import './App.css';


function Bookmark() {
  
  const courses = [
    { id: 1, title: 'React Fundamentals' },
    { id: 2, title: 'Node.js Basics' },
    { id: 3, title: 'Responsive Web Design' },
  ];
  const [searchParams, setSearchParams] = useSearchParams({ type: '' });
  const [category, setCategory] = useState('course');
  const [datas,setDatas]  = useState([])
  return (
    <div className="max-w-md bg-white p-4 shadow-md rounded-md mx-auto mt-8">
      {/* Sticky Tabs */}
      <div className="sticky top-0 bg-white z-10">
        <div className="flex">
          <button onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('type', 'course');
                      return prev;
                    }, { replace: true });
                  }} className={`flex-1 px-4 py-2 bg-gray-200 : ''}`} value = "coruse">Course</button>
          <button onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('type', 'lesson');
                      return prev;
                    }, { replace: true });
                  }} className={`flex-1 px-4 py-2 bg-gray-200 : ''}`} value = "lesson">Lesson</button>
          <button onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('type', 'video');
                      return prev;
                    }, { replace: true });
                  }} className={`flex-1 px-4 py-2 bg-gray-200 : ''}`} value = "video">Video</button>
        </div>
      </div>

      {/* Tab Contents */}
      <div id="tab1" className={`tab-content  mt-4`}>
        
      </div>
     
    </div>
  );
}

export default Bookmark;
