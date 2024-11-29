import React from 'react';
import './navbar.css';
import earth from "../../assets/earth.png";
import github from "../../assets/github.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <img src={earth} alt="earth" className='earth'/>

            <button className="github">
                <img src={github} alt="github" className="githubIcon"/>
            </button>
        </nav>
    )
}

export default Navbar;
