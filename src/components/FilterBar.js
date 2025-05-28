import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const filtros = ['Todos', 'Elétrica', 'Mecânica', 'Segurança', 'Gestão'];

const FilterBar = ({ filtroSelecionado, onSelecionarFiltro }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filtros.map((filtro) => (
        <TouchableOpacity
          key={filtro}
          style={[
            styles.botao,
            filtro === filtroSelecionado && styles.botaoSelecionado,
          ]}
          onPress={() => onSelecionarFiltro(filtro)}
        >
          <Text
            style={[
              styles.texto,
              filtro === filtroSelecionado && styles.textoSelecionado,
            ]}
          >
            {filtro}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  botao: {
    backgroundColor: '#001F3F',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#00AEEF',
  },
  texto: {
    color: '#00AEEF',
    fontSize: 14,
  },
  botaoSelecionado: {
    backgroundColor: '#00AEEF',
  },
  textoSelecionado: {
    color: '#fff',
  },
});
