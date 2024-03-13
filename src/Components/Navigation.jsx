import React from 'react'
import './Navigation.css';
// import logo from '../assets/logo.ico';
import logo from '../assets/logo.jpg'

function Navigation() {
    return (
        <div className='navbar'>


            <div className='router'>
                <div className='logo'>
                    <a href="/">
                        <img src={logo} style={{ width: '35px', height: '40px' }} alt="logo" />
                    </a>

                </div>

                <a href="/">Anasayfa</a>
                <a href="/customer">Müşteri</a>
                <a href="/animal">Hayvan</a>
                <a href="/appointment">Randevular</a>
                <a href="/doctor">Doktorlar</a>
                <a href="/vaccine">Aşılar</a>
                <a href="/report">Raporlar</a>

            </div>





        </div>
    )
}

export default Navigation
