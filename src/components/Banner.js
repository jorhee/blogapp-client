import React from "react";
import "../css/Banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="container">
        <h2>Why Join AnimeBlog?</h2>
        <ul>
          <li>Share your favorite anime reviews and fan art.</li>
          <li>Discover anime recommendations from the community.</li>
          <li>Participate in vibrant discussions and debates.</li>
          <li>Stay updated with the latest anime trends.</li>
        </ul>
      </div>
    </section>
  );
}

export default Banner;