import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  skipButton: {
    position: 'absolute',
    top: 27,
    right: 27,
  },
  skipButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    width: 300,
    height: 60,
    backgroundColor: '#E99B45',
    borderRadius: 20,
    position: 'absolute',
    bottom: 27,
    left: '50%',
    marginLeft: -150, // Căn giữa theo chiều ngang
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontSize: 24,
    fontWeight: '900',
    color: 'white',
  },
  content: {
    fontSize: 16,
    color: 'white',
    marginHorizontal: 20,
    position: 'absolute',
    bottom: 110,
    textAlign: 'center', // Căn giữa nội dung
  },
});

export default styles;