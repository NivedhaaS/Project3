import React from 'react';
import './navbar.css';
import earth from "../../assets/earth.png";
import github from "../../assets/github.png";
import border from "../../assets/border.png";
import cloud from "../../assets/cloud.png";
const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="title">üweather</div>
            <button className="github">
            <img src={cloud} alt="cloud" className='cloud'    style={{ transform: 'translate(-560px, -9px)' }}/>
                <a href="https://github.com/NivedhaaS/uweather" target="_blank" rel="noopener noreferrer">
                <img src={github} alt="github" className="githubIcon"/> 
            </a></button>
        </nav>
    )
}

export default Navbar;
