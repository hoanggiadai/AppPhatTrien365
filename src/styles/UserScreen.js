import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    tieu_de: {
        fontSize: 28,
        fontWeight: '800',
        color: '#000000',
        textAlign: 'center',
        marginTop: 10
    },
    icon_sua: {
        width: 50, height: 50,
        position: 'absolute',
        right: 0,
    },
    button_sua: {
        position: 'absolute',
        right: 0,
        marginTop: 30,
        marginRight: 25
    },
    anh_dai_dien: {
        width: 170, height: 170,
        alignSelf: 'center',
        marginTop: 50,
        marginBottom: 40,
        borderRadius: 15
    },
    ho_ten: {
        fontSize: 24,
        fontWeight: '700',
        color: '#000000',
        marginBottom: 30,
        textAlign: 'center'
    },
    button_dang_xuat: {
        width: '100%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        marginTop: 100,
        justifyContent: 'center'
    },
    text_dang_xuat: {
        fontSize: 22,
        color: '#E23E3E',
        textAlign: 'center',

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
      },
      modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'black',
        textAlign: 'center'
      },
      addButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 25
      },
      addButtonText: {
        color: 'white',
        fontSize: 16,
      },
      cancelButton: {
        backgroundColor: '#6c757d',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
      },
      cancelButtonText: {
        color: 'white',
        fontSize: 16,
      },
})

export default styles;