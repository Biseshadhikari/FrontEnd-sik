import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';

function LessonVideoDetail() {
  const { lessonId, videoId, courseId } = useParams();
  const [lessonVideo, setLessonVideo] = useState([]);
  const [video, setVideo] = useState({});
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState('desc');
  const [notes, setNotes] = useState(["notes"]);
  const [searchParams, setSearchParams] = useSearchParams({ category: '' });
  const categoryItem = searchParams.get('category');

  useEffect(() => {
    lessonVideos();
    videoDetail();
    fetchCategoryData();

    if (categoryItem){
      setCategory(categoryItem);
    }
  }, [lessonId, videoId, category]);

  const noteContent = useMemo(() => {
    return (
      <>
        {isLoading ? (
          <h1 className='text-center '>Loading.....</h1>
        ) : (
          notes.map((item) => (
            <div className="bg-gray-100 flex justify-between p-3 mt-3 rounded-md" key={item.id}>
              <p>{item.title}</p>
              <div className="flex gap-3">
                <Link to="/">Visit note</Link>
                <Link to="/">Download note</Link>
              </div>
            </div>
          ))
        )}
      </>
    );
  }, [isLoading, notes]);
  

  const descriptionContent = useMemo(() => {
    return (
      <>
        {video.description ? (
          <div className="bg-gray-100 flex justify-between p-3 mt-3 rounded-md overflow-y-auto">
            <p>{video.description}</p>
          </div>
        ) : (
          <p className='mt-3 text-center text-xl font-bold text-red-500'>No Description Available</p>
        )}
      </>
    );
  }, [video.description]);

  const lessonVideos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/lesson/${lessonId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setLessonVideo(data.Lesson.lessonVideo);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    }
  };

  const videoDetail = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://127.0.0.1:8000/lessonvideo/${videoId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setVideo(data.Lesson_video);
        setNotes(data.Lesson_video.notes || []);
      } else {
        // Handle error
      }
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const fetchCategoryData = async () => {
    
      let response = await fetch(`http://127.0.0.1:8000/lessonvideo/${videoId}/note/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setNotes(data.note);
        setLoading(false)
      }
    
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-gray-100">
      <div className="flex-1 flex flex-col ">
        <div className="flex-1  bg-gray-100">
          <div className=" h-screen w-full p-3 bg-gray-300 rounded-lg overflow-y-scroll ">
            <iframe
              className="lg:h-[40vh] mx-auto lg:w-[90vh] h-[30vh] w-[30vh] sm:w-[50vh] object-cover"
              src={`https://www.youtube.com/embed/${video.video_id};start=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            <div className="bg-white p-4   sticky flex justify-between items-center  top-0 mt-2 mx-auto lg:w-[90vh]  w-[30vh] sm:w-[50vh]">
              <ul className="flex">
                <li className="mr-1" key={Math.random()}>
                  <button className={` px-4 py-2 rounded-lg block ${category === 'desc' ? 'bg-gray-300' : ''}`} onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('category', 'desc');
                      return prev;
                    },{replace:true});
                  }} value="desc">Description</button>
                </li>
                <li className="mr-1" key={Math.random()}>
                  <button className={` px-4 py-2 rounded-lg block ${category === 'notes' ? 'bg-gray-300' : ''}`} onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('category', 'notes');
                      return prev;
                    },{replace:true});
                  }} value="notes">Notes</button>
                </li>
              </ul>
            </div>
            <div id="notes" className=" bg-white px-3 md:h-[35vh] overflow-y-scroll rounded-lg mt-15  lg:w-[90vh]   h-[50vh] w-[30vh] sm:w-[50vh] mx-auto">
              {category === 'notes' && noteContent}

              {category === 'desc' && descriptionContent}
            </div>
          </div>
        </div>

        <button
          onClick={toggleSidebar}
          className={`fixed bottom-4 lg:right-[200px] right-[190px] p-2 bg-blue-500 text-white rounded-full shadow-md transition-transform transform ${
            isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {isSidebarOpen ? 'Close Playlist' : 'Open Playlist'}
        </button>
      </div>

      <nav
        className={`w-64 bg-white overflow-y-auto fixed top-0 h-full transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-200">
          <button onClick={toggleSidebar} className="text-gray-600 focus:outline-none">
            {isSidebarOpen ? 'Close' : 'Open'}
          </button>
        </div>
        <div className="overflow-y-auto">
          <h1 className='text-center text-xl font-bold text-gray-500 mt-5'>Lessons</h1>
          <ul className="space-y-2 p-4">
            {lessonVideo.map((item) => (
              <li key={item.id} className={`p-3  shadow-sm mt-3 text-none ${item.id == videoId ? 'bg-gray-200 shadow-lg rounded-xl  ' : ''} `}>
                <Link
                  to={`/course/${courseId}/lesson/${lessonId}/video/${item.id}`}
                  className="text-black-500"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default LessonVideoDetail;
