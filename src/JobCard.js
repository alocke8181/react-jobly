import React from "react";

const JobCard = ({job}) =>{
    return(
        <>
            <h1>{job.title}</h1>
            <p>{job.salary}</p>
            <i>Equity: {job.equity}</i>
        </>
    )
}

export default JobCard;