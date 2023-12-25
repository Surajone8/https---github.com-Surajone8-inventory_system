import React, { useContext, useState } from 'react'
import axios from "axios";
import { UserContext } from './Context/UserContext';
import { useNavigate } from 'react-router-dom';
import Login from './Login';

const SignUp = () => {
    // const userdataFields = ["name", "password"]
    const { user, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/users", formData);
            alert("Registered user!!");
            setCurrentUser(formData);
            navigate("/");
        } catch (error) {
            console.error("Error sending data:", error);

            // Display a user-friendly error message
            alert("Failed to register user. Please try again.");

            // You can also log more details about the error if needed
            console.error("Detailed error information:", error);
        }
    }

    return (
        <>
            {user ? <Login /> : <div className="form-cont">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2 className='form-header'>Sign Up</h2>
                    <div className="inp-cont">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="inp-cont">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={(e) => handleChange(e)} />
                    </div>
                    <div className="inp-cont">
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={(e) => handleChange(e)} />
                    </div>
                    <button className='submit-btn'>Submit</button>
                </form>
            </div>}
        </>
    )
}

export default SignUp