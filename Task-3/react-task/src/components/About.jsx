import React from 'react';

const About = () => {
  return (
    <div className="page-content">
      <h1 className="page-title about-title">About Us</h1>
      <p className="page-text">
        This is a demonstration of client-side routing using React Router.
      </p>
      <p className="page-text">
        Notice how the page doesn't reload when you navigate between sections!
      </p>
      <div className="info-box about-box">
        <p>🚀 Fast and seamless transitions</p>
      </div>
    </div>
  );
};
export default About;