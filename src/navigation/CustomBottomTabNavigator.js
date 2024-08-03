import React from 'react';
import { Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserScreen from '../screens/UserScreen';
import StatisticalScreen from '../screens/StatisticalScreen';

const Tab = createBottomTabNavigator();

const CustomBottomTabNavigator = () => {
    const renderIcon = (route, focused) => {
        let iconName;

        switch (route.name) {
            case 'Trang chủ':
                iconName = focused
                    ? require('../assets/icons/home-selected.png')
                    : require('../assets/icons/home.png');
                break;
            case 'Cá nhân':
                iconName = focused
                    ? require('../assets/icons/user-selected.png')
                    : require('../assets/icons/user.png');
                break;
            case 'Thống kê':
                iconName = focused
                    ? require('../assets/icons/trend-selected.png')
                    : require('../assets/icons/trend.png');
                break;
            default:
                break;
        }

        return <Image source={iconName} style={{ width: 50, height: 50 }} />;
    };

    const renderLabel = (route, focused) => (
        <Text style={{ color: focused ? 'black' : '#D9D9D9', fontSize: 12, marginBottom: 7 }}>
            {route.name}
        </Text>
    );

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => renderIcon(route, focused),
                tabBarLabel: ({ focused }) => renderLabel(route, focused),
                tabBarStyle: {
                    height: 100, // Điều chỉnh độ cao Bottom Tab
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Trang chủ" component={HomeScreen} />
            <Tab.Screen name="Cá nhân" component={UserScreen} />
            <Tab.Screen name="Thống kê" component={StatisticalScreen} />
        </Tab.Navigator>
    );
};

export default CustomBottomTabNavigator;