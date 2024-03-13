import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllAnimal, saveAnimal, deleteAnimal, updateAnimal, findAllCustomer, getByIdCustomer, getFilteredAnimalByName, getAnimalsByCustomerId } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import AnimalModel from '../Models/Animal';
import '../Style/Animal.css';
import ErrorModal from '../Components/ErrorModal';

function Animal() {
    const [animals, setAnimals] = useState([]);
    const [options, setOptions] = useState([]);
    const [shouldFetchAnimals, setShouldFetchAnimals] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', width: 85, editable: true, },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, },
        { field: 'species', headerName: 'Tür', width: 100, editable: true, },
        { field: 'breed', headerName: 'Cins', width: 100, editable: true, },
        { field: 'gender', headerName: 'Cinsiyet', width: 120, editable: true, },
        { field: 'color', headerName: 'Renk', width: 150, editable: true, },
        { field: 'dateofBirth', headerName: 'D. Günü', width: 130, editable: true, },
        {
            field: 'customer',
            headerName: 'Sahibi',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'customer';

                    const updatedRows = await Promise.all(animals.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdCustomer(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setAnimals(updatedRows);
                };

                return (
                    <Select style={{ width: '200px' }}
                        value={params.row.customer.id}
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
            headerName: 'Sil',
            width: 100,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'update',
            headerName: 'Güncelle',
            width: 150,
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
                const data = await findAllAnimal();
                setAnimals(data);

                const data2 = await findAllCustomer();

                const customerOptions = data2.map(customer => ({
                    value: customer.id,
                    label: customer.name
                }));
                setOptions(customerOptions);

                setShouldFetchAnimals(false);
            } catch (error) {
                console.error(' Hayvan listesi çekilirken hata oluştu.', error);
                setError(error);
            }
        };

        fetchData();
    }, [shouldFetchAnimals]);

    const handleDelete = async (animalId) => {
        try {
            await deleteAnimal(animalId);
            setShouldFetchAnimals(true);
        } catch (error) {
            setError("Hayvan bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    }

    const handleUpdate = async (params) => {
        try {
            await updateAnimal(params);
            setShouldFetchAnimals(true);
        } catch (error) {
            setError("Hayvan bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const submit = async (values) => {
        try {
            const model = new AnimalModel();
            model.name = values.name;
            model.gender = values.gender;
            model.dateofBirth = values.birthday;
            model.species = values.species;
            model.breed = values.breed;
            model.color = values.color;
            model.customer.id = values.customerId;

            await saveAnimal(model);
            setShouldFetchAnimals(true);
            setVisible(false);

        } catch (error) {
            console.error('Error', error);
            setError("Hayvan bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
        }
    };

    function visibleChange() {
        setVisible(true);
    }

    const searchChange = (e) => {
        setSearchValue(e.target.value);
    };


    const searchAnimal = async () => {
        try {
            const data = await getFilteredAnimalByName(searchValue);
            setAnimals(data)
            setSearchValue("");

        } catch (error) {
            console.error('Error', error);
            setError("Hayvan araması yapılırken hata oluştu.");
            setOpenModal(true);
        }
    }

    const handleCustomerChange = (event) => {
        setSelectedCustomer(event.target.value);
    };

    const searchAnimalbyCustomer = async () => {
        try {
            const data = await getAnimalsByCustomerId(selectedCustomer);
            setAnimals(data)
            setSearchValue("");

        } catch (error) {
            console.error('Error', error);
            setError("Hayvan araması yapılırken hata oluştu.");
            setOpenModal(true);
        }
    }

    return (

        <div>
            <div>
                {error && <ErrorModal errorMsg={error} openModal={openModal} setOpenModal={setOpenModal} />}
            </div>
            <Navigation />



            <div className='search'>
                <input className='searchInput'
                    type="text"
                    value={searchValue}
                    onChange={searchChange}
                />
                <button style={{ marginLeft: '35px' }} className='searchButton' onClick={searchAnimal}>  Hayvan Ara </button>
            </div>

            <div className='search'>

                <Select style={{ fontSize: '10px', width: '165px', height: '30px' }} className='searchList' value={selectedCustomer} onChange={handleCustomerChange}>


                    <MenuItem value="">Seçiniz</MenuItem>
                    {options.map(option => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>

                <button className='searchButton' onClick={searchAnimalbyCustomer}>   Müşteri İsmiyle Hayvan Ara </button>
            </div>

            <div style={{ height: 400, width: '80%', marginLeft: '10%', marginTop: '10px' }}>
                <DataGrid
                    rows={animals}
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
                <button className='addAnimal' onClick={visibleChange}> Yeni Hayvan Ekle</button>
            </div>

            <div>
                {visible && <Formik
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
                    {({ values, setFieldValue }) => (
                        <Form className="formik-containerAnimal">
                            <h1>Hayvan Ekle</h1>
                            <div className="formik-field">
                                <label htmlFor="name" className="formik-label">İsim: </label>
                                <Field id="name" name="name" />
                            </div>

                            <div className="formik-field-group">
                                <label htmlFor="gender" className="formik-label">Cinsiyet:</label>
                                <Field as="select" id="gender" name="gender" className="formik-select">
                                    <option disabled selected value="">Seçiniz</option>
                                    <option value="erkek">Erkek</option>
                                    <option value="dişi">Dişi</option>
                                </Field>
                            </div>
                            <div className="formik-field-group">
                                <label htmlFor="birthday" className="formik-label">Doğum Günü:</label>
                                <Field id="birthday" name="birthday" type="date" className="formik-input" />
                            </div>

                            <div className="formik-field">
                                <label htmlFor="species" className="formik-label">Tür:</label>
                                <Field id="species" name="species" />
                            </div>

                            <div className="formik-field">
                                <label htmlFor="breed" className="formik-label">Cins:</label>
                                <Field id="breed" name="breed" />
                            </div>

                            <div className="formik-field">
                                <label htmlFor="color" className="formik-label">Renk:</label>
                                <Field id="color" name="color" />
                            </div>

                            <div className="formik-field">
                                <label htmlFor="customerId" className="formik-label"> Hayvan Sahibi:</label>
                                <Field as="select" id="customerId" name="customerId" onChange={(event) => setFieldValue('customerId', event.target.value)} className="formik-select">
                                    <option disabled selected value=""> Hayvan Sahibini Seçiniz</option>
                                    {options.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Field>
                            </div>

                            <button type="submit" className="formik-submit-button">Kaydet</button>
                        </Form>
                    )}
                </Formik>}
                <br />

            </div>
        </div>
    )
}

export default Animal
