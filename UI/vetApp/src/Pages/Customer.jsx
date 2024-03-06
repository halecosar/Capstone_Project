import React from 'react'
import Navigation from '../Components/Navigation'
import { findAllCustomer, saveCustomer } from '../Api';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';

const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'phone', headerName: 'Phone', width: 190 },
    { field: 'mail', headerName: 'Mail', width: 130 },
    { field: 'address', headerName: 'Address', width: 180 },
    { field: 'city', headerName: 'City', width: 130 },
];

function Customer() {

    const [customers, setCustomers] = useState([]);
    const [shouldFetchCustomers, setShouldFetchCustomers] = useState();


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
    }, [shouldFetchCustomers]);

    function submit(values) {
        const saveCustomerSubmit = async () => {
            try {
                await saveCustomer(values);
                setShouldFetchCustomers(true);
            } catch (error) {
                console.error('Error', error);
            }
        };

        saveCustomerSubmit();
        values = '';
    }

    return (
        <div>
            <Navigation />
            <h1>Müşteri Yönetimi</h1>
            <h2>Müşteri Listesi</h2>

            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={customers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
                <div>
                    <h1>Müşteri Ekle</h1>
                    <Formik
                        initialValues={{
                            name: '',
                            phone: '',
                            mail: '',
                            address: '',
                            city: '',
                        }}
                        onSubmit={async (values) => {
                            await new Promise((r) => setTimeout(r, 500));
                            await submit(values);
                        }}
                    >
                        <Form>
                            <label htmlFor="name">İsim</label>
                            <Field id="name" name="name" />

                            <label htmlFor="phone">Telefon Numarası</label>
                            <Field id="phone" name="phone" />

                            <label htmlFor="mail">Email</label>
                            <Field
                                id="mail"
                                name="mail"

                                type="mail"
                            />
                            <label htmlFor="address">Adres</label>
                            <Field id="address" name="address" />

                            <label htmlFor="city">Şehir</label>
                            <Field id="city" name="city" />
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
            </div>


        </div>
    )
}

export default Customer
