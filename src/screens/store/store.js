import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/layout/Header.js';
import Button from '../../components/buttons/Button.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

const StoreScreen = () => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const { addToCart, totalItems } = useCart();

  const products = [
    { 
      id: 1, 
      name: 'Proteína Whey Gold', 
      price: 29.99, 
      image: 'https://api.a0.dev/assets/image?text=whey%20protein&aspect=1:1',
      description: 'Proteína de alta calidad para el crecimiento muscular'
    },
    { 
      id: 2, 
      name: 'Barras Proteicas', 
      price: 14.99, 
      image: 'https://api.a0.dev/assets/image?text=protein%20bars&aspect=1:1',
      description: 'Barras energéticas con alto contenido proteico'
    },
    { 
      id: 3, 
      name: 'Creatina Monohidrato', 
      price: 22.99, 
      image: 'https://api.a0.dev/assets/image?text=creatine%20monohydrate&aspect=1:1',
      description: 'Suplemento para mejorar el rendimiento deportivo'
    },
    { 
      id: 4, 
      name: 'Pre-Workout', 
      price: 34.99, 
      image: 'https://api.a0.dev/assets/image?text=pre%20workout%20supplement&aspect=1:1',
      description: 'Energía y enfoque para tus entrenamientos'
    },
    { 
      id: 5, 
      name: 'BCAA', 
      price: 19.99, 
      image: 'https://api.a0.dev/assets/image?text=bcaa%20supplement&aspect=1:1',
      description: 'Aminoácidos esenciales para la recuperación'
    },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.productDescription} numberOfLines={2}>{item.description}</Text>
        <View style={styles.productFooter}>
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
          <Button
            title="Agregar"
            onPress={() => handleAddToCart(item)}
            style={styles.addButton}
            textStyle={styles.addButtonText}
          />
        </View>
      </View>
    </View>
  );

  const CartButton = () => (
    <TouchableOpacity 
      style={styles.cartIconContainer}
      onPress={() => navigation.navigate('Cart')}
    >
      <MaterialCommunityIcons name="cart" size={24} color={THEME.colors.text} />
      {totalItems > 0 && (
        <View style={styles.cartBadge}>
          <Text style={styles.cartBadgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Tienda" 
        onBack={() => navigation.goBack()}
        rightComponent={<CartButton />}
      />
      
      <View style={styles.content}>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons 
            name="magnify" 
            size={20} 
            color={THEME.colors.textLight}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar productos..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={THEME.colors.textLight}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <MaterialCommunityIcons 
                name="close" 
                size={20} 
                color={THEME.colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
    padding: THEME.spacing.md,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.md,
    paddingHorizontal: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    ...THEME.shadows.small,
  },
  searchIcon: {
    marginRight: THEME.spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: THEME.spacing.md,
    fontSize: THEME.fontSize.md,
    color: THEME.colors.text,
  },
  productList: {
    paddingBottom: THEME.spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
  },
  productCard: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.md,
    marginBottom: THEME.spacing.md,
    flex: 0.48,
    ...THEME.shadows.small,
  },
  productImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: THEME.borderRadius.md,
    borderTopRightRadius: THEME.borderRadius.md,
  },
  productInfo: {
    padding: THEME.spacing.md,
  },
  productName: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.xs,
  },
  productDescription: {
    fontSize: THEME.fontSize.sm,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.sm,
    lineHeight: 16,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.primary,
  },
  addButton: {
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.xs,
    minHeight: 35,
  },
  addButtonText: {
    fontSize: THEME.fontSize.sm,
  },
  cartIconContainer: {
    position: 'relative',
    padding: THEME.spacing.xs,
  },
  cartBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: THEME.colors.primary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: THEME.colors.white,
    fontSize: 12,
    fontWeight: THEME.fontWeight.bold,
  },
});

export default StoreScreen;