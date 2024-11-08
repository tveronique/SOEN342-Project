// src/components/Homepage.js
import React from "react";
import { useEffect, useState } from "react";
import '../App.css';
import logo from '../logo.svg'
import useFetchUsers from "../hooks/useFetchUsers";

const Home = () => {
    const { users, error } = useFetchUsers(); // Fetch all users
    const [instructors, setInstructors] = useState([]);
      
    useEffect(() => {
        if (users) {
            const filteredInstructors = users.filter(user => user.role === 'INSTRUCTOR');
            setInstructors(filteredInstructors);
          }
        }, [users]);

  return (
    <div className="App">
      
      {/* Header Section */}
      <header className="App-header">
        <div className="header-row">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Welcome to Actify</h1>
        </div>
        <p>Manage and explore all available lessons in one place</p>
      </header>

      {/* Featured Lessons Section */}
      <section>
        <h2 className="section-title">Popular Lessons</h2>
        <div className="card-container">
          <div className="card">
            <h3 className="card-title">Yoga Basics</h3>
            <p className="card-description">
              Build flexibility and strength with our introductory yoga classes.
            </p>
          </div>
          <div className="card">
            <h3 className="card-title">Advanced Cooking</h3>
            <p className="card-description">
              Take your culinary skills to the next level with our expert chefs.
            </p>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section>
        <h2 className="section-title">Our Instructors</h2>
        <div className="card-container">
        {instructors.map((instructor, index) => (
          <div className="card" key={index}>
            <h3 className="card-title">{instructor.name}</h3>
            <p className="card-description">{instructor.specialization.join(" & ")}</p>
          </div>
        ))}
        </div>
      </section>
    </div>
  );
};

export default Home;