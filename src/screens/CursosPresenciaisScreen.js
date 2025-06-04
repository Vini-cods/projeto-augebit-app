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
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

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
    rating: 4.8,
    categoria: 'Segurança',
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
    rating: 4.9,
    categoria: 'Tecnologia',
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
    rating: 4.7,
    categoria: 'Tecnologia',
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
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const filterOptions = [
    { key: 'todos', label: 'Todos', count: cursos.length },
    { key: 'seguranca', label: 'Segurança', count: cursos.filter(c => c.categoria === 'Segurança').length },
    { key: 'tecnologia', label: 'Tecnologia', count: cursos.filter(c => c.categoria === 'Tecnologia').length },
    { key: 'basico', label: 'Básico', count: cursos.filter(c => c.nivel === 'Básico').length },
    { key: 'intermediario', label: 'Intermediário', count: cursos.filter(c => c.nivel === 'Intermediário').length },
  ];

  const handleSearch = (text) => {
    setSearchText(text);
    filterCourses(text, selectedFilter);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    filterCourses(searchText, filter);
  };

  const filterCourses = (searchTerm, filter) => {
    let filtered = cursos;

    // Aplicar filtro de categoria/nível
    if (filter !== 'todos') {
      filtered = filtered.filter(curso => 
        curso.categoria?.toLowerCase() === filter ||
        curso.nivel?.toLowerCase() === filter
      );
    }

    // Aplicar filtro de busca
    if (searchTerm !== '') {
      filtered = filtered.filter(curso =>
        curso.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.instrutor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        curso.categoria?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCursos(filtered);
  };

  const handleCoursePress = (curso) => {
    navigation.navigate('CourseDetailScreen', { curso });
  };

  const getCategoryIcon = (categoria) => {
    switch (categoria) {
      case 'Segurança': return '🛡️';
      case 'Tecnologia': return '💻';
      case 'Manutenção': return '🔧';
      default: return '📚';
    }
  };

  const getCategoryColor = (categoria) => {
    switch (categoria) {
      case 'Segurança': return '#FF6B6B';
      case 'Tecnologia': return '#4ECDC4';
      case 'Manutenção': return '#96CEB4';
      default: return '#2E90FA';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/logo-small.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>Cursos Presenciais</Text>
            <Text style={styles.headerSubtitle}>Encontre o curso ideal para você</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <View style={styles.menuIconContainer}>
            <View style={[styles.menuLine, styles.menuLine1]} />
            <View style={[styles.menuLine, styles.menuLine2]} />
            <View style={[styles.menuLine, styles.menuLine3]} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#94A3B8" />
          <TextInput 
            placeholder="Buscar por curso, instrutor ou categoria..." 
            style={styles.searchInput}
            placeholderTextColor="#94A3B8"
            value={searchText}
            onChangeText={handleSearch}
          />
          {searchText !== '' && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#94A3B8" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContainer}
        >
          {filterOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.filterTab,
                selectedFilter === option.key && styles.filterTabActive
              ]}
              onPress={() => handleFilterChange(option.key)}
            >
              <Text style={[
                styles.filterTabText,
                selectedFilter === option.key && styles.filterTabTextActive
              ]}>
                {option.label}
              </Text>
              <View style={[
                styles.filterBadge,
                selectedFilter === option.key && styles.filterBadgeActive
              ]}>
                <Text style={[
                  styles.filterBadgeText,
                  selectedFilter === option.key && styles.filterBadgeTextActive
                ]}>
                  {option.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Results Counter */}
        {searchText !== '' && (
          <View style={styles.resultsCounter}>
            <Text style={styles.resultsText}>
              {filteredCursos.length} resultado{filteredCursos.length !== 1 ? 's' : ''} encontrado{filteredCursos.length !== 1 ? 's' : ''}
            </Text>
          </View>
        )}

        {filteredCursos.length === 0 ? (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="search-outline" size={64} color="#334155" />
            </View>
            <Text style={styles.emptyTitle}>Nenhum curso encontrado</Text>
            <Text style={styles.emptySubtext}>
              Tente ajustar seus filtros ou termos de busca
            </Text>
            <TouchableOpacity 
              style={styles.clearFiltersButton}
              onPress={() => {
                setSearchText('');
                setSelectedFilter('todos');
                setFilteredCursos(cursos);
              }}
            >
              <Text style={styles.clearFiltersText}>Limpar filtros</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.coursesContainer}>
            {filteredCursos.map((curso) => (
              <TouchableOpacity 
                key={curso.id} 
                style={styles.courseCard}
                onPress={() => handleCoursePress(curso)}
                activeOpacity={0.8}
              >
                <View style={styles.courseImageContainer}>
                  <Image source={curso.imagem} style={styles.courseImage} />
                  <View style={styles.courseRating}>
                    <Ionicons name="star" size={12} color="#FFD700" />
                    <Text style={styles.ratingText}>{curso.rating}</Text>
                  </View>
                  <View style={styles.courseBadge}>
                    <Text style={styles.courseBadgeText}>{curso.modalidade}</Text>
                  </View>
                </View>

                <View style={styles.courseInfo}>
                  <View style={styles.courseHeader}>
                    <View style={styles.categoryContainer}>
                      <Text style={styles.categoryIcon}>{getCategoryIcon(curso.categoria)}</Text>
                      <Text style={[styles.categoryText, { color: getCategoryColor(curso.categoria) }]}>
                        {curso.categoria}
                      </Text>
                    </View>
                    <View style={[styles.levelBadge, { backgroundColor: curso.nivel === 'Básico' ? '#10B981' : '#F59E0B' }]}>
                      <Text style={styles.levelText}>{curso.nivel}</Text>
                    </View>
                  </View>

                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {curso.titulo}
                  </Text>
                  
                  <View style={styles.courseDetails}>
                    <View style={styles.detailItem}>
                      <Ionicons name="time-outline" size={16} color="#94A3B8" />
                      <Text style={styles.detailText}>{curso.cargaHoraria}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Ionicons name="person-outline" size={16} color="#94A3B8" />
                      <Text style={styles.detailText}>{curso.instrutor}</Text>
                    </View>
                  </View>

                  <View style={styles.courseFooter}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.priceLabel}>A partir de</Text>
                      <Text style={styles.priceValue}>{curso.preco}</Text>
                    </View>
                    <View style={styles.vagasContainer}>
                      <Ionicons 
                        name="people-outline" 
                        size={16} 
                        color={curso.vagas > 5 ? '#10B981' : '#F59E0B'} 
                      />
                      <Text style={[
                        styles.vagasText,
                        { color: curso.vagas > 5 ? '#10B981' : '#F59E0B' }
                      ]}>
                        {curso.vagas} vagas
                      </Text>
                    </View>
                  </View>

                  <View style={styles.dateContainer}>
                    <Ionicons name="calendar-outline" size={16} color="#2E90FA" />
                    <Text style={styles.dateText}>Início: {curso.dataInicio}</Text>
                  </View>
                </View>

                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={20} color="#334155" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#0A1628',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 75,
    height: 75,
    marginRight: 12,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 2,
  },
  menuButton: {
    padding: 8,
  },
  menuIconContainer: {
    width: 24,
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  menuLine1: {
    width: 24,
  },
  menuLine2: {
    width: 18,
  },
  menuLine3: {
    width: 20,
  },
  searchSection: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  searchInput: {
    color: '#FFFFFF',
    marginLeft: 12,
    fontSize: 16,
    flex: 1,
  },
  filterSection: {
    marginBottom: 20,
  },
  filterScrollContainer: {
    paddingHorizontal: 20,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  filterTabActive: {
    backgroundColor: '#2E90FA',
    borderColor: '#2E90FA',
  },
  filterTabText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
  },
  filterBadge: {
    backgroundColor: '#334155',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 8,
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  filterBadgeText: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: 'bold',
  },
  filterBadgeTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  resultsCounter: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#1E293B',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  resultsText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  coursesContainer: {
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  courseImageContainer: {
    position: 'relative',
    height: 160,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  courseRating: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  courseBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#2E90FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  courseInfo: {
    padding: 16,
  },
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
  },
  levelBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  levelText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  courseTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    lineHeight: 24,
  },
  courseDetails: {
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  detailText: {
    color: '#94A3B8',
    fontSize: 14,
    marginLeft: 8,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    color: '#94A3B8',
    fontSize: 12,
  },
  priceValue: {
    color: '#2E90FA',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vagasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vagasText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  dateText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
  },
  arrowContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#1E293B',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  emptyTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  clearFiltersButton: {
    backgroundColor: '#2E90FA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 24,
  },
  clearFiltersText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 20,
  },
});

export default CursosPresenciaisScreen;