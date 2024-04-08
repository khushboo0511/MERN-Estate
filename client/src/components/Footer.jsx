import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-slate-300 py-4">
      <div className="mx-auto px-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-slate-800">&copy; 2024 Sai Properties. All rights reserved.</p>
            <ul className="flex gap-4 mt-10">
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
          <div className='mt-3 mb-3'>
            <span className='mb-3'>Connect with us at: </span>
          <div className='flex gap-3 '>
            
            <FaGithub className="w-8 h-8" />
            <FaSquareXTwitter className="w-8 h-8" />
            <FaFacebook className="w-8 h-8" />
            </div>
          </div>
         
          <div>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1013.356431036965!2d72.7820036333072!3d19.78675459781555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be71f4f88384be3%3A0xf3778cb897c18d30!2sChoudhary%20Sales%20And%20Services!5e0!3m2!1sen!2sin!4v1712591512704!5m2!1sen!2sin" className='w-max-[600px] h-max-[600px]'></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
