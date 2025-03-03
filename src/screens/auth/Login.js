import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator } from 'react-native';
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

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await login(email, password);
      navigation.navigate('Dashboard'); 
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Header title="Iniciar Sesión" onBack={() => navigation.navigate('Dashboard')} />

      <View style={styles.content}>
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
          />
          
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry 
            value={password} 
            onChangeText={setPassword} 
          />
          
          <TouchableOpacity 
            style={styles.forgotPassword} 
            onPress={handleForgotPassword}
          >
            <Text style={styles.forgotPasswordText}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>
          
          <Button 
            title={isSubmitting ? "Procesando..." : "Iniciar Sesión"} 
            onPress={handleLogin}
            style={styles.button}
            disabled={isSubmitting || loading} 
          />
        </View>
        
        <TouchableOpacity 
          style={styles.registerLink} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerText}>
            ¿No tienes cuenta? <Text style={styles.registerHighlight}>Regístrate</Text>
          </Text>
        </TouchableOpacity>
      </View>
      
      {loading && (
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
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: THEME.spacing.md,
  },
  icon: {
    alignSelf: 'center',
    margin: THEME.spacing.lg,
  },
  form: {
    width: '100%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border,
    marginVertical: THEME.spacing.sm,
    paddingVertical: THEME.spacing.sm,
    fontSize: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: THEME.spacing.sm,
  },
  forgotPasswordText: {
    color: THEME.colors.primary,
    fontSize: 14,
  },
  button: {
    marginTop: THEME.spacing.md,
  },
  registerLink: {
    marginTop: THEME.spacing.lg,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 14,
  },
  registerHighlight: {
    color: THEME.colors.primary,
    fontWeight: 'bold',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
});

export default LoginScreen;