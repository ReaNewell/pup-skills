import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <div className="footer">
        <a href='https://www.reanewell.com' target='_blank'>Website by Rea Newell</a>
        <Link to='/help'>Privacy Policy and Help</Link>
    </div>
)

export default Footer;
