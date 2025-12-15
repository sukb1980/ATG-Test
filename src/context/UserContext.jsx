import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const ROLES = {
    EMPLOYEE: 'Employee',
    MANAGER: 'Manager',
    IT_AGENT: 'IT Agent',
    HR_ADMIN: 'HR Admin'
};

export function UserProvider({ children }) {
    const [role, setRole] = useState(localStorage.getItem('atg_app_role') || ROLES.EMPLOYEE);

    useEffect(() => {
        localStorage.setItem('atg_app_role', role);
    }, [role]);

    return (
        <UserContext.Provider value={{ role, setRole }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
