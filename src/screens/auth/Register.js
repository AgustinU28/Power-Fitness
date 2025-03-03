import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Button from '../../components/buttons/Button.js';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, loading } = useAuth();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Al menos 6 caracteres, incluir una mayúscula y un número
    return password.length >= 6 && 
           /[A-Z]/.test(password) && 
           /[0-9]/.test(password);
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert('Error', 'Por favor ingresa un email válido');
      return;
    }
    
    if (!validatePassword(password)) {
      Alert.alert('Error', 'La contraseña debe tener al menos 6 caracteres, una mayúscula y un número');
      return;
    }
    
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await register(email, password, name);
      
      // Solo navegamos si el registro fue exitoso
      if (success) {
        // Aquí puedes mostrar un mensaje de éxito si lo deseas
        Alert.alert('¡Éxito!', 'Cuenta creada correctamente', [
          { 
            text: 'OK', 
            onPress: () => navigation.replace('Login')  // O navegar a 'Home' si prefieres
          }
        ]);
      }
    } catch (error) {
      console.error(error);
      // El manejo de errores específicos debería estar en el AuthContext
      // pero aquí puedes manejar errores genéricos si lo necesitas
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Crear Cuenta" onBack={() => navigation.goBack()} />
      
      <ScrollView style={styles.content}>
        <MaterialCommunityIcons 
          name="dumbbell" 
          size={60} 
          color={THEME.colors.primary} 
          style={styles.icon} 
        />
        
        <View style={styles.form}>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre completo" 
            value={name} 
            onChangeText={setName} 
          />
          
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
          
          <TextInput 
            style={styles.input} 
            placeholder="Confirmar contraseña" 
            secureTextEntry 
            value={confirmPassword} 
            onChangeText={setConfirmPassword} 
          />
          
          <Text style={styles.passwordRequirements}>
            La contraseña debe tener al menos 6 caracteres, incluir una letra mayúscula y un número.
          </Text>
          
          <Button 
            title={isSubmitting ? "Procesando..." : "Crear Cuenta"} 
            onPress={handleRegister} 
            style={styles.button}
            disabled={isSubmitting || loading} 
          />
        </View>
        
        <TouchableOpacity 
          style={styles.loginLink} 
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.loginText}>
            ¿Ya tienes cuenta? <Text style={styles.loginHighlight}>Inicia Sesión</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
      
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
  passwordRequirements: {
    fontSize: 12,
    color: THEME.colors.textLight,
    marginTop: 5,
    marginBottom: THEME.spacing.md,
  },
  button: {
    marginTop: THEME.spacing.md,
  },
  loginLink: {
    marginTop: THEME.spacing.lg,
    marginBottom: THEME.spacing.xl,
  },
  loginText: {
    textAlign: 'center',
    fontSize: 14,
  },
  loginHighlight: {
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

export default RegisterScreen;