import React, {useState, useEffect} from "react";
import JoblyApi from './JoblyApi';
import { Card, CardTitle, CardBody, ListGroup, ListGroupItem, CardHeader } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CompanyCard from "./CompanyCard";

const CompanySearch = () =>{

    const nav = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))

    const [formData, setFormData] = useState({
        nameLike: '',
        minEmployees: '',
        maxEmployees: '',
    })

    const [loading, setLoading] = useState(false);

    const [companies, setCompanies] = useState([]);

    useEffect(()=>{
        if(!user){
            nav('/403');
        }
        setLoading(true)
        JoblyApi.get('/companies').then((resp) =>{
            setCompanies(resp.data.companies);
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
        JoblyApi.get('/companies',formData).then((resp)=>{
            setCompanies(resp.data.companies);
            setLoading(false);
        });
    };


    return (
        <section>
            {loading ? <h1>Loading</h1> : <></>}
            <Card>
                <CardHeader>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name</label>
                        <input 
                            type="text"
                            name="nameLike"
                            value={formData.nameLike}
                            id="nameLike"
                            onChange={handleChange}
                        />
                        <label htmlFor="minEmployees">Minimum Employees</label>
                        <input 
                            type="number"
                            id="minEmployees"
                            name="minEmployees"
                            value={formData.minEmployees}
                            min="0"
                            onChange={handleChange}
                        />
                        <label htmlFor="maxEmployees">Maximum Employees</label>
                        <input 
                            type="number"
                            id="maxEmployees"
                            name="maxEmployees"
                            value={formData.maxEmployees}
                            onChange={handleChange}
                        />
                        <button>Submit</button>
                    </form>
                </CardHeader>
                <CardBody>
                    <CardTitle>
                        Companies
                    </CardTitle>
                    <ListGroup>
                        {companies.map((company)=>(
                            <Link to={`/companies/${company.handle}`} key={company.handle}>
                                <ListGroupItem style={{border:'2px solid black'}}>
                                    <CompanyCard company={company} />
                                </ListGroupItem>
                            </Link>
                        ))}
                    </ListGroup>
                </CardBody>
            </Card>
        </section>
    )
}

export default CompanySearch;