import React from 'react';
import HeroSection from '../components/HeroSection';
import '../css/Home.css';

const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="home-content">
        <h2>Latest Blogs</h2>
        <p>Check out the most recent posts from our contributors.</p>
      </div>
    </div>
  );
};

export default Home;