import axios from "axios";
import CustomerModel from "./Models/Customer"; //Her bir entity json'u için obje modelleri oluşturuldu.

const baseURL = "http://localhost:8080/v1/"
const api = axios.create({ baseURL });


//Müşteri CRUD İşlemleri:



export const saveCustomer = async () => {
    try {
        const response = await api.post('customers/save', CustomerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const updateCustomer = async () => {
    try {
        const response = await api.put('customers/update', CustomerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const findAllCustomer = async () => {
    try {
        const response = await api.get('customers/findAll', CustomerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const getByIdCustomer = async () => {
    try {
        const response = await api.get('customers/getById/${id}', CustomerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

export const deleteCustomer = async () => {
    try {
        const response = await api.delete('customers/delete/${id}', CustomerModel);
        return response.data;
    } catch (error) {
        console.error('Error', error);
        throw error;
    }
};

