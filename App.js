import 'react-native-url-polyfill/auto';
import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { registerRootComponent } from 'expo';
import { AuthProvider} from './src/contexts/AuthContext.js';
import { CartProvider } from './src/contexts/CartContext.js';
import { THEME } from './theme';
import MainApp from './src/components/hook/MainApp.js';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: THEME.colors.background }}>
          <StatusBar barStyle="dark-content" />
          <MainApp /> {/* Renderizar MainAp */}
        </SafeAreaView>
      </CartProvider>
    </AuthProvider>
  );
}

registerRootComponent(App);

export default App;