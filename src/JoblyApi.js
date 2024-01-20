import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001';

class JoblyApi{

    static token;

    //Register, login, and return the token and user
    static async register(data){
        console.debug('POST', 'register', data.username);
        try{
            const respToken = await axios.post(`${BASE_URL}/auth/register`,data);
            const token = respToken.data.token;

            const respUser = await axios.get(`${BASE_URL}/users/${data.username}`,{
                headers: {Authorization: `Bearer ${token}`}
            });
            return {
                token : token,
                user : respUser.data.user
            }
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    //Login and return a token and user data
    static async login(data){
        console.debug('POST','/login', data.username);
        try{
            const respToken = await axios.post(`${BASE_URL}/auth/token`, data);
            const token = respToken.data.token;

            const respUser = await axios.get(`${BASE_URL}/users/${data.username}`,{
                    headers: {Authorization: `Bearer ${token}`}
            });
            return {
                token : token,
                user : respUser.data.user
            }
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    //Generic get request
    static async get(url, params = {}, token=JoblyApi.token){
        console.debug('GET', url, params);
        try{
            let resp = await axios.get(`${BASE_URL}${url}`, {
                headers: {Authorization: `Bearer ${token}`},
                params: params
            })
            return resp;
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }

    }

    //Generic post request
    static async post(url, data={}, token=JoblyApi.token){
        console.debug('POST', url, data)
        try{
            let resp = await axios.post(`${BASE_URL}${url}`, data, {
                headers: {Authorization: `Bearer ${token}`},  
            })
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    //Generic patch request
    static async patch(url, data={}, token=JoblyApi.token){
        console.debug('PATCH', url,data)
        try{
            let resp = await axios.patch(`${BASE_URL}${url}`, data, {
                headers: {Authorization: `Bearer ${token}`},  
            })
            return resp;
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }
    }

    //Generic delete request
    static async delete(url, token=JoblyApi.token){
        console.debug('DELETE', url);
        try{
            let resp = await axios.delete(`${BASE_URL}${url}`, {
                headers: {Authorization: `Bearer ${token}`},
            })
            return resp;
        }catch(e){
            console.error(e.message);
            let message = e.response.data.error.message
            throw Array.isArray(message) ? message : [message]
        }

    }
}

JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default JoblyApi;