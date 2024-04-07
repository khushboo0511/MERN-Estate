import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-300 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-600">&copy; 2024 Sai Properties. All rights reserved.</p>
          </div>
          <div>
            <ul className="flex gap-4">
              <li>
                <Link to="/privacy-policy" className="text-slate-700 hover:underline">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-700 hover:underline">Terms of Service</Link>
              </li>
              <li>
                <Link to="/contact-us" className="text-slate-700 hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
