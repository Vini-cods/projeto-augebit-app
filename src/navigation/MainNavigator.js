import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen'; // Sua tela inicial
import CursosPresenciaisScreen from '../screens/CursosPresenciaisScreen';
import InstrutoresScreen from '../screens/InstrutoresScreen';
import PerfilScreen from '../screens/PerfilScreen';
import CustomDrawer from '../components/CustomDrawer';

const Drawer = createDrawerNavigator();

const MainNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="CursosPresenciais" component={CursosPresenciaisScreen} />
      <Drawer.Screen name="Instrutores" component={InstrutoresScreen} />
      <Drawer.Screen name="Perfil" component={PerfilScreen} />
    </Drawer.Navigator>
  );
};

export default MainNavigator;
