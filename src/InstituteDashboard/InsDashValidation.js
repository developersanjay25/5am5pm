import React from 'react';
import InsDash_Board from './InstituteDashboard';

const InsDashValidation = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role")

    if(role == "Institute" && token){
        return <InsDash_Board/>
    }else{
        window.location.href="/Signup"
    }
}

export default InsDashValidation;