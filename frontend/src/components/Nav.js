import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {

    const auth = localStorage.getItem('user');
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div>
            <img
            alt="logo"
            className="logo"
            src='https://th.bing.com/th/id/OIP.OUCRCkZjJ_85PFH2FZt3lgHaEK?w=277&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7'/>

            {auth ? <ul className="nav-ul"> 
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={logout} to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
                :
                <ul className="nav-ul nav-right">
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            }
        </div>
    )
}

export default Nav;