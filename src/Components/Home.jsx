import React from 'react';
import './CSS/Home.css';
import Navbar from './Navbar';
export default function Home() {
    return (
        <>
        <Navbar/>
        <div className="home-container">
            <h1>Welcome to My Website</h1>
            <p>This is the home page of my website. Feel free to explore!</p>
        </div>
        </>
    );
}
