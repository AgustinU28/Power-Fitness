import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { THEME } from '../../../theme.js';

const Header = ({ title, onBack, rightComponent = null }) => {
  return (
    <View style={styles.container}>
      {onBack ? (
        <TouchableOpacity onPress={onBack}>
          <MaterialCommunityIcons name="arrow-left" size={24} color={THEME.colors.text} />
        </TouchableOpacity>
      ) : <View style={styles.emptyView} />}
      
      <Text style={styles.title}>{title}</Text>
      
      {rightComponent ? rightComponent : <View style={styles.emptyView} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: THEME.spacing.md,
    backgroundColor: THEME.colors.white,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.gray,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.text,
  },
  emptyView: {
    width: 24,
  },
});

export default Header;