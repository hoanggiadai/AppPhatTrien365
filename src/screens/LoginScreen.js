import React, { useState, useCallback } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/LoginScreen';
import Wrapper from '../components/Wrapper';
import CustomTextInput from '../components/CustomTextInput';
import { useDispatch, useSelector } from 'react-redux';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../services/firebaseConfig';
import { setUser, setStatus, setError } from '../redux/actions/userAction';

const LoginScreen = ({ navigation }) => {
  const [soDiDong, setSoDiDong] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [errors, setErrors] = useState({
    soDiDong: '',
    matKhau: '',
  });

  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);

  // Validate a single field
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'soDiDong':
        return value === ''
          ? 'Số di động không được để trống'
          : value.length !== 10
            ? 'Số di động phải có 10 chữ số'
            : '';
      case 'matKhau':
        return value === ''
          ? 'Mật khẩu không được để trống'
          : '';
      default:
        return '';
    }
  }, []);

  // Validate all fields
  const validateFields = useCallback(() => {
    const newErrors = {
      soDiDong: validateField('soDiDong', soDiDong),
      matKhau: validateField('matKhau', matKhau),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  }, [soDiDong, matKhau, validateField]);

  // Handle input change
  const handleChange = useCallback((name, value) => {
    if (name === 'soDiDong') {
      setSoDiDong(value);
    } else if (name === 'matKhau') {
      setMatKhau(value);
    }
  }, []);

  // Handle blur
  const handleBlur = useCallback((name, value) => {
    setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
  }, [validateField]);

  // Handle login
  const handleLogin = async () => {
    if (validateFields()) {
      dispatch(setStatus('loading'));

      try {
        const q = query(collection(firestore, 'NguoiDung'), where('soDiDong', '==', soDiDong), where('matKhau', '==', matKhau));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          dispatch(setUser(userData));
          dispatch(setStatus('succeeded'));

          // Reset navigation stack and navigate to BottomTabNavigator
          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabNavigator' }],
          });
        } else {
          dispatch(setError('Thông tin đăng nhập không chính xác'));
          dispatch(setStatus('failed'));
          Alert.alert('Lỗi', 'Số điện thoại hoặc mật khẩu không chính xác.');
        }
      } catch (err) {
        dispatch(setError('Đăng nhập không thành công, vui lòng thử lại.'));
        dispatch(setStatus('failed'));
        console.error("Error logging in: ", err);
        Alert.alert('Lỗi', 'Đăng nhập không thành công, vui lòng thử lại.');
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Wrapper>
        <Image source={require('../assets/images/logo-fpoly.png')} style={styles.logo_fpoly} />
        <Image source={require('../assets/images/logo-app-phat-trien-365.png')} style={styles.logo_phat_trien_365} />

        <CustomTextInput
          value={soDiDong}
          onChangeText={value => handleChange('soDiDong', value)}
          placeholder='Số di động'
          isPassword={false}
          keyboardType="phone-pad"
          errorMessage={errors.soDiDong}
          onBlur={() => handleBlur('soDiDong', soDiDong)} // Validate on blur
        />

        <CustomTextInput
          value={matKhau}
          onChangeText={value => handleChange('matKhau', value)}
          placeholder='Mật khẩu'
          isPassword={true}
          errorMessage={errors.matKhau}
          onBlur={() => handleBlur('matKhau', matKhau)} // Validate on blur
        />

        <TouchableOpacity style={styles.button_dang_nhap} onPress={handleLogin}>
          <Text style={styles.text_dang_nhap}>Đăng nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.text_quen_mat_khau}>Bạn quên mật khẩu ư?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_dang_ky}
          onPress={() => navigation.navigate('ManHinhDangKy')}
        >
          <Text style={styles.text_dang_ky}>Tạo tài khoản mới</Text>
        </TouchableOpacity>

        <Text style={styles.text_thong_tin_ca_nhan}>Hoàng Gia Đại - PH36944</Text>
      </Wrapper>
    </ScrollView>
  );
};

export default LoginScreen;