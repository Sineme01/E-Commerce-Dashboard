import { Navigate, Outlet } from "react-router-dom";
import React from 'react';

const PrivateComponent = () => {
    const auth = localStorage.getItem("user");
    // console.log(auth);
    return auth ? <Outlet /> : <Navigate to={"/Signup"} />
};

export default PrivateComponent;