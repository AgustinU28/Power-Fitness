import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext.js';
import AppNavigator from '../../navigation/AppNavigator.js';
import AuthNavigator from '../../navigation/AuthNavigator.js';

function MainApp() {
  const { isAuthenticated } = useAuth(); 

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default MainApp;