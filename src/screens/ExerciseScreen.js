import { View, Text, TouchableOpacity, Image, Modal } from 'react-native'
import React, { useState } from 'react'
import styles from '../styles/ExerciseScreen'
import CustomTextInput from '../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';

const ExerciseScreen = ({ navigation }) => {

  const [formValues, setFormValues] = useState({ ngay: '', tuan: '', thang: '' });
  const [errors, setErrors] = useState({ ngay: '', tuan: '', thang: '' });
  const [isShowDialogUpdate, setIsShowDialogUpdate] = useState(false);

  const handleTrangChuNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabNavigator' }],
    });
  };

  const [subscription, setSubscription] = useState(null);
  const dispatch = useDispatch();
  const steps = useSelector(state => state.steps.steps);
  const goal = useSelector(state => state.steps.goal);
  const userId = useSelector(state => state.user.nguoiDung.id);
  
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleTrangChuNavigation}>
          <Image source={require('../assets/icons/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Vận động</Text>
        <TouchableOpacity onPress={() => setIsShowDialogUpdate(true)}>
          <Image source={require('../assets/icons/pencil.png')} style={styles.iconAdd} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ExerciseScreen