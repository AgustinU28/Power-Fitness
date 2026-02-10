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

// Pantallas modales y detalle (que se abren encima de los tabs)
import ProgressScreen from '../screens/progress/ProgressTracking.js';
import RoutineDetail from '../screens/routines/RoutineDetail.js';
import ClassDetail from '../screens/classes/ClassDetail.js';

// Pantallas de carrito y checkout
import CartScreen from '../screens/store/Cart.js';
import CheckoutScreen from '../screens/store/Checkout.js';

// Pantallas de perfil y configuración
import PersonalInfoScreen from '../screens/dashboard/PersonalInfoScreen.js';
import PaymentMethodsScreen from '../screens/dashboard/PaymentMethodsScreen.js';
import OrderHistoryScreen from '../screens/dashboard/OrderHistoryScreen.js';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <Stack.Navigator
      initialRouteName={user ? "MainTabs" : "Auth"}
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'transparent' },
        cardOverlayEnabled: true,
      }}
    >
      {!user ? (
        // Pantallas para usuarios no autenticados
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="Auth" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen}
          />
        </Stack.Group>
      ) : (
        // Pantallas para usuarios autenticados
        <>
          {/* Stack principal con Tabs */}
          <Stack.Group screenOptions={{ headerShown: false }}>
            <Stack.Screen 
              name="MainTabs" 
              component={TabNavigator}
            />
          </Stack.Group>

          {/* Stack de Rutinas - para navegar desde Dashboard a Rutinas y sus detalles */}
          <Stack.Group screenOptions={{ 
            headerShown: false,
            presentation: 'card'
          }}>
            <Stack.Screen 
              name="RoutineDetail" 
              component={RoutineDetail}
            />
          </Stack.Group>

          {/* Stack de Clases - para navegar desde Dashboard a Clases y sus detalles */}
          <Stack.Group screenOptions={{ 
            headerShown: false,
            presentation: 'card'
          }}>
            <Stack.Screen 
              name="ClassDetail" 
              component={ClassDetail}
            />
          </Stack.Group>

          {/* Stack de Tienda - para carrito y checkout */}
          <Stack.Group screenOptions={{ 
            headerShown: false,
            presentation: 'card'
          }}>
            <Stack.Screen 
              name="Cart" 
              component={CartScreen}
            />
            <Stack.Screen 
              name="Checkout" 
              component={CheckoutScreen}
            />
          </Stack.Group>

          {/* Stack de Perfil - para configuración y opciones de usuario */}
          <Stack.Group screenOptions={{ 
            headerShown: false,
            presentation: 'card'
          }}>
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
          </Stack.Group>

          {/* Stack Modal - Progress */}
          <Stack.Group screenOptions={{ 
            headerShown: false,
            presentation: 'modal'
          }}>
            <Stack.Screen 
              name="Progress" 
              component={ProgressScreen}
            />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;