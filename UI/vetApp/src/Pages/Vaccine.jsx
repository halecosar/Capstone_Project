import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation'
import { findAllVaccine, saveVaccine, deleteVaccine, updateVaccine, findAllAnimal } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import VaccineModel from '../Models/Vaccine';

function Vaccine() {

    const [vaccines, setVaccines] = useState([]);
    const [options, setOptions] = useState([]);
    const [shouldFetchVaccines, setShouldFetchVaccines] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllVaccine();
                setVaccines(data);

                const data2 = await findAllAnimal();

                const animalOptions = data2.map(animal => ({
                    value: animal.id,
                    label: animal.name
                }));
                setOptions(animalOptions);

                setShouldFetchVaccines(false);

            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchData();
    }, [shouldFetchVaccines]);

    const handleDelete = async (vaccineId) => {
        try {
            await deleteVaccine(vaccineId);
            setShouldFetchVaccines(true);
        } catch (error) {
            console.error('Error', error);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true, },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, },
        { field: 'protectionStartDate', headerName: 'Koruyuculuk Başlangıç', width: 130, editable: true, },
        { field: 'protectionFinishDate', headerName: 'Koruyuculuk Bitiş', width: 130, editable: true, },
        { field: 'animalName', headerName: 'Tabi Olduğu Hayvan', width: 150, valueGetter: (params) => params.row.animal.name },
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
            await updateVaccine(params);
            setShouldFetchVaccines(true);
        } catch (error) {
            console.error('Error', error);
        }
    };

    const submit = async (values) => {
        try {
            const model = new VaccineModel();
            model.name = values.name;
            model.code = values.code;
            model.protectionStartDate = values.protectionStartDate;
            model.protectionFinishDate = values.protectionFinishDate;

            model.animal.id = values.animalId;

            await saveVaccine(model);
            setShouldFetchVaccines(true);
        } catch (error) {
            console.error('Error', error);
        }
    };
    return (
        <div>
            <Navigation />
            <h1>Aşı Sayfası</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={vaccines}
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
                <h1>Aşı Ekle</h1>
                <Formik
                    initialValues={{
                        name: '',
                        code: '',
                        protectionStartDate: new Date(),
                        protectionFinishDate: new Date(),
                        animalId: '',

                    }}
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <label htmlFor="name"> Aşı İsim</label>
                            <Field id="name" name="name" />

                            <label htmlFor="code">Kod</label>
                            <Field id="code" name="code" />

                            <label htmlFor="protectionStartDate">Koruyuculuk Başlangıç</label>
                            <Field id="protectionStartDate" name="protectionStartDate" type="date" />

                            <label htmlFor="protectionFinishDate">Koruyuculuk  Bitiş</label>
                            <Field id="protectionFinishDate" name="protectionFinishDate" type="date" />




                            <label htmlFor="animalId">Sahibi</label>
                            <Field name="animalId">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        value={values.selectedOption}
                                        onChange={(event) => setFieldValue('animalId', event.target.value)}
                                    >
                                        <MenuItem value="">Select an option</MenuItem>
                                        {options.map(option => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Field>

                            <button type="submit">Submit</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>


    )
}

export default Vaccine
