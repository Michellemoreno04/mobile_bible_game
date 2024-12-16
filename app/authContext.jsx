import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../components/firebase/firebaseConfig';
import { useNavigation } from '@react-navigation/native';


const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe(); // Limpieza del listener
    }, []);

    const signIn = async (email, password) => {
        await auth.signInWithEmailAndPassword(email, password);
    };

     const signOut = async () => {
         await auth.signOut();
         navigation.navigate("index");
        
    };

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuth (){
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe usarse dentro de un AuthProvider');
    }
    return context;
};
