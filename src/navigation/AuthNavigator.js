// navigation/AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/auth/Login';
import RegisterScreen from '../screens/auth/Register';
import HomeScreen from '../screens/dashboard/Home';
import DashboardScreen from '../screens/dashboard/Dashboard';
import RoutinesScreen from '../screens/routines/RoutinesList';
import ProgressScreen from '../screens/progress/ProgressTracking';
import StoreScreen from '../screens/store/store';
import CartScreen from '../screens/store/Cart';
import ProfileScreen from '../screens/dashboard/Profile';
import ClassesScreen from '../screens/classes/Classes.js';
import PersonalInfoScreen from '../screens/dashboard/PersonalInfoScreen';
import PaymentMethodsScreen from '../screens/dashboard/PaymentMethodsScreen';
import OrderHistoryScreen from '../screens/dashboard/OrderHistoryScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Routines" component={RoutinesScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Progress" component={ProgressScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Store" component={StoreScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="Classes" component={ClassesScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="PaymentMethods" component={PaymentMethodsScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;