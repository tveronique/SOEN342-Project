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
import { AuthProvider } from './context/AuthContext';

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
      <AuthProvider>
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
      </AuthProvider>
    </div>
  );
}

export default App;

// import './App.css';
// import { useState, useEffect } from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import NavBar from './components/NavBar';
// import Home from './pages/Home';
// import SignUp from './pages/SignUp';
// import LogIn from './pages/LogIn';
// import Account from './pages/Account';
// import AdminDashboard from './pages/AdminDashboard';
// import UserProfiles from './pages/UserProfiles';
// import CreateOffering from './components/CreateOffering';
// import ViewAdminOffering from './components/ViewAdminOffering';
// import UpdateOffering from './components/UpdateOfferings';
// import DeleteOffering from './components/DeleteOffering';
// import DeleteUsers from './components/DeleteUsers';
// import InstructorDashboard from './pages/InstructorDashboard';
// import Offerings from './pages/Offerings';

// function App() {
//   // Get role from localStorage every time the component rerenders
//   const [role, setRole] = useState(localStorage.getItem('role'));

//   useEffect(() => {
//     const storedRole = localStorage.getItem('role');
//     setRole(storedRole); // Update role state if needed
//   }, []);

//   return (
//     <div className="App">
//       <BrowserRouter>
//         <NavBar />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/home" element={<Home />} />
//           <Route path="/signup" element={<SignUp />} />
//           <Route path="/login" element={<LogIn />} />

//           {/* Protected Routes */}
//           <Route
//             path="/account"
//             element={role === 'CLIENT' ? <Account /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/admindash"
//             element={role === 'ADMIN' ? <AdminDashboard /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/user-profiles"
//             element={role === 'ADMIN' ? <UserProfiles /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/offerings/create"
//             element={role === 'ADMIN' ? <CreateOffering /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/admin-offerings"
//             element={role === 'ADMIN' ? <ViewAdminOffering /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/offerings/update"
//             element={role === 'ADMIN' ? <UpdateOffering /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/offerings/delete"
//             element={role === 'ADMIN' ? <DeleteOffering /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/user-profiles/delete"
//             element={role === 'ADMIN' ? <DeleteUsers /> : <Navigate to="/login" />}
//           />
          
//           <Route
//             path="/instructordash"
//             element={role === 'INSTRUCTOR' ? <InstructorDashboard /> : <Navigate to="/login" />}
//           />
          
//           {/* Public Route for Offerings */}
//           <Route path="/offerings" element={<Offerings />} />
//         </Routes>
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;
