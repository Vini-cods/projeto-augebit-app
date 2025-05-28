import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';

const CourseDetailScreen = ({ route }) => {
  const { curso } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={curso.imagem} style={styles.imagem} />
      <Text style={styles.titulo}>{curso.titulo}</Text>
      <Text style={styles.detalhe}>Carga Horária: {curso.cargaHoraria}</Text>
      <Text style={styles.detalhe}>Instrutor: {curso.instrutor}</Text>
      <Text style={styles.descricao}>
        Este curso é voltado para profissionais que desejam aprimorar seus conhecimentos na área de {curso.categoria.toLowerCase()}. Ao final do curso, o aluno estará apto a atuar com mais segurança e eficiência.
      </Text>
    </ScrollView>
  );
};

export default CourseDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
    padding: 16,
  },
  imagem: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#091836',
    marginBottom: 8,
  },
  detalhe: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  descricao: {
    fontSize: 16,
    marginTop: 16,
    lineHeight: 22,
    color: '#444',
  },
});
