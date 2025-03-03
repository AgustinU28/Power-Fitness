// PaymentMethodsScreen.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PaymentMethodsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Métodos de Pago</Text>
      <Text>Aquí se mostrarán los métodos de pago guardados.</Text>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodsScreen;