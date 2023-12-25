import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "../App.css"
import { UserContext } from './Context/UserContext'


const Navbar = () => {
    const { user, logOutUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOutUser();
        navigate("/SignUp")
    }


    return (
        <>
            <div className="nav-cont">
                <div className="logo">
                    <p>Inventory System</p>
                </div>
                <div className="routes">
                    <ul>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/inventory">Inventory</Link>
                        </li>
                        <li>
                            <Link to="/EditInventory">Edit-Inventory</Link>
                        </li>
                        <li>
                            {user ? <p onClick={() => handleLogOut()}>LogOut <div className='navName'>{user.name[0].toUpperCase()}</div></p> : <Link to="/SignUp">SignUp</Link>}
                        </li>
                        {/* <li>
                            <Link to="/Login">SignUp</Link>
                        </li> */}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar