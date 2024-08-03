import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import CustomBottomTabNavigator from './CustomBottomTabNavigator';
import ExerciseScreen from '../screens/ExerciseScreen';
import ImproveHealthAndSpiritScreen from '../screens/ImproveHealthAndSpiritScreen';
import LoginScreen from '../screens/LoginScreen';
import PsychologicalConsultationExpertScreen from '../screens/PsychologicalConsultationExpertScreen';
import PsychologicalConsultationUserScreen from '../screens/PsychologicalConsultationUserScreen';
import SignupScreen from '../screens/SignupScreen';
import SpiritScreen from '../screens/SpiritScreen';
import WellComScreen from '../screens/WellComeScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='ManHinhChao' component={WellComScreen} />
      <Stack.Screen name='ManHinhDangNhap' component={LoginScreen} />
      <Stack.Screen name='ManHinhDangKy' component={SignupScreen} />
      <Stack.Screen name="BottomTabNavigator" component={CustomBottomTabNavigator} />
      <Stack.Screen name='ManHinhTinhThan' component={SpiritScreen} />
      <Stack.Screen name='ManHinhVanDong' component={ExerciseScreen} />
      <Stack.Screen name='ManHinhNangCaoSucKhoeTinhThan' component={ImproveHealthAndSpiritScreen} />
      <Stack.Screen name='ManHinhTuVanTamLyNguoiDung' component={PsychologicalConsultationUserScreen} />
      <Stack.Screen name='ManHinhTuVanTamLyChuyenGia' component={PsychologicalConsultationExpertScreen} />
    </Stack.Navigator>
  )
}

export default AppNavigator;