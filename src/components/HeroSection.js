// src/pages/Home.js

import React from 'react';
import '../css/HeroSection.css';
import animebg from '../components/images/animebg.jpg';

const HeroSection = () => {

return (
    <section className="hero" style={{ backgroundImage: `url(${animebg})` }}>>
      <div className="hero-overlay">
        <div className="hero-content">
          <h1>Welcome to AnimeBlog</h1>
          <p>
            A haven for all anime fans! Whether you’re a seasoned otaku or just
            starting your anime journey, this blog is the perfect place to share
            insights, explore stories, and connect with fellow enthusiasts.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
