// src/contexts/AuthContext.js 

import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  auth,
  database,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  ref,
  set,
} from '../config/firebase.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // Enriquecer el objeto de usuario con datos adicionales útiles
        const enrichedUser = {
          ...authUser,
          name: authUser.displayName || authUser.email?.split('@')[0] || 'Usuario',
        };
        setUser(enrichedUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  
    return unsubscribe;
  }, []);

  const saveUserToDatabase = (userId, userData) => {
    const userRef = ref(database, `users/${userId}`);
    set(userRef, userData)
      .catch((error) => {
        console.error("Error al guardar usuario en la base de datos:", error);
      });
  };

  const login = async (email, password) => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }

    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      let errorMessage = 'Error de inicio de sesión';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Correo electrónico o contraseña incorrectos.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Demasiados intentos fallidos. Intenta de nuevo más tarde.';
      }
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

// Dentro de AuthContext.js, modifica la función register así:

const register = async (email, password, name) => {
  if (!email || !password || !name) {
    Alert.alert('Error', 'Por favor, completa todos los campos.');
    return false;
  }

  try {
    setLoading(true);
    const result = await createUserWithEmailAndPassword(auth, email, password);

    // Guardar información adicional del usuario en Realtime Database
    await saveUserToDatabase(result.user.uid, {
      name,
      email,
      createdAt: new Date().toISOString(),
    });

    // Actualizar el perfil del usuario con el nombre
    await result.user.updateProfile({
      displayName: name,
    });
    
    return true; // Indicar que el registro fue exitoso

  } catch (error) {
    let errorMessage = 'Error de registro';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'El correo electrónico ya está en uso.';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'La contraseña es demasiado débil.';
    }
    Alert.alert('Error', errorMessage);
    return false; 
  } finally {
    setLoading(false);
  }
};

  const logout = async () => {
    try {
      setLoading(true);
      await auth.signOut();
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      isAuthenticated,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);