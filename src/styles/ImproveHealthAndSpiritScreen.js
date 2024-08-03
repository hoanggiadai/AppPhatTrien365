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
    content: {
        fontSize: 22,
        color: 'black',
        marginTop: 45,
        marginBottom: 30
    },
    playlist: {
        height: 500
    },
    playlistItem: {
        fontSize: 28,
        fontWeight: '600',
        color: 'black',
        alignSelf: 'center',
        marginLeft: 20
    },
    trackProgress: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 24,
        color: '#333333'
    },
    songTitle: {
        fontSize: 32,
        marginTop: 20,
        color: '#000000',
        fontWeight: '800'
    },
    artistName: {
        fontSize: 24,
        color: '#888',
        fontStyle: 'italic'
    },
    buttonPlay: {
        marginLeft: 50,
        marginRight: 50
    },
    imgNhac: {
        width: 70,
        height: 70,
        marginVertical: 10,
        marginLeft: 15
    }
})

export default styles