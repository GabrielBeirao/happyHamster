// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './src/screens/HomeScreen';
import MyHamsterScreen from './src/screens/MyHamsterScreen';
import LeagueScreen from './src/screens/LeagueScreen';
import AboutScreen from './src/screens/AboutScreen';
import Login from './src/screens/Login'
import RegisterUser from './src/screens/RegisterUser'
import CustomButton from './src/components/CustomButton'


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'My Hamster') {
              iconName = focused ? 'ios-hamster' : 'ios-hamster-outline';
            } else if (route.name === 'League') {
              iconName = focused ? 'ios-trophy' : 'ios-trophy-outline';
            } else if (route.name === 'About') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="My Hamster" component={MyHamsterScreen} />
        <Tab.Screen name="League" component={LeagueScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}