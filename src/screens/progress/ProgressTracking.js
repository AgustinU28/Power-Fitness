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
    <View style={{ flex: 1, backgroundColor: THEME.colors.background }}>
      <Header 
        title="Seguimiento de Progreso" 
        onBack={() => navigation.goBack()}
      />
      
      <View style={{ padding: THEME.spacing.md }}>
        {/* Tabs de selección */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: THEME.spacing.md }}>
          {['weight', 'strength', 'measurements'].map(tab => (
            <TouchableOpacity 
              key={tab} 
              onPress={() => setActiveTab(tab)}
              style={{
                paddingVertical: THEME.spacing.sm,
                paddingHorizontal: THEME.spacing.md,
                borderBottomWidth: activeTab === tab ? 3 : 0,
                borderBottomColor: activeTab === tab ? THEME.colors.primary : 'transparent',
              }}
            >
              <Text 
                style={{
                  fontSize: THEME.fontSize.md,
                  fontWeight: activeTab === tab ? THEME.fontWeight.bold : THEME.fontWeight.medium,
                  color: activeTab === tab ? THEME.colors.primary : THEME.colors.textLight,
                }}
              >
                {tab === 'weight' ? 'Peso' : tab === 'strength' ? 'Fuerza' : 'Medidas'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Gráfica */}
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ alignItems: 'center' }}>
          <LineChart
            data={{ 
              labels: dataSets[activeTab].labels, 
              datasets: [{ 
                data: dataSets[activeTab].data,
                color: (opacity = 1) => THEME.colors.primary,
                strokeWidth: 2,
              }] 
            }}
            width={350} 
            height={220} 
            chartConfig={{
              backgroundColor: THEME.colors.white,
              backgroundGradientFrom: THEME.colors.white,
              backgroundGradientTo: THEME.colors.white,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              strokeWidth: 2,
              barPercentage: 0.5,
              useShadowColorFromDataset: false
            }}
            bezier
            style={{ marginVertical: THEME.spacing.md, borderRadius: THEME.borderRadius.md }}
          />
          
          <View style={{
            backgroundColor: THEME.colors.white,
            padding: THEME.spacing.md,
            borderRadius: THEME.borderRadius.md,
            marginTop: THEME.spacing.md,
            alignItems: 'center',
            ...THEME.shadows.small,
          }}>
            <Text style={{
              fontSize: THEME.fontSize.md,
              fontWeight: THEME.fontWeight.bold,
              color: THEME.colors.text,
              marginBottom: THEME.spacing.sm,
            }}>
              Unidad de medida
            </Text>
            <Text style={{
              fontSize: THEME.fontSize.lg,
              fontWeight: THEME.fontWeight.bold,
              color: THEME.colors.primary,
            }}>
              {dataSets[activeTab].unit}
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProgressScreen;