import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/WellComScreen';

const WellComScreen = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    const newTimer = setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{ name: 'ManHinhDangNhap' }],
      });
    }, 3000); // Chuyển màn hình sau 5 giây

    setTimer(newTimer);

    return () => clearTimeout(newTimer);
  }, [navigation]);

  const handleNavigateToLogin = () => {
    if (timer) {
      clearTimeout(timer); // Hủy bộ đếm thời gian
    }
    navigation.reset({
      index: 0,
      routes: [{ name: 'ManHinhDangNhap' }],
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/backgroud-welcome-screen.png')}
        style={styles.background}
      >
        {/* Nút Bỏ qua */}
        <TouchableOpacity style={styles.skipButton} onPress={handleNavigateToLogin}>
          <Text style={styles.skipButtonText}>Bỏ qua</Text>
        </TouchableOpacity>

        {/* Nội dung */}
        <Text style={styles.content}>
          Xin chào, tôi là một ứng dụng sức khỏe tuyệt vời có tên là Phát triển 365. 
          Tôi được thiết kế để giúp bạn theo dõi và cải thiện sức khỏe tinh thần và thể 
          chất của mình một cách hiệu quả và tiện lợi.
        </Text>

        {/* Nút Bắt đầu */}
        <TouchableOpacity style={styles.startButton} onPress={handleNavigateToLogin}>
          <Text style={styles.startButtonText}>BẮT ĐẦU</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default WellComScreen;