import './App.css';
import api from './api/axiosConfig';
import {useState,useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar'
import Home from './pages/Home' 
import SignUp from './pages/SignUp' 
import LogIn from './pages/LogIn'
import Account from './pages/Account' 
import AdminDashboard from './pages/AdminDashboard'  
import UserProfiles from './pages/UserProfiles'
import Offerings from './pages/Offerings'
import CreateOffering from './components/CreateOffering';
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
          <Route path="/user-profiles" element = {<UserProfiles />} />
          <Route path="/offerings" element = {<Offerings />} />
          <Route path="/offerings/create" element={<CreateOffering />} />
          <Route path="/instructordash" element = {<InstructorDashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
