import { useState } from "react";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
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
                navigate('/account');
            }

            setTimeout(() => {
                window.location.reload();
            }, 300);

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
            <div><p>Don't have an account ? <Link to="/signup">Register now</Link></p></div>
            {error && <p className="error-message">{error}</p>}
            <Button type="submit">Log In</Button>
        </form>
    );
};

export default LogInForm;
