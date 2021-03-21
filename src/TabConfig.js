import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Screens from './screens/index';

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconNmae;

                    switch (route.name) {
                        case 'Home':
                            iconNmae = focused ? 'ios-bar-chart' : 'ios-bar-chart-outline';
                            break;
                        case 'PortPolio':
                            iconNmae = focused ? 'ios-document-text' : 'ios-document-text-outline';
                            break;
                        case 'Settings':
                            iconNmae = focused ? 'ios-person' : 'ios-person-outline';
                            break;
                    }

                    return <Ionicons name={iconNmae} size={size} color={color} />;
                },
            })}
                tabBarOptions={{
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={Screens.HomeScreen} />
                <Tab.Screen name="PortPolio" component={Screens.PortPolioScreen} />
                <Tab.Screen name="Settings" component={Screens.SettingsScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Tabs;