import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = ({ searchValue, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={24} color="white" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="Buscar cursos"
        placeholderTextColor="#fff"
        value={searchValue}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001F54',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
  },
});
