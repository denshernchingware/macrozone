import { globalStyles } from '../styles/globalStyles';
import { Text, ScrollView } from 'react-native';
import HomeHeader from '../components/HomeHeader';
import MacroGrid from '../components/MacroGrid';
import RecentMeals from '../components/RecentMeals';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { getMeals, Meal } from '../storage/meals';

export default function HomeScreen() {
  const [meals, setMeals] = useState<Meal[]>([]);

  const loadMeals = async () => {
    const data = await getMeals();
    setMeals(data);
    console.log('Loaded meals:', data);
  };

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>MacroZone</Text>
      <HomeHeader />
      <MacroGrid />
      <RecentMeals meals={meals} />
    </ScrollView>
  );
}