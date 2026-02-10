import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';

const ClassDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  const { classData } = route.params;

  return (
    <View style={styles.screenContainer}>
      <Header 
        title="Detalles de la Clase" 
        onBack={() => navigation.goBack()}
      />
      
      <ScrollView style={styles.content}>
        <Image source={{ uri: classData.image }} style={styles.classImage} />
        
        <View style={styles.classDetails}>
          <Text style={styles.className}>{classData.name}</Text>
          <Text style={styles.classTrainer}>{`Instructor: ${classData.trainer}`}</Text>
          <Text style={styles.classTime}>{`Hora: ${classData.time}`}</Text>
          <Text style={styles.classLevel}>{`Nivel: ${classData.level}`}</Text>
          <Text style={styles.classSpots}>{`Plazas disponibles: ${classData.spots} / ${classData.totalSpots}`}</Text>
          
          {/* Botón de reserva */}
          <TouchableOpacity style={styles.reserveButton}>
            <Text style={styles.reserveButtonText}>Reservar Clase</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  content: {
    flex: 1,
  },
  classImage: {
    width: '100%',
    height: 200,
  },
  classDetails: {
    backgroundColor: THEME.colors.white,
    padding: THEME.spacing.lg,
    margin: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    ...THEME.shadows.small,
  },
  className: {
    fontSize: 24,
    fontWeight: THEME.fontWeight.bold,
    color: THEME.colors.text,
    marginBottom: THEME.spacing.md,
  },
  classTrainer: {
    fontSize: 16,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.sm,
  },
  classTime: {
    fontSize: 16,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.sm,
  },
  classLevel: {
    fontSize: 16,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.sm,
  },
  classSpots: {
    fontSize: 16,
    color: THEME.colors.textLight,
    marginBottom: THEME.spacing.lg,
  },
  reserveButton: {
    backgroundColor: THEME.colors.primary,
    padding: THEME.spacing.md,
    borderRadius: THEME.borderRadius.md,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: THEME.colors.white,
    fontSize: 18,
    fontWeight: THEME.fontWeight.bold,
  },
});

export default ClassDetail;