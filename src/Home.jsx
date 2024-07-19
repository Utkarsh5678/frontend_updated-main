import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleSignupClick = () => {
        navigate('/signup');
    };

    return (
        <div className="home-container">
            <h2 className="home-title">TIGER ANALYTICS</h2>
            <p className="home-description">Project Management</p>
            <div className="home-buttons">
                <button className="home-button" onClick={handleLoginClick}>Login</button>
                <button className="home-button" onClick={handleSignupClick}>Sign Up</button>
            </div>
        </div>
    );
};

export default Home;
