
import Navigation from '../Components/Navigation'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { findAllDoctor, saveDoctor, deleteDoctor, updateDoctor, getAvailableDatesByDoctor, updateAvailableDate, deleteAvailableDate, saveAvailableDate } from '../Api';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import AvailableDateModel from '../Models/AvailableDate';
import '../Style/Doctor.css';
import ErrorModal from '../Components/ErrorModal';

function Doctor() {
    const [doctors, setDoctors] = useState([]);
    const [shouldFetchDoctors, setShouldFetchDoctors] = useState(false);
    const [availableDates, setAvailableDates] = useState([]);
    const [selection, setSelection] = useState();
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false)


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

    const availableDatesColumns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true, },
        { field: 'availableDateDate', headerName: 'Uygun Saat', width: 130, editable: true, },
        { field: 'doctorName', headerName: '  Doktor Adı', width: 150, valueGetter: (params) => params.row.doctor.name },
        {
            field: 'remove',
            headerName: 'Kaldır',
            width: 130,
            renderCell: (params) => (
                <IconButton onClick={() => dateDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'update',
            headerName: 'Güncelle',
            width: 130,
            renderCell: (params) => (
                <IconButton onClick={() => dateUpdate(params.row)}>
                    <UpdateIcon />
                </IconButton>
            ),
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllDoctor();
                setDoctors(data);

                setShouldFetchDoctors(false);
            } catch (error) {
                console.error('Error', error);
                console.error(' Doktor listesi çekilirken hata oluştu.', error);
                setError(error);
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
            setError("Doktor bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    };



    const handleUpdate = async (params) => {
        try {
            await updateDoctor(params);
            setShouldFetchDoctors(true);
        } catch (error) {
            console.error('Error', error);
            setError("Doktor bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const submit = async (values, formBag) => {
        try {
            await saveDoctor(values);
            setShouldFetchDoctors(true);
            setVisible(false)

            formBag.resetForm();
        } catch (error) {
            console.error('Error', error);
            setError("Doktor bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const handleSelectionChange = (newSelection) => {
        setSelection(newSelection[0])
        if (newSelection[0] != undefined) {
            const fetchData = async () => {
                try {
                    const data2 = await getAvailableDatesByDoctor(newSelection[0]);
                    setAvailableDates(data2);

                } catch (error) {
                    console.error('Error fetching customer data:', error);
                }
            };

            fetchData();
        }
        else {
            setAvailableDates([]);
        }
    };


    const dateUpdate = async (params) => {
        try {
            await updateAvailableDate(params);

            const data2 = await getAvailableDatesByDoctor(selection);
            setAvailableDates(data2);

        } catch (error) {
            console.error('Error', error);
            setError("Tarih bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const dateDelete = async (availableDateId) => {
        try {
            await deleteAvailableDate(availableDateId);

            const data2 = await getAvailableDatesByDoctor(selection);
            setAvailableDates(data2);

        } catch (error) {
            console.error('Error', error);
            setError("Tarih bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const dateSave = async (values, formBag) => {
        try {
            const model = new AvailableDateModel();
            model.availableDateDate = values.availableDateDate;
            model.doctor = {
                id: selection
            };

            await saveAvailableDate(model);
            const data2 = await getAvailableDatesByDoctor(selection);
            setAvailableDates(data2);

            formBag.resetForm();
        } catch (error) {
            console.error('Error', error);
        }
    };

    function visibleChange() {
        setVisible(true)
    }

    return (
        <div>
            <div>
                {error && <ErrorModal errorMsg={error} openModal={openModal} setOpenModal={setOpenModal} />}
            </div>
            <Navigation />

            <div style={{ height: 400, width: '80%', marginLeft: '10%', marginTop: '10px' }}>
                <DataGrid
                    rows={doctors}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableMultipleSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        handleSelectionChange(newRowSelectionModel);
                    }}
                />



            </div>

            <div>
                <button className='add' onClick={visibleChange}>Doktor Ekle</button>
            </div>

            <div>
                {visible && <Formik
                    initialValues={{
                        name: '',
                        phone: '',
                        mail: '',
                        address: '',
                        city: '',
                    }}
                    onSubmit={async (values, formBag) => {
                        await submit(values, formBag);
                    }}
                >
                    <Form className="formik-containerdoctor">
                        <h1>Doktor Ekle</h1>
                        <div className="form-group"><label htmlFor="name">İsim</label>
                            <Field id="name" name="name" /></div>

                        <div className="form-group">
                            <label htmlFor="phone">Telefon Numarası</label>
                            <Field id="phone" name="phone" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="mail">Email</label>
                            <Field id="mail" name="mail" type="mail" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Adres</label>
                            <Field id="address" name="address" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="city">Şehir</label>
                            <Field id="city" name="city" />
                        </div>
                        <div>
                            <button type="submit" className='formik-submit-button'>Kaydet</button>
                        </div>

                    </Form>
                </Formik>}

            </div>
            <br />
            <br />
            <br />
            <br />
            {selection !== undefined && (
                <Formik
                    initialValues={{
                        availableDateDate: '',


                    }}
                    onSubmit={async (values, formBag) => {
                        await dateSave(values, formBag);
                    }}
                >
                    <Form className='formik-container2'>

                        <label htmlFor="availableDateDate"> Doktorun Uygun Tarihini Ekleyiniz</label>
                        <Field id="availableDateDate" name="availableDateDate" type="date" />


                        <button type="submit" className='formik-submit-button' >Kaydet</button>
                    </Form>


                </Formik>
            )}
            {selection !== undefined && (
                <DataGrid style={{ height: 400, width: '50%', marginLeft: '30%', marginTop: '10px' }}
                    rows={availableDates}
                    columns={availableDatesColumns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    disableMultipleSelection
                />


            )}
        </div>


    )
}

export default Doctor
