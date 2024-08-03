import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1FBFF'
    },
    logo_fpoly: {
        width: 120,
        height: 40.76,
        resizeMode: 'cover',
        marginBottom: 27,
        marginTop: 20,
        marginLeft: 20
    }, 
    tieu_de: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        color: 'black'
    },
    text_BMI: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        marginBottom: 7,
        marginLeft: 20
    },
    text_loi_khuyen: {
        fontSize: 16,
        color: 'black',
        marginBottom: 20,
        marginLeft: 20
    },
})

export default styles;