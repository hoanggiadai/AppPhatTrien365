import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomRadioButton from './CustomRadioButton';

const CustomRadioButtonGroup = ({ options, selectedValue, onSelect, errorMessage }) => {
    return (
        <View style={styles.groupContainer}>
            <Text style={styles.title}>Giới tính</Text>
            <View style={styles.radioButtonContainer}>
                {options.map((option) => (
                    <CustomRadioButton
                        key={option.value}
                        label={option.label}
                        selected={selectedValue === option.value}
                        onPress={() => onSelect(option.value)}
                    />
                ))}
            </View>
            {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    groupContainer: {
        margin: 10,
    },
    title: {
        fontSize: 22,
        color: 'black',
        fontWeight: '700',
        marginBottom: 10,
    },
    radioButtonContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', // Thêm nếu cần
        justifyContent: 'flex-start', // Canh lề trái
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginTop: 10,
    },
});

export default CustomRadioButtonGroup;