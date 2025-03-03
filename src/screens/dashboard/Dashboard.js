import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';
import Header from '../../components/layout/Header.js';

const DashboardScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [displayName, setDisplayName] = useState('Usuario');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.displayName) {
        setDisplayName(user.displayName);
      } else if (user.name) {
        setDisplayName(user.name);
      } else if (user.email) {
        const emailName = user.email.split('@')[0];
        setDisplayName(emailName);
      }
    }
  }, [user]);

  const menuItems = [
    { icon: 'dumbbell', title: 'Rutinas', screen: 'Routines', color: '#FF6B6B' },
    { icon: 'chart-line', title: 'Progreso', screen: 'Progress', color: '#4ECDC4' },
    { icon: 'calendar-check', title: 'Clases', screen: 'Classes', color: '#FFD166' }, 
    { icon: 'store', title: 'Tienda', screen: 'Store', color: '#6A0572' },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[THEME.colors.primary, THEME.colors.secondary]}
        style={{ padding: THEME.spacing.lg }}
      >
        <Header title="Power Fitness" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#fff', fontSize: 18 }}>
            Bienvenido, {displayName}
          </Text>
          
          {/* Botón para ir al perfil */}
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <MaterialCommunityIcons name="account" size={24} color="#fff" />
          </TouchableOpacity>

         
        </View>
      </LinearGradient>
      
      <View style={{ padding: THEME.spacing.md }}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: item.color,
              padding: THEME.spacing.md,
              marginVertical: THEME.spacing.sm,
              borderRadius: THEME.borderRadius.md,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <MaterialCommunityIcons name={item.icon} size={24} color="#fff" style={{ marginRight: 10 }} />
            <Text style={{ color: '#fff', fontSize: 18 }}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default DashboardScreen;
