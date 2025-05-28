import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen = ({ navigation }) => {
  const userStats = [
    { label: 'Que fizer', value: '10' },
    { label: 'Em andamento', value: '3' },
    { label: 'Projetos', value: '15' },
  ];

  const instructors = [
    { id: 1, name: 'Instrutor' },
    { id: 2, name: 'Instrutor' },
    { id: 3, name: 'Instrutor' },
    { id: 4, name: 'Instrutor' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../assets/logo-small.png')}
            style={styles.smallLogo}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Ionicons name="person" size={40} color="#6B7280" />
            </View>
          </View>

          <Text style={styles.userName}>Nome</Text>
          <Text style={styles.userSubtitle}>Área em que atua ou UI/UX design?</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {userStats.map((stat, index) => (
              <View key={index} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Projects Section */}
        <TouchableOpacity style={styles.projectsCard}>
          <View style={styles.projectsIcon}>
            <Ionicons name="folder" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.projectsContent}>
            <Text style={styles.projectsNumber}>15</Text>
            <Text style={styles.projectsLabel}>Seus Projetos</Text>
          </View>
        </TouchableOpacity>

        {/* Continue Reading Section */}
        <TouchableOpacity style={styles.continueCard}>
          <View style={styles.continueIcon}>
            <Ionicons name="book" size={20} color="#FFFFFF" />
          </View>
          <View style={styles.continueContent}>
            <Text style={styles.continueTitle}>Continuar de onde parou</Text>
            <Text style={styles.continueSubtitle}>Projeto em progresso</Text>
          </View>
        </TouchableOpacity>

        {/* Instructors Section */}
        <View style={styles.instructorsSection}>
          <Text style={styles.instructorsTitle}>Seus Instrutores</Text>

          <View style={styles.instructorsGrid}>
            {instructors.map((instructor) => (
              <TouchableOpacity key={instructor.id} style={styles.instructorCard}>
                <View style={styles.instructorAvatar}>
                  <Ionicons name="person" size={24} color="#6B7280" />
                </View>
                <Text style={styles.instructorName}>{instructor.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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
    paddingHorizontal: 10,
    paddingVertical: 10,
    height:170,
  },
  smallLogo: {
  width: 100,
  height: 100,
  marginTop: 60,
},
  menuButton: {
    padding: 5,
    marginTop:70,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#60A5FA',
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94A3B8',
    textAlign: 'center',
  },
  projectsCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  projectsIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  projectsContent: {
    flex: 1,
  },
  projectsNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  projectsLabel: {
    fontSize: 14,
    color: '#9CA3AF',
  },
  continueCard: {
    backgroundColor: '#374151',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  continueIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#4B5563',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  continueContent: {
    flex: 1,
  },
  continueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  continueSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  instructorsSection: {
    marginBottom: 20,
  },
  instructorsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  instructorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  instructorCard: {
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  instructorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  instructorName: {
    fontSize: 14,
    color: '#60A5FA',
    textAlign: 'center',
  },
});

export default ProfileScreen;