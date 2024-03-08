import Navigation from '../Components/Navigation'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import AppointmentModel from '../Models/Appointment';
import { saveAppointment, deleteAppointment, updateAppointment, findAllDoctor, findAllReport, findAllAnimal, findAllAppointment } from '../Api';


function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [animalOptions, setAnimalOptions] = useState([]);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [reportOptions, setReportOptions] = useState([]);
    const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await findAllAppointment();
                setAppointments(data);

                const data2 = await findAllAnimal();
                const animalOptions = data2.map(animal => ({
                    value: animal.id,
                    label: animal.name
                }));
                setAnimalOptions(animalOptions);

                const data3 = await findAllDoctor();
                const doctorOptions = data3.map(doctor => ({
                    value: doctor.id,
                    label: doctor.name
                }));
                setDoctorOptions(doctorOptions);

                const data4 = await findAllReport();
                const reportOptions = data4.map(report => ({
                    value: report.id,
                    label: report.title
                }));
                setReportOptions(reportOptions);

                setShouldFetchAppointments(false);

            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchData();
    }, [shouldFetchAppointments]);


    const handleDelete = async (appointmentId) => {
        try {
            await deleteAppointment(appointmentId);
            setShouldFetchAppointments(true);
        } catch (error) {
            console.error('Error', error);
        }
    }


    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true },
        { field: 'appointmentDate', headerName: 'Randevu Zamanı', width: 130, editable: true },

        { field: 'animalName', headerName: 'Hayvan Adı', width: 150, valueGetter: (params) => params.row.animal.name },

        { field: 'doctorName', headerName: 'Doktor Adı', width: 150, valueGetter: (params) => params.row.doctor.name },

        { field: 'reportName', headerName: 'Rapor Başlığı', width: 150, valueGetter: (params) => params.row.report.title },




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
            await updateAppointment(params);
            setShouldFetchAppointments(true);
        } catch (error) {
            console.error('Error', error);
        }
    };


    const submit = async (values) => {
        try {
            const model = new AppointmentModel();
            const appointmentDateTime = new Date(values.appointmentDate + ' ' + values.appointmentTime);
            model.appointmentDate = appointmentDateTime;
            model.doctor = {
                id: values.doctorId
            };
            model.animal = {
                id: values.animalId
            };
            model.report = {
                id: values.reportId
            };

            await saveAppointment(model);
            setShouldFetchAppointments(true);
        } catch (error) {
            console.error('Error', error);
        }
    };



    return (
        <div>
            <Navigation />
            <h1>Randevu Yönetimi</h1>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    pageSize={5}
                />
            </div>

            <div>
                <h1>Randevu Ekle</h1>
                <Formik
                    initialValues={{
                        appointmentDate: null,
                        animalId: '',
                        doctorId: '',
                        reportId: '',

                    }}
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <label htmlFor="appointmentDate"> Randevu Tarihi</label>
                            <Field id="appointmentDate" name="appointmentDate" type="date" />
                            <Field id="appointmentTime" name="appointmentTime" type="time" />


                            <label htmlFor="animalId">Hayvan</label>
                            <Field name="animalId">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        value={values.animalId}
                                        onChange={(event) => setFieldValue('animalId', event.target.value)}
                                    >
                                        <MenuItem value="">Seçiniz</MenuItem>
                                        {animalOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Field>
                            <label htmlFor="doctorId">Doktor</label>
                            <Field name="doctorId">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        value={values.doctorId}
                                        onChange={(event) => setFieldValue('doctorId', event.target.value)}
                                    >
                                        <MenuItem value="">Seçiniz</MenuItem>
                                        {doctorOptions.map(option => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </Select>
                                )}
                            </Field>
                            <label htmlFor="reportId">Rapor</label>
                            <Field name="reportId">
                                {({ field }) => (
                                    <Select
                                        {...field}
                                        value={values.reportId}
                                        onChange={(event) => setFieldValue('reportId', event.target.value)}
                                    >
                                        <MenuItem value="">Seçiniz</MenuItem>
                                        {reportOptions.map(option => (
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

export default Appointment
