import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllAnimal, saveAnimal, deleteAnimal } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

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

    const handleDelete = async (customerId) => {
        try {
            await deleteAnimal(animalId);
            setShouldFetchAnimals(true);
        } catch (error) {
            console.error('Error', error);
        }

        const columns = [
            { field: 'id', headerName: 'ID', width: 70 },
            { field: 'name', headerName: 'Name', width: 130 },
            { field: 'gender', headerName: 'Gender', width: 190 },
            { field: 'birthday', headerName: 'Birthday', width: 130 },
            { field: 'species', headerName: 'Species', width: 180 },
            { field: 'breed', headerName: 'Breed', width: 130 },
            { field: 'color', headerName: 'Color', width: 130 },
            { field: 'customerId', headerName: 'CustomerId', width: 130 },
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

    };

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
            <h1>Hayvan Sayfası
            </h1>
            <h2>Hayvan Listesi</h2>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={animals}
                    columns={animals}
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
                            {animals.find((animal) => animal.id === id)?.name}
                        </div>
                    ))
                ) : (
                    <div>Seçili satır yok</div>
                )}
            </div>

            <div>
                <h1>Hayvan Ekle</h1>
                <Formik
                    initialValues={{
                        name: '',
                        gender: '',
                        birthday: '',
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
                        <Field id="mail" name="mail" type="mail" />

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
