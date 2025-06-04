import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const ProfileScreen = ({ navigation }) => {
  const [userData] = useState({
    name: 'Vinícius Briches',
    area: 'Engenheiro de Segurança do Trabalho',
    level: 'Nível Intermediário',
    joinDate: 'Membro desde Jan 2024',
    avatar: null, // Pode ser uma URL de imagem
  });

  const userStats = [
    { label: 'Concluídos', value: '12', icon: 'checkmark-circle', color: '#22C55E' },
    { label: 'Em andamento', value: '3', icon: 'play-circle', color: '#F59E0B' },
    { label: 'Certificados', value: '8', icon: 'medal', color: '#8B5CF6' },
  ];

  const achievements = [
    { id: 1, title: 'Primeiro Curso', description: 'Concluiu seu primeiro curso', icon: '🎯', unlocked: true },
    { id: 2, title: 'Dedicado', description: '30 dias consecutivos estudando', icon: '🔥', unlocked: true },
    { id: 3, title: 'Expert', description: '10 cursos concluídos', icon: '⭐', unlocked: true },
    { id: 4, title: 'Mestre', description: '50 horas de estudo', icon: '👑', unlocked: false },
  ];

  const quickActions = [
    { id: 1, title: 'Editar Perfil', icon: 'person-outline', onPress: () => Alert.alert('Editar Perfil') },
    { id: 2, title: 'Configurações', icon: 'settings-outline', onPress: () => Alert.alert('Configurações') },
    { id: 3, title: 'Histórico', icon: 'time-outline', onPress: () => Alert.alert('Histórico') },
    { id: 4, title: 'Suporte', icon: 'help-circle-outline', onPress: () => Alert.alert('Suporte') },
  ];

  const instructors = [
    { 
      id: 1, 
      name: 'Prof. Ana Santos', 
      specialty: 'Segurança Industrial',
      courses: 8,
      rating: 4.9,
      avatar: null
    },
    { 
      id: 2, 
      name: 'Prof. Carlos Lima', 
      specialty: 'Automação',
      courses: 5,
      rating: 4.8,
      avatar: null
    },
    { 
      id: 3, 
      name: 'Prof. Maria Costa', 
      specialty: 'Gestão',
      courses: 12,
      rating: 4.9,
      avatar: null
    },
    { 
      id: 4, 
      name: 'Prof. João Pereira', 
      specialty: 'Manutenção',
      courses: 7,
      rating: 4.7,
      avatar: null
    },
  ];

  const recentActivity = [
    { id: 1, type: 'completed', course: 'NR10 - Segurança Elétrica', date: '2 dias atrás' },
    { id: 2, type: 'started', course: 'NR35 - Trabalho em Altura', date: '1 semana atrás' },
    { id: 3, type: 'certificate', course: 'Automação Industrial', date: '2 semanas atrás' },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'completed': return { icon: 'checkmark-circle', color: '#22C55E' };
      case 'started': return { icon: 'play-circle', color: '#3B82F6' };
      case 'certificate': return { icon: 'ribbon', color: '#8B5CF6' };
      default: return { icon: 'information-circle', color: '#6B7280' };
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Text key={i} style={styles.star}>⭐</Text>);
    }
    if (hasHalfStar) {
      stars.push(<Text key="half" style={styles.star}>⭐</Text>);
    }

    return <View style={styles.ratingContainer}>{stars}</View>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0F172A" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require('../../assets/logo-small.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.headerTitle}>Meu Perfil</Text>
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
        contentContainerStyle={styles.scrollContent}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                {userData.avatar ? (
                  <Image source={{ uri: userData.avatar }} style={styles.avatarImage} />
                ) : (
                  <Ionicons name="person" size={50} color="#6B7280" />
                )}
              </View>
              <TouchableOpacity style={styles.editAvatarButton}>
                <Ionicons name="camera" size={16} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.userInfo}>
              <Text style={styles.userName}>{userData.name}</Text>
              <Text style={styles.userArea}>{userData.area}</Text>
              <View style={styles.userLevel}>
                <Ionicons name="trending-up" size={16} color="#F59E0B" />
                <Text style={styles.levelText}>{userData.level}</Text>
              </View>
              <Text style={styles.joinDate}>{userData.joinDate}</Text>
            </View>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <TouchableOpacity key={index} style={styles.statItem}>
                <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                  <Ionicons name={stat.icon} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity 
                key={action.id} 
                style={styles.quickActionButton}
                onPress={action.onPress}
              >
                <Ionicons name={action.icon} size={24} color="#2E90FA" />
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Progress */}
        <TouchableOpacity style={styles.progressCard}>
          <View style={styles.progressIcon}>
            <Ionicons name="book-outline" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.progressContent}>
            <Text style={styles.progressTitle}>Continue de onde parou</Text>
            <Text style={styles.progressSubtitle}>NR35 - Trabalho em Altura</Text>
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.progressPercentage}>65%</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
        </TouchableOpacity>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Conquistas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.achievementsRow}>
              {achievements.map((achievement) => (
                <View 
                  key={achievement.id} 
                  style={[
                    styles.achievementCard,
                    !achievement.unlocked && styles.lockedAchievement
                  ]}
                >
                  <Text style={styles.achievementIcon}>{achievement.icon}</Text>
                  <Text style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.lockedText
                  ]}>
                    {achievement.title}
                  </Text>
                  <Text style={[
                    styles.achievementDescription,
                    !achievement.unlocked && styles.lockedText
                  ]}>
                    {achievement.description}
                  </Text>
                  {!achievement.unlocked && (
                    <View style={styles.lockIcon}>
                      <Ionicons name="lock-closed" size={16} color="#6B7280" />
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Recent Activity */}
        <View style={styles.activityContainer}>
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          {recentActivity.map((activity) => {
            const { icon, color } = getActivityIcon(activity.type);
            return (
              <View key={activity.id} style={styles.activityItem}>
                <View style={[styles.activityIcon, { backgroundColor: color + '20' }]}>
                  <Ionicons name={icon} size={20} color={color} />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityCourse}>{activity.course}</Text>
                  <Text style={styles.activityDate}>{activity.date}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Instructors Section */}
        <View style={styles.instructorsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Seus Instrutores</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.instructorsGrid}>
            {instructors.map((instructor) => (
              <TouchableOpacity key={instructor.id} style={styles.instructorCard}>
                <View style={styles.instructorAvatar}>
                  {instructor.avatar ? (
                    <Image source={{ uri: instructor.avatar }} style={styles.instructorImage} />
                  ) : (
                    <Ionicons name="person" size={28} color="#6B7280" />
                  )}
                </View>
                <Text style={styles.instructorName}>{instructor.name}</Text>
                <Text style={styles.instructorSpecialty}>{instructor.specialty}</Text>
                <View style={styles.instructorInfo}>
                  <Text style={styles.instructorCourses}>{instructor.courses} cursos</Text>
                  {renderStarRating(instructor.rating)}
                </View>
              </TouchableOpacity>
            ))}
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
    backgroundColor: '#0F172A',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35,
    backgroundColor: '#0F172A',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginRight: 10,
    right: 25,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    right: 40,
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
  scrollContent: {
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#1E293B',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: '#2E90FA',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 46,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#2E90FA',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#1E293B',
  },
  userInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userArea: {
    fontSize: 16,
    color: '#2E90FA',
    marginBottom: 8,
    textAlign: 'center',
  },
  userLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F59E0B20',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  levelText: {
    color: '#F59E0B',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  joinDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  quickActionsGrid: {
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
  quickActionText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  progressCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  progressIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#2E90FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  progressContent: {
    flex: 1,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 12,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2E90FA',
    borderRadius: 3,
  },
  progressPercentage: {
    color: '#2E90FA',
    fontSize: 12,
    fontWeight: 'bold',
  },
  achievementsContainer: {
    marginBottom: 20,
  },
  achievementsRow: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  achievementCard: {
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: 120,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
    position: 'relative',
  },
  lockedAchievement: {
    opacity: 0.5,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
  },
  lockedText: {
    color: '#6B7280',
  },
  lockIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  activityContainer: {
    marginBottom: 20,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityCourse: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  activityDate: {
    fontSize: 12,
    color: '#94A3B8',
  },
  instructorsSection: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '600',
  },
  instructorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  instructorCard: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  instructorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructorImage: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  instructorName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  instructorSpecialty: {
    fontSize: 12,
    color: '#2E90FA',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructorInfo: {
    alignItems: 'center',
  },
  instructorCourses: {
    fontSize: 11,
    color: '#94A3B8',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 12,
  },
  bottomPadding: {
    height: 20,
  },
});

export default ProfileScreen;