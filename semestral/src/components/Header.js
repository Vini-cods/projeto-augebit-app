import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // logo azul da AUGEBIT
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>

      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  logo: {
    width: 40,
    height: 40,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    color: '#00B4FF',
    fontWeight: '600',
    marginLeft: 10,
  },
  menuButton: {
    padding: 8,
  },
});
