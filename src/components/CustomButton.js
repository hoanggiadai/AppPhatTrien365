import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CustomButton = ({ onPress, title, description, imageSource }) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <View style={styles.contentBox}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Image source={imageSource} style={styles.image} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 400,
    height: 150,
    backgroundColor: 'white',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  contentBox: {
    width: 210,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
    marginTop: 15,
    marginBottom: 9,
  },
  description: {
    fontSize: 14,
    color: '#8B8787',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
    position: 'absolute',
    right: 0,
    marginTop: 15,
    margin: 20,
  },
});

export default CustomButton;