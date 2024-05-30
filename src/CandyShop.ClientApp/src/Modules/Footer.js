import React from 'react';

const Footer = () => {
    return (
        <footer class="footer">
        <div class="footer-section">
          <h4>Связаться с нами:</h4>
          <p>Адрес: 123 Candy Lane, Sweet City, CA 12345</p>
          <p>Email: <a href="mailto:info@candyshop.com">info@candyshop.com</a></p>
          <p>Телефон: <a href="tel:+1234567890">+1 234 567 890</a></p>
        </div>
        <div class="footer-section social-links">
          <h4>Maked By</h4>
          <h4 id="pash">Имперскими силами</h4>
          <a href="https://github.com/StoneZol" target="_blank">StoneZol</a>
          <a href="https://github.com/GriseoVul" target="_blank">GriseoVul</a>
        </div>
      </footer>
    );
}

export default Footer;
