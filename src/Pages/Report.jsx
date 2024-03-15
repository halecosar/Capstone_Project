import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import ReportModel from '../Models/Report';
import { findAllReport, saveReport, deleteReport, updateReport, findAllVaccine, getByIdVaccine, findAllAppointment, getByIdAppointment } from '../Api';
import '../Style/Report.css';
import ErrorModal from '../Components/ErrorModal';

function Report() {
    const [reports, setReports] = useState([]);
    const [options, setOptions] = useState([]);
    const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [shouldFetchReports, setShouldFetchReports] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false)


    const columns = [
        { field: 'id', headerName: 'ID', width: 90, editable: true },
        { field: 'title', headerName: 'Başlık', width: 130, editable: true },
        { field: 'diagnosis', headerName: 'Teşhis', width: 130, editable: true },
        { field: 'price', headerName: 'Ödeme', width: 130, editable: true },
        {
            field: 'vaccineName',
            headerName: 'Yapılan Aşı',
            width: 150,
            editable: true,
            cellClassName: 'custom-cell',
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'vaccine';

                    const updatedRows = await Promise.all(reports.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdVaccine(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setReports(updatedRows);
                };

                return (
                    <Select style={{ width: '200px' }}
                        value={params.row.vaccine.id}
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
            field: 'appointmentName',
            headerName: 'Randevu',
            width: 250,
            editable: true,
            cellClassName: 'custom-cell',
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'appointment';

                    const updatedRows = await Promise.all(reports.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdAppointment(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setReports(updatedRows);
                };

                return (
                    <Select style={{ width: '250px' }}
                        value={params.row.appointment.id}
                        onChange={handleChange}
                    >
                        {appointmentOptions.map(option => (
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
                const data = await findAllReport();
                setReports(data);

                const data2 = await findAllVaccine();

                const vaccineOptions = data2.map(vaccine => ({
                    value: vaccine.id,
                    label: vaccine.name
                }));
                setOptions(vaccineOptions);

                const data3 = await findAllAppointment();
                const appointmentOptionsValues = data3.map(appointment => ({
                    value: appointment.id,
                    label: appointment.animal.name + "-" + appointment.appointmentDate
                }));
                setAppointmentOptions(appointmentOptionsValues);

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
            model.appointment = {
                id: values.appointmentId
            }

            await saveReport(model);
            setShouldFetchReports(true);
            setVisible(false);
        } catch (error) {
            console.error('Error', error);
            setError("Doktor bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
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

            <div style={{ height: 400, width: '60%', marginLeft: '20%', marginTop: '40px' }}>
                <DataGrid
                    rows={reports}
                    columns={columns}
                    pageSize={5}
                />
            </div>
            <div>
                <button className='addReport' onClick={visibleChange}>Yeni Rapor Ekle</button>
            </div>
            <div>
                {visible && <Formik
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
                        <Form className="formik-container-report">
                            <h1>Rapor Ekle</h1>
                            <div className='form-group'>
                                <label htmlFor="title">     Başlık :</label>
                                <Field id="title" name="title" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="diagnosis">Teşhis:</label>
                                <Field id="diagnosis" name="diagnosis" />
                            </div>

                            <div className='form-group'>
                                <label htmlFor="price">Fiyat:</label>
                                <Field id="price" name="price" type="number" />
                            </div>

                            <div className='form-group' >
                                <label htmlFor="vaccineId">  Yapılan Aşı:</label>
                                <Field name="vaccineId" className="formik-selectVaccine">
                                    {({ field }) => (
                                        <Select style={{ width: '455px', height: '40px', marginRight: ' 30px' }}
                                            {...field}
                                            value={values.vaccineId}
                                            onChange={(event) => setFieldValue('vaccineId', event.target.value)}
                                        >
                                            <MenuItem disabled selected value="">Seçiniz</MenuItem>
                                            {options.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </Field>
                            </div>

                            <div className='form-group' >
                                <label htmlFor="appointmentId">  Randevu:</label>
                                <Field name="appointmentId" className="formik-selectVaccine">
                                    {({ field }) => (
                                        <Select style={{ width: '455px', height: '40px', marginRight: ' 30px' }}
                                            {...field}
                                            value={values.appointmentId}
                                            onChange={(event) => setFieldValue('appointmentId', event.target.value)}
                                        >
                                            <MenuItem disabled selected value="">Seçiniz</MenuItem>
                                            {appointmentOptions.map(option => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    )}
                                </Field>
                            </div>

                            <button type="submit" className='formik-submit-buttonReport'>Kaydet</button>
                        </Form>
                    )}
                </Formik>}

            </div>
        </div>
    );
}
export default Report

