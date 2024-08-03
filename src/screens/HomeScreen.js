import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import styles from '../styles/HomeScreen';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({ navigation }) => {
  const user = useSelector(state => state.user.nguoiDung); // Lấy thông tin người dùng từ Redux
  const [BMI, setBMI] = useState(null);
  const [loiKhuyen, setLoiKhuyen] = useState('');

  useEffect(() => {
    if (user && user.chieuCao && user.canNang) {
      const chieuCaoM = user.chieuCao / 100; // Chuyển đổi chiều cao từ cm sang mét
      const calculatedBMI = (user.canNang / (chieuCaoM * chieuCaoM)).toFixed(2);
      setBMI(calculatedBMI);

      // Cung cấp lời khuyên dựa trên chỉ số BMI
      if (calculatedBMI < 18.5) {
        setLoiKhuyen('Bạn cần tăng cân để có một cơ thể khỏe mạnh.');
      } else if (calculatedBMI >= 18.5 && calculatedBMI < 24.9) {
        setLoiKhuyen('Chỉ số BMI của bạn bình thường. Hãy duy trì lối sống lành mạnh.');
      } else if (calculatedBMI >= 25 && calculatedBMI < 29.9) {
        setLoiKhuyen('Bạn cần giảm cân để tránh nguy cơ về sức khỏe.');
      } else {
        setLoiKhuyen('Bạn cần gặp bác sĩ để được tư vấn về sức khỏe.');
      }
    }
  }, [user]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo-fpoly.png')} style={styles.logo_fpoly} />
      <Text style={styles.tieu_de}>Phát triển 365</Text>
      <ScrollView>
        <Text style={styles.text_BMI}>BMI: {BMI || 'Chưa có dữ liệu'}</Text>
        <Text style={styles.text_loi_khuyen}>Lời khuyên: {loiKhuyen || 'Chưa có dữ liệu'}</Text>

        <CustomButton
          onPress={() => navigation.navigate('ManHinhTinhThan')}
          title="Tinh thần"
          description="Dù chúng ta có bao nhiêu, nếu không biết trân trọng và cảm ơn, 
                      chúng ta vẫn sẽ cảm thấy thiếu thốn. Hạnh phúc bắt đầu từ lòng biết ơn."
          imageSource={require('../assets/images/healthy.png')}
        />

        <CustomButton
          onPress={() => navigation.navigate('ManHinhVanDong')}
          title="Vận động"
          description="Vận động không chỉ là cách chúng ta giữ cơ thể khỏe mạnh, mà còn là 
                      cách chúng ta làm tâm hồn vui vẻ và tươi trẻ."
          imageSource={require('../assets/images/running.png')}
        />

        <CustomButton
          onPress={() => navigation.navigate('ManHinhNangCaoSucKhoeTinhThan')}
          title="Nâng cao sức khỏe và tinh thần"
          description="Một tinh thần mạnh mẽ sẽ dẫn lối cho cơ thể khỏe mạnh."
          imageSource={require('../assets/images/lotus.png')}
        />

        <CustomButton
          onPress={() => navigation.navigate('ManHinhTuVanTamLyNguoiDung')}
          title="Tư vấn tâm lý"
          description="Giải quyết vấn đề tâm lý không phải là việc đơn độc"
          imageSource={require('../assets/images/psychology.png')}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;