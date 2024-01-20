import React, {useState, useEffect} from "react";
import JoblyApi from "./JoblyApi";
import { Card, CardTitle, CardBody, ListGroup, ListGroupItem, CardHeader } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JobCard from "./JobCard";

const JobSearch = ({applyJob}) =>{

    const nav = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const [formData, setFormData] = useState({
        title : '',
        minSalary : '',
        hasEquity : 'false'
    })

    const [loading, setLoading] = useState(false);

    const [jobs, setJobs] = useState([])

    useEffect(()=>{
        if(!user){
            nav('/403');
        }
        setLoading(true);
        JoblyApi.get('/jobs').then((resp)=>{
            setJobs(resp.data.jobs);
            setLoading(false);
        });
    },[]);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormData((data)=>({
            ...data,
            [name]: value
        }));
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        setLoading(true);
        JoblyApi.get('/jobs',formData).then((resp)=>{
            setJobs(resp.data.jobs);
            setLoading(false);
        });
    };

    async function handleApply(e){
        e.preventDefault();
        const jobID = e.target.id;
        await applyJob(user.username, jobID);
        setUser(JSON.parse(localStorage.getItem('user')))
    }


    return (
        <section>
            {loading ? <h1>Loading</h1> : <></>}
            <Card>
                <CardHeader>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="title">Title</label>
                        <input 
                            type="text"
                            name="title"
                            value={formData.title}
                            id="title"
                            onChange={handleChange}
                        />
                        <label htmlFor="minSalary">Minimum Salary</label>
                        <input 
                            type="number"
                            id="minSalary"
                            name="minSalary"
                            value={formData.minSalary}
                            min="0"
                            onChange={handleChange}
                        />
                        <label htmlFor="hasEquity">Equity?</label>
                        <select 
                            id="hasEquity"
                            name="hasEquity"
                            value={formData.hasEquity}
                            onChange={handleChange}>
                                <option value="true">True</option>
                                <option value="false">No Preference</option>
                        </select>
                        <button>Submit</button>
                    </form>
                </CardHeader>
                <CardBody>
                    <CardTitle>
                        Jobs
                    </CardTitle>
                    <ListGroup>
                        {jobs.map((job)=>(
                            <ListGroupItem style={{border:'2px solid black'}} key={job.id}>
                                <Link to={`/companies/${job.compHandle}`} >
                                    <JobCard job={job} />
                                </Link>
                                <br/>
                                {user.jobs.includes(job.id) 
                                ? <p>Applied!</p> 
                                : <button onClick={handleApply} id={job.id}>Apply</button>}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </CardBody>
            </Card>
        </section>
    )
}

export default JobSearch;