import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllCustomer, saveCustomer, deleteCustomer, updateCustomer } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [shouldFetchCustomers, setShouldFetchCustomers] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllCustomer();
                setCustomers(data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [shouldFetchCustomers]);

    const handleDelete = async (customerId) => {
        try {
            await deleteCustomer(customerId);
            setShouldFetchCustomers(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 130, editable: true, },
        { field: 'phone', headerName: 'Phone', width: 190, editable: true, },
        { field: 'mail', headerName: 'Mail', width: 130, editable: true, },
        { field: 'address', headerName: 'Address', width: 180, editable: true, },
        { field: 'city', headerName: 'City', width: 130, editable: true, },
        {
            field: 'remove',
            headerName: 'Kaldır',
            width: 130,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'update',
            headerName: 'Güncelle',
            width: 130,
            renderCell: (params) => (
                <IconButton onClick={() => handleUpdate(params.row)}>
                    <UpdateIcon />
                </IconButton>
            ),
        },
    ];

    const submit = async (values) => {
        try {
            await saveCustomer(values);
            setShouldFetchCustomers(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const handleUpdate = async (params) => {
        try {
            await updateCustomer(params);
            setShouldFetchCustomers(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

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
                />
            </div>

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
                        await submit(values);
                    }}
                >
                    <Form>
                        <label htmlFor="name">İsim</label>
                        <Field id="name" name="name" />

                        <label htmlFor="phone">Telefon Numarası</label>
                        <Field id="phone" name="phone" />

                        <label htmlFor="mail">Email</label>
                        <Field id="mail" name="mail" type="mail" />

                        <label htmlFor="address">Adres</label>
                        <Field id="address" name="address" />

                        <label htmlFor="city">Şehir</label>
                        <Field id="city" name="city" />

                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
}

export default Customer;
