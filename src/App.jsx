import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
// import Users from './pages/Users'
import Home from './pages/Home';
import { BrowserRouter as Router,Route,Routes, Navigate } from "react-router-dom";
import PrivateRoute from './privaterouter/PrivateRoute';
import { AuthProvider, useLoginContext } from './context/UserContext';
import { PostProvider } from './context/PostContext';
import PasswordReset from './pages/PasswordReset';
import PrivateRouteAuth from './privaterouter/PrivateRouteAuth';
import Users from './pages/Users';
import Category from './pages/Category';
import CourseDetail from './pages/CourseDetail';
import LessonDetail from './pages/LessonDetail';
import LessonVideoDetail from './pages/LessonVideoDetail';
import Bookmark from './pages/Bookmark';
function App() {
  const [isNavOpen, setNavOpen] = useState(false);
  // const {isAuth}  = useLoginContext()
  const isAuthenticated = true


  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <>

      <Router>
        <AuthProvider>
          <PostProvider>
          <Navbar/>
            <Routes>
              <Route path="/" element = {<PrivateRoute component = {<Home/>} />} /> 
              <Route path='/users' element = {<Users/>}></Route>
              <Route path="/login" element = {<PrivateRouteAuth component = {<Login/>} />} /> 
              <Route path="/register" element = {<PrivateRouteAuth component = {<Register/>} />} />  
              <Route path="/reset" element = {<PasswordReset/>} /> 
              <Route path="/courses/category/:id/" element = {<Category/>} /> 
              <Route path="/course/:courseId/"element = {<PrivateRoute component = {<CourseDetail/>} />}   /> 
              <Route path = "course/:courseId/lesson/:lessonId/" element = {<LessonDetail/>}/>
              <Route path = "course/:courseId/lesson/:lessonId/video/:videoId/" element = {<LessonVideoDetail  />}/>
              <Route path="/bookmarks" element = {<Bookmark/>} /> 
            </Routes>
          </PostProvider>
        </AuthProvider>
      </Router>
      
      
    </>
    
  );
};

export default App
