import showNotification from '../components/showNotifications/showNotifications';
import { signIn } from "next-auth/react";
const axios = require('axios');

export async function createUser(userData) {
    try {
        const response = await axios.post(`/api/auth/signup`, userData);
        if (response) {
            showNotification(false, "Register Successfull")
        }
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function updateUser(userData) {
    try {
        const response = await axios.put(`/api/auth/user`, userData);
        if (response) {
            showNotification(false, "Update Successfull")
        }
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function getUser(uid) {
    try {
        
        const response = await axios.get(`/api/auth/user?id=${uid}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function createCustomer(userData) {
    try {
        const response = await axios.post(`/api/customer`, userData);
        if (response) {
            showNotification(false, "Registered Successfull")
        }
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function profileImageUpload(userData) {
    try {
        const response = await axios.post(`/api/upload`, userData);
        if (response) {
            console.log(response);
            showNotification(false, "Registered Successfull")
        }
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function getCustomers(uid) {
    try {
        
        const response = await axios.get(`/api/customer?id=${uid}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function loginUser(userData) {
    try {
        const response = await signIn("credentials", {
            redirect: false,
            email: userData.email,
            password: userData.password
        });

        if (response.ok) {
            showNotification(false, "Login Successfull")
        }else{
            showNotification(true, "Login Unuccessfull")
        }
        return response
    }
    catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}