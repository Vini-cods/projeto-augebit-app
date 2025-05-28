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
        },
        {
            id: 2,
            name: 'João Santos',
            specialty: 'Desenvolvimento Web',
            courses: 12,
            experience: 7,
            projects: 18,
            rating: 4.8,
        },
        {
            id: 3,
            name: 'Maria Silva',
            specialty: 'Design Gráfico',
            courses: 6,
            experience: 4,
            projects: 10,
            rating: 4.7,
        },
        {
            id: 4,
            name: 'Pedro Lima',
            specialty: 'Mobile Development',
            courses: 10,
            experience: 6,
            projects: 15,
            rating: 4.9,
        },
    ];

    const InstructorCard = ({ instructor }) => (
        <TouchableOpacity
            style={styles.instructorCard}
            onPress={() => navigation.navigate('InstructorProfile', { instructor })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.instructorAvatar}>
                    <Ionicons name="person" size={40} color="#FFFFFF" />
                </View>
                <View style={styles.instructorInfo}>
                    <Text style={styles.instructorName}>{instructor.name}</Text>
                    <Text style={styles.instructorSpecialty}>{instructor.specialty}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>{instructor.rating}</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.statsRow}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{instructor.courses}</Text>
                    <Text style={styles.statLabel}>Cursos</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{instructor.experience}</Text>
                    <Text style={styles.statLabel}>Anos</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{instructor.projects}</Text>
                    <Text style={styles.statLabel}>Projetos</Text>
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

            {/* Title */}
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Nossos Instrutores</Text>
                <Text style={styles.subtitle}>Conheça nossa equipe de especialistas</Text>
            </View>

            {/* Instructors List */}
            <ScrollView 
                showsVerticalScrollIndicator={false}
                style={styles.scrollView}
            >
                <View style={styles.instructorsContainer}>
                    {instructors.map((instructor) => (
                        <InstructorCard key={instructor.id} instructor={instructor} />
                    ))}
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
        marginTop: 50,
        marginBottom: -50,
    },
    menuButton: {
        padding: 4,
        marginTop: 50,
    },
    titleContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    title: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: '600',
        marginBottom: 10,
        marginTop: 10,
    },
    subtitle: {
        color: '#7A8B9A',
        fontSize: 16,
    },
    scrollView: {
        flex: 1,
    },
    instructorsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    instructorCard: {
        backgroundColor: '#1E3A5F',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    instructorAvatar: {
        width: 60,
        height: 60,
        backgroundColor: '#7A8B9A',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    instructorInfo: {
        flex: 1,
    },
    instructorName: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    instructorSpecialty: {
        color: '#7A8B9A',
        fontSize: 14,
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#FFD700',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 4,
    },
    statsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: 'rgba(255, 255, 255, 0.1)',
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 4,
    },
    statLabel: {
        color: '#7A8B9A',
        fontSize: 12,
    },
});

export default InstructorsScreen;