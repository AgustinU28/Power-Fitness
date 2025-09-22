import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/buttons/Button.js';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { StyleSheet } from 'react-native';

const LoginScreen = ({ navigation }) => { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login, loading } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await login(email, password);
      if (success) {
        // No necesitamos navegar manualmente, el AppNavigator se encargará
        // cuando el estado de usuario cambie
        console.log('Login exitoso');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Iniciar Sesión" 
        onBack={() => navigation.goBack()} 
        showBack={true}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <MaterialCommunityIcons 
          name="dumbbell" 
          size={60} 
          color={THEME.colors.primary} 
          style={styles.icon} 
        />
        
        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Email" 
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none"
            autoCorrect={false}
            editable={!isSubmitting && !loading}
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword}
            editable={!isSubmitting && !loading}
          />
          
          <Button 
            title={isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"} 
            onPress={handleLogin}
            style={styles.button}
            disabled={isSubmitting || loading}
            loading={isSubmitting || loading}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => navigation.navigate('Register')}
          disabled={isSubmitting || loading}
        >
          <Text style={styles.registerText}>
            ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
      {(loading || isSubmitting) && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color={THEME.colors.primary} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  content: {
    flex: 1,
    padding: THEME.spacing.lg,
  },
  icon: {
    alignSelf: 'center',
    marginVertical: THEME.spacing.xl,
  },
  form: {
    width: '100%',
    marginBottom: THEME.spacing.lg,
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    borderRadius: THEME.borderRadius.sm,
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    marginVertical: THEME.spacing.sm,
    fontSize: THEME.fontSize.md,
    backgroundColor: THEME.colors.white,
  },
  button: {
    marginTop: THEME.spacing.lg,
  },
  registerLink: {
    marginTop: THEME.spacing.lg,
    alignItems: 'center',
  },
  registerText: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.text,
  },
  registerHighlight: {
    color: THEME.colors.primary,
    fontWeight: THEME.fontWeight.bold,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoginScreen;