import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import './Navigation.css';

function Navigation() {
    return (
        <div className='navbar'>
            <div className='router'>
                <div className='logo'>
                    <Link to="/">
                        <img src={logo} style={{ width: '35px', height: '40px' }} alt="logo" />
                    </Link>
                </div>
                <Link to="/">Anasayfa</Link>
                <Link to="/customer">Müşteri</Link>
                <Link to="/animal">Hayvan</Link>
                <Link to="/appointment">Randevular</Link>
                <Link to="/doctor">Doktorlar</Link>
                <Link to="/vaccine">Aşılar</Link>
                <Link to="/report">Raporlar</Link>
            </div>
        </div>
    );
}

export default Navigation;
