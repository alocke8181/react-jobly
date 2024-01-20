import React, {useEffect, useState} from "react";
import { useParams } from "react-router";
import JoblyApi from "./JoblyApi";
import CompanyDetail from './CompanyDetail'

const CompanyFilter = () =>{
    const {handle} = useParams();
    const [company, setCompany] = useState({});


    useEffect(()=>{
        JoblyApi.get(`/companies/${handle}`).then((resp)=>{
            setCompany(resp.data.company)
        });
    },[]);

    return(
        <>
            {company.jobs ? <CompanyDetail company={company} /> : <p>Loading...</p>}
        </>
    )
    
}

export default CompanyFilter