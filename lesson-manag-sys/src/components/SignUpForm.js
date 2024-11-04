import '../App.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        role: '',
        specializations: [''],
        availableCities: [''],
        childName: '',
        childAge: ''
    });
    
    const [message, setMessage] = useState('');
    const [isGuardian, setIsGuardian] = useState(false);
    const [isInstructor, setIsInstructor] = useState(false);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSpecializationChange = (index, value) => {
        const newSpecializations = [...formData.specializations];
        newSpecializations[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            specializations: newSpecializations,
        }));
    };

    const handleCityChange = (index, value) => {
        const newCities = [...formData.availableCities];
        newCities[index] = value;
        setFormData((prevState) => ({
            ...prevState,
            availableCities: newCities,
        }));
    };

    const addSpecialization = () => {
        setFormData((prevState) => ({
            ...prevState,
            specializations: [...prevState.specializations, '']
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
            const response = await axios.post("/api/users/signup", formData);
            console.log("Signed up successfully:", response.data);
            setMessage("Offering successfully added!");
        } catch (error) {
            console.error("Error creating offering:", error);
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
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
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
                    value="Admin"
                    checked={formData.role === 'Admin'}
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
                    value="Instructor"
                    checked={formData.role === 'Instructor'}
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
                    value="Client"
                    checked={formData.role === 'Client'}
                    onChange={(e) => {
                        handleChange(e);
                        setIsInstructor(false);
                    }}
                />
                Client
            </label>
            {formData.role === 'Client' && (
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
                    <div>
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
                </div>
            )}
            {formData.role === 'Instructor' && (
                <div className="form-group">
                    <h4>Specializations:</h4>
                    {formData.specializations.map((specialization, index) => (
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
            <Button type="submit">Sign Up</Button>
            {message && <p className="mt-4 text-red-500">{message}</p>}
        </form>
    );
};

export default SignUpForm;