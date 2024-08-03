import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    logo_fpoly: {
        width: 120,
        height: 40.76,
        resizeMode: 'cover',
        marginVertical: 7, // Gộp marginTop và marginBottom
        marginLeft: 7,
    },
    logo_phat_trien_365: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        alignSelf: 'center',
        marginVertical: 83, // Gộp marginTop và marginBottom
    },
    button_dang_nhap: {
        width: '100%', // Đảm bảo nút rộng 100% của màn hình
        maxWidth: 390, // Chiều rộng tối đa
        height: 50,
        borderRadius: 30,
        backgroundColor: '#E99B45',
        alignSelf: 'center',
        justifyContent: 'center',
        marginBottom: 25,
    },
    text_dang_nhap: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    text_quen_mat_khau: {
        fontSize: 18,
        fontWeight: '800',
        color: '#000000',
        textAlign: 'center',
        marginBottom: 125,
    },
    button_dang_ky: {
        width: '100%', // Đảm bảo nút rộng 100% của màn hình
        maxWidth: 390, // Chiều rộng tối đa
        height: 50,
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#E99B45',
        backgroundColor: 'white',
        justifyContent: 'center',
        marginBottom: 25,
        alignSelf: 'center'
    },
    text_dang_ky: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#E99B45',
        textAlign: 'center',
    },
    text_thong_tin_ca_nhan: {
        fontSize: 18,
        color: '#8B8787',
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default styles;