import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from '../../components/layout/Header.js';
import Button from '../../components/buttons/Button.js';
import { useCart } from '../../contexts/CartContext.js';
import { THEME } from '../../../theme.js';

const CartScreen = () => {
  const navigation = useNavigation(); 
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
          >
            <MaterialCommunityIcons name="minus" size={16} color={THEME.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity 
            style={styles.quantityButton}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
          >
            <MaterialCommunityIcons name="plus" size={16} color={THEME.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeFromCart(item.id)}
      >
        <MaterialCommunityIcons name="delete" size={20} color={THEME.colors.error} />
      </TouchableOpacity>
    </View>
  );

  const EmptyCart = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons name="cart-outline" size={80} color={THEME.colors.gray} />
      <Text style={styles.emptyTitle}>Tu carrito está vacío</Text>
      <Text style={styles.emptySubtitle}>Agrega algunos productos para comenzar</Text>
      <Button
        title="Ir a la Tienda"
        onPress={() => navigation.navigate('Store')}
        style={styles.shopButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Mi Carrito" onBack={() => navigation.goBack()} />
      
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <FlatList
            data={cart}
            renderItem={renderCartItem}
            keyExtractor={item => item.id.toString()}
            style={styles.cartList}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.totalContainer}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
            <Button
              title="Proceder al Pago"
              onPress={() => navigation.navigate('Checkout')}
              style={styles.checkoutButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  cartList: {
    flex: 1,
    padding: THEME.spacing.md,
  },
  cartItem: {
    flexDirection: 'row',
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.md,
    padding: THEME.spacing.md,
    marginBottom: THEME.spacing.md,
    alignItems: 'center',
    ...THEME.shadows.small,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: THEME.borderRadius.sm,
  },
  itemDetails: {
    flex: 1,
    marginLeft: THEME.spacing.md,
  },
  itemName: {
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.xs,
  },
  itemPrice: {
    fontSize: THEME.fontSize.md,
    color: THEME.colors.primary,
    fontWeight: THEME.fontWeight.bold,
    marginBottom: THEME.spacing.sm,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: THEME.colors.backgroundLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.border,
  },
  quantity: {
    marginHorizontal: THEME.spacing.md,
    fontSize: THEME.fontSize.md,
    fontWeight: THEME.fontWeight.medium,
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    padding: THEME.spacing.xs,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: THEME.spacing.xl,
  },
  emptyTitle: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.text,
    marginTop: THEME.spacing.md,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: THEME.fontSize.md,
    color: THEME.colors.textLight,
    marginTop: THEME.spacing.xs,
    textAlign: 'center',
  },
  shopButton: {
    marginTop: THEME.spacing.lg,
  },
  totalContainer: {
    backgroundColor: THEME.colors.white,
    padding: THEME.spacing.lg,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: THEME.spacing.md,
  },
  totalLabel: {
    fontSize: THEME.fontSize.lg,
    fontWeight: THEME.fontWeight.medium,
    color: THEME.colors.text,
  },
  totalPrice: {
    fontSize: THEME.fontSize.xl,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.primary,
  },
  checkoutButton: {
    marginTop: THEME.spacing.sm,
  },
});

export default CartScreen;