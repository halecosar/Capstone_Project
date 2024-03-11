import axios from "axios";
import CustomerModel from "./Models/Customer"; //Her bir entity json'u için obje modelleri oluşturuldu.

const baseURL = "http://localhost:8080/v1/"
const api = axios.create({ baseURL });


//Müşteri CRUD İşlemleri:

export const saveCustomer = async (customerModel) => {
    try {
        const response = await api.post('customers/save', customerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateCustomer = async (customerModel) => {
    try {
        const response = await api.put('customers/update', customerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllCustomer = async () => {
    try {
        const response = await api.get('customers/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdCustomer = async (id) => {
    try {
        const response = await api.get('customers/getById/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const response = await api.delete('customers/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

//Doktor CRUD İşlemleri:
export const saveDoctor = async (doctorModel) => {
    try {
        const response = await api.post('doctors/save', doctorModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateDoctor = async (doctorModel) => {
    try {
        const response = await api.put('doctors/update', doctorModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllDoctor = async () => {
    try {
        const response = await api.get('doctors/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdDoctor = async () => {
    try {
        const response = await api.get('doctors/getById/${id}');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteDoctor = async (id) => {
    try {
        const response = await api.delete('doctors/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

//Animal CRUD İşlemleri:

export const saveAnimal = async (animalModel) => {
    try {
        const response = await api.post('animals/save', animalModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};
export const updateAnimal = async (animalModel) => {
    try {
        const response = await api.put('animals/update', animalModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllAnimal = async () => {
    try {
        const response = await api.get('animals/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdAnimal = async () => {
    try {
        const response = await api.get('animals/getById/${id}');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteAnimal = async (id) => {
    try {
        const response = await api.delete('animals/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

//Vaccine CRUD İşlemleri

export const saveVaccine = async (vaccineModel) => {
    try {
        const response = await api.post('vaccines/save', vaccineModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateVaccine = async (vaccineModel) => {
    try {
        const response = await api.put('vaccines/update', vaccineModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllVaccine = async () => {
    try {
        const response = await api.get('vaccines/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdVaccine = async () => {
    try {
        const response = await api.get('vaccines/getById/${id}');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteVaccine = async (id) => {
    try {
        const response = await api.delete('vaccines/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};


//Report CRUD İşlemleri

export const saveReport = async (reportModel) => {
    try {
        const response = await api.post('reports/save', reportModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateReport = async (reportModel) => {
    try {
        const response = await api.put('reports/update', reportModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllReport = async () => {
    try {
        const response = await api.get('reports/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdReport = async (id) => {
    try {
        const response = await api.get('reports/getById/${id}');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteReport = async (id) => {
    try {
        const response = await api.delete('reports/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

//Appointment CRUD İşlemleri

export const saveAppointment = async (appointmentModel) => {
    try {
        const response = await api.post('appointments/save', appointmentModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateAppointment = async (appointmentModel) => {
    try {
        const response = await api.put('appointments/update', appointmentModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllAppointment = async () => {
    try {
        const response = await api.get('appointments/findAll');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdAppointment = async (id) => {
    try {
        const response = await api.get('appointments/getById/${id}');
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteAppointment = async (id) => {
    try {
        const response = await api.delete('appointments/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

//AvailableDates CRUD İşlemleri

export const getAvailableDatesByDoctor = async (id) => {
    try {
        const response = await api.get('availabledates/getAvailableDatesByDoctor/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};


export const saveAvailableDate = async (availableDateModel) => {
    try {
        const response = await api.post('availabledates/save', availableDateModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};


export const updateAvailableDate = async (availableDateModel) => {
    try {
        const response = await api.put('availabledates/update', availableDateModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteAvailableDate = async (id) => {
    try {
        const response = await api.delete('availabledates/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};


