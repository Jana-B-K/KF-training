import React from 'react';

const Home = () => {
  return (
    <div className="page-content">
      <h1 className="page-title home-title">Welcome Home!</h1>
      <p className="page-text">
        This is the home page of our simple routing application. Navigate using the links above to explore different pages.
      </p>
      <div className="info-box home-box">
        <p>✨ No page reload - smooth navigation!</p>
      </div>
    </div>
  );
};

export default Home;