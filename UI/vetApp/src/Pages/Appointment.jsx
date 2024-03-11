import Navigation from '../Components/Navigation'
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton, MenuItem, Select } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import AppointmentModel from '../Models/Appointment';
import { saveAppointment, deleteAppointment, updateAppointment, findAllDoctor, findAllReport, findAllAnimal, findAllAppointment, getByIdReport, getByIdAnimal, getByIdDoctor } from '../Api';
import '../Style/Appointment.css';
import ErrorModal from '../Components/ErrorModal';

function Appointment() {
    const [appointments, setAppointments] = useState([]);
    const [animalOptions, setAnimalOptions] = useState([]);
    const [doctorOptions, setDoctorOptions] = useState([]);
    const [reportOptions, setReportOptions] = useState([]);
    const [shouldFetchAppointments, setShouldFetchAppointments] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, editable: true },
        { field: 'appointmentDate', headerName: 'Randevu Zamanı', width: 130, editable: true },
        {
            field: 'animalName',
            headerName: 'Hayvan Adı',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'animal';

                    const updatedRows = await Promise.all(appointments.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdAnimal(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setAppointments(updatedRows);
                };

                return (
                    <Select
                        value={params.row.animal.id}
                        onChange={handleChange}
                    >
                        {animalOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                );
            },

        },

        {
            field: 'doctorName',
            headerName: 'Doktor Adı',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'doctor';

                    const updatedRows = await Promise.all(appointments.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdDoctor(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setAppointments(updatedRows);
                };

                return (
                    <Select
                        value={params.row.doctor.id}
                        onChange={handleChange}
                    >
                        {doctorOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                );
            },

        },
        {
            field: 'reportName',
            headerName: 'Rapor Başlığı',
            width: 150,
            editable: true,
            renderCell: (params) => {
                const handleChange = async (e) => {
                    const newValue = e.target.value;
                    const { id } = params.row;
                    const field = 'report';

                    const updatedRows = await Promise.all(appointments.map(async (row) => {
                        if (row.id === id) {
                            const value = await getByIdReport(newValue);
                            return { ...row, [field]: value };
                        }
                        return row;
                    }));

                    setAppointments(updatedRows);
                };

                return (
                    <Select
                        value={params.row.report.id}
                        onChange={handleChange}
                    >
                        {reportOptions.map(option => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </Select>
                );
            },

        },
        {
            field: 'remove',
            headerName: 'Kaldır',
            width: 90,
            renderCell: (params) => (
                <IconButton onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon />
                </IconButton>
            ),
        },
        {
            field: 'update',
            headerName: 'Güncelle',
            width: 90,
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
                setError("Randevu listesi çekilirken hata oluştu.");
                setOpenModal(true);
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
            setError("Randevu bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    }




    const handleUpdate = async (params) => {
        try {
            await updateAppointment(params);
            setShouldFetchAppointments(true);
        } catch (error) {
            console.error('Error', error);
            setError("Randevu bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
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
            setVisible(false)
        } catch (error) {
            console.error('Error', error);
            setError("Randevu bilgisi kaydedilirken hata oluştu.");
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

            <div style={{ height: 400, width: '60%', marginLeft: '10%', marginTop: '10px' }}>
                <DataGrid
                    rows={appointments}
                    columns={columns}
                    pageSize={5}
                />
            </div>
            <div> <button className='add' onClick={visibleChange}> Randevu Ekle</button></div>

            <div>
                {visible && <Formik
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
                        <Form className="formik-container">
                            <h1>Randevu Ekle</h1>
                            <div className="form-group">
                                <label htmlFor="appointmentDate" className="formik-label">Randevu Tarihi:</label>
                                <Field id="appointmentDate" name="appointmentDate" type="date" className="formik-input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="appointmentTime" className="formik-label">Randevu Saati:</label>
                                <Field id="appointmentTime" name="appointmentTime" type="time" className="formik-input" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="animalId" className="formik-label">Hayvan:</label>
                                <Field as="select" id="animalId" name="animalId" className="formik-select">
                                    <option value="">Seçiniz</option>
                                    {animalOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="form-group">
                                <label htmlFor="doctorId" className="formik-label">Doktor:</label>
                                <Field as="select" id="doctorId" name="doctorId" className="formik-select">
                                    <option value="">Seçiniz</option>
                                    {doctorOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Field>
                            </div>
                            <div className="form-group">
                                <label htmlFor="reportId" className="formik-label">Rapor:</label>
                                <Field as="select" id="reportId" name="reportId" className="formik-select">
                                    <option value="">Seçiniz</option>
                                    {reportOptions.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </Field>
                            </div>
                            <button type="submit" className='formik-submit-button' >Kaydet</button>
                        </Form>

                    )}
                </Formik>}

            </div>

        </div>
    )
}

export default Appointment
