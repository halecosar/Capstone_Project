import React from 'react'
import Navigation from '../Components/Navigation'
import home from '../assets/home.jpg'
import '../Home.css';

function Home() {
    return (
        <div>
            <Navigation />
            <div className='home'>
                <img src={home} style={{ width: '600px', height: '600px', marginLeft: '390px', marginTop: '80px' }} alt="home" />
            </div>
            <div>
                <p style={{ marginLeft: '460px', marginTop: '-180px', fontWeight: 'bold', color: '#FCACAC', fontSize: '50px' }}>VetApp'e Hoşgeldin!</p>
            </div>

        </div>
    )
}

export default Home
