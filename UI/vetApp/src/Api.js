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

export const getByIdCustomer = async () => {
    try {
        const response = await api.get('customers/getById/${id}');
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