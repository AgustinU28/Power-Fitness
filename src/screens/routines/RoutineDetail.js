import React from 'react';
import {  Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native'; // Importamos useNavigation
import { THEME } from '../../../theme.js';

const RoutineDetail = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Inicializamos useNavigation

  const { routineId } = route.params; // Obtenemos el ID de la rutina pasada desde RoutinesScreen

  const muscleGroups = [
    { 
      id: 1, 
      name: 'Pecho', 
      description: 'Ejercicios para desarrollar los músculos pectorales', 
      exercises: 12, 
      image: 'https://api.a0.dev/assets/image?text=chest%20workout%20gym&aspect=16:9',
      detailedDescription: 'En esta rutina trabajaremos principalmente los pectorales, comenzando con press de banca, seguido de ejercicios como aperturas con mancuernas, etc.'
    },
    { 
      id: 2, 
      name: 'Espalda', 
      description: 'Rutinas para fortalecer la espalda y mejorar la postura', 
      exercises: 10, 
      image: 'https://api.a0.dev/assets/image?text=back%20workout%20gym&aspect=16:9',
      detailedDescription: 'La rutina se enfoca en fortalecer la espalda baja y alta, utilizando ejercicios como deadlifts y remos con barra.'
    },
    { 
      id: 3, 
      name: 'Piernas', 
      description: 'Ejercicios para desarrollar cuádriceps, isquiotibiales y pantorrillas', 
      exercises: 14, 
      image: 'https://api.a0.dev/assets/image?text=leg%20workout%20gym&aspect=16:9',
      detailedDescription: 'Trabajaremos en ejercicios como sentadillas, lunges y press de pierna para fortalecer toda la parte inferior del cuerpo.'
    },
  ];

  // Encontramos la rutina correspondiente con el ID pasado
  const routine = muscleGroups.find(item => item.id === routineId);

  return (
    <ScrollView style={{ flex: 1, padding: THEME.spacing.md }}>
      {routine ? (
        <>
          <Image source={{ uri: routine.image }} style={{ height: 250, borderRadius: THEME.borderRadius.md }} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: THEME.spacing.sm }}>{routine.name}</Text>
          <Text style={{ fontSize: 16, marginBottom: THEME.spacing.md }}>{routine.description}</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Ejercicios: {routine.exercises}</Text>
          <Text style={{ marginTop: THEME.spacing.md }}>{routine.detailedDescription}</Text>

          {/* Botón de regreso utilizando useNavigation */}
          <TouchableOpacity 
            style={{
              marginTop: THEME.spacing.md,
              backgroundColor: THEME.colors.primary,
              padding: THEME.spacing.sm,
              borderRadius: THEME.borderRadius.sm
            }}
            onPress={() => navigation.goBack()} // Navega hacia atrás
          >
            <Text style={{ color: '#fff', textAlign: 'center' }}>Volver</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No se encontró la rutina.</Text>
      )}
    </ScrollView>
  );
};

export default RoutineDetail;
