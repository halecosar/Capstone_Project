import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllCustomer, saveCustomer, deleteCustomer, updateCustomer, getFilteredCustomerByName } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import ErrorModal from '../Components/ErrorModal';
import '../Style/Customer.css';
import * as Yup from 'yup';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [shouldFetchCustomers, setShouldFetchCustomers] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', width: 90, align: 'left' },
        { field: 'name', headerName: 'İsim', width: 130, editable: true, align: 'left' },
        { field: 'phone', headerName: 'Telefon', width: 120, editable: true, align: 'left' },
        { field: 'mail', headerName: 'Mail', width: 150, editable: true, align: 'left' },
        { field: 'address', headerName: 'Adres', width: 180, editable: true, align: 'left' },
        { field: 'city', headerName: 'Şehir', width: 130, editable: true, align: 'left' },
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
                const data = await findAllCustomer();
                setCustomers(data);

                setShouldFetchCustomers(false);
            } catch (error) {
                console.error('Error', error);
                setError("Müşteri listesi çekilirken hata oluştu.");
                setOpenModal(true);
            }
        };

        fetchData();
    }, [shouldFetchCustomers]);

    const handleDelete = async (customerId) => {
        try {
            await deleteCustomer(customerId);
            setShouldFetchCustomers(true);
        } catch (error) {
            console.error('Error', error);
            setError("Müşteri bilgisi silinirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const submit = async (values) => {
        try {
            await saveCustomer(values);
            setShouldFetchCustomers(true);
            setVisible(false)
        } catch (error) {
            console.error('Error', error);
            setError("Müşteri bilgisi kaydedilirken hata oluştu.");
            setOpenModal(true);
        }
    };

    const handleUpdate = async (params) => {
        try {
            await updateCustomer(params);
            setShouldFetchCustomers(true);
        } catch (error) {
            console.error('Error', error);
            setError("Müşteri bilgisi güncellenirken hata oluştu.");
            setOpenModal(true);
        }
    };

    function visibleChange() {
        setVisible(true)
    }

    const searchChange = (e) => {
        setSearchValue(e.target.value);
    };

    const searchCustomer = async () => {
        try {
            const data = await getFilteredCustomerByName(searchValue);
            setCustomers(data)
            setSearchValue("");
        } catch (error) {
            console.error('Error', error);
            setError("Müşteri araması yapılırken hata oluştu.");
            setOpenModal(true);
        }
    }

    const refresh = async () => {
        try {
            const data = await findAllCustomer();
            setCustomers(data);
        } catch (error) {
            console.error('Error', error);
            setError("Yenile işlemi yapılırken hata oluştu.");
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

                <button className='searchButton' onClick={searchCustomer}> Müşteri Ara </button>
                <button className='searchButton' onClick={refresh}> Yenile </button>

            </div>

            <div style={{ height: 400, width: '80%', marginLeft: '10%', marginTop: '10px' }}>


                <DataGrid
                    rows={customers}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    headerClassName="custom-header"
                />
            </div>

            <div >
                <button className='addCustomer' onClick={visibleChange} > Yeni Müşteri Ekle</button>
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
                    validationSchema={Yup.object().shape({
                        name: Yup.string().required('İsim alanı zorunludur.'),
                        phone: Yup.string().required('Telefon numarası alanı zorunludur.'),
                        mail: Yup.string().email('Geçerli bir e-posta adresi girin.').required('E-posta adresi alanı zorunludur.'),
                        address: Yup.string().required('Adres alanı zorunludur.'),
                        city: Yup.string().required('Şehir alanı zorunludur.'),
                    })}
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    <Form className="formik-container-customer">
                        <h1>Müşteri Ekle</h1>
                        <div className="formik-field">
                            <label htmlFor="name">İsim</label>
                            <Field id="nameC" name="name" />
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </div>

                        <div className="formik-field">
                            <label htmlFor="phone">Telefon Numarası</label>
                            <Field id="phoneC" name="phone" />
                            <ErrorMessage name="phone" component="div" className="error-message" />

                        </div>

                        <div className="formik-field">
                            <label htmlFor="mail">Email</label>
                            <Field id="mailC" name="mail" type="mail" />
                            <ErrorMessage name="mail" component="div" className="error-message" />

                        </div>

                        <div className="formik-field">
                            <label htmlFor="address">Adres</label>
                            <Field id="addressC" name="address" />
                            <ErrorMessage name="address" component="div" className="error-message" />

                        </div>

                        <div className="formik-field">
                            <label htmlFor="city">Şehir</label>
                            <Field id="cityC" name="city" />
                            <ErrorMessage name="city" component="div" className="error-message" />
                        </div>



                        <button type="submit" className="formik-customer-submit-button">Kaydet</button>
                    </Form>
                </Formik>}
                <br />

            </div>
        </div>
    );
}

export default Customer;
