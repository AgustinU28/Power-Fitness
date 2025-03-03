import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importamos useNavigation y useRoute
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ClassDetail = () => {
  const navigation = useNavigation(); // Inicializamos useNavigation
  const route = useRoute(); // Inicializamos useRoute para acceder a los parámetros pasados
  
  const { classData } = route.params; // Obtenemos los datos de la clase

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Detalles de la Clase</Text>
      
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
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 70,
    textAlign: 'center',
    color: '#333',
  },
  classImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginVertical: 20,
  },
  classDetails: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
  },
  className: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  classTrainer: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  classTime: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  classLevel: {
    fontSize: 16,
    color: '#777',
    marginBottom: 10,
  },
  classSpots: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  reserveButton: {
    backgroundColor: '#5cb85c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClassDetail;
