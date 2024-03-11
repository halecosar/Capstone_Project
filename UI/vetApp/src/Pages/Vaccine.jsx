import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation'
import { findAllVaccine, saveVaccine, deleteVaccine, updateVaccine, findAllAnimal, getByIdAnimal } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import VaccineModel from '../Models/Vaccine';
import '../Style/Vaccine.css';
import ErrorModal from '../Components/ErrorModal';

function Vaccine() {

    const [vaccines, setVaccines] = useState([]);
    const [options, setOptions] = useState([]);
    const [shouldFetchVaccines, setShouldFetchVaccines] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false)


    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true, },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, },
        { field: 'protectionStartDate', headerName: 'Koruyuculuk Başlangıç', width: 130, editable: true, },
        { field: 'protectionFinishDate', headerName: 'Koruyuculuk Bitiş', width: 130, editable: true, },

        {
            field: 'animalName',
            headerName: 'Tabi Olduğu Hayvan',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'animal';

                    const updatedRows = await Promise.all(vaccines.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdAnimal(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setVaccines(updatedRows);
                };

                return (
                    <Select
                        value={params.row.animal.id}
                        onChange={handleChange}
                    >
                        {options.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                );
            },

        },

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
                console.error('Aşı listesi çekilirken hata oluştu.', error);
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
            setError("Aşı bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    }



    const handleUpdate = async (params) => {
        try {
            await updateVaccine(params);
            setShouldFetchVaccines(true);
        } catch (error) {
            console.error('Error', error);
            setError("Rapor bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
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
            setVisible(false)
        } catch (error) {
            console.error('Error', error);
            setError("Doktor bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
        }
    };

    function visibleChange() {
        setVisible(true);
    }

    return (
        <div>
            <div>
                {error && <ErrorModal errorMsg={error} openModal={openModal} setOpenModal={setOpenModal} />}
            </div>
            <Navigation />
            <div style={{ height: 400, width: '80%', marginLeft: '10%', marginTop: '10px' }}>
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
                <div>
                    <button className='add' onClick={visibleChange}> Yeni Aşı Ekle</button>
                </div>
            </div>



            <div>
                {visible && <Formik
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
                        <Form className="formik-container">
                            <h1>Aşı Ekle</h1>
                            <div className='form-group'>
                                <label htmlFor="name"> Aşı İsim</label>
                                <Field id="name" name="name" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="code">Kod</label>
                                <Field id="code" name="code" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="protectionStartDate">Koruyuculuk Başlangıç</label>
                                <Field className="formik-input" id="protectionStartDate" name="protectionStartDate" type="date" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="protectionFinishDate">Koruyuculuk  Bitiş</label>
                                <Field
                                    className="formik-input" id="protectionFinishDate" name="protectionFinishDate" type="date" />
                            </div>




                            <div className='form-group'>
                                <label htmlFor="animalId">Sahibi</label>
                                <Field name="animalId" className="formik-select">
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
                            </div>

                            <button type="submit" className='formik-submit-button'>Kaydet</button>
                        </Form>
                    )}
                </Formik>}

            </div>
        </div>


    )
}

export default Vaccine
