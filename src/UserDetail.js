import React, {useState, useEffect} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Navigate, useParams, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import checkAuthOrAdmin from "./Helpers";
import JobCard from "./JobCard";
import JoblyApi from "./JoblyApi";

const UserDetail = () =>{

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
    const {username} = useParams();
    const nav = useNavigate()

    const [loading, setLoading] = useState(true);

    const [userJobs, setUserJobs] = useState([])


    useEffect(()=>{
        if(!checkAuthOrAdmin(user, username)){
            nav('/403');
        }
        setLoading(true);
        console.log(loading);
        let userJobs = []
        let promises = [];
        user.jobs.forEach((jobID)=>{
            promises.push(JoblyApi.get(`/jobs/${jobID}`,{}, localStorage.getItem('token')))
        })
        Promise.allSettled(promises).then((results)=>{
            results.forEach((result)=>{
                userJobs.push(result.value.data.job);
            });
            setLoading(false);
            setUserJobs(userJobs);
        });
    },[])


    return(
        <>
            <Card>
                <CardHeader>
                    <h1>{user.username}</h1>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        <ListGroupItem key='firstName'>
                            First Name: {user.firstName}
                        </ListGroupItem>
                        <ListGroupItem key='lastName'>
                            Last Name: {user.lastName}
                        </ListGroupItem>
                        <ListGroupItem key='email'>
                            Email: {user.email}
                        </ListGroupItem>
                        <ListGroupItem key='editLink'>
                            <Link to={`/users/${user.username}/edit`}>Edit Profile</Link>
                        </ListGroupItem>
                        <ListGroupItem>
                            {loading ? <p><b>Loading Jobs...</b></p> :
                                <>{userJobs.map((job)=>(
                                    <ListGroupItem key={job.id} style={{border:'2px solid black'}}>
                                        <JobCard job={job} />
                                    </ListGroupItem>))}
                                </> 
                            }
                        </ListGroupItem>
                    </ListGroup>
                </CardBody>
            </Card>
        </>

    )
}

export default UserDetail;