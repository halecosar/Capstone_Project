import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllAnimal, saveAnimal, deleteAnimal, updateAnimal } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
function Animal() {

    const [animals, setAnimals] = useState([]);
    const [shouldFetchAnimals, setShouldFetchAnimals] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllAnimal();
                setAnimals(data);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [shouldFetchAnimals]);

    useEffect(() => {
        console.log('Selected rows:', selectedRows);
    }, [selectedRows]);

    const handleDelete = async (animalId) => {
        try {
            await deleteAnimal(animalId);
            setShouldFetchAnimals(true);
        } catch (error) {
            console.error('Error', error);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true, },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, },
        { field: 'species', headerName: 'Tür', width: 180, editable: true, },
        { field: 'breed', headerName: 'Cins', width: 130, editable: true, },
        { field: 'gender', headerName: 'Cinsiyet', width: 190, editable: true, },
        { field: 'color', headerName: 'Renk', width: 130, editable: true, },
        { field: 'dateofBirth', headerName: 'Doğum Günü', width: 130, editable: true, },
        { field: 'customerName', headerName: 'Tabi Olduğu Müşteri', width: 150, valueGetter: (params) => params.row.customer.name },
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
            await updateAnimal(params);
            setShouldFetchAnimals(true);
        } catch (error) {
            console.error('Error', error);
        }
    };


    const submit = async (values) => {
        try {
            await saveAnimal(values);
            setShouldFetchAnimals(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div>
            <Navigation />
            <h1>Hayvan Sayfası
            </h1>
            <h2>Hayvan Listesi</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={animals}
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
                <h1>Hayvan Ekle</h1>
                <Formik
                    initialValues={{
                        name: '',
                        gender: '',
                        birthday: new Date(),
                        species: '',
                        breed: '',
                        color: '',
                        customerId: '',
                    }}
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    <Form>
                        <label htmlFor="name">İsim</label>
                        <Field id="name" name="name" />

                        <label htmlFor="gender">Cinsiyet</label>
                        <Field id="gender" name="gender" />

                        <label htmlFor="birthday">Doğum Günü</label>
                        <Field id="birthday" name="birthday" type="date" />

                        <label htmlFor="species">Tür</label>
                        <Field id="species" name="species" />

                        <label htmlFor="breed">Cins</label>
                        <Field id="breed" name="breed" />

                        <label htmlFor="color">Renk</label>
                        <Field id="color" name="color" />

                        <label htmlFor="customerId">Sahibi</label>
                        <Field id="customerId" name="customerId" />
                        <button type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Animal
