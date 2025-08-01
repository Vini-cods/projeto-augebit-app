import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentProgress] = useState(65); // Mantido por enquanto até ter dados reais de progresso

  const categories = [
    { name: 'Segurança', count: 4, color: '#FF6B6B', icon: '🛡️' },
    { name: 'Tecnologia', count: 3, color: '#4ECDC4', icon: '💻' },
    { name: 'Gestão', count: 2, color: '#45B7D1', icon: '📊' },
    { name: 'Manutenção', count: 3, color: '#96CEB4', icon: '🔧' },
  ];

  const popularCourses = [
    {
      id: 1,
      title: 'NR10 - Segurança em Instalações Elétricas',
      duration: '40 horas',
      image: require('../../assets/nr10.png'),
      progress: 80,
      rating: 4.8,
    },
    {
      id: 2,
      title: 'NR35 - Trabalho em Altura',
      duration: '24 horas',
      image: require('../../assets/alto.png'),
      progress: 45,
      rating: 4.9,
    },
    {
      id: 3,
      title: 'Automação Industrial',
      duration: '80 horas',
      image: require('../../assets/cnc.png'),
      progress: 0,
      rating: 4.7,
    },
  ];

  // Função para buscar o perfil do usuário
  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Erro', 'Token não encontrado. Faça login novamente.');
        navigation.navigate('Login');
        return;
      }

      const response = await fetch('http://10.136.23.234:3000/api/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setUserProfile(data.data);
      } else {
        Alert.alert('Erro', data.error || 'Erro ao carregar perfil do usuário');
        if (response.status === 401 || response.status === 403) {
          // Token inválido, redirecionar para login
          await AsyncStorage.removeItem('userToken');
          navigation.navigate('Login');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
      Alert.alert('Erro', 'Erro de conexão. Verifique sua internet.');
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados do usuário ao montar o componente
  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Função para obter saudação baseada na hora
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  // Função para obter o primeiro nome do usuário
  const getFirstName = () => {
    if (!userProfile || !userProfile.nome) return 'Usuário';
    return userProfile.nome.split(' ')[0];
  };

  // Função para formatar a data do último login
  const formatLastLogin = (dateString) => {
    if (!dateString) return 'Primeiro acesso';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Agora mesmo';
    if (diffInHours < 24) return `Há ${diffInHours}h`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Ontem';
    if (diffInDays < 7) return `Há ${diffInDays} dias`;
    
    return date.toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E90FA" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
          <View style={styles.greetingContainer}>
            <Text style={styles.greetingText}>{getGreeting()},</Text>
            <Text style={styles.userName}>{getFirstName()}! </Text>
            {userProfile?.ultimo_login && (
              <Text style={styles.lastLoginText}>
                Último acesso: {formatLastLogin(userProfile.ultimo_login)}
              </Text>
            )}
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

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* User Info Card */}
        {userProfile && (
          <View style={styles.userInfoCard}>
            <View style={styles.userInfoGradient}>
              <View style={styles.userInfoContent}>
                <View style={styles.userAvatarContainer}>
                  <Text style={styles.userAvatar}>
                    {userProfile.nome?.charAt(0).toUpperCase() || 'U'}
                  </Text>
                </View>
                <View style={styles.userDetails}>
                  <Text style={styles.userFullName}>{userProfile.nome}</Text>
                  <Text style={styles.userEmail}>{userProfile.email}</Text>
                  <View style={styles.accountTypeBadge}>
                    <Text style={styles.accountTypeText}>
                      {userProfile.tipo_conta === 'empresarial' ? '🏢 Empresarial' : '👤 Pessoal'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Progress Card */}
        <View style={styles.progressCard}>
          <View style={styles.progressGradient}>
            <View style={styles.progressContent}>
              <View style={styles.progressTextContainer}>
                <Text style={styles.progressTitle}>Continue aprendendo</Text>
                <Text style={styles.progressSubtitle}>
                  Você está {currentProgress}% do caminho! 
                </Text>
                <View style={styles.progressBarContainer}>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { width: `${currentProgress}%` }
                      ]} 
                    />
                  </View>
                  <Text style={styles.progressPercentage}>{currentProgress}%</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.continueButton}
                onPress={() => navigation.navigate('Cursos')}
              >
                <Text style={styles.continueButtonText}>Continuar</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={require('../../assets/work-illustration.png')}
              style={styles.progressIllustration}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Cursos')}
            >
              <Text style={styles.quickActionIcon}>📚</Text>
              <Text style={styles.quickActionText}>Meus Cursos</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Certificados')}
            >
              <Text style={styles.quickActionIcon}>🏆</Text>
              <Text style={styles.quickActionText}>Certificados</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Progresso')}
            >
              <Text style={styles.quickActionIcon}>📊</Text>
              <Text style={styles.quickActionText}>Progresso</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.quickActionButton}
              onPress={() => navigation.navigate('Suporte')}
            >
              <Text style={styles.quickActionIcon}>💬</Text>
              <Text style={styles.quickActionText}>Suporte</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.categoryCard, { borderLeftColor: category.color }]}
                onPress={() => navigation.navigate('Cursos', { filter: category.name.toLowerCase() })}
              >
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryIcon}>{category.icon}</Text>
                  <View style={[styles.categoryBadge, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryCount}>{category.count}</Text>
                  </View>
                </View>
                <Text style={styles.categoryTitle}>{category.name}</Text>
                <Text style={styles.categorySubtitle}>
                  {category.count} {category.count === 1 ? 'curso' : 'cursos'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Popular Courses */}
        <View style={styles.popularCoursesContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cursos Populares</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Cursos')}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.coursesScrollContainer}
          >
            {popularCourses.map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => navigation.navigate('CursoDetalhes', { courseId: course.id })}
              >
                <View style={styles.courseImageContainer}>
                  <Image
                    source={course.image}
                    style={styles.courseImage}
                    resizeMode="cover"
                  />
                  <View style={styles.courseRating}>
                    <Text style={styles.ratingText}>⭐ {course.rating}</Text>
                  </View>
                </View>
                
                <View style={styles.courseInfo}>
                  <Text style={styles.courseTitle} numberOfLines={2}>
                    {course.title}
                  </Text>
                  <Text style={styles.courseDuration}>{course.duration}</Text>
                  
                  {course.progress > 0 && (
                    <View style={styles.coursePrgressContainer}>
                      <View style={styles.courseProgressBar}>
                        <View 
                          style={[
                            styles.courseProgressFill, 
                            { width: `${course.progress}%` }
                          ]} 
                        />
                      </View>
                      <Text style={styles.courseProgressText}>{course.progress}%</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Statistics */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Suas Estatísticas</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Cursos Concluídos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>240h</Text>
              <Text style={styles.statLabel}>Horas Estudadas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>8</Text>
              <Text style={styles.statLabel}>Certificados</Text>
            </View>
          </View>
        </View>

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginRight: -15,
    marginTop: 10,
    right: 20,
  },
  greetingContainer: {
    flexDirection: 'column',
    flex: 1,
  },
  greetingText: {
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '400',
  },
  userName: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  lastLoginText: {
    color: '#64748B',
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
  scrollView: {
    flex: 1,
  },
  userInfoCard: {
    margin: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  userInfoGradient: {
    backgroundColor: '#1E293B',
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  userInfoContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2E90FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  userAvatar: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  userDetails: {
    flex: 1,
  },
  userFullName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 6,
  },
  accountTypeBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(46, 144, 250, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  accountTypeText: {
    color: '#2E90FA',
    fontSize: 12,
    fontWeight: '600',
  },
  progressCard: {
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#2E90FA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  progressGradient: {
    backgroundColor: '#2E90FA',
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressContent: {
    flex: 1,
  },
  progressTextContainer: {
    marginBottom: 15,
  },
  progressTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  progressSubtitle: {
    color: '#E2E8F0',
    fontSize: 14,
    marginBottom: 15,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBarBackground: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 4,
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  progressPercentage: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressIllustration: {
    width: 80,
    height: 80,
  },
  quickActionsContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    backgroundColor: '#1E293B',
    width: (width - 60) / 4,
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  quickActionIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  categoriesContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    backgroundColor: '#1E293B',
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderColor: '#334155',
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryCount: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  categorySubtitle: {
    color: '#94A3B8',
    fontSize: 13,
  },
  popularCoursesContainer: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  seeAllText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '600',
  },
  coursesScrollContainer: {
    paddingLeft: 20,
  },
  courseCard: {
    backgroundColor: '#1E293B',
    width: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#334155',
  },
  courseImageContainer: {
    position: 'relative',
  },
  courseImage: {
    width: '100%',
    height: 120,
  },
  courseRating: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  courseInfo: {
    padding: 12,
  },
  courseTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    lineHeight: 18,
  },
  courseDuration: {
    color: '#2E90FA',
    fontSize: 12,
    marginBottom: 8,
  },
  coursePrgressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseProgressBar: {
    flex: 1,
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    marginRight: 8,
  },
  courseProgressFill: {
    height: '100%',
    backgroundColor: '#2E90FA',
    borderRadius: 2,
  },
  courseProgressText: {
    color: '#94A3B8',
    fontSize: 11,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginBottom: 25,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#1E293B',
    width: '31%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  statNumber: {
    color: '#2E90FA',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});

export default HomeScreen;