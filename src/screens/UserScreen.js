import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, Modal, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout, setUser } from '../redux/actions/userAction'; // Đường dẫn chính xác tới userAction
import { doc, onSnapshot, updateDoc, getDoc } from 'firebase/firestore';
import { firestore } from '../services/firebaseConfig';
import CustomTextInput from '../components/CustomTextInput';
import styles from '../styles/UserScreen';
import CustomInformationUser from '../components/CustomInformationUser';
import moment from 'moment';

const UserScreen = () => {
  const user = useSelector(state => state.user.nguoiDung); // Điều chỉnh cách lấy dữ liệu người dùng
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isShowDialog, setIsShowDialog] = useState(false);
  const [formValues, setFormValues] = useState({
    hoTen: user.hoTen || '',
    ngaySinh: user.ngaySinh || '',
    gioiTinh: user.gioiTinh || '',
    diaChi: user.diaChi || '',
    anhDaiDien: user.anhDaiDien || '',
    chieuCao: user.chieuCao || '',
    canNang: user.canNang || '',
    BMI: user.BMI || '',
    email: user.email || '',
    soDiDong: user.soDiDong || '',
    taiKhoan: user.taiKhoan || '',
  });

  const [errors, setErrors] = useState({
    hoTen: '',
    ngaySinh: '',
    gioiTinh: '',
    diaChi: '',
    email: '',
    chieuCao: '',
    canNang: '',
    soDiDong: ''
  });

  const listGioiTinh = [
    { value: 'Nam', label: 'Nam' },
    { value: 'Nữ', label: 'Nữ' },
    { value: 'Khác', label: 'Khác' },
  ];
  
  
  useEffect(() => {
    if (user && user.id) {
      const userDocRef = doc(firestore, 'NguoiDung', user.id);
  
      const unsubscribe = onSnapshot(userDocRef, (doc) => {
        const updatedUser = doc.data();
        if (updatedUser) {
          dispatch(setUser(updatedUser)); // Cập nhật Redux store với thông tin mới
          setFormValues(prevValues => ({
            ...prevValues,
            ...updatedUser,
            // Đảm bảo tính toán lại BMI nếu cần
            BMI: updatedUser.chieuCao && updatedUser.canNang ? calculateBMI(updatedUser.chieuCao, updatedUser.canNang) : prevValues.BMI,
          }));
        }
      });
  
      return () => unsubscribe();
    }
  }, [dispatch, user.id]); // Theo dõi sự thay đổi của user để cập nhật thông tin
  
  const calculateBMI = (height, weight) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const validateField = useCallback((name, value) => {
    switch (name) {
      case 'hoTen':
        return value.trim() === ''
          ? 'Không được để trống họ tên'
          : !/^[\p{L}\s]+$/u.test(value)
            ? 'Họ tên chỉ chứa chữ và khoảng trắng'
            : '';
      case 'ngaySinh':
        return value.trim() === ''
          ? 'Không được để trống ngày sinh'
          : !moment(value, 'DD/MM/YYYY', true).isValid()
            ? 'Ngày sinh không hợp lệ. Vui lòng nhập theo định dạng DD/MM/YYYY'
            : moment(value, 'DD/MM/YYYY').isAfter(moment())
              ? 'Ngày sinh không thể là ngày trong tương lai'
              : '';
      case 'email':
        return value.trim() === ''
          ? '' // Bỏ qua xác thực nếu ô trống
          : !/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)
            ? 'Email không hợp lệ'
            : '';
      case 'chieuCao':
        return value.trim() === ''
          ? '' // Bỏ qua xác thực nếu ô trống
          : isNaN(value)
            ? 'Chiều cao phải là số và không được để trống'
            : '';
      case 'canNang':
        return value.trim() === ''
          ? '' // Bỏ qua xác thực nếu ô trống
          : isNaN(value)
            ? 'Cân nặng phải là số và không được để trống'
            : '';
      case 'soDiDong':
        return value.trim() === ''
          ? 'Không được để trống số di động'
          : !/^\d{10,15}$/.test(value)
            ? 'Số di động không hợp lệ'
            : '';
      default:
        return '';
    }
  }, []);

  const handleChange = (field, value) => {
    setFormValues(prev => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field) => {
    setErrors(prev => ({ ...prev, [field]: validateField(field, formValues[field]) }));
  };

  const validateForm = () => {
    const validationErrors = {
      hoTen: validateField('hoTen', formValues.hoTen),
      ngaySinh: validateField('ngaySinh', formValues.ngaySinh),
      gioiTinh: validateField('gioiTinh', formValues.gioiTinh),
      email: validateField('email', formValues.email),
      chieuCao: validateField('chieuCao', formValues.chieuCao),
      canNang: validateField('canNang', formValues.canNang),
      soDiDong: validateField('soDiDong', formValues.soDiDong),
    };

    setErrors(validationErrors);

    return Object.values(validationErrors).every(error => error === '');
  };

  const handleUpdateContent = async () => {
    if (!validateForm()) return;

    if (user && user.id) {
      const updatedUser = {
        id: user.id,
        hoTen: formValues.hoTen,
        ngaySinh: formValues.ngaySinh,
        gioiTinh: formValues.gioiTinh,
        diaChi: formValues.diaChi,
        anhDaiDien: formValues.anhDaiDien,
        chieuCao: formValues.chieuCao,
        canNang: formValues.canNang,
        email: formValues.email,
        soDiDong: formValues.soDiDong,
        taiKhoan: user.taiKhoan
      };

      try {
        const userDocRef = doc(firestore, 'NguoiDung', user.id);

        // Kiểm tra xem tài liệu có tồn tại không
        const userDoc = await getDoc(userDocRef);
        if (!userDoc.exists()) {
          Alert.alert('Lỗi', 'Tài liệu không tồn tại.');
          console.log('User ID:', user.id); // Kiểm tra xem ID có hợp lệ không
          return;
        }

        await updateDoc(userDocRef, updatedUser); // Cập nhật tài liệu
        dispatch(setUser(updatedUser)); // Cập nhật trong Redux
        setIsShowDialog(false);
        Alert.alert('Thành công', 'Thông tin cá nhân đã được cập nhật.');
        
      } catch (error) {
        console.error("Error updating document: ", error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin cá nhân.');
      }
    } else {
      Alert.alert('Lỗi', 'Người dùng không đăng nhập.');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Xác nhận đăng xuất',
      'Bạn có chắc chắn muốn đăng xuất?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Đăng xuất',
          onPress: () => {
            
            navigation.reset({
              index: 0,
              routes: [{ name: 'ManHinhDangNhap' }],
            });
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tieu_de}>Cá nhân</Text>
      <TouchableOpacity style={styles.button_sua} onPress={() => setIsShowDialog(true)}>
        <Image source={require('../assets/icons/pencil.png')} style={styles.icon_sua} />
      </TouchableOpacity>

      <Image source={user.anhDaiDien ? { uri: user.anhDaiDien } : require('../assets/images/user.png')} style={styles.anh_dai_dien} />
      <Text style={styles.ho_ten}>{user.hoTen}</Text>

      <CustomInformationUser titleInformation={'Ngày sinh'} informationUser={user.ngaySinh} />
      <CustomInformationUser titleInformation={'Giới tính'} informationUser={user.gioiTinh} />
      <CustomInformationUser titleInformation={'Địa chỉ'} informationUser={user.diaChi} />
      <CustomInformationUser titleInformation={'Số điện thoại'} informationUser={user.soDiDong} />
      <CustomInformationUser titleInformation={'Email'} informationUser={user.email} />
      <CustomInformationUser titleInformation={'Chiều cao'} informationUser={user.chieuCao} />
      <CustomInformationUser titleInformation={'Cân nặng'} informationUser={user.canNang} />
      <CustomInformationUser titleInformation={'Loại tài khoản'} informationUser={user.taiKhoan} />

      <TouchableOpacity style={styles.button_dang_xuat} onPress={handleLogout}>
        <Text style={styles.text_dang_xuat}>Đăng xuất</Text>
      </TouchableOpacity>

      <Modal visible={isShowDialog} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView>
              <Text style={styles.modalTitle}>Thông tin cá nhân</Text>

              <CustomTextInput
                value={formValues.hoTen}
                onChangeText={value => handleChange('hoTen', value)}
                onBlur={() => handleBlur('hoTen')}
                placeholder='Họ tên'
                isPassword={false}
                errorMessage={errors.hoTen}
              />

              <CustomTextInput
                value={formValues.anhDaiDien}
                onChangeText={value => handleChange('anhDaiDien', value)}
                onBlur={() => handleBlur('anhDaiDien')}
                placeholder='URL ảnh đại diện'
                isPassword={false}

              />
              <CustomTextInput
                value={formValues.ngaySinh}
                onChangeText={value => handleChange('ngaySinh', value)}
                onBlur={() => handleBlur('ngaySinh')}
                placeholder='Ngày sinh (DD/MM/YYYY)'
                isPassword={false}
                errorMessage={errors.ngaySinh}
              />

              <CustomTextInput
                value={formValues.diaChi}
                onChangeText={value => handleChange('diaChi', value)}
                onBlur={() => handleBlur('diaChi')}
                placeholder='Địa chỉ'
                isPassword={false}
                errorMessage={errors.diaChi}
              />

              <CustomTextInput
                value={formValues.email}
                onChangeText={value => handleChange('email', value)}
                onBlur={() => handleBlur('email')}
                placeholder='Nhập email'
                isPassword={false}
                errorMessage={errors.email}
              />

              <CustomTextInput
                value={formValues.chieuCao}
                onChangeText={value => handleChange('chieuCao', value)}
                onBlur={() => handleBlur('chieuCao')}
                placeholder='Chiều cao (Cm)'
                isPassword={false}
                errorMessage={errors.chieuCao}
              />

              <CustomTextInput
                value={formValues.canNang}
                onChangeText={value => handleChange('canNang', value)}
                onBlur={() => handleBlur('canNang')}
                placeholder='Cân nặng (Kg)'
                isPassword={false}
                errorMessage={errors.canNang}
              />

              <CustomTextInput
                value={formValues.soDiDong}
                onChangeText={value => handleChange('soDiDong', value)}
                onBlur={() => handleBlur('soDiDong')}
                placeholder='Số di động'
                keyboardType="phone-pad"
                isPassword={false}
                errorMessage={errors.soDiDong}
              />

              <TouchableOpacity style={styles.addButton} onPress={handleUpdateContent}>
                <Text style={styles.addButtonText}>Cập nhật</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsShowDialog(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default UserScreen;