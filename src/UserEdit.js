import React, {useEffect, useState} from "react";
import JoblyApi from "./JoblyApi";

import { useParams, useNavigate } from "react-router";
import checkAuthOrAdmin from "./Helpers";
import { Card, CardBody, CardHeader } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserEdit = ({editUser})=>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {username} = useParams();
    const nav = useNavigate()

    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        if(!checkAuthOrAdmin(user, username)){
            nav('/403');
        };
    },[])

    const [formData, setFormData] = useState({
        password: '',
        firstName: user.firstName,
        lastName: user.lastName,
        email : user.email
    })

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    async function handleSubmit(e){
        setLoading(true);
        e.preventDefault();
        const usernameReturn = await editUser(formData, username);
        nav(`/users/${usernameReturn}`);
    };

    return (
        <Card>
            <CardHeader>
                {loading ? <p><b>Updating...</b></p> : <p>Edit Profile</p>}
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="password">Password: </label>
                    <input 
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <label htmlFor="firstName">First Name: </label>
                    <input 
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">Last Name: </label>
                    <input 
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email: </label>
                    <input 
                        type="text"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <button>Submit</button>
                </form>
                <Link to={`/users/${user.username}/delete`} >Delete Profile</Link>
            </CardBody>
        </Card>
    )
}

export default UserEdit;