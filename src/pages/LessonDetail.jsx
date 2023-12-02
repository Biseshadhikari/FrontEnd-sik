import React, { useEffect,useState  } from 'react';
import { useParams,Link } from 'react-router-dom';

const VideoCard = ({ lessonVideo,courseId,lessonId }) => (
  <div className="bg-gray-200 p-4 rounded-md shadow-md">
   {
   lessonVideo.image?<img src={`http://127.0.0.1:8000${lessonVideo.image}`} alt="" />:
   <img src="https://www.contentviewspro.com/wp-content/uploads/2017/07/default_image.png" alt="Thumbnail" />
   }
    
    <div>
      <h2 className="text-lg font-semibold"><Link to ={`/course/${courseId}/lesson/${lessonId}/video/${lessonVideo.id}`}>{lessonVideo.title}</Link></h2>
      {/* <p className="text-sm text-gray-600">Instructor: {instructor}</p> */}
    </div>
  </div>
);



function LessonDetail() {
  const { lessonId, courseId } = useParams();
  const [lessonVideo,setLessonVideo] = useState([])
  const [videoLodaing,setVideoLoading] = useState(true)
  const [bookmark,setBookmark] = useState({})


    useEffect(()=>{ 
      bookmarkDetail()
      fetchLessonVideo()
    },[])

    const bookmarkDetail = async ()=>{
      let response = await fetch(`http://127.0.0.1:8000/bookmarkdetail/lesson/${lessonId}/ `, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });
      const data = await response.json()
      setBookmark(data)
      console.log(data)
      
    }
  
    const fetchLessonVideo = async () => {
      let response = await fetch(`http://127.0.0.1:8000/lesson/${lessonId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });

      const data = await response.json();
      
      // console.log(data.Lesson.lessonVideo)
      if (response.status === 200) {
        setVideoLoading(false)
        setLessonVideo(data.Lesson.lessonVideo);
        // setIsLoading(false);
      } else {
        setVideoLoading(false)
        // setIsLoading(false);
      }
    };
    const Bookmarked = async () => {
      let response = await fetch(`http://127.0.0.1:8000/bookmarks/lesson/${lessonId}/ `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });
      const data = await response.json()
      if (response.status == 200){ 
        bookmarkDetail()
      }
    }
    function handleBookmark() {
      Bookmarked();
      
      
  }

  return (
    <>
    {videoLodaing?(
        <h1>Loadin.....</h1>
      ):(
        <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
        <div className='w-full flex justify-between items-center px-3'>
          <h1 className="text-2xl font-bold mb-4">Videos</h1>
          <i
                    className={`fa-bookmark text-xl ${bookmark.bookmarked ? 'text-red-500' : 'text-gray-500'} fa-regular`}
                    onClick={handleBookmark}
          ></i>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {lessonVideo?.map((item) => (
            <VideoCard
              lessonVideo = {item}
              key = {item.id}
              courseId={courseId}
              lessonId={lessonId}
            />
          ))}
        </div>
      </div>
      )}
    </>
    
      
  );
}

export default LessonDetail;
