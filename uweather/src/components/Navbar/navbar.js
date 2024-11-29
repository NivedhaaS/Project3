import React from 'react';
import './navbar.css';
import earth from "../../assets/earth.png";
import github from "../../assets/github.png";
import border from "../../assets/border.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            {/* <img src={earth} alt="earth" className='earth'/> */}

            <div className="title">üweather</div>
            <button className="github">
                <a href="https://github.com/NivedhaaS/uweather" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" className="githubIcon"/> 
            </a></button>
        </nav>
    )
}

export default Navbar;
