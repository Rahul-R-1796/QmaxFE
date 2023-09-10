import React from 'react';
import './Header.css'; 

function Header() {
  return (
    <header className="app-header">
      <div className="title">
        <h1>Q-Max Post Management App</h1>
      </div>
      <div className="contact-info">
        <p>R Rahul</p>
        <p>+91 8610955329</p>
        <p>Mailid: rahulrajenderan96@gmail.com</p>
        <a href="https://github.com/Rahul-R-1796/QmaxFE.git" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </header>
  );
}

export default Header;
