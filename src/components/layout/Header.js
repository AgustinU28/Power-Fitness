// src/components/layout/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../../theme.js';

const Header = ({ 
  title, 
  onBack, 
  showBack = true,
  rightComponent = null,
  backgroundColor = THEME.colors.white,
  textColor = THEME.colors.text
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.leftContainer}>
        {showBack && onBack && (
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={onBack}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons 
              name="arrow-left" 
              size={24} 
              color={textColor} 
            />
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: THEME.spacing.md,
    paddingVertical: THEME.spacing.sm,
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.border || '#e0e0e0',
  },
  leftContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    padding: THEME.spacing.xs,
    borderRadius: THEME.borderRadius.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Header;