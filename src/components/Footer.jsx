import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <>
      <footer className="footer bg-dark text-light py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-12"> {/* Changed to col-md-12 to center text properly */}
              <p className="footer-text">
                <a href="mailto:metgallery.ke@gmail.com" className="footer-email">Email: metgallery.ke@gmail.com</a>
              </p>
              <p className="footer-text">
                <a href="tel:+25471569966" className="footer-phone">Phone: 25471569966</a>
              </p>
              <p className="footer-text">Address: P.O.BOX 13505-0400</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
