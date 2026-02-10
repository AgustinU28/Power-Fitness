import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';

const RoutinesScreen = () => {
  const navigation = useNavigation(); 

  const muscleGroups = [
    { 
      id: 1, 
      name: 'Pecho', 
      description: 'Ejercicios para desarrollar los músculos pectorales', 
      exercises: 12, 
      image: 'https://api.a0.dev/assets/image?text=chest%20workout%20gym&aspect=16:9' 
    },
    { 
      id: 2, 
      name: 'Espalda', 
      description: 'Rutinas para fortalecer la espalda y mejorar la postura', 
      exercises: 10, 
      image: 'https://api.a0.dev/assets/image?text=back%20workout%20gym&aspect=16:9' 
    },
    { 
      id: 3, 
      name: 'Piernas', 
      description: 'Ejercicios para desarrollar cuádriceps, isquiotibiales y pantorrillas', 
      exercises: 14, 
      image: 'https://api.a0.dev/assets/image?text=leg%20workout%20gym&aspect=16:9' 
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('RoutineDetail', { routineId: item.id })}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.routineName}>{item.name}</Text>
        <Text style={styles.routineDescription} numberOfLines={2}>
          {item.description}
        </Text>
        <Text style={styles.exercisesCount}>{item.exercises} Ejercicios</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Rutinas de Entrenamiento" 
        onBack={() => navigation.goBack()}
      />
      
      <FlatList
        data={muscleGroups}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  listContainer: {
    padding: THEME.spacing.md,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: THEME.colors.white,
    borderRadius: THEME.borderRadius.md,
    marginBottom: THEME.spacing.md,
    overflow: 'hidden',
    ...THEME.shadows.small,
  },
  image: {
    height: 160,
    width: '100%',
  },
  cardContent: {
    padding: THEME.spacing.md,
  },
  routineName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME.colors.text,
    marginBottom: 4,
  },
  routineDescription: {
    fontSize: 14,
    color: THEME.colors.textLight,
    marginBottom: 8,
  },
  exercisesCount: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.primary,
  },
});

export default RoutinesScreen;