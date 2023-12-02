import React, { useEffect, useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import { ToastContainer, toast } from 'react-toastify';
function CourseDetail() {
  const { courseId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({ category: '' });
  const [category, setCategory] = useState('lessons');
  const [course, setCourse] = useState({});
  const [lesson, setLesson] = useState([]);
  const [faq, setFaq] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const toggleAccordion = (index) => {
    setFaq((prevFaq) =>
      prevFaq.map((faqItem, i) => ({
        ...faqItem,
        isOpen: i === index ? !faqItem.isOpen : faqItem.isOpen,
      }))
    );
  };

  useEffect(() => {
    fetchCourse();
    fetchCategoryData();
    bookmarkDetail();

    const categoryItem = searchParams.get('category');
    if (categoryItem) {
      setCategory(categoryItem);
    }
  }, [courseId, category]);

  const [bookmark, setBookmark] = useState({});

  const bookmarkDetail = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/bookmarkdetail/course/${courseId}/ `, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });
      const data = await response.json();
      setBookmark(data);
    } catch (error) {
      // Handle error
    }
  };

  const fetchCourse = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/course/${courseId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setCourse(data.course);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      // Handle error
    }
  };

  const fetchCategoryData = async () => {
    try {
      if (category === 'lessons') {
        const response = await fetch(`http://127.0.0.1:8000/courses/${courseId}/lessons/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setLesson(data.lessons);
        }
      } else if (category === 'faq') {
        const response = await fetch(`http://127.0.0.1:8000/course/${courseId}/QandA/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
          },
        });

        const data = await response.json();

        if (response.status === 200) {
          setFaq(data.QAndA.map((item) => ({ ...item, isOpen: false })));
        }
      }
    } catch (error) {
      // Handle error
    }
  };

  const handleBookmark = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/bookmarks/course/${courseId}/ `, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token 1c7e52256d60c6ba2178722555bbe911cc7d21ff`,
        },
      });

      if (response.status === 200) {
        bookmarkDetail();
      }
    } catch (error) {
      // Handle error
    }
  };

  const memoizedLessonContent = useMemo(() => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lesson.length > 0 ? (
          lesson.map((item) => (
            <div className="bg-white p-5 flex flex-col justify-center items-center rounded-lg shadow-md" key={item.id}>
              <h2 className="text-lg font-bold mb-2">{item.title}</h2>
              <Link to={`/course/${courseId}/lesson/${item.id}`} className="bg-red-500 text-white mt-6 text-center p-3 rounded-full hover:bg-red-600 focus:outline-none focus:ring focus:border-blue-300">
                Watch All
              </Link>
            </div>
          ))
        ) : (
          <p>No lessons found</p>
        )}
      </div>
    );
  }, [lesson]);

  const memoizedFAQContent = useMemo(() => {
    return (
      <div className="accordion">
        {faq.length > 0 ? (
          faq.map((item, index) => (
            <div className={`border-b py-2 m-5 ${item.isOpen ? 'open' : ''}`} key={item.id}>
              <input type="checkbox" id={`question${index}`} className="hidden" checked={item.isOpen} onChange={() => toggleAccordion(index)} />
              <label htmlFor={`question${index}`} className="flex items-center text-gray-700 text-xl cursor-pointer">
                <span className="text-lg font-semibold">{item.question}</span>
                <i className={`ml-2 transition-transform transform ${item.isOpen ? 'rotate-180' : ''} fas fa-chevron-down`}></i>
              </label>
              <div className={`accordion-content transition-max-height duration-300 ${item.isOpen ? 'max-h-40' : 'max-h-0 overflow-hidden'}`}>
                <p className="text-gray-600 mt-2">{item.answer}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No FAQs found</p>
        )}
      </div>
    );
  }, [faq]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <img className="w-[200px]" src="https://yt3.googleusercontent.com/1JKIHlqpwMSF7NA8qclVkqZ0uxhomrmV8LSxEcy8pwrjvcbEfglnuaXL24Vfwr-bmHeKa8BAjw=s176-c-k-c0x00ffffff-no-rj" alt="" />
        </div>
      ) : (
        <div className="w-full container mx-auto h-[92vh] flex lg:flex-row flex-col">
          <div className="md:flex-[25%] flex-[35%] h-full flex flex-col border border-gray-200">
            <div className="flex-[60%] border-b border-gray-300 overflow-y-auto flex flex-col gap-3 items-center justify-center p-3">
              <img className="lg:w-[400px] w-[20px]" src={`http://127.0.0.1:8000${course?.image}/`} alt="" />
              <h2 className="font-bold">{course.title}</h2>
              <p className="text-sm lg:text-md">{course.description}</p>
            </div>
            <div className="flex-auto border-b border-gray-200 grid lg:grid-cols-3 sm:grid-cols-3 grid-cols-2 gap-3 overflow-x-scroll p-3">
              <div className="flex w-[100px] flex-col bg-gray-100 shadow-md rounded-sm justify-center items-center">
                <p>Chapters</p>
                <p>{course?.lessons.length}</p>
              </div>
              <div className="flex w-[100px] flex-col bg-gray-100 shadow-md rounded-sm justify-center items-center">
                <p>Language</p>
                <p>{course?.language}</p>
              </div>
              <div className="flex w-[100px] flex-col bg-gray-100 shadow-md rounded-sm justify-center items-center ">
                <p>Status</p>
                <p>{course?.status}</p>
              </div>
              <div className="flex w-[100px] flex-col bg-gray-100 shadow-md rounded-sm justify-center items-center">
                <p>Chapters</p>
                <p>12</p>
              </div>
            </div>
          </div>
          <div className="md:flex-[75%] flex-[65%] h-full p-3 relative">
            <h1 className="m-3 font-bold text-center lg:text-[30px] text-xl">Course Content</h1>
            <div className="bg-white p-4 rounded-lg shadow-md sticky flex justify-between items-center overflow-hidden top-0 w-full">
              <ul className="flex">
                <li className="mr-1" key={Math.random()}>
                  <button className={` px-4 py-2 rounded-lg block ${category === 'lessons' ? 'bg-gray-300' : ''}`} onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('category', 'lessons');
                      return prev;
                    }, { replace: true });
                  }} value="lessons">Lessons</button>
                </li>
                <li className="mr-1" key={Math.random()}>
                  <button className={` px-4 py-2 rounded-lg block ${category === 'faq' ? 'bg-gray-300' : ''}`} onClick={(e) => {
                    setCategory(e.target.value);
                    setSearchParams((prev) => {
                      prev.set('category', 'faq');
                      return prev;
                    }, { replace: true });
                  }} value="faq">FAQ</button>
                </li>
              </ul>
              <i
                className={`fa-bookmark text-xl ${bookmark.bookmarked ? 'text-red-500' : 'text-gray-500'} fa-regular`}
                onClick={()=>{ 
                 
                  handleBookmark()
                }}
              ></i>
            </div>

            <div className="mt-15 p-4">{category === 'lessons' && memoizedLessonContent}</div>
            <div className="mt-15 p-4">{category === 'faq' && memoizedFAQContent}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default CourseDetail;
