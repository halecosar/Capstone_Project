import React from 'react'
import Navigation from '../Components/Navigation'
import { findAllCustomer } from '../Api';
import { useState, useEffect } from 'react';

function Customer() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const getCustomerList = async () => {
            try {
                const data = await findAllCustomer();
                setCustomers(data); // datanın result arrayini oku.
            } catch (error) {
                console.error('Error', error);
            }
        };

        getCustomerList();
    }, []);

    return (
        <div>
            <Navigation />
            <h1>Müşteri Yönetimi</h1>
            <h2>Müşteri Listesi</h2>
            {customers.map((customer, index) => (
                <div key={index} >
                    {customer.name}

                </div>
            ))}


        </div>
    )
}

export default Customer
