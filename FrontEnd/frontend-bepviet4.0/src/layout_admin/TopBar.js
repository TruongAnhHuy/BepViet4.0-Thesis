import React from 'react';
import { FaBars, FaBell, FaUserCircle } from 'react-icons/fa';

const TopBar = ({ title }) => {
  return (
    <div className="top-bar">
      <div className="top-bar-left">
        <button className="menu-btn"><FaBars /></button>
        <h2 className="top-bar-title">{title}</h2>
      </div>
      <div className="top-bar-right">
        <FaBell className="top-icon notification" />
        <FaUserCircle className="top-icon" />
      </div>
    </div>
  );
};

export default TopBar;