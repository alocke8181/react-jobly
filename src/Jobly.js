import React from "react";
import { useContext, useState, useEffect } from "react";
import UserContext from './UserContext';
import { Route, Routes } from "react-router-dom";
import NavBar from "./NavBar";
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Logout from './Logout';
import CompanySearch from "./CompanySearch";
import JobSearch from './JobSearch';
import UserList from "./UserList";
import UserDetail from "./UserDetail";
import UserEdit from "./UserEdit";
import UserDelete from "./UserDelete";
import CompanyFilter from "./CompanyFilter";
import JoblyApi from "./JoblyApi";
import NotFound from "./NotFound";
import Forbidden from "./Forbidden";

const Jobly = () =>{

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    //Check for info in local storage
    useEffect(()=>{
        if(localStorage.getItem('user') != null){
            setUser(JSON.parse(localStorage.getItem('user')));
            setToken(localStorage.getItem('token'));
        };
    },[])

    //Send a request to the backend, set user and token, add to local storage
    async function login(data){
        const {token, user} = await JoblyApi.login(data);
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return user.username;
    }

    //Send a request to the backend, set user and token, add to local storage
    async function register(data){
        const {token, user} = await JoblyApi.register(data);
        setUser(user);
        setToken(token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        return user.username;
    }

    //Send patch request to backend, update user client-side, return username
    async function editUser(data, username){
        const resp = await JoblyApi.patch(`/users/${username}`, data, token);
        const user = resp.data.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return user.username;
    }

    //Send an application request, get the updated user, save updated user
    async function applyJob(username, jobID){
        const respJob = await JoblyApi.post(`/users/${username}/jobs/${jobID}`, {}, token);
        const userResp = await JoblyApi.get(`/users/${username}`, {}, token);
        const user = userResp.data.user;
        setUser(user);
        localStorage.setItem('user',JSON.stringify(user));
    }

    

    //Clear token, user, and local storage
    const logout = () =>{
        setToken(null);
        setUser(null);
        localStorage.clear()
    }

    async function deleteUser(username){
        const resp = await JoblyApi.delete(`/users/${username}`, token);
        logout();
        return resp;
    }

    

    return (
        <UserContext.Provider value={{user, setUser}}>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/logout" element={<Logout logout={logout} />}/>
                <Route path="/login" element={<Login login={login}/>} />
                <Route path="/register" element={<Register register={register}/>} />
                <Route path="/companies" element={<CompanySearch />} />
                <Route path="/companies/:handle" element={<CompanyFilter />} />
                <Route path="/jobs" element={<JobSearch applyJob={applyJob}/>}/>
                <Route path="/users" element={<UserList />} />
                <Route path="/users/:username" element={<UserDetail   />} />
                <Route path="/users/:username/edit" element={<UserEdit editUser={editUser}/>} />
                <Route path="/users/:username/delete" element={<UserDelete deleteUser={deleteUser}/>} />
                <Route path="/403" element={<Forbidden />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </UserContext.Provider>
    )

}

export default Jobly;