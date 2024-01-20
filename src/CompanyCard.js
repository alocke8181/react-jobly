import React from "react";

const CompanyCard = ({company}) =>{
    return(
        <>
            <h1>{company.name}</h1>
            <p>{company.description}</p>
            <i>Employees: {company.numEmployees}</i>
        </>
    )
}

export default CompanyCard;