import React, {useState, useEffect} from "react";
import { Card, CardBody, CardHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JobCard from './JobCard';

const Company = ({company}) =>{

    const nav = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    useEffect(()=>{
        if(!user){
            nav('/403');
        }
    },[]);

    return(
        <Card>
            <CardHeader>
                <h1>{company.name}</h1>
            </CardHeader>
            <CardBody>
                <p>{company.description}</p>
                <i>Employees: {company.numEmployees}</i>
                <ListGroup >
                    {company.jobs.map((job) =>(
                        <Link to={`/jobs/${job.id}`} key={job.id}>
                            <ListGroupItem style={{border:'2px solid black'}} >
                                <JobCard job={job} />
                            </ListGroupItem>
                        </Link>
                    ))}
                </ListGroup>
            </CardBody>
        </Card>
    )
}

export default Company;