// src/components/buttons/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { THEME } from '../../../theme.js';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  disabled = false, 
  loading = false,
  style = {},
  textStyle = {} 
}) => {
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return {
          backgroundColor: disabled ? THEME.colors.gray : THEME.colors.primary,
          borderColor: disabled ? THEME.colors.gray : THEME.colors.primary,
        };
      case 'secondary':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? THEME.colors.gray : THEME.colors.primary,
          borderWidth: 2,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: disabled ? THEME.colors.gray : THEME.colors.primary,
          borderWidth: 1,
        };
      default:
        return {
          backgroundColor: disabled ? THEME.colors.gray : THEME.colors.primary,
          borderColor: disabled ? THEME.colors.gray : THEME.colors.primary,
        };
    }
  };

  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return { color: disabled ? THEME.colors.textLight : THEME.colors.white };
      case 'secondary':
      case 'outline':
        return { color: disabled ? THEME.colors.textLight : THEME.colors.primary };
      default:
        return { color: disabled ? THEME.colors.textLight : THEME.colors.white };
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'primary' ? THEME.colors.white : THEME.colors.primary} 
        />
      ) : (
        <Text style={[
          styles.text,
          getTextStyle(),
          textStyle
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: THEME.spacing.md,
    paddingHorizontal: THEME.spacing.lg,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Button;