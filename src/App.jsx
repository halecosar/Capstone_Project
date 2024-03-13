import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Customer from './Pages/Customer'
import Animal from './Pages/Animal'
import Appointment from './Pages/Appointment'
import Doctor from './Pages/Doctor'
import Vaccine from './Pages/Vaccine'
import Report from './Pages/Report'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/animal" element={<Animal />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/vaccine" element={<Vaccine />} />
          <Route path="/report" element={<Report />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
