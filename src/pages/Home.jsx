import React, { useState, useEffect } from "react";
import { useLoginContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import sikImage from '/home/bisesh/Desktop/Sikshyashala/frontend-sikshyashala/src/resources/sik.png';

function Home() {
  const [courses, setCourse] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedLatestCourse, setSelectedLatestCourse] = useState(null);
  const [selectedAllCourse, setSelectedAllCourse] = useState(null);

  const { token } = useLoginContext();

  useEffect(() => {
    getCourse();
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const getCourse = async () => {
    try {
      let response = await fetch('http://127.0.0.1:8000/courses/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });
      const data = await response.json();
      
      if (response.status === 200) {
        setCourse(data.courses);
        setLatestCourses(data.courses.slice(0, 3));
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleInfoClick = (courseId, isLatestCourse) => {
    if (isLatestCourse) {
      setSelectedLatestCourse(selectedLatestCourse === courseId ? null : courseId);
    } else {
      setSelectedAllCourse(selectedAllCourse === courseId ? null : courseId);
    }
  };

  const handleDocumentClick = (event) => {
    const isOutsideCourseCard = !event.target.closest('.course-card');
    const isOutsideInfoSection = !event.target.closest('.info-section');

    if (isOutsideCourseCard && isOutsideInfoSection) {
      setSelectedLatestCourse(null);
      setSelectedAllCourse(null);
    }
  };

  const handleCloseClick = (event, isLatestCourse) => {
    event.stopPropagation();

    if (isLatestCourse) {
      setSelectedLatestCourse(null);
    } else {
      setSelectedAllCourse(null);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {isLoading && (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="spinner-border text-primary" role="status">
            {/* <span className="sr-only">Loading...</span> */}
            <img src={sikImage} alt="" />
          </div>
        </div>
      )}

      {/* Latest Courses Section */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4 text-center">Latest Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestCourses.map((course) => (
            <div
              key={course.id}
              className="border p-4 shadow-md relative overflow-hidden course-card"
            >
              <img src={`http://127.0.0.1:8000${course?.image}/`} alt={course.title} className="w-full h-48 object-cover mb-4 rounded" />
              <Link to={`course/${course.id}`} className="text-blue-500 hover:underline">
                {course.title}
              </Link>
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => handleInfoClick(course.id, true)}
              >
                ℹ️
              </div>
              {selectedLatestCourse === course.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 p-6 text-sm text-gray-700 info-section">
                  <button
                    className="absolute top-4 right-4 p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={(event) => handleCloseClick(event, true)}
                  >
                    Close
                  </button>
                  <p className="text-xl font-bold mb-2">{course.title}</p>
                  <p>Total Chapters: {course.lessons.length}</p>
                  <p>Status: {course.status}</p>
                  <p>Language: {course.language}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* All Courses Section */}
      <div>
        <h2 className="text-3xl font-bold mb-4 text-center">All Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border p-4 shadow-md relative overflow-hidden course-card"
            >
              <img src={`http://127.0.0.1:8000${course?.image}/`} alt={course.title} className="w-full h-48 object-cover mb-4 rounded" />
              <Link to={`course/${course.id}`} className="text-blue-500 hover:underline">
                {course.title}
              </Link>
              <div
                className="absolute top-4 right-4 cursor-pointer"
                onClick={() => handleInfoClick(course.id, false)}
              >
                ℹ️
              </div>
              {selectedAllCourse === course.id && (
                <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-90 p-6 text-sm text-gray-700 info-section">
                  <button
                    className="absolute top-4 right-4 p-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    onClick={(event) => handleCloseClick(event, false)}
                  >
                    Close
                  </button>
                  <p className="text-xl font-bold mb-2">{course.title}</p>
                  <p>Total Chapters: {course.lessons.length}</p>
                  <p>Status: {course.status}</p>
                  <p>Language: {course.language}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
