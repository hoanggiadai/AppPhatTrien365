// components/CustomInformationUser.js
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const CustomInformationUser = ({ titleInformation, informationUser }) => {
    let displayInformation = informationUser;

    // Kiểm tra nếu informationUser không phải là null hoặc chuỗi rỗng
    if (displayInformation) {
        // Thêm đơn vị đo lường cho chiều cao và cân nặng
        if (titleInformation === 'Chiều cao') {
            displayInformation += ' Cm';
        } else if (titleInformation === 'Cân nặng') {
            displayInformation += ' Kg';
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{titleInformation}: </Text>
            <Text style={styles.value}>{displayInformation}</Text>
        </View>
    );
};

export default CustomInformationUser;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    label: {
        fontSize: 18,
        fontWeight: '700',
        color: 'black',
        marginRight: 5,
    },
    value: {
        fontSize: 18,
        color: 'black',
    },
});