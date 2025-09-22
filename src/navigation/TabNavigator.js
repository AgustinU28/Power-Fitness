// src/navigation/TabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../theme.js';
import { useCart } from '../contexts/CartContext.js';

// Importar pantallas
import DashboardScreen from '../screens/dashboard/Dashboard.js';
import RoutinesScreen from '../screens/routines/RoutinesList.js';
import ClassesScreen from '../screens/classes/Classes.js';
import StoreScreen from '../screens/store/store.js';
import ProfileScreen from '../screens/dashboard/Profile.js';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { totalItems } = useCart();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Dashboard') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Routines') {
            iconName = focused ? 'dumbbell' : 'dumbbell';
          } else if (route.name === 'Classes') {
            iconName = focused ? 'calendar-check' : 'calendar-check-outline';
          } else if (route.name === 'Store') {
            iconName = focused ? 'store' : 'store-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'account' : 'account-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: THEME.colors.primary,
        tabBarInactiveTintColor: THEME.colors.textLight,
        tabBarStyle: {
          backgroundColor: THEME.colors.white,
          borderTopWidth: 1,
          borderTopColor: THEME.colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
        }}
      />
      <Tab.Screen 
        name="Routines" 
        component={RoutinesScreen}
        options={{
          tabBarLabel: 'Rutinas',
        }}
      />
      <Tab.Screen 
        name="Classes" 
        component={ClassesScreen}
        options={{
          tabBarLabel: 'Clases',
        }}
      />
      <Tab.Screen 
        name="Store" 
        component={StoreScreen}
        options={{
          tabBarLabel: 'Tienda',
          tabBarBadge: totalItems > 0 ? totalItems : null,
          tabBarBadgeStyle: {
            backgroundColor: THEME.colors.primary,
            color: THEME.colors.white,
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;