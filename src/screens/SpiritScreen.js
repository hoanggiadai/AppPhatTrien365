import { View, Text, TouchableOpacity, Image, Modal, Alert, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from '../styles/SpiritScreen';
import CustomTextInput from '../components/CustomTextInput';
import { useSelector, useDispatch } from 'react-redux';
import UUID from 'react-native-uuid';
import { firestore } from '../services/firebaseConfig';
import { collection, addDoc, query, where, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { setTinhThan, updateTinhThan, deleteTinhThan } from '../redux/actions/spiritActions';

const SpiritScreen = ({ navigation }) => {
  const [formValues, setFormValues] = useState({ noiDung: '' });
  const [errors, setErrors] = useState({ noiDung: '' });
  const [isShowDialogAdd, setIsShowDialogAdd] = useState(false);
  const [isShowDialogUpdate, setIsShowDialogUpdate] = useState(false);

  const user = useSelector(state => state.user.nguoiDung);
// console.log(use÷r);
  const tinhThan = useSelector((state) => state.spirit.tinhThan);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      const q = query(collection(firestore, 'TinhThan'), where('IDNguoiDung', '==', user.id));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        const sortedData = data.sort((a, b) => new Date(b.ngayTao) - new Date(a.ngayTao));
        dispatch(setTinhThan(sortedData));
      });

      return () => unsubscribe();
    }
  }, [user, dispatch]);

  const renderTinhThanItem = ({ item }) => {
    const date = new Date(item.ngayTao);
    const formattedDate = `Tạo lúc ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')} Ngày ${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemDate}>{formattedDate}</Text>
        <Text style={styles.itemContent}>{item.noiDung}</Text>
        <View style={styles.itemActions}>
          <TouchableOpacity
            style={styles.itemActionButton}
            onPress={() => {
              setFormValues(item);
              setIsShowDialogUpdate(true);
            }}
          >
            <Text style={styles.itemActionText}>Sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.itemActionButton}
            onPress={() => handleDeleteContent(item.id)}
          >
            <Text
              style={[styles.itemActionText, styles.itemDeleteText]}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const handleTrangChuNavigation = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTabNavigator' }],
    });
  };

  const handleChange = (name, value) => {
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: '',
    });
  };


  const validateForm = () => {
    const newErrors = {};
    let valid = true;

    if (!formValues.noiDung) {
      newErrors.noiDung = 'Nội dung không được để trống';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleAddContent = async () => {
    if (!validateForm()) return;


    if (user) {
      const newContent = {
        id: UUID.v4(),
        IDNguoiDung: user.id,
        ngayTao: new Date().toISOString(),
        lanCapNhatCuoi: null,
        noiDung: formValues.noiDung,
      };

      try {
        await addDoc(collection(firestore, 'TinhThan'), newContent);
        setFormValues({ noiDung: '' });
        setIsShowDialogAdd(false);
        Alert.alert('Thành công', 'Nội dung đã được thêm.');
      } catch (error) {
        console.error("Error adding document: ", error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi thêm nội dung.');
      }
    } else {
      Alert.alert('Lỗi', 'Người dùng không đăng nhập.');
    }
  };

  const handleUpdateContent = async () => {
    if (!validateForm()) return;

    if (user) {
      const updatedContent = {
        lanCapNhatCuoi: new Date().toISOString(),
        noiDung: formValues.noiDung,
      };

      try {
        await updateDoc(doc(firestore, 'TinhThan', formValues.id), updatedContent);
        dispatch(updateTinhThan(formValues.id, updatedContent)); // Cập nhật trong Redux
        setFormValues({ noiDung: '' });
        setIsShowDialogUpdate(false);
        Alert.alert('Thành công', 'Nội dung đã được cập nhật.');
      } catch (error) {
        console.error("Error updating document: ", error);
        Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật nội dung.');
      }
    } else {
      Alert.alert('Lỗi', 'Người dùng không đăng nhập.');
    }
  };

  const handleDeleteContent = (id) => {
    Alert.alert(
      'Xác nhận xóa',
      'Bạn có chắc chắn muốn xóa nội dung này không?',
      [
        {
          text: 'Hủy',
          style: 'cancel',
        },
        {
          text: 'Xóa',
          onPress: async () => {
            try {
              await deleteDoc(doc(firestore, 'TinhThan', id));
              dispatch(deleteTinhThan(id)); // Xóa trong Redux
              Alert.alert('Thành công', 'Nội dung đã được xóa.');
            } catch (error) {
              console.error("Error deleting document: ", error);
              Alert.alert('Lỗi', 'Có lỗi xảy ra khi xóa nội dung.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleTrangChuNavigation}>
          <Image source={require('../assets/icons/back.png')} style={styles.iconBack} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sự biết ơn{'\n'}Hạnh phúc</Text>
        <TouchableOpacity onPress={() => setIsShowDialogAdd(true)}>
          <Image source={require('../assets/icons/pencil.png')} style={styles.iconAdd} />
        </TouchableOpacity>

        <Modal visible={isShowDialogAdd} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Thêm Lời biết ơn</Text>

              <CustomTextInput
                value={formValues.noiDung}
                onChangeText={value => handleChange('noiDung', value)}
                placeholder='Nội dung'
                isPassword={false}
                errorMessage={errors.noiDung}
              />

              <TouchableOpacity style={styles.addButton} onPress={handleAddContent}>
                <Text style={styles.addButtonText}>Thêm</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsShowDialogAdd(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={isShowDialogUpdate} transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Sửa Lời biết ơn</Text>

              <CustomTextInput
                value={formValues.noiDung}
                onChangeText={value => handleChange('noiDung', value)}
                placeholder='Nội dung'
                isPassword={false}
                errorMessage={errors.noiDung}
              />

              <TouchableOpacity
                style={styles.addButton}
                onPress={handleUpdateContent}
              >
                <Text style={styles.addButtonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsShowDialogUpdate(false)}>
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>

      <View style={styles.content}>
        <FlatList
          data={tinhThan}
          renderItem={renderTinhThanItem}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
};

export default SpiritScreen;