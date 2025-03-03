import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

const StoreScreen = () => {
  const navigation = useNavigation(); // Hook de navegación
  const [search, setSearch] = useState('');
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Proteína Whey Gold', price: 29.99, image: 'https://api.a0.dev/assets/image?text=whey%20protein&aspect=1:1' },
    { id: 2, name: 'Barras Proteicas', price: 14.99, image: 'https://api.a0.dev/assets/image?text=protein%20bars&aspect=1:1' },
    { id: 3, name: 'Creatina Monohidrato', price: 22.99, image: 'https://api.a0.dev/assets/image?text=creatine%20monohydrate&aspect=1:1' }
  ];

  const filteredProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

  // Función para agregar al carrito y navegar a la pantalla de carrito
  const handleAddToCart = (product) => {
    addToCart(product);
    navigation.navigate('Cart'); // Navegamos a la pantalla de carrito después de agregar el producto
  };

  return (
    <View style={{ flex: 1, padding: THEME.spacing.md }}>
      <Header title="Tienda" onBack={() => navigation.navigate('Dashboard')} />
      <TextInput
        style={{ borderWidth: 1, borderRadius: THEME.borderRadius.md, padding: THEME.spacing.sm, marginBottom: THEME.spacing.md }}
        placeholder="Buscar productos..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredProducts}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: THEME.spacing.md }}>
            <Image source={{ uri: item.image }} style={{ width: 80, height: 80, borderRadius: THEME.borderRadius.md }} />
            <View style={{ flex: 1, marginLeft: THEME.spacing.md }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.name}</Text>
              <Text style={{ color: THEME.colors.primary }}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => handleAddToCart(item)}>
              <Text style={{ color: THEME.colors.primary }}>Agregar</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default StoreScreen;