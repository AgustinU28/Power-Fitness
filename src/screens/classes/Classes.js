import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ClassesScreen = () => {
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('all');
  
  const classes = [
    { 
      id: 1, 
      name: 'Yoga', 
      trainer: 'Ana García', 
      time: '09:00 - 10:00', 
      date: '2025-02-25',
      spots: 5,
      totalSpots: 20,
      level: 'Principiante',
      image: 'https://api.a0.dev/assets/image?text=yoga%20class%20fitness&aspect=16:9',
    },
    { 
      id: 2, 
      name: 'CrossFit', 
      trainer: 'Juan Pérez', 
      time: '10:30 - 11:30', 
      date: '2025-02-25',
      spots: 2,
      totalSpots: 15,
      level: 'Avanzado',
      image: 'https://api.a0.dev/assets/image?text=crossfit%20class%20high%20intensity&aspect=16:9',
    },
  ];
  
  const getDayName = (date) => {
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    return days[date.getDay()];
  };
  
  const getDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = -3; i <= 10; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  return (
    <View style={styles.screenContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      
      <Text style={styles.title}>Reserva de Clases</Text>
      
      <FlatList
        data={classes}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('ClassDetail', { classData: item })}>
            <View style={styles.classCard}>
              <Image source={{ uri: item.image }} style={styles.classImage} />
              <View style={styles.classTimeContainer}>
                <MaterialCommunityIcons name="clock-outline" size={16} color="#fff" />
                <Text style={styles.classTime}>{item.time}</Text>
              </View>

              <View style={styles.classContent}>
                <Text style={styles.className}>{item.name}</Text>
                <Text style={styles.classInstructor}>{item.trainer}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
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
  classCard: {
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  classImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  classTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  classTime: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14,
  },
  classContent: {
    padding: 15,
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  classInstructor: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
});

export default ClassesScreen;
