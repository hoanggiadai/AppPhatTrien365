import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E1FBFF',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconBack: {
        width: 40,
        height: 40,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        marginLeft: 90,
        marginRight: 90,
    },
    iconAdd: {
        width: 40,
        height: 40,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    modalContent: {
        backgroundColor: 'white',
        width: 400,
        padding: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 28,
        fontWeight: '800',
        color: 'black',
        textAlign: 'center',
        marginBottom: 50,
    },
    addButton: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#E99B45',
        justifyContent: 'center',
        marginBottom: 15,
    },
    addButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
    },
    cancelButton: {
        width: '100%',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#DEDEDE',
        justifyContent: 'center',
        marginBottom: 15,
    },
    cancelButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#F73E3E',
        textAlign: 'center',
    },
    content: {
        marginTop: 40,
    },
    itemContainer: {
        width: '100%',
        padding: 15,
        borderWidth: 0.7,
        borderColor: '#D9D9D9',
        borderRadius: 15,
        marginBottom: 10,
        backgroundColor: '#ffffff',
    },
    itemDate: {
        fontSize: 12,
        fontStyle: 'italic',
        marginBottom: 10,
    },
    itemContent: {
        fontSize: 18,
        color: 'black',
        marginBottom: 20,
    },
    itemActions: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemActionButton: {
        marginRight: 40,
        marginLeft: 40
    },
    itemActionText: {
        fontSize: 22,
        fontWeight: '800',
        color: '#E99B45',
    },
    itemDeleteText: {
        color: '#ED1B1B',
        fontStyle: 'italic',
    },
})

export default styles;