import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

const CartScreen = () => {
  const navigation = useNavigation(); 
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <View style={{ flex: 1, padding: THEME.spacing.md }}>
      <Header title="Mi Carrito" onBack={() => navigation.navigate('Store')} />
      {cart.length === 0 ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: THEME.colors.gray }}>Tu carrito está vacío</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Store')}>
            <Text style={{ color: THEME.colors.primary, marginTop: THEME.spacing.md }}>Ir a la Tienda</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.md }}>
                <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: THEME.borderRadius.md }} />
                <View style={{ flex: 1, marginLeft: THEME.spacing.md }}>
                  <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
                  <Text style={{ color: THEME.colors.primary }}>${item.price.toFixed(2)}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Text style={{ fontSize: 18 }}>-</Text>
                    </TouchableOpacity>
                    <Text style={{ marginHorizontal: THEME.spacing.sm }}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Text style={{ fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                  <Text style={{ color: THEME.colors.error }}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={item => item.id.toString()}
          />
          <View style={{ padding: THEME.spacing.md }}>
            <Text style={{ fontSize: 18 }}>Total: ${totalPrice.toFixed(2)}</Text>
            <TouchableOpacity 
              style={{ marginTop: THEME.spacing.md }} 
              onPress={() => navigation.navigate('Checkout')}
            >
              <Text style={{ color: THEME.colors.primary }}>Proceder al Pago</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;
