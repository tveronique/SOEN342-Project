import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '../App.css';

const LogInForm = () => {
    const [formData, setFormData] = useState({
        phoneNumber: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/users/login', formData);
            const { phoneNumber,role } = response.data;
            console.log(response.data);

            // Save role and phoneNumber in localStorage
            localStorage.setItem('role', role);
            localStorage.setItem('phoneNumber', phoneNumber);

            // Redirect to dashboard based on role
            if (role === 'ADMIN') {
                navigate('/admindash');
            } else if (role === 'INSTRUCTOR') {
                navigate('/instructordash');
            } else {
                navigate('/home');
            }
        } catch (error) {
            setError('Invalid phone number or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>Log In</h1>
            <div className="form-group">
                <label>
                    Phone Number:
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="mt-1 p-2 border rounded w-full"
                        required
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
                        required
                    />
                </label>
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit">Log in</button>
        </form>
    );
};

export default LogInForm;
