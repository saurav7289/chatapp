import axios from 'axios';

const URL = 'http://localhost:5000';

export const registration = async (data)=> {
    try {
        return await axios.post(`${URL}/user/registration`, data)
    } catch (error) {
        console.log('Error while calling registration api', error);
    }
}

export const loginApi = async (data)=> {
    try {
       return await axios.post(`${URL}/user/login`, data)
    } catch (error) {
        console.log('Error while calling login api', error);
    }
}