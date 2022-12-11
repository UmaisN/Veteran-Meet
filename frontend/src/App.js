import './App.css';
import React, { useState,useEffect,createContext,useReducer,useContext } from "react";

// eslint-disable-next-line
// eslint-disable-next-line
//import SignUpForm from './components/signupform';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import MainScreen from '../src/components/main-screen';
import SignUpForm from '../src/components/signupform';
import LoginForm from '../src/components/loginform';
import NavBar from '../src/components/NavBar';
import SDrawerV from '../src/components/SDrawerV';
import ViewProfile from '../src/components/view-profile';
import AddPost from '../src/components/post-form';
import ViewPosts from '../src/components/view-posts';
import AddHobby from '../src/components/hobby-form';
import ViewHobby from '../src/components/view-hobby';
import EditHobby from '../src/components/edit-hobby';
import ViewEventsV from '../src/components/view-event-v';
import FollowV from '../src/components/follow-veterans';

import SignInCommunity from '../src/components/create-community';
import LoginCommunity from '../src/components/community-login';
import SDrawerC from '../src/components/SDrawerC';
import ViewProfileComm from './components/view-profilec';
import AddEvent from './components/add-event';
import ViewEvents from './components/view-events'
/*
<Route index element = {<MainScreen/>}/>
<Route path="vsignup" element={<SignUpForm/>} />
<Route path="vlogin" element={<LoginForm/>} />
<Route path="csignup" element={<SignInCommunity/>}/>
    <Route path="clogin" element={<LoginCommunity/>} />
*/
function App() {
  return (
    <Router>
    <Routes>
    <Route path="home" element={[<NavBar/>, <SDrawerV/>]} />
    <Route path="home/viewprofile" element={[<NavBar/> , <SDrawerV/>,<ViewProfile/>]} />
    <Route path="home/addpost" element= {[<NavBar/>, <SDrawerV/>,<AddPost/>]} />
    <Route path="home/viewposts" element ={[<NavBar/> ,<SDrawerV/>,<ViewPosts/>]} />
    <Route path="home/addhobby" element={[<NavBar/>, <SDrawerV/>,<AddHobby/>]} />
    <Route path="home/viewhobby" element={[<NavBar/>, <SDrawerV/>,<ViewHobby/>]} />
    <Route path="home/edithobby" element={[<NavBar/>,<SDrawerV/>,<EditHobby/>]} />
    <Route path="home/viewevents" element={[<NavBar/> ,<SDrawerV/>, <ViewEventsV/>]}/>
     <Route path="home/followv" element={[<NavBar/> ,<SDrawerV/>, <FollowV/>]}/>

    
    <Route index element={[<NavBar/>, <SDrawerC/>]}/>
    <Route path="chome/profile" element={[<NavBar/> , <SDrawerC/>,<ViewProfileComm/>]} />
    <Route path="chome/addevent" element={[<NavBar />, <SDrawerC/> ,<AddEvent/>]} />
    <Route path="chome/viewevents" element={[<NavBar />, <SDrawerC/> ,<ViewEvents/>]} />

    </Routes>
  </Router>
  );
}

export default App;