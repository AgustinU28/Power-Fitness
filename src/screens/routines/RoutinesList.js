import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';

const RoutinesScreen = () => {
  const navigation = useNavigation(); 

  const muscleGroups = [
    { id: 1, name: 'Pecho', description: 'Ejercicios para desarrollar los músculos pectorales', exercises: 12, image: 'https://api.a0.dev/assets/image?text=chest%20workout%20gym&aspect=16:9' },
    { id: 2, name: 'Espalda', description: 'Rutinas para fortalecer la espalda y mejorar la postura', exercises: 10, image: 'https://api.a0.dev/assets/image?text=back%20workout%20gym&aspect=16:9' },
    { id: 3, name: 'Piernas', description: 'Ejercicios para desarrollar cuádriceps, isquiotibiales y pantorrillas', exercises: 14, image: 'https://api.a0.dev/assets/image?text=leg%20workout%20gym&aspect=16:9' },
  ];

  return (
    <View style={{ flex: 1, padding: THEME.spacing.md }}>
      <Header title="Rutinas de Entrenamiento" onBack={() => navigation.navigate('Dashboard')} />
      <FlatList
        data={muscleGroups}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={{ marginBottom: THEME.spacing.md }} 
            onPress={() => navigation.navigate('RoutineDetail', { routineId: item.id })} // Pasamos ID como parámetro
          >
            <Image source={{ uri: item.image }} style={{ height: 150, borderRadius: THEME.borderRadius.md }} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.name}</Text>
            <Text>{item.description}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default RoutinesScreen;
