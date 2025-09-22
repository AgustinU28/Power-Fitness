import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

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
    { 
      icon: 'dumbbell', 
      title: 'Rutinas', 
      screen: 'Routines', 
      color: '#FF6B6B',
      description: 'Planes de entrenamiento'
    },
    { 
      icon: 'chart-line', 
      title: 'Progreso', 
      screen: 'Progress', 
      color: '#4ECDC4',
      description: 'Revisa tu evolución'
    },
    { 
      icon: 'calendar-check', 
      title: 'Clases', 
      screen: 'Classes', 
      color: '#FFD166',
      description: 'Reservar clases grupales'
    }, 
    { 
      icon: 'store', 
      title: 'Tienda', 
      screen: 'Store', 
      color: '#6A0572',
      description: 'Suplementos y productos',
      badge: totalItems > 0 ? totalItems : null
    },
  ];

  const stats = [
    { label: 'Entrenamientos', value: '24', icon: 'dumbbell' },
    { label: 'Clases tomadas', value: '8', icon: 'calendar-check' },
    { label: 'Días activo', value: '15', icon: 'fire' },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={THEME.colors.primary} />
        <Text style={{ marginTop: THEME.spacing.sm, color: THEME.colors.text }}>
          Cargando...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={[THEME.colors.primary, THEME.colors.secondary]}
        style={{ paddingBottom: THEME.spacing.xl, paddingTop: 50 }}
      >
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          paddingHorizontal: THEME.spacing.lg,
        }}>
          <View>
            <Text style={{ 
              color: THEME.colors.white, 
              fontSize: THEME.fontSize.xl,
              fontWeight: THEME.fontWeight.bold
            }}>
              POWER FITNESS
            </Text>
            <Text style={{ 
              color: THEME.colors.white, 
              fontSize: THEME.fontSize.md,
              opacity: 0.9,
              marginTop: 4
            }}>
              ¡Hola, {displayName}!
            </Text>
          </View>
          
          <TouchableOpacity 
            onPress={() => navigation.navigate('Profile')}
            style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: 'rgba(255,255,255,0.2)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <MaterialCommunityIcons name="account" size={24} color={THEME.colors.white} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={{ padding: THEME.spacing.lg }}>
        {/* Estadísticas */}
        <View style={{ 
          flexDirection: 'row', 
          justifyContent: 'space-between',
          marginBottom: THEME.spacing.lg 
        }}>
          {stats.map((stat, index) => (
            <View key={index} style={{
              backgroundColor: THEME.colors.white,
              borderRadius: THEME.borderRadius.md,
              padding: THEME.spacing.md,
              alignItems: 'center',
              flex: 0.3,
              ...THEME.shadows.small,
            }}>
              <MaterialCommunityIcons 
                name={stat.icon} 
                size={24} 
                color={THEME.colors.primary} 
              />
              <Text style={{
                fontSize: THEME.fontSize.xl,
                fontWeight: THEME.fontWeight.bold,
                color: THEME.colors.text,
                marginTop: THEME.spacing.xs,
              }}>
                {stat.value}
              </Text>
              <Text style={{
                fontSize: THEME.fontSize.xs,
                color: THEME.colors.textLight,
                textAlign: 'center',
                marginTop: 2,
              }}>
                {stat.label}
              </Text>
            </View>
          ))}
        </View>

        {/* Menú principal */}
        <Text style={{
          fontSize: THEME.fontSize.lg,
          fontWeight: THEME.fontWeight.bold,
          color: THEME.colors.text,
          marginBottom: THEME.spacing.md,
        }}>
          ¿Qué quieres hacer hoy?
        </Text>

        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              backgroundColor: THEME.colors.white,
              borderRadius: THEME.borderRadius.md,
              padding: THEME.spacing.lg,
              marginBottom: THEME.spacing.md,
              flexDirection: 'row',
              alignItems: 'center',
              ...THEME.shadows.small,
            }}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: item.color,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: THEME.spacing.md,
            }}>
              <MaterialCommunityIcons 
                name={item.icon} 
                size={24} 
                color={THEME.colors.white} 
              />
              {item.badge && (
                <View style={{
                  position: 'absolute',
                  top: -5,
                  right: -5,
                  backgroundColor: THEME.colors.error,
                  borderRadius: 10,
                  minWidth: 20,
                  height: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    color: THEME.colors.white,
                    fontSize: 12,
                    fontWeight: THEME.fontWeight.bold,
                  }}>
                    {item.badge}
                  </Text>
                </View>
              )}
            </View>
            
            <View style={{ flex: 1 }}>
              <Text style={{
                fontSize: THEME.fontSize.md,
                fontWeight: THEME.fontWeight.medium,
                color: THEME.colors.text,
              }}>
                {item.title}
              </Text>
              <Text style={{
                fontSize: THEME.fontSize.sm,
                color: THEME.colors.textLight,
                marginTop: 2,
              }}>
                {item.description}
              </Text>
            </View>
            
            <MaterialCommunityIcons 
              name="chevron-right" 
              size={20} 
              color={THEME.colors.textLight} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default DashboardScreen;