import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { THEME } from '../../../theme.js';
import { database, ref, get } from '../../config/firebase.js'; 

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user && user.uid) {
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);
          
          if (snapshot.exists()) {
            setProfileData(snapshot.val());
            console.log("Datos del perfil cargados:", snapshot.val()); // Para depuración
          } else {
            // Si no hay datos adicionales, usar la información básica de autenticación
            const basicProfileData = {
              name: user.displayName || 'Usuario',
              email: user.email,
              photoURL: user.photoURL
            };
            setProfileData(basicProfileData);
            console.log("Usando datos básicos de autenticación:", basicProfileData); // Para depuración
          }
        } catch (error) {
          console.error("Error al obtener datos del perfil:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  // Función para manejar el cierre de sesión y redireccionar a Home
  const handleLogout = async () => {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  // Si no hay datos de perfil, mostrar mensaje
  if (!profileData) {
    return (
      <View style={{ flex: 1, padding: THEME.spacing.md }}>
        <Header title="Mi Perfil" onBack={() => navigation.navigate('Dashboard')} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>No se pudo cargar la información del perfil</Text>
          <TouchableOpacity 
            style={{ 
              padding: THEME.spacing.md, 
              marginTop: THEME.spacing.lg,
              backgroundColor: THEME.colors.error,
              borderRadius: 8,
              alignItems: 'center'
            }} 
            onPress={handleLogout}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: THEME.spacing.md }}>
      <Header title="Mi Perfil" onBack={() => navigation.navigate('Dashboard')} />
      <ScrollView>
        <View style={{ alignItems: 'center', marginVertical: THEME.spacing.lg }}>
          <View style={{ 
            backgroundColor: THEME.colors.primary, 
            padding: THEME.spacing.lg, 
            borderRadius: 50,
            width: 80,
            height: 80,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>
              {profileData.name ? profileData.name.charAt(0).toUpperCase() : '?'}
            </Text>
          </View>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: THEME.spacing.md }}>
            {profileData.name || 'Usuario'}
          </Text>
          <Text style={{ color: THEME.colors.textLight, marginTop: THEME.spacing.xs, fontSize: 16 }}>
            {profileData.email || 'Sin correo'}
          </Text>
          
          {/* Mostrar datos adicionales del perfil si existen */}
          <View style={{ 
            width: '100%', 
            backgroundColor: THEME.colors.backgroundLight, 
            borderRadius: 8, 
            padding: THEME.spacing.md,
            marginTop: THEME.spacing.lg
          }}>
            <Text style={{ fontWeight: 'bold', marginBottom: THEME.spacing.sm }}>Detalles del perfil:</Text>
            {profileData.phone && (
              <Text style={{ marginBottom: THEME.spacing.xs }}>Teléfono: {profileData.phone}</Text>
            )}
            {profileData.address && (
              <Text style={{ marginBottom: THEME.spacing.xs }}>Dirección: {profileData.address}</Text>
            )}
            {!profileData.phone && !profileData.address && (
              <Text style={{ color: THEME.colors.textLight }}>No hay detalles adicionales</Text>
            )}
          </View>
        </View>
        
        <View style={{ marginTop: THEME.spacing.xl }}>
          <TouchableOpacity 
            style={{ 
              padding: THEME.spacing.md, 
              borderBottomWidth: 1, 
              borderBottomColor: THEME.colors.border,
              flexDirection: 'row',
              alignItems: 'center'
            }} 
            onPress={() => navigation.navigate('PersonalInfo')}
          >
            <Text style={{ fontSize: 16 }}>Información personal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ 
              padding: THEME.spacing.md, 
              borderBottomWidth: 1, 
              borderBottomColor: THEME.colors.border,
              flexDirection: 'row',
              alignItems: 'center'
            }} 
            onPress={() => navigation.navigate('PaymentMethods')}
          >
            <Text style={{ fontSize: 16 }}>Métodos de pago</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ 
              padding: THEME.spacing.md, 
              borderBottomWidth: 1, 
              borderBottomColor: THEME.colors.border,
              flexDirection: 'row',
              alignItems: 'center'
            }} 
            onPress={() => navigation.navigate('OrderHistory')}
          >
            <Text style={{ fontSize: 16 }}>Historial de pedidos</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={{ 
            padding: THEME.spacing.md, 
            marginTop: THEME.spacing.xl,
            backgroundColor: THEME.colors.error,
            borderRadius: 8,
            alignItems: 'center'
          }} 
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;