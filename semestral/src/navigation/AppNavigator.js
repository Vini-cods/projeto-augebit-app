import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import CursosPresenciaisScreen from '../screens/CursosPresenciaisScreen';
import InstructorsScreen from '../screens/InstructorsScreen';
import InstructorProfileScreen from '../screens/InstructorProfileScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Components
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para telas que precisam de navegação aninhada
const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
    </Stack.Navigator>
  );
};

// ATUALIZADO - Adicionada navegação para CourseDetailScreen
const CursosPresenciaisStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CursosPresenciaisMain" component={CursosPresenciaisScreen} />
      <Stack.Screen name="CourseDetailScreen" component={CourseDetailScreen} />
    </Stack.Navigator>
  );
};

// Stack Navigator para Instrutores
const InstructorsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="InstructorsMain" component={InstructorsScreen} />
      <Stack.Screen name="InstructorProfile" component={InstructorProfileScreen} />
    </Stack.Navigator>
  );
};

const ProfileStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerPosition="right" 
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'right', 
        drawerStyle: {
          backgroundColor: '#091836',
          width: 240,
        },
      }}
    >
      <Drawer.Screen
        name="Início"
        component={HomeStack}
        options={{
          drawerLabel: 'Início',
        }}
      />
      <Drawer.Screen
        name="Cursos"
        component={CursosPresenciaisStack}
        options={{
          drawerLabel: 'Cursos Presenciais',
        }}
      />
      <Drawer.Screen
        name="Instructors"
        component={InstructorsStack}
        options={{
          drawerLabel: 'Instrutores',
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          drawerLabel: 'Perfil',
        }}
      />
    </Drawer.Navigator>
  );
}