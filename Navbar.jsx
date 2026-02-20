import {faPlane} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

export function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Handle logout logic here
    alert('Logged out successfully!');
    setIsDropdownOpen(false);
  };

  return(
    <>
    <nav className="navbar">
        <FontAwesomeIcon icon={faPlane} className="plane-icon"/>
        <ul className="nav-links">    
          <a href="#"><li>Home</li></a>
          <a href="#"><li>Flight
            <ul className="dropdown">
                <li>Schedules</li>
                <li>Offers</li>
            </ul>
          </li></a>
          <a href="#"><li>Services
            <ul className="dropdown">
              <li>Hotel</li>
              <li>Car Rental</li>
              <li>Tours</li>
            </ul>  
          </li></a>
          <a href="#"><li>Book</li></a>
          <a href="#"><li>Contact</li></a>
        </ul>
        
        {/* User icon with dropdown */}
        <div className="user-menu-container" ref={dropdownRef}>
          <FontAwesomeIcon 
            icon={faUser} 
            className={`user-icon ${isDropdownOpen ? 'active' : ''}`} 
            onClick={toggleDropdown}
          />
          
          {isDropdownOpen && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <FontAwesomeIcon icon={faUserCircle} className="dropdown-user-icon" />
                <div className="user-info">
                  <strong>John Doe</strong>
                  <span>john.doe@example.com</span>
                </div>
              </div>
              <ul className="dropdown-menu">
                <li onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }}>
                  <FontAwesomeIcon icon={faUserCircle} />
                  <span>My Profile</span>
                </li>
                
                <li onClick={() => { navigate('/my-bookings'); setIsDropdownOpen(false); }}>
                  <FontAwesomeIcon icon={faTicket} />
                  <span>My Bookings</span>
                </li>
                
                <li onClick={() => { navigate('/payment-methods'); setIsDropdownOpen(false); }}>
                  <FontAwesomeIcon icon={faCreditCard} />
                  <span>Payment Methods</span>
                </li>
                
                <li onClick={() => { navigate('/preferences'); setIsDropdownOpen(false); }}>
                  <FontAwesomeIcon icon={faHeart} />
                  <span>Travel Preferences</span>
                </li>
                
                <li onClick={() => { navigate('/settings'); setIsDropdownOpen(false); }}>
                  <FontAwesomeIcon icon={faCog} />
                  <span>Settings</span>
                </li>
                
                <li className="dropdown-divider"></li>
                
                <li className="logout-item" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <span>Logout</span>
                </li>
              </ul>
            </div>
          )}
        </div>
    </nav>
    </>
  )
}