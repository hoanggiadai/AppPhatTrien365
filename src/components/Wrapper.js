import { View, Text, KeyboardAvoidingView, Platform, StatusBar, StyleSheet } from 'react-native'
import React from 'react'

const Wrapper = ({ children, style, disableAvoidStatusBar = false, ...props }) => {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={[styles.wrapper, style]}
            {...props} >

            {!disableAvoidStatusBar && <StatusBar barStyle="dark-content" backgroundColor="#61dafb" />}
            {children}
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        // Thêm các style mặc định khác nếu cần
    },

})

export default Wrapper