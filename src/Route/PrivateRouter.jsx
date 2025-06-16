import React, { use } from 'react';
import { AuthContext } from '../component/AuthProvider';
import { Navigate, useLocation } from 'react-router';

const Privateroute = ({children}) => {
    const {user} =use(AuthContext) 
    const location = useLocation()
    if(!user){
        return <Navigate state={location?.pathname} to="/login"/>
    }

    return children
};

export default Privateroute;

// export default Privateroute;