import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import ReportModel from '../Models/Report';
import { findAllReport, saveReport, deleteReport, updateReport, findAllVaccine } from '../Api';
import '../Style/Report.css';
import ErrorModal from '../Components/ErrorModal';

function Report() {
    const [reports, setReports] = useState([]);
    const [options, setOptions] = useState([]);
    const [shouldFetchReports, setShouldFetchReports] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllReport();
                setReports(data);

                const data2 = await findAllVaccine();

                const vaccineOptions = data2.map(vaccine => ({
                    value: vaccine.id,
                    label: vaccine.name
                }));
                setOptions(vaccineOptions);

                setShouldFetchReports(false);

            } catch (error) {
                console.error('Rapor listesi çekilirken hata oluştu.', error);
            }
        };

        fetchData();
    }, [shouldFetchReports]);

    const handleDelete = async (reportId) => {
        try {
            await deleteReport(reportId);
            setShouldFetchReports(true);
        } catch (error) {
            console.error('Error', error);
            setError("Rapor bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true },
        { field: 'title', headerName: 'Başlık', width: 130, editable: true },
        { field: 'diagnosis', headerName: 'Teşhis', width: 130, editable: true },
        { field: 'price', headerName: 'Ödeme', width: 130, editable: true },
        { field: 'vaccineName', headerName: 'Yapılan Aşı', width: 150, valueGetter: (params) => params.row.vaccine.name },
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
            await updateReport(params);
            setShouldFetchReports(true);
        } catch (error) {
            console.error('Error', error);
            setError("Rapor bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const submit = async (values) => {
        try {
            const model = new ReportModel();
            model.title = values.title;
            model.diagnosis = values.diagnosis;
            model.price = values.price;
            model.vaccine = {
                id: values.vaccineId
            };

            await saveReport(model);
            setShouldFetchReports(true);
        } catch (error) {
            console.error('Error', error);
            setError("Doktor bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
        }
    };

    return (
        <div>
            <div>
                {error && <ErrorModal errorMsg={error} openModal={openModal} setOpenModal={setOpenModal} />}
            </div>
            <Navigation />

            <div style={{ height: 400, width: '80%', marginLeft: '10%', marginTop: '10px' }}>
                <DataGrid
                    rows={reports}
                    columns={columns}
                    pageSize={5}
                />
            </div>

            <div>

                <Formik
                    initialValues={{
                        title: '',
                        diagnosis: '',
                        price: '',
                        vaccineId: '',
                    }}
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form className="formik-container">
                            <h1>Rapor Ekle</h1>
                            <div className='form-group'>
                                <label htmlFor="title"> Başlık</label>
                                <Field id="title" name="title" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="diagnosis">Teşhis</label>
                                <Field id="diagnosis" name="diagnosis" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="price">Fiyat</label>
                                <Field id="price" name="price" />
                            </div>

                            <div className='form-group' >
                                <label htmlFor="vaccineId">Aşı</label>
                                <Field name="vaccineId" className="formik-select">
                                    {({ field }) => (
                                        <Select
                                            {...field}
                                            value={values.vaccineId}
                                            onChange={(event) => setFieldValue('vaccineId', event.target.value)}
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
                </Formik>
            </div>
        </div>
    );
}
export default Report

