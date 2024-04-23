import React from 'react';
import {Link} from 'react-router-dom'; // Link --> similar to HTML anchor tags for redirecting
import Logo from '../img/logo.png';

function NavBar() {
    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <img src={Logo} alt="logo"/>
                </div>
                <div className="links">
                    <Link className='link' to='/'>
                        <h6>Home</h6>
                    </Link>
                    <Link className='link' to='/add_task'>
                        <h6>New Task</h6>
                    </Link>
                    <span>User's Name</span>
                    <span>
                        <Link to={'/login'} className='link'>
                            Logout
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default NavBar;