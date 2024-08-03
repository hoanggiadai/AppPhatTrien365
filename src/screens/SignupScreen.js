import React, { useState, useCallback } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import styles from '../styles/SignupScreen';
import CustomTextInput from '../components/CustomTextInput';
import CustomRadioButtonGroup from '../components/CustomRadioButtonGroup';
import moment from 'moment';
import UUID from 'react-native-uuid';
import { firestore } from '../services/firebaseConfig';
import { collection, addDoc, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setError, setStatus } from '../redux/actions/userAction';

const SignupScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);

  const [formValues, setFormValues] = useState({
    hoTen: '',
    soDiDong: '',
    matKhau: '',
    nhapLaiMatKhau: '',
    ngaySinh: '',
    gioiTinh: '',
    taiKhoan: '',
    anhDaiDien: '',
    diaChi: '',
    chieuCao: '',
    canNang: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    hoTen: '',
    soDiDong: '',
    matKhau: '',
    nhapLaiMatKhau: '',
    ngaySinh: '',
    gioiTinh: '',
    taiKhoan: '',
    anhDaiDien: '',
    diaChi: '',
    chieuCao: '',
    canNang: '',
    email: '',
  });

  const listGioiTinh = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Khác', label: 'Khác' },
  ];

  const listTaiKhoan = [
    { value: 'Người dùng', label: 'Người Dùng' },
    { value: 'Chuyên gia', label: 'Chuyên gia' },
  ];

  // Validate a single field
  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'hoTen':
        return value.trim() === ''
          ? 'Không được để trống họ tên'
          : !/^[\p{L}\s]+$/u.test(value)
            ? 'Họ tên chỉ chứa chữ và khoảng trắng'
            : '';
      case 'soDiDong':
        return value.trim() === ''
          ? 'Không được để trống số di động'
          : !/^\d{10}$/.test(value)
            ? 'Số di động có 10 chữ số'
            : '';
      case 'matKhau':
        return value.trim() === ''
          ? 'Không được để trống mật khẩu'
          : value.length < 8
            ? 'Mật khẩu phải có ít nhất 8 ký tự'
            : !/[A-Z]/.test(value)
              ? 'Mật khẩu phải có ít nhất một ký tự chữ hoa'
              : !/[a-z]/.test(value)
                ? 'Mật khẩu phải có ít nhất một ký tự chữ thường'
                : !/\d/.test(value)
                  ? 'Mật khẩu phải có ít nhất một ký tự số'
                  : '';
      case 'nhapLaiMatKhau':
        return value.trim() === ''
          ? 'Không được để trống'
          : value !== formValues.matKhau
            ? 'Mật khẩu nhập lại không khớp với mật khẩu'
            : '';
      case 'ngaySinh':
        return value.trim() === ''
          ? 'Không được để trống ngày sinh'
          : !moment(value, 'DD/MM/YYYY', true).isValid()
            ? 'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY'
            : moment(value, 'DD/MM/YYYY').isAfter(moment())
              ? 'Ngày sinh không thể là ngày trong tương lai'
              : '';
      case 'gioiTinh':
      case 'taiKhoan':
        return value === ''
          ? `Vui lòng chọn loại ${name === 'gioiTinh' ? 'giới tính' : 'tài khoản'}`
          : '';
      default:
        return '';
    }
  }, [formValues.matKhau]);

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setFormValues(prevValues => ({ ...prevValues, [name]: value }));
  }, []);

  // Validate field on blur
  const handleBlur = useCallback((name, value) => {
    setErrors(prevErrors => ({ ...prevErrors, [name]: validateField(name, value) }));
  }, [validateField]);

  // Handle register
  const handleRegister = useCallback(async () => {
    const validationErrors = {
      hoTen: validateField('hoTen', formValues.hoTen),
      soDiDong: validateField('soDiDong', formValues.soDiDong),
      matKhau: validateField('matKhau', formValues.matKhau),
      nhapLaiMatKhau: validateField('nhapLaiMatKhau', formValues.nhapLaiMatKhau),
      ngaySinh: validateField('ngaySinh', formValues.ngaySinh),
      gioiTinh: validateField('gioiTinh', formValues.gioiTinh),
      taiKhoan: validateField('taiKhoan', formValues.taiKhoan),
    };

    setErrors(validationErrors);

    if (Object.values(validationErrors).every(error => error === '')) {
      dispatch(setStatus('loading'));

      try {
        // Kiểm tra xem số điện thoại đã được đăng ký chưa
        const q = query(collection(firestore, 'NguoiDung'), where('soDiDong', '==', formValues.soDiDong));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          Alert.alert('Thông báo', 'Số điện thoại đã được đăng ký');
          dispatch(setStatus('failed'));
          return;
        }

        // Tạo UUID mới
        const id = UUID.v4();

        // Nếu số điện thoại chưa được đăng ký, tiến hành đăng ký
        await setDoc(doc(firestore, 'NguoiDung', id), {
          id,
          hoTen: formValues.hoTen,
          soDiDong: formValues.soDiDong,
          matKhau: formValues.matKhau, // Chú ý: Không nên lưu mật khẩu dạng văn bản rõ ràng
          ngaySinh: formValues.ngaySinh,
          gioiTinh: formValues.gioiTinh,
          taiKhoan: formValues.taiKhoan,
          anhDaiDien: formValues.anhDaiDien,
          diaChi: formValues.diaChi,
          chieuCao: formValues.chieuCao,
          canNang: formValues.canNang,
          email: formValues.email,
        });

        dispatch(setUser({
          id,
          ...formValues,
        }));
        dispatch(setStatus('succeeded'));

        Alert.alert('Thông báo', 'Đăng ký thành công', [
          {
            text: 'OK',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'ManHinhDangNhap' }],
              });
            },
          },
        ]);
      } catch (err) {
        dispatch(setError('Đăng ký không thành công, vui lòng thử lại.'));
        dispatch(setStatus('failed'));
        console.error("Error adding document: ", err);
      }
    }
  }, [formValues, validateField, navigation, dispatch]);

  // Handle navigation to login screen
  const handleLoginNavigation = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'ManHinhDangNhap' }],
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={require('../assets/images/logo-fpoly.png')} style={styles.logo_fpoly} />
        <Text style={styles.tieu_de}>Đăng ký</Text>
        <Text style={styles.tieu_de_nho}>Nhanh chóng và dễ dàng</Text>

        <CustomTextInput
          value={formValues.hoTen}
          onChangeText={value => handleChange('hoTen', value)}
          onBlur={() => handleBlur('hoTen', formValues.hoTen)}
          placeholder='Họ tên'
          isPassword={false}
          errorMessage={errors.hoTen}
        />

        <CustomTextInput
          value={formValues.soDiDong}
          onChangeText={value => handleChange('soDiDong', value)}
          onBlur={() => handleBlur('soDiDong', formValues.soDiDong)}
          placeholder='Số di động'
          isPassword={false}
          keyboardType="phone-pad"
          errorMessage={errors.soDiDong}
        />

        <CustomTextInput
          value={formValues.matKhau}
          onChangeText={value => handleChange('matKhau', value)}
          onBlur={() => handleBlur('matKhau', formValues.matKhau)}
          placeholder='Mật khẩu'
          isPassword={true}
          errorMessage={errors.matKhau}
        />

        <CustomTextInput
          value={formValues.nhapLaiMatKhau}
          onChangeText={value => handleChange('nhapLaiMatKhau', value)}
          onBlur={() => handleBlur('nhapLaiMatKhau', formValues.nhapLaiMatKhau)}
          placeholder='Nhập lại mật khẩu'
          isPassword={true}
          errorMessage={errors.nhapLaiMatKhau}
        />

        <CustomTextInput
          value={formValues.ngaySinh}
          onChangeText={value => handleChange('ngaySinh', value)}
          onBlur={() => handleBlur('ngaySinh', formValues.ngaySinh)}
          placeholder='Ngày Sinh (DD/MM/YYYY)'
          isPassword={false}
          errorMessage={errors.ngaySinh}
        />

        <CustomRadioButtonGroup
          options={listGioiTinh}
          selectedValue={formValues.gioiTinh}
          onSelect={value => handleChange('gioiTinh', value)}
          errorMessage={errors.gioiTinh}
        />

        <CustomRadioButtonGroup
          options={listTaiKhoan}
          selectedValue={formValues.taiKhoan}
          onSelect={value => handleChange('taiKhoan', value)}
          errorMessage={errors.taiKhoan}
        />

        <TouchableOpacity style={styles.button_dang_ky} onPress={handleRegister}>
          <Text style={styles.text_dang_ky}>Đăng ký</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginNavigation}>
          <Text style={styles.text_dang_nhap}>Tôi đã có tài khoản</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SignupScreen;