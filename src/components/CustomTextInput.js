import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

const CustomTextInput = ({
    value,
    onChangeText,
    placeholder,
    isPassword = false,
    errorMessage,
    ...props
}) => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(!isPassword);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[styles.input, errorMessage ? styles.errorInput : null]}
                placeholder={placeholder}
                placeholderTextColor='#D9D9D9'
                secureTextEntry={isPassword && !isPasswordVisible}
                onChangeText={onChangeText}
                value={value}
                {...props}
            />
            {isPassword && (
                <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
                    <Image
                        source={isPasswordVisible
                            ? require('../assets/icons/show.png') // Hình ảnh khi mật khẩu được hiển thị
                            : require('../assets/icons/hide.png')} // Hình ảnh khi mật khẩu được ẩn
                        style={styles.icon}
                    />
                </TouchableOpacity>
            )}
            {errorMessage ? (
                <Text style={styles.errorText}>{errorMessage}</Text>
            ) : null}
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
    },
    input: {
        height: 70,
        borderWidth: 0.7,
        borderColor: '#D9D9D9',
        borderRadius: 15,
        fontSize: 22,
        color: '#000',
        paddingLeft: 20
    },
    errorInput: {
        borderColor: 'red',
    },
    iconContainer: {
        position: 'absolute',
        right: 0,
        top: 10,
        padding: 10,
        backgroundColor: 'white',
        marginRight: 8,
        borderLeftWidth: 1,
        borderColor: '#D9D9D9'
    },
    icon: {
        width: 30,
        height: 30
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
})