
import Navigation from '../Components/Navigation'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { findAllDoctor, saveDoctor, deleteDoctor, updateDoctor } from '../Api';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [shouldFetchDoctors, setShouldFetchDoctors] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllDoctor();
                setDoctors(data);

                setShouldFetchDoctors(false);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [shouldFetchDoctors]);

    const handleDelete = async (doctorId) => {
        try {
            await deleteDoctor(doctorId);
            setShouldFetchDoctors(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true, },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, },
        { field: 'phone', headerName: 'Telefon', width: 190, editable: true, },
        { field: 'mail', headerName: 'Mail', width: 130, editable: true, },
        { field: 'address', headerName: 'Adres', width: 180, editable: true, },
        { field: 'city', headerName: 'Şehir', width: 130, editable: true, },
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

    const handleUpdate = async (params) => {
        try {
            await updateDoctor(params);
            setShouldFetchDoctors(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const submit = async (values) => {
        try {
            await saveDoctor(values);
            setShouldFetchDoctors(true);
        } catch (error) {
            console.error('Error', error);
        }
    };


    return (
        <div>
            <Navigation />
            <h1>Doktor Sayfası</h1>
            <h2>Doktor Listesi</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={doctors}
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
                <h1>Doktor Ekle</h1>
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


    )
}

export default Doctor
