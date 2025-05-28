import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const cursos = [
  {
    id: 1,
    titulo: 'Treinamento de NR-10',
    cargaHoraria: '40 horas',
    instrutor: 'Eng. Carlos Silva',
    imagem: require('../../assets/nr10.png'),
  },
  {
    id: 2,
    titulo: 'Soldagem Industrial',
    cargaHoraria: '60 horas',
    instrutor: 'Téc. Ana Souza',
    imagem: require('../../assets/soldagem.png'),
  },
  {
    id: 3,
    titulo: 'Operador de Máquinas CNC',
    cargaHoraria: '50 horas',
    instrutor: 'Instr. João Melo',
    imagem: require('../../assets/cnc.png'),
  },
];

const CursosPresenciaisScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.header}>
        <View style={styles.homeHeader}>
          <Image
            source={require('../../assets/logo-small.png')}
            style={styles.smallLogo}
            resizeMode="contain"
          />
        </View>

       <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar curso..." style={styles.searchInput} />
      </View>

        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {cursos.map((curso) => (
          <TouchableOpacity key={curso.id} style={styles.card}>
            <Image source={curso.imagem} style={styles.imagem} />
            <View style={styles.info}>
              <Text style={styles.nomeCurso}>{curso.titulo}</Text>
              <Text style={styles.detalhe}>Carga Horária: {curso.cargaHoraria}</Text>
              <Text style={styles.detalhe}>Instrutor: {curso.instrutor}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CursosPresenciaisScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: '#091836',
    padding: 80,
    paddingTop: 50,
    height:150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  smallLogo:{
    height: 100,
    width:100,
    right:70,
    marginTop:50,
  },
  searchContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 3,
    marginBottom: -40,
    marginTop: 15,
    elevation: 3,
    right:40,
  },
  searchInput: {
    fontSize: 16,
    color: '#333',
  },
  menuIcon: {
    fontSize: 38,
    color: '#FFFFFF',
    left: 60,
    height:40,
    marginTop:30,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imagem: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  nomeCurso: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#091836',
  },
  detalhe: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
