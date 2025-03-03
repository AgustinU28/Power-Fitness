import React from 'react';
import { TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { THEME } from '../../../theme.js';

const Button = ({ 
  title, 
  onPress, 
  type = 'primary', 
  icon = null, 
  loading = false,
  disabled = false,
  style = {}
}) => {
  const buttonStyles = {
    primary: {
      backgroundColor: THEME.colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: THEME.colors.primary,
    },
    google: {
      backgroundColor: '#4285F4',
      borderWidth: 0,
    }
  };

  const textStyles = {
    primary: { color: THEME.colors.white },
    secondary: { color: THEME.colors.primary },
    google: { color: THEME.colors.white }
  };

  return (
    <TouchableOpacity 
      style={[
        {
          padding: THEME.spacing.md,
          borderRadius: THEME.borderRadius.md,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        },
        buttonStyles[type],
        disabled && { opacity: 0.7 },
        style
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={textStyles[type].color} />
      ) : (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {icon && icon}
          <Text style={[{ marginLeft: icon ? 10 : 0 }, textStyles[type]]}>{title}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default Button;
