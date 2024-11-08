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
import CreateOffering from './components/CreateOffering'
import ViewAdminOffering from './components/ViewAdminOffering'
import UpdateOffering from './components/UpdateOfferings'
import DeleteOffering from './components/DeleteOffering';
import DeleteUsers from './components/DeleteUsers';
import InstructorDashboard from './pages/InstructorDashboard'
import Offerings from './pages/Offerings';

function App() {

  const [users, setUsers] = useState();

  const getUsers = async () => {

    try {

      const response = await api.get("/api/users");
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
          <Route path="/user-profiles/delete" element = {<DeleteUsers />} />
          <Route path="/offerings/create" element={<CreateOffering />} />
          <Route path="/admin-offerings" element={<ViewAdminOffering />} />
          <Route path="/offerings/update" element = {<UpdateOffering />} />
          <Route path="/offerings/delete" element = {<DeleteOffering />} />
          <Route path="/instructordash" element = {<InstructorDashboard />} />
          <Route path='/offerings' element = {<Offerings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;