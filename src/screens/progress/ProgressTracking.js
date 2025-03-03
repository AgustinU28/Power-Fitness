import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LineChart } from 'react-native-chart-kit';
import Header from '../../components/layout/Header.js';
import { THEME } from '../../../theme.js';

const ProgressScreen = () => {
  const navigation = useNavigation(); 
  const [activeTab, setActiveTab] = useState('weight');

  const dataSets = {
    weight: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], data: [80, 78, 76, 75, 74, 73], unit: 'kg' },
    strength: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], data: [60, 65, 70, 72, 75, 80], unit: 'kg' },
    measurements: { labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'], data: [95, 94, 92, 90, 89, 88], unit: 'cm' }
  };

  return (
    <View style={{ flex: 1, padding: THEME.spacing.md }}>
      <Header title="Seguimiento de Progreso" onBack={() => navigation.navigate('Dashboard')} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginVertical: THEME.spacing.md }}>
        {['weight', 'strength', 'measurements'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)}>
            <Text style={{ color: activeTab === tab ? THEME.colors.primary : THEME.colors.text }}>{tab.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView>
        <LineChart
          data={{ labels: dataSets[activeTab].labels, datasets: [{ data: dataSets[activeTab].data }] }}
          width={350} height={220} chartConfig={{ color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})` }}
          bezier
        />
        <Text style={{ textAlign: 'center', marginTop: THEME.spacing.md }}>Unidad: {dataSets[activeTab].unit}</Text>
      </ScrollView>
    </View>
  );
};

export default ProgressScreen;
