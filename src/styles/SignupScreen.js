import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    logo_fpoly: {
        width: 120,
        height: 40.76,
        resizeMode: 'cover',
        marginVertical: 20,
        marginLeft: 7,
    },
    tieu_de: {
        fontSize: 28,
        fontWeight: '800',
        color: 'black',
        marginBottom: 10,
    },
    tieu_de_nho: {
        fontSize: 14,
        fontWeight: '400',
        color: 'black',
        marginBottom: 27,
    },
    button_dang_ky: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#E99B45',
        justifyContent: 'center',
        marginVertical: 20,
    },
    text_dang_ky: {
        fontSize: 22,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
    text_dang_nhap: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        color: 'black',
        textAlign: 'center',
    },
});

export default styles;