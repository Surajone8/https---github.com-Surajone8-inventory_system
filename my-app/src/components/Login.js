import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { UserContext } from './Context/UserContext';

const Login = () => {
    const { user, setCurrentUser } = useContext(UserContext);
    const [currUser, setCurrUser] = useState();

    const [formData, setFormData] = useState({
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
            const response = await axios.post("http://localhost:3001/LoginUsers", formData);
            alert("logged in successfully")
            // console.log((response).data.user);
            setCurrUser((response).data.user);
            // console.log(currUser);

        } catch {
            console.log("error sending data")
        }
    }

    useEffect(() => {
        if (currUser) {
            setCurrentUser(currUser);
        }
        console.log(user);
    }, currUser)

    return (
        <>
            <div className="form-cont">
                <form onSubmit={(e) => handleSubmit(e)}>
                    <h2 className='form-header'>Log In</h2>
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
            </div>
        </>
    )
}

export default Login