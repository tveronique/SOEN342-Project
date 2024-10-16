import './App.css';
import api from './api/axiosConfig';
import {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import NavBar from './components/NavBar'
import Home from './pages/Home' 
import SignUp from './pages/SignUp' 
import LogIn from './pages/LogIn'
import Account from './pages/Account' 
import AdminDashboard from './pages/AdminDashboard'  
import InstructorDashboard from './pages/InstructorDashboard'

function App() {

  const [users, setUsers] = useState();

  const getUsers = async () => {

    try {

      const response = await api.get("/api/v1/users");
      console.log(response.data);
      setUsers(response.data);

    } catch(err){
        console.log(err);
    }
  }

useEffect(() => {
  getUsers();
},[])

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <NavBar />
        <Routes>
          {/* set the home page to the default page */}
          <Route index element = {<Home />} /> 
          {/* rest of the paths */}
          <Route path="/home" element = {<Home />} />
          <Route path="/signup" element = {<SignUp />} />
          <Route path="/login" element = {<LogIn />} />
          <Route path="/account" element = {<Account />} />
          <Route path="/admindash" element = {<AdminDashboard />} />
          <Route path="/instructordash" element = {<InstructorDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
