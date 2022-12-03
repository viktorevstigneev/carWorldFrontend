import React from 'react';
import './style.css';

const Footer = () => (
	<div className="footer">
		<p className="footer__logo">АвтоМир</p>
		<div className="footer__wrapper">
			<a href="mailto:abc@example.com" className="footer__email">
				example@mail.ru
			</a>
			<p className="footer__copyright">Ул Курчатова,4 г.Гродно,Беларусь</p>
		</div>
	</div>
);

export default Footer;
