// src/navigation/AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext.js';

// Navegación con tabs
import TabNavigator from './TabNavigator.js';

// Pantallas de autenticación
import HomeScreen from '../screens/dashboard/Home.js';
import LoginScreen from '../screens/auth/Login.js';
import RegisterScreen from '../screens/auth/Register.js';

// Pantallas adicionales (que se abren encima de los tabs)
import ProgressScreen from '../screens/progress/ProgressTracking.js';
import CartScreen from '../screens/store/Cart.js';
import CheckoutScreen from '../screens/store/Checkout.js';
import RoutineDetail from '../screens/routines/RoutineDetail.js';
import ClassDetail from '../screens/classes/ClassDetail.js';
import PersonalInfoScreen from '../screens/dashboard/PersonalInfoScreen.js';
import PaymentMethodsScreen from '../screens/dashboard/PaymentMethodsScreen.js';
import OrderHistoryScreen from '../screens/dashboard/OrderHistoryScreen.js';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={user ? "MainTabs" : "Home"}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
      }}
    >
      {user ? (
        // Pantallas para usuarios autenticados
        <>
          {/* Tabs principales */}
          <Stack.Screen 
            name="MainTabs" 
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          
          {/* Pantallas adicionales que se abren encima de los tabs */}
          <Stack.Screen 
            name="Progress" 
            component={ProgressScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <Stack.Screen 
            name="Cart" 
            component={CartScreen}
          />
          <Stack.Screen 
            name="Checkout" 
            component={CheckoutScreen}
          />
          <Stack.Screen 
            name="RoutineDetail" 
            component={RoutineDetail}
          />
          <Stack.Screen 
            name="ClassDetail" 
            component={ClassDetail}
          />
          <Stack.Screen 
            name="PersonalInfo" 
            component={PersonalInfoScreen}
          />
          <Stack.Screen 
            name="PaymentMethods" 
            component={PaymentMethodsScreen}
          />
          <Stack.Screen 
            name="OrderHistory" 
            component={OrderHistoryScreen}
          />
        </>
      ) : (
        // Pantallas para usuarios no autenticados
        <>
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;