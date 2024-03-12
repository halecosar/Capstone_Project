import React, { useState, useEffect } from 'react';
import Navigation from '../Components/Navigation';
import { findAllCustomer, saveCustomer, deleteCustomer, updateCustomer, getFilteredCustomerByName } from '../Api';
import { DataGrid } from '@mui/x-data-grid';
import { Formik, Field, Form } from 'formik';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from "@mui/icons-material/Update";
import ErrorModal from '../Components/ErrorModal';
import '../Style/Customer.css';

function Customer() {
    const [customers, setCustomers] = useState([]);
    const [shouldFetchCustomers, setShouldFetchCustomers] = useState(false);
    const [error, setError] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
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
                    onSubmit={async (values) => {
                        await submit(values);
                    }}
                >
                    <Form className="formik-container-customer">
                        <h1>Müşteri Ekle</h1>
                        <div className="formik-field">
                            <label htmlFor="name">İsim</label>
                            <Field id="name" name="name" />
                        </div>

                        <div className="formik-field">
                            <label htmlFor="phone">Telefon Numarası</label>
                            <Field id="phone" name="phone" />
                        </div>

                        <div className="formik-field">
                            <label htmlFor="mail">Email</label>
                            <Field id="mail" name="mail" type="mail" />
                        </div>

                        <div className="formik-field">
                            <label htmlFor="address">Adres</label>
                            <Field id="address" name="address" />
                        </div>

                        <div className="formik-field">
                            <label htmlFor="city">Şehir</label>
                            <Field id="city" name="city" />
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
