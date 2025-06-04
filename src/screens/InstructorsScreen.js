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
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const InstructorsScreen = ({ navigation }) => {
    const instructors = [
        {
            id: 1,
            name: 'Ana Costa',
            specialty: 'UX/UI Design',
            courses: 8,
            experience: 5,
            projects: 12,
            rating: 4.9,
            // image: require('../../assets/instructor-ana.png'), // Substitua pelo caminho correto
            totalStudents: 250,
            expertise: ['Design Thinking', 'Prototyping', 'User Research']
        },
        {
            id: 2,
            name: 'João Santos',
            specialty: 'Desenvolvimento Web',
            courses: 12,
            experience: 7,
            projects: 18,
            rating: 4.8,
            // image: require('../../assets/instructor-joao.png'), // Substitua pelo caminho correto
            totalStudents: 420,
            expertise: ['React', 'Node.js', 'JavaScript']
        },
        {
            id: 3,
            name: 'Maria Silva',
            specialty: 'Design Gráfico',
            courses: 6,
            experience: 4,
            projects: 10,
            rating: 4.7,
            // image: require('../../assets/instructor-maria.png'), // Substitua pelo caminho correto
            totalStudents: 180,
            expertise: ['Adobe Creative', 'Branding', 'Print Design']
        },
        {
            id: 4,
            name: 'Pedro Lima',
            specialty: 'Mobile Development',
            courses: 10,
            experience: 6,
            projects: 15,
            rating: 4.9,
            // image: require('../../assets/instructor-pedro.png'), // Substitua pelo caminho correto
            totalStudents: 320,
            expertise: ['React Native', 'Flutter', 'iOS/Android']
        },
        {
            id: 5,
            name: 'Carla Mendes',
            specialty: 'Data Science',
            courses: 9,
            experience: 8,
            projects: 22,
            rating: 4.8,
            // image: require('../../assets/instructor-carla.png'), // Substitua pelo caminho correto
            totalStudents: 380,
            expertise: ['Python', 'Machine Learning', 'Analytics']
        },
    ];

    const topInstructors = instructors.slice(0, 3); // Os 3 melhores instrutores

    const InstructorCard = ({ instructor, isHorizontal = false }) => (
        <TouchableOpacity
            style={isHorizontal ? styles.horizontalInstructorCard : styles.instructorCard}
            onPress={() => navigation.navigate('InstructorProfile', { instructor })}
        >
            <View style={isHorizontal ? styles.horizontalCardContent : styles.cardContent}>
                <View style={styles.instructorImageContainer}>
                    <View style={styles.instructorAvatar}>
                        <Ionicons name="person" size={isHorizontal ? 32 : 40} color="#FFFFFF" />
                    </View>
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={12} color="#FFD700" />
                        <Text style={styles.ratingBadgeText}>{instructor.rating}</Text>
                    </View>
                </View>

                <View style={styles.instructorDetails}>
                    <Text style={styles.instructorName} numberOfLines={1}>
                        {instructor.name}
                    </Text>
                    <Text style={styles.instructorSpecialty} numberOfLines={1}>
                        {instructor.specialty}
                    </Text>
                    
                    {!isHorizontal && (
                        <View style={styles.expertiseContainer}>
                            {instructor.expertise.slice(0, 2).map((skill, index) => (
                                <View key={index} style={styles.expertiseTag}>
                                    <Text style={styles.expertiseText}>{skill}</Text>
                                </View>
                            ))}
                        </View>
                    )}

                    <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{instructor.courses}</Text>
                            <Text style={styles.statLabel}>Cursos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{instructor.totalStudents}</Text>
                            <Text style={styles.statLabel}>Alunos</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNumber}>{instructor.experience}</Text>
                            <Text style={styles.statLabel}>Anos</Text>
                        </View>
                    </View>
                </View>
            </View>
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

                <View style={styles.headerCenter}>
                    <Image
                        source={require('../../assets/logo-small.png')}
                        style={styles.logo}
                        resizeMode="contain"
                    />
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
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                {/* Title Section */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Nossos Instrutores</Text>
                    <Text style={styles.subtitle}>
                        Conheça nossa equipe de especialistas em tecnologia
                    </Text>
                </View>

                {/* Top Instructors Section */}
                <View style={styles.topInstructorsContainer}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}> Instrutores em Destaque</Text>
                        <TouchableOpacity>
                            <Text style={styles.seeAllText}>Ver rankings</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.topInstructorsScroll}
                    >
                        {topInstructors.map((instructor) => (
                            <InstructorCard 
                                key={instructor.id} 
                                instructor={instructor} 
                                isHorizontal={true}
                            />
                        ))}
                    </ScrollView>
                </View>

                {/* Statistics Section */}
                <View style={styles.statsSection}>
                    <Text style={styles.sectionTitle}>Nossa Equipe</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statCard}>
                            <Text style={styles.statCardNumber}>{instructors.length}</Text>
                            <Text style={styles.statCardLabel}>Instrutores</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statCardNumber}>45+</Text>
                            <Text style={styles.statCardLabel}>Cursos</Text>
                        </View>
                        <View style={styles.statCard}>
                            <Text style={styles.statCardNumber}>1.5k+</Text>
                            <Text style={styles.statCardLabel}>Alunos</Text>
                        </View>
                    </View>
                </View>

                {/* All Instructors List */}
                <View style={styles.allInstructorsContainer}>
                    <Text style={styles.sectionTitle}>Todos os Instrutores</Text>
                    <View style={styles.instructorsGrid}>
                        {instructors.map((instructor) => (
                            <InstructorCard 
                                key={instructor.id} 
                                instructor={instructor} 
                            />
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
        backgroundColor: '#0A1628',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
        backgroundColor: '#0A1628',
    },
    backButton: {
        padding: 8,
        borderRadius: 8,
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        width: 60,
        height: 60,
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
    titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 25,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: 16,
        lineHeight: 22,
    },
    topInstructorsContainer: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 15,
    },
    sectionTitle: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    seeAllText: {
        color: '#2E90FA',
        fontSize: 14,
        fontWeight: '600',
    },
    topInstructorsScroll: {
        paddingLeft: 20,
    },
    horizontalInstructorCard: {
        backgroundColor: '#1E293B',
        width: 280,
        borderRadius: 16,
        padding: 16,
        marginRight: 15,
        borderWidth: 1,
        borderColor: '#334155',
    },
    horizontalCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    instructorImageContainer: {
        position: 'relative',
        marginRight: 15,
    },
    instructorAvatar: {
        width: 60,
        height: 60,
        backgroundColor: '#475569',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ratingBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#FFD700',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 10,
    },
    ratingBadgeText: {
        color: '#000',
        fontSize: 11,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    instructorDetails: {
        flex: 1,
    },
    instructorName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    instructorSpecialty: {
        color: '#94A3B8',
        fontSize: 14,
        marginBottom: 12,
    },
    expertiseContainer: {
        flexDirection: 'row',
        marginBottom: 12,
        flexWrap: 'wrap',
    },
    expertiseTag: {
        backgroundColor: '#2E90FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginRight: 6,
        marginBottom: 4,
    },
    expertiseText: {
        color: '#FFFFFF',
        fontSize: 10,
        fontWeight: '500',
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        color: '#2E90FA',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    statLabel: {
        color: '#94A3B8',
        fontSize: 11,
    },
    statsSection: {
        marginHorizontal: 20,
        marginBottom: 30,
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
    statCardNumber: {
        color: '#2E90FA',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    statCardLabel: {
        color: '#94A3B8',
        fontSize: 12,
        textAlign: 'center',
    },
    allInstructorsContainer: {
        marginHorizontal: 20,
        marginBottom: 25,
    },
    instructorsGrid: {
        gap: 15,
    },
    instructorCard: {
        backgroundColor: '#1E293B',
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#334155',
    },
    cardContent: {
        // Estrutura vertical para cards completos
    },
    bottomPadding: {
        height: 20,
    },
});

export default InstructorsScreen;