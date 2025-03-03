import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { cart, totalPrice } = useCart();
  
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    numeroTarjeta: '',
    fechaExpiracion: '',
    cvv: ''
  });

  const handleChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = () => {
    // Validación básica
    if (!formData.nombre || !formData.apellido || !formData.email || !formData.direccion || 
        !formData.numeroTarjeta || !formData.fechaExpiracion || !formData.cvv) {
      Alert.alert('Error', 'Por favor completa todos los campos obligatorios');
      return;
    }
    
    // Aquí se procesaría el pago en una aplicación real
    // Simulamos un proceso exitoso
    Alert.alert(
      'Pago Exitoso', 
      '¡Tu pedido ha sido procesado correctamente!',
      [
        { 
          text: 'OK', 
          onPress: () => {
            // Navegar a una pantalla de confirmación o a la página principal
            navigation.navigate('Dashboard');
          }
        }
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header title="Checkout" onBack={() => navigation.navigate('Cart')} />
      
      <ScrollView style={{ padding: THEME.spacing.md }}>
        {/* Resumen del pedido */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen del Pedido</Text>
          <View style={styles.orderSummary}>
            <Text>Cantidad de productos: {cart.reduce((total, item) => total + item.quantity, 0)}</Text>
            <Text style={styles.totalPrice}>Total: ${totalPrice.toFixed(2)}</Text>
          </View>
        </View>

        {/* Información de envío */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Envío</Text>
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Nombre *"
              value={formData.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Apellido *"
              value={formData.apellido}
              onChangeText={(text) => handleChange('apellido', text)}
            />
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email *"
            keyboardType="email-address"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            keyboardType="phone-pad"
            value={formData.telefono}
            onChangeText={(text) => handleChange('telefono', text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Dirección *"
            value={formData.direccion}
            onChangeText={(text) => handleChange('direccion', text)}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Ciudad"
              value={formData.ciudad}
              onChangeText={(text) => handleChange('ciudad', text)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="Código Postal"
              keyboardType="numeric"
              value={formData.codigoPostal}
              onChangeText={(text) => handleChange('codigoPostal', text)}
            />
          </View>
        </View>

        {/* Información de pago */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información de Pago</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de Tarjeta *"
            keyboardType="numeric"
            value={formData.numeroTarjeta}
            onChangeText={(text) => handleChange('numeroTarjeta', text)}
          />
          <View style={styles.formRow}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="MM/AA *"
              value={formData.fechaExpiracion}
              onChangeText={(text) => handleChange('fechaExpiracion', text)}
            />
            <TextInput
              style={[styles.input, styles.halfInput]}
              placeholder="CVV *"
              keyboardType="numeric"
              maxLength={4}
              value={formData.cvv}
              onChangeText={(text) => handleChange('cvv', text)}
              secureTextEntry={true}
            />
          </View>
        </View>

        {/* Botón de finalizar compra */}
        <TouchableOpacity 
          style={styles.checkoutButton} 
          onPress={handleSubmit}
        >
          <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: THEME.colors.primary,
  },
  orderSummary: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: THEME.borderRadius.md,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  formRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: THEME.borderRadius.sm,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  halfInput: {
    width: '48%',
  },
  checkoutButton: {
    backgroundColor: THEME.colors.primary,
    padding: 15,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    marginVertical: 20,
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default CheckoutScreen;