import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas
import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginFormScreen from './src/screens/LoginFormScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import AppNavigator from './src/navigation/AppNavigator'; // <-- Importando seu Drawer Navigator

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#091836" />
      <Stack.Navigator 
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* Telas de autenticação */}
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="LoginForm" component={LoginFormScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Agora a home está sob o controle do Drawer */}
        <Stack.Screen name="Home" component={AppNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
