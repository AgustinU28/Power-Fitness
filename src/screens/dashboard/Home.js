import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/buttons/Button.js';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';
import 'react-native-url-polyfill/auto';

const HomeScreen = ({ navigation }) => {
  const imageUrl = 'https://api.a0.dev/assets/image?text=modern%20gym%20interior%20with%20dramatic%20lighting%20and%20equipment&aspect=9:16';

  return (
    <View style={styles.container}>
      {/* Header */}
      <Header
        title="POWER FITNESS"
        onBack={() => navigation.goBack()}
        showBack={false}
      />

      {/* Imagen de fondo */}
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.backgroundImage} 
        onError={(error) => console.log('Error cargando imagen:', error.nativeEvent)} 
      />
      
      {/* Capa oscura y contenido */}
      <LinearGradient 
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)']} 
        style={styles.overlay}
      >
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons name="dumbbell" size={60} color="#fff" />
          <Text style={styles.title}>POWER FITNESS</Text>
          <Text style={styles.subtitle}>Transform Your Life</Text>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button 
            title="Iniciar Sesión" 
            type="primary" 
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          />
          <View style={styles.buttonSpacer} />
          <Button 
            title="Registrarse" 
            type="secondary" 
            onPress={() => navigation.navigate('Register')}
            style={styles.button}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: THEME.spacing.xl,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.xxl + 4,
    fontWeight: THEME.fontWeight.bold,
    marginTop: THEME.spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    color: THEME.colors.white,
    fontSize: THEME.fontSize.lg,
    marginTop: THEME.spacing.xs,
    textAlign: 'center',
  },
  buttonContainer: {
    width: '100%',
    marginBottom: THEME.spacing.xl + 20,
  },
  button: {
    width: '100%',
  },
  buttonSpacer: {
    height: THEME.spacing.md,
  },
});

export default HomeScreen;