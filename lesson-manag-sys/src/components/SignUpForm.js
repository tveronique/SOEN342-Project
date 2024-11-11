import '../App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        role: '',
        specialization: [''],
        availableCities: [''],
        childName: '',
        childAge: '',
        relationship:''
    });
    
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [isGuardian, setIsGuardian] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);

    const navigate = useNavigate();

    const isAllowedKey = (key) => {
        return (
            key === 'Backspace' || 
            key === 'Delete' || 
            key === 'ArrowLeft' || 
            key === 'ArrowRight'
        );
    };

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : (name === 'password' ? value : value.toUpperCase()), // Skip uppercase for password
        }));
    };

    const handleSpecializationChange = (index, value) => {
        const newSpecializations = [...formData.specialization];
        newSpecializations[index] = value.toUpperCase();
        setFormData((prevState) => ({
            ...prevState,
            specialization: newSpecializations,
        }));
    };

    const handleCityChange = (index, value) => {
        const newCities = [...formData.availableCities];
        newCities[index] = value.toUpperCase();
        setFormData((prevState) => ({
            ...prevState,
            availableCities: newCities,
        }));
    };

    const addSpecialization = () => {
        setFormData((prevState) => ({
            ...prevState,
            specialization: [...prevState.specialization, '']
        }));
    };

    const addCity = () => {
        setFormData((prevState) => ({
            ...prevState,
            availableCities: [...prevState.availableCities, '']
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData, 'isGuardian:', isGuardian, 'isInstructor:', isInstructor);
        try {
            if(isInstructor) {
                const response = await axios.post("/api/users/signup/instructor", formData);
                console.log("Instructor signed up successfully:", response.data);
                setMessage("Instructor signed up successfully !");
            }
            else if(isGuardian) {
                const response = await axios.post("/api/users/signup/guardian", formData);
                console.log("Guardian signed up successfully:", response.data);
                setMessage("Guardian signed up successfully !");
            }
            else {
                const response = await axios.post("/api/users/signup", formData);
                console.log("Signed up successfully:", response.data);
                setMessage("Signed up successfully !");
            }

            //Log in right after register
            localStorage.setItem("phoneNumber", formData.phoneNumber);
            localStorage.setItem("role", formData.role);
            
            // Redirect based on the user's role
            if (formData.role === 'ADMIN') {
                navigate("/admindash");
            } else if (formData.role === 'INSTRUCTOR') {
                navigate("/instructordash");
            } else {
                navigate("/account");
            }

            setTimeout(() => {
                window.location.reload();
            }, 100);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                setMessage("An admin user already exists. Only one admin is allowed.");
            } else {
                setMessage("An error occurred. Please try again.");
            }
        };
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>
                    Name:
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Phone Number:
                    <input
                        type="text"
                        placeholder='1234567890'
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        maxLength={10}
                        onKeyDown={(event) => {
                            if (!/[0-9]/.test(event.key) && !(isAllowedKey(event.key))) {
                                event.preventDefault();
                                }
                        }}
                    />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                    />
                </label>
            </div>
            <h3>Select your user type:</h3>
            <label className="form-group mr-3">
                <input
                    type="radio"
                    name="role"
                    value="ADMIN"
                    checked={formData.role === 'ADMIN'}
                    onChange={(e) => {handleChange(e); 
                        setIsInstructor(true);
                        setIsGuardian(false);}}
                    className="mt-1 p-2 border rounded w-full mr-3"
                />
                Admin
            </label>
            <label className="form-group">
                <input
                    className="mt-1 p-2 border rounded w-full mr-3"
                    type="radio"
                    name="role"
                    value="INSTRUCTOR"
                    checked={formData.role === 'INSTRUCTOR'}
                    onChange={(e) => {
                        handleChange(e);
                        setIsInstructor(true);
                        setIsGuardian(false);
                    }}
                />
                Instructor
            </label>
            <label className="form-group">
                <input
                className="mt-1 p-2 border rounded w-full mr-3"
                    type="radio"
                    name="role"
                    value="CLIENT"
                    checked={formData.role === 'CLIENT'}
                    onChange={(e) => {
                        handleChange(e);
                        setIsInstructor(false);
                    }}
                />
                Client
            </label>
            {formData.role === 'CLIENT' && (
                <div className="form-group">
                    <label>
                        <input
                            className="mt-1 p-2 border rounded w-full"
                            type="checkbox"
                            name="isGuardian"
                            checked={isGuardian}
                            onChange={(e) => setIsGuardian(e.target.checked)}
                        />
                        I am a guardian
                    </label>
                </div>
            )}
            {isGuardian && (
                <div className="form-group">
                    <h4>Child's Information:</h4>
                    <div className="form-group">
                        <label>
                            Child's Name:
                            <input
                                className="mt-1 p-2 border rounded w-full"
                                type="text"
                                name="childName"
                                value={formData.childName}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Child's Age:
                            <input
                                className="mt-1 p-2 border rounded w-full"
                                type="number"
                                name="childAge"
                                value={formData.childAge}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            Relationship with the Child:
                            <input
                                className="mt-1 p-2 border rounded w-full"
                                type="text"
                                name="relationship"
                                value={formData.relationship}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>
            )}
            {formData.role === 'INSTRUCTOR' && (
                <div className="form-group">
                    <h4>Specializations:</h4>
                    {formData.specialization.map((specialization, index) => (
                        <div key={index}>
                            <input
                                className="mt-1 p-2 border rounded w-full"
                                type="text"
                                value={specialization}
                                onChange={(e) => handleSpecializationChange(index, e.target.value)}
                                placeholder={`Specialization ${index + 1}`}
                            />
                        </div>
                    ))}
                    <Button type="button" onClick={addSpecialization}>
                        Add Specialization
                    </Button>
                    <h4>Available Cities:</h4>
                    {formData.availableCities.map((city, index) => (
                        <div key={index}>
                            <input
                                className="mt-1 p-2 border rounded w-full"
                                type="text"
                                value={city}
                                onChange={(e) => handleCityChange(index, e.target.value)}
                                placeholder={`City ${index + 1}`}
                            />
                        </div>
                    ))}
                    <Button type="button" onClick={addCity}>
                        Add City
                    </Button>
                </div>
            )}
            <br></br>
            <div className='mt=4'><p>Already have an account ? <Link to="/login">Log In</Link></p></div>
            <Button type="submit">Sign Up</Button>
            {message && <p>{message}</p>}
            {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
    );
};

export default SignUpForm;