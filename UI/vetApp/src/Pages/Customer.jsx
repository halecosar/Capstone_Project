import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllCustomer, saveCustomer, deleteCustomer } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [shouldFetchCustomers, setShouldFetchCustomers] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

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

    useEffect(() => {
        console.log('Selected rows:', selectedRows);
    }, [selectedRows]);

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
        { field: 'name', headerName: 'Name', width: 130 },
        { field: 'phone', headerName: 'Phone', width: 190 },
        { field: 'mail', headerName: 'Mail', width: 130 },
        { field: 'address', headerName: 'Address', width: 180 },
        { field: 'city', headerName: 'City', width: 130 },
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
    ];

    const submit = async (values) => {
        try {
            await saveCustomer(values);
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
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
                    selectionModel={selectedRows}
                />
            </div>
            <div>
                <h2>Seçilen Satırlar</h2>
                {selectedRows && selectedRows.length > 0 ? (
                    selectedRows.map((id) => (
                        <div key={id}>
                            {customers.find((customer) => customer.id === id)?.name}
                        </div>
                    ))
                ) : (
                    <div>Seçili satır yok</div>
                )}
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
