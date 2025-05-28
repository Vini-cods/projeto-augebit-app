import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';

const cursos = [
  {
    id: 1,
    titulo: 'Treinamento de NR-10',
    cargaHoraria: '40 horas',
    instrutor: 'Eng. Carlos Silva',
    imagem: require('../../assets/nr10.png'),
    descricao: 'Curso completo sobre segurança em instalações e serviços em eletricidade. Aprenda as normas de segurança, procedimentos e práticas para trabalhar com segurança em sistemas elétricos.',
    preco: 'R$ 450,00',
    duracao: '5 dias',
    modalidade: 'Presencial',
    nivel: 'Básico',
    certificado: 'Sim',
    vagas: 15,
    dataInicio: '15/06/2025',
    local: 'Centro de Treinamento - São José dos Campos',
    requisitos: [
      'Ensino médio completo',
      'Maior de 18 anos',
      'Experiência básica em elétrica (desejável)'
    ],
    programa: [
      'Introdução à NR-10',
      'Riscos elétricos e medidas de controle',
      'Equipamentos de proteção individual e coletiva',
      'Primeiros socorros em acidentes elétricos',
      'Práticas seguras de trabalho',
      'Avaliação final'
    ]
  },
  {
    id: 2,
    titulo: 'Soldagem Industrial',
    cargaHoraria: '60 horas',
    instrutor: 'Téc. Ana Souza',
    imagem: require('../../assets/soldagem.png'),
    descricao: 'Aprenda as técnicas de soldagem industrial com equipamentos modernos. Curso prático com foco em soldagem MIG, TIG e eletrodo revestido para aplicações industriais.',
    preco: 'R$ 650,00',
    duracao: '8 dias',
    modalidade: 'Presencial',
    nivel: 'Intermediário',
    certificado: 'Sim',
    vagas: 12,
    dataInicio: '22/06/2025',
    local: 'Oficina de Soldagem - São José dos Campos',
    requisitos: [
      'Ensino médio completo',
      'Maior de 18 anos',
      'Conhecimentos básicos de metalurgia',
      'Experiência prévia em soldagem (desejável)'
    ],
    programa: [
      'Fundamentos da soldagem',
      'Soldagem MIG/MAG',
      'Soldagem TIG',
      'Soldagem com eletrodo revestido',
      'Controle de qualidade',
      'Normas de segurança',
      'Prática supervisionada',
      'Avaliação prática e teórica'
    ]
  },
  {
    id: 3,
    titulo: 'Operador de Máquinas CNC',
    cargaHoraria: '50 horas',
    instrutor: 'Instr. João Melo',
    imagem: require('../../assets/cnc.png'),
    descricao: 'Formação completa para operação de máquinas CNC. Aprenda programação, operação e manutenção básica de tornos e fresas CNC para a indústria mecânica.',
    preco: 'R$ 580,00',
    duracao: '7 dias',
    modalidade: 'Presencial',
    nivel: 'Intermediário',
    certificado: 'Sim',
    vagas: 10,
    dataInicio: '01/07/2025',
    local: 'Laboratório CNC - São José dos Campos',
    requisitos: [
      'Ensino médio completo',
      'Maior de 18 anos',
      'Conhecimentos básicos de matemática',
      'Noções de desenho técnico'
    ],
    programa: [
      'Introdução ao CNC',
      'Programação básica',
      'Operação de torno CNC',
      'Operação de fresa CNC',
      'Ferramentas de corte',
      'Controle dimensional',
      'Manutenção preventiva',
      'Projeto final'
    ]
  },
];

const CursosPresenciaisScreen = () => {
  const navigation = useNavigation();
  const [filteredCursos, setFilteredCursos] = useState(cursos);
  const [searchText, setSearchText] = useState('');

  const handleSearch = (text) => {
    setSearchText(text);
    if (text === '') {
      setFilteredCursos(cursos);
    } else {
      const filtered = cursos.filter(curso =>
        curso.titulo.toLowerCase().includes(text.toLowerCase()) ||
        curso.instrutor.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCursos(filtered);
    }
  };

  const handleCoursePress = (curso) => {
    navigation.navigate('CourseDetail', { curso });
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/logo-small.png')}
              style={styles.smallLogo}
              resizeMode="contain"
            />
            <Text style={styles.headerTitle}>Cursos Presenciais</Text>
          </View>

          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.openDrawer()}
          >
            <Ionicons name="menu" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7A8B9A" />
          <TextInput 
            placeholder="Buscar curso..." 
            style={styles.searchInput}
            placeholderTextColor="#7A8B9A"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#7A8B9A" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.scroll}>
        {filteredCursos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="search-outline" size={64} color="#7A8B9A" />
            <Text style={styles.emptyText}>Nenhum curso encontrado</Text>
            <Text style={styles.emptySubtext}>Tente buscar por outro termo</Text>
          </View>
        ) : (
          filteredCursos.map((curso) => (
            <TouchableOpacity 
              key={curso.id} 
              style={styles.card}
              onPress={() => handleCoursePress(curso)}
              activeOpacity={0.8}
            >
              <Image source={curso.imagem} style={styles.imagem} />
              <View style={styles.info}>
                <Text style={styles.nomeCurso}>{curso.titulo}</Text>
                <Text style={styles.detalhe}>Carga Horária: {curso.cargaHoraria}</Text>
                <Text style={styles.detalhe}>Instrutor: {curso.instrutor}</Text>
                <View style={styles.cardFooter}>
                  <Text style={styles.preco}>{curso.preco}</Text>
                  <View style={styles.vagasContainer}>
                    <Ionicons name="people-outline" size={16} color="#4A90E2" />
                    <Text style={styles.vagas}>{curso.vagas} vagas</Text>
                  </View>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <Ionicons name="chevron-forward" size={20} color="#7A8B9A" />
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* Results Counter */}
      {searchText !== '' && (
        <View style={styles.resultsCounter}>
          <Text style={styles.resultsText}>
            {filteredCursos.length} curso{filteredCursos.length !== 1 ? 's' : ''} encontrado{filteredCursos.length !== 1 ? 's' : ''}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default CursosPresenciaisScreen;

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  header: {
    backgroundColor: '#0A1628',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallLogo: {
    width: 100,
    height: 100,
    marginRight: 12,
    marginTop: 50,
  },
  headerTitle: {
    color: '#4A90E2',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 50,
  },
  menuButton: {
    padding: 4,
    marginTop: 50,
  },
  searchSection: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A1628',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  searchInput: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  scroll: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: '#1E3A5F',
    borderRadius: 12,
    flexDirection: 'row',
    padding: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
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
    color: '#fff',
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: '#7A8B9A',
    marginBottom: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  preco: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
  },
  vagasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vagas: {
    fontSize: 12,
    color: '#4A90E2',
    marginLeft: 4,
  },
  arrowContainer: {
    paddingLeft: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    color: '#7A8B9A',
    fontSize: 14,
    marginTop: 4,
  },
  resultsCounter: {
    backgroundColor: '#1E3A5F',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  resultsText: {
    color: '#4A90E2',
    fontSize: 14,
    textAlign: 'center',
  },
});