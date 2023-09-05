import showNotification from '../components/showNotifications/showNotifications';
import { signIn } from "next-auth/react";
import AWS from "aws-sdk";

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
            showNotification(false, "enregistré avec succès")
        }
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function updateCustomer(customerData) {
    try {
        const response = await axios.put(`/api/customer`, customerData);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function profileImageUpload(imageData) {
    // S3 Credentials

    AWS.config.update({
        accessKeyId: "AKIARGH6Y45KJRPAHF7D",
        secretAccessKey: "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",
    });
    const s3 = new AWS.S3({
        params: { Bucket: 'windappuploads' },
        region: 'eu-west-3',
    });

    const params = {
        Bucket: 'windappuploads',
        Key: imageData.file.name,
        Body: imageData.file,
    };

    // Uploading file to s3
    const response = await s3.upload(params).on("httpUploadProgress", (evt) => {
        imageData.onProgress(parseInt((evt.loaded * 100) / evt.total));
    }).promise();
    return response.Location

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
            showNotification(false, "Connexion réussie")
        } 
        // else {
        //     showNotification(true, "Login Unuccessfull")
        // }
        return response
    }
    catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}


export async function pricingTableGet() {
    try {
        const response = await axios.get('/api/payment');
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function subscribe(data) {
    try {
        const response = await axios.post('/api/payment', data,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function createPayment(data) {
    try {
        const response = await axios.post(`/api/paysum`, data);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function getPayments(uid) {
    try {

        const response = await axios.get(`/api/paysum?id=${uid}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

//notification

export async function createNotification(notificationData) {
    try {
        const response = await axios.post(`/api/notification`, notificationData);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function updateNotification(userId) {
    try {
        const response = await axios.put(`/api/notification?id=${userId}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }
}

export async function getAllNotifications(userId) {
    try {
        const response = await axios.get(`/api/notification?id=${userId}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function deleteANotification(id) {
    try {
        const response = await axios.delete(`/api/notification?id=${id}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function getAllUsers() {
    try {

        const response = await axios.get(`/api/dashboard?type=user`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function getAllCustomers() {
    try {

        const response = await axios.get(`/api/dashboard?type=customer`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export async function deleteAUser(id) {
    try {
        const response = await axios.delete(`/api/dashboard?id=${id}`);
        return response.data;
    } catch (error) {
        showNotification(true, error.response.data.message)
        return error
    }

}

export const sendContactForm = async (data) =>
    fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json", Accept: "application/json" },
    }).then((res) => {
        if (!res.ok) throw new Error("Failed to send message");
        return res.json();
    });

export async function updateUserPassword(userData) {
    try {
        const response = await axios.post(`/api/auth/user`, userData);
        if (response) {
            showNotification(false, "Mot de passe mis à jour avec succès")
        }
        return response.data;
    } catch (error) {
        
        showNotification(true, error.response.data.error)
        return error
    }

}