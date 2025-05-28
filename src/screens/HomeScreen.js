import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.homeHeader}>
        <Image
          source={require('../../assets/logo-small.png')}
          style={styles.smallLogo}
          resizeMode="contain"
        />
        <Text style={styles.headerText}>
          Olá, aluno! <Text style={styles.welcomeSmall}>Bem-vindo</Text>
        </Text>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Text style={styles.menuIcon}>≡</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          style={styles.welcomeCard}
          onPress={() => navigation.navigate('Cursos')}
        >
          <View style={styles.welcomeCardTextContainer}>
            <Text style={styles.welcomeCardText}>Bora retomar?</Text>
            <Text style={styles.welcomeCardSubtext}>Vamos voltar ao trabalho</Text>
          </View>
          <Image
            source={require('../../assets/work-illustration.png')}
            style={styles.workIllustration}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Categorias</Text>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Cursos', { filter: 'segurança' })}
          >
            <Text style={styles.categoryTitle}>Segurança</Text>
            <Text style={styles.categoryCount}>4 cursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Cursos', { filter: 'tecnologia' })}
          >
            <Text style={styles.categoryTitle}>Tecnologia</Text>
            <Text style={styles.categoryCount}>3 cursos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Cursos', { filter: 'gestão' })}
          >
            <Text style={styles.categoryTitle}>Gestão</Text>
            <Text style={styles.categoryCount}>2 cursos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.categoryCard}
            onPress={() => navigation.navigate('Cursos', { filter: 'manutenção' })}
          >
            <Text style={styles.categoryTitle}>Manutenção</Text>
            <Text style={styles.categoryCount}>3 cursos</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Cursos mais populares</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          <TouchableOpacity
            style={styles.popularCourseCard}
            onPress={() => navigation.navigate('Cursos')}
          >
            <Image
              source={require('../../assets/nr10.png')}
              style={styles.popularCourseImage}
              resizeMode="cover"
            />
            <View style={styles.popularCourseInfo}>
              <Text style={styles.popularCourseTitle} numberOfLines={2}>NR10 - Segurança em Instalações Elétricas</Text>
              <Text style={styles.popularCourseDuration}>40 horas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.popularCourseCard}
            onPress={() => navigation.navigate('Cursos')}
          >
            <Image
              source={require('../../assets/alto.png')}
              style={styles.popularCourseImage}
              resizeMode="cover"
            />
            <View style={styles.popularCourseInfo}>
              <Text style={styles.popularCourseTitle} numberOfLines={2}>NR35 - Trabalho em Altura</Text>
              <Text style={styles.popularCourseDuration}>24 horas</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.popularCourseCard}
            onPress={() => navigation.navigate('Cursos')}
          >
            <Image
              source={require('../../assets/cnc.png')}
              style={styles.popularCourseImage}
              resizeMode="cover"
            />
            <View style={styles.popularCourseInfo}>
              <Text style={styles.popularCourseTitle} numberOfLines={2}>Automação Industrial</Text>
              <Text style={styles.popularCourseDuration}>80 horas</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  homeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 35,
    backgroundColor: '#0A1628',
  },
  smallLogo: {
    width: 120,
    height: 120,
    marginRight: -100,
    right: 40,
  },
  headerText: {
    color: '#2E90FA',
    fontSize: 25,
    fontWeight: '500',
  },
  welcomeSmall: {
    fontSize: 15,
    color: '#FFFFFF',
    fontWeight: 'normal',
  },
  menuIcon: {
    color: '#FFFFFF',
    fontSize: 30,
  },
  scrollView: {
    flex: 1,
  },
  welcomeCard: {
    backgroundColor: '#133366',
    margin: 15,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 100,
  },
  welcomeCardTextContainer: {
    flex: 2,
  },
  welcomeCardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  welcomeCardSubtext: {
    color: '#FFFFFF',
    opacity: 0.7,
  },
  workIllustration: {
    width: 80,
    height: 80,
    flex: 1,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginBottom: 10,
  },
  categoryCard: {
    backgroundColor: '#133366',
    width: '48%',
    borderRadius: 10,
    padding: 15,
    height: 100,
    justifyContent: 'space-between',
  },
  categoryTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  categoryCount: {
    color: '#2E90FA',
    fontSize: 14,
  },
  horizontalScroll: {
    marginBottom: 20,
  },
  popularCourseCard: {
    backgroundColor: '#133366',
    width: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginLeft: 15,
    marginBottom: 10,
  },
  popularCourseImage: {
    width: '100%',
    height: 120,
  },
  popularCourseInfo: {
    padding: 10,
  },
  popularCourseTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  popularCourseDuration: {
    color: '#2E90FA',
    fontSize: 12,
  },
});

export default HomeScreen;