import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InstructorProfileScreen = ({ route, navigation }) => {
    const { instructor } = route.params;

    const InfoCard = ({ icon, title, subtitle }) => (
        <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
                <Ionicons name={icon} size={24} color="#FFFFFF" />
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.infoNumber}>{title}</Text>
                <Text style={styles.infoLabel}>{subtitle}</Text>
            </View>
        </View>
    );

    const OtherInstructor = ({ name, role }) => (
        <TouchableOpacity style={styles.otherInstructorCard}>
            <View style={styles.otherAvatar}>
                <Ionicons name="person" size={30} color="#FFFFFF" />
            </View>
            <Text style={styles.otherInstructorName}>{name}</Text>
            <Text style={styles.otherInstructorRole}>{role}</Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0A1628" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
                </TouchableOpacity>
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

            <ScrollView showsVerticalScrollIndicator={false}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <View style={styles.profileCard}>
                        <View style={styles.profileAvatar}>
                            <Ionicons name="person" size={60} color="#FFFFFF" />
                        </View>
                        <Text style={styles.instructorName}>{instructor.name}</Text>
                        <Text style={styles.instructorSpecialty}>
                            Área em que atua: {instructor.specialty || 'UX/UI design'}
                        </Text>

                        {/* Rating */}
                        {instructor.rating && (
                            <View style={styles.ratingContainer}>
                                <Ionicons name="star" size={20} color="#FFD700" />
                                <Text style={styles.ratingText}>{instructor.rating}</Text>
                            </View>
                        )}

                        {/* Stats */}
                        <View style={styles.statsContainer}>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{instructor.courses || '10'}</Text>
                                <Text style={styles.statLabel}>Cursos</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{instructor.experience || '6'}</Text>
                                <Text style={styles.statLabel}>Anos experiência</Text>
                            </View>
                            <View style={styles.statItem}>
                                <Text style={styles.statNumber}>{instructor.projects || '15'}</Text>
                                <Text style={styles.statLabel}>Projetos</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Info Cards */}
                <View style={styles.infoSection}>
                    <InfoCard
                        icon="folder-outline"
                        title={instructor.projects || "15"}
                        subtitle="Seus Projetos"
                    />
                    <InfoCard
                        icon="book-outline"
                        title="Método de ensino"
                        subtitle="Educacional"
                    />
                    <InfoCard
                        icon="briefcase-outline"
                        title="Carreira"
                        subtitle={`${instructor.experience || 6} anos de experiência`}
                    />
                </View>

                {/* Other Instructors */}
                <View style={styles.othersSection}>
                    <Text style={styles.othersTitle}>Outros Instrutores</Text>
                    <View style={styles.othersGrid}>
                        <OtherInstructor name="Maria Silva" role="Design Gráfico" />
                        <OtherInstructor name="João Santos" role="Desenvolvimento Web" />
                        <OtherInstructor name="Ana Costa" role="UX/UI Design" />
                        <OtherInstructor name="Pedro Lima" role="Mobile Development" />
                    </View>
                </View>
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
        paddingVertical: 15,
        marginTop:10,
    },
    backButton: {
        padding: 4,
        marginTop: 50,
    },
    logoContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 50,
    },
    smallLogo: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: -60,
    },
    menuButton: {
        padding: 4,
        marginTop: 50,
    },
    profileSection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    profileCard: {
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
    },
    profileAvatar: {
        width: 100,
        height: 100,
        backgroundColor: '#7A8B9A',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    instructorName: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    instructorSpecialty: {
        color: '#7A8B9A',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 12,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    statLabel: {
        color: '#7A8B9A',
        fontSize: 14,
    },
    infoSection: {
        paddingHorizontal: 20,
        marginBottom: 30,
    },
    infoCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#2C4A6B',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    infoIcon: {
        width: 48,
        height: 48,
        backgroundColor: '#4A90E2',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    infoContent: {
        flex: 1,
    },
    infoNumber: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    infoLabel: {
        color: '#7A8B9A',
        fontSize: 14,
    },
    othersSection: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    othersTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 16,
    },
    othersGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    otherInstructorCard: {
        width: '48%',
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        marginBottom: 12,
    },
    otherAvatar: {
        width: 50,
        height: 50,
        backgroundColor: '#7A8B9A',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    otherInstructorName: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 4,
    },
    otherInstructorRole: {
        color: '#7A8B9A',
        fontSize: 12,
        textAlign: 'center',
    },
});

export default InstructorProfileScreen;