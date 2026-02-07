import React, { createContext, useContext, useState, useEffect } from 'react';
import {
    onAuthStateChanged,
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../firebase';

const UserContext = createContext();

export const ROLES = {
    EMPLOYEE: 'Employee',
    MANAGER: 'Manager',
    IT_AGENT: 'IT Agent',
    HR_ADMIN: 'HR Admin'
};

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(localStorage.getItem('atg_app_role') || ROLES.EMPLOYEE);

    useEffect(() => {
        // If auth is not initialized (e.g. missing keys), strictly stop loading
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        localStorage.setItem('atg_app_role', role);
    }, [role]);

    const loginWithGoogle = async () => {
        if (!auth) throw new Error("Firebase not configured");
        return signInWithPopup(auth, googleProvider);
    };

    const loginWithFacebook = async () => {
        if (!auth) throw new Error("Firebase not configured");
        return signInWithPopup(auth, facebookProvider);
    };

    const logout = () => {
        if (auth) signOut(auth);
        setUser(null);
    };

    return (
        <UserContext.Provider value={{
            user,
            role,
            setRole,
            loginWithGoogle,
            loginWithFacebook,
            logout,
            loading
        }}>
            {!loading && children}
        </UserContext.Provider>
    );
}

export function useUser() {
    return useContext(UserContext);
}
