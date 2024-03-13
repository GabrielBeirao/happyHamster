// Index.js - funciona como as

import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import * as Animatable from 'react-native-animatable'
import { useAuth } from '../context/authContext'


import HomeScreen from '../screens/HomeScreen';
import MyHamsterScreen from '../screens/MyHamsterScreen';
import LeagueScreen from '../screens/LeagueScreen';
import AboutScreen from '../screens/AboutScreen';
import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import RegisterUser from '../screens/RegisterUser';
import FirstAccess from '../screens/FirstAccess'
import AvatarScreen from '../screens/AvatarScreen'
import PerfilScreen from '../screens/ProfileScreen';
import HomeIcon from '../components/Icons/home-outline.svg';
import HamsterIcon from '../components/Icons/noun-hamster-5.png';
import TrophyIcon from '../components/Icons/trophy-outline.svg';
import AboutIcon from '../components/Icons/information-circle-outline.svg';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const tabArr = [
  { route: 'Home', label: 'Home', type: Ionicons, activeIcon: 'home', inActiveIcon: 'home-outline', component: HomeScreen},
  { route: 'My Hamster', label: 'My Hamster', type: Ionicons, activeIcon: 'paw', inActiveIcon: 'paw-outline', component: MyHamsterScreen},
  { route: 'League', label: 'League', type: Ionicons, activeIcon: 'trophy', inActiveIcon: 'trophy-outline', component: LeagueScreen},
  { route: 'About', label: 'About', type: Ionicons, activeIcon: 'information-circle', inActiveIcon: 'information-circle-outline', component: AboutScreen},
  { route: 'Perfil', label: 'Perfil', type: Ionicons, activeIcon: 'person-circle', inActiveIcon: 'person-circle-outline', component: PerfilScreen},
];

const TabButton = (props) => {
  const {item, onPress, accessibilityState} = props
  const focused = accessibilityState.selected
  const viewRef = useRef(null)

  useEffect(() => {
    if(focused){
      viewRef.current.animate({ 0: {scale: .5, rotate: '0deg'}, 1: { scale: 1.5, rotate: '360deg'}})
    } else {
      viewRef.current.animate({ 0: {scale: 1.5, rotate: '360deg'}, 1: { scale: 1, rotate: '0deg'}})
    }
  }, [focused])

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}
    >
      <Animatable.View 
        ref={viewRef}
        duration={1000}
        style={[styles.iconContainer, focused && styles.focusedIcon]}
      >
        <Ionicons 
          type={item.type} 
          name={focused ? item.activeIcon : item.inActiveIcon} 
          color={focused ? Colors.primary : Colors.primaryLite}
          size={20}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
}

export function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 60,
          position: 'absolute',
          bottom: 16,
          right: 16,
          left: 16,
          borderRadius: 16
        }
      }}
    >
      {tabArr.map((item, index) => {
        return(
          <Tab.Screen name={item.route} component={item.component} 
          options={{
            tabBarShowLabel: false,
            //tabBarLabel: item.label,
            tabBarButton: (props) => <TabButton {...props} item={item}/>
          }}
          />
        )
      })}
    </Tab.Navigator>
  );
}

export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false,}}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="RegisterUser" component={RegisterUser} />
      <Stack.Screen name="FirstAccess" component={FirstAccess}/>
      <Stack.Screen name="AvatarScreen" component={AvatarScreen}/>
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { loggedIn } = useAuth()
  return (
    <NavigationContainer>
      {loggedIn ? <MainTabNavigator /> : <AuthStack  />}
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16 // Ajuste conforme necessário para a posição dos ícones
  },
  focusedIcon: {
    zIndex: 1 // Garante que o ícone focado esteja acima dos outros
  }
})