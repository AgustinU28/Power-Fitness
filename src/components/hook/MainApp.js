
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext.js';
import AppNavigator from '../../navigation/AppNavigator.js';

const MainApp = () => {
  const { user } = useAuth();

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default MainApp;