import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const { height, width } = Dimensions.get('window');

const WelcomeScreen = ({ navigation }) => {
  const videoRef = useRef(null);

  // Reiniciar o vídeo sempre que a tela for focada
  useFocusEffect(
    useCallback(() => {
      const restartVideo = async () => {
        if (videoRef.current) {
          await videoRef.current.replayAsync();
        }
      };
      restartVideo();
    }, [])
  );

  // Pausar vídeo 1 segundo antes de terminar
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoRef.current) {
        const status = await videoRef.current.getStatusAsync();
        if (
          status.isLoaded &&
          status.positionMillis > status.durationMillis - 1000
        ) {
          await videoRef.current.stopAsync();
          clearInterval(interval);
        }
      }
    }, 300); // Checa a cada 300ms

    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      
      {/* Logo Video Container */}
      <View style={styles.logoContainer}>
        <Video
          ref={videoRef}
          source={require('../../assets/logo-animada.mp4')}
          style={styles.logoVideo}
          resizeMode="contain"
          isMuted
          shouldPlay
          isLooping={false}
        />
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Welcome Text */}
        <View style={styles.welcomeTextContainer}>
          <Text style={styles.welcomeTitle}>Bem-vindo</Text>
          <Text style={styles.welcomeSubtitle}>
            Escolha como você gostaria de acessar sua conta
          </Text>
        </View>

        {/* Tab Container */}
        <View style={styles.tabContainer}>
          <TouchableOpacity style={styles.tabActive}>
            <Text style={styles.tabTextActive}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tab}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.tabText}>Cadastro</Text>
          </TouchableOpacity>
        </View>

        {/* Options Container */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('LoginForm', { type: 'pessoal' })}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>👤</Text>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Pessoal</Text>
                <Text style={styles.optionSubtitle}>Acesso individual</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => navigation.navigate('LoginForm', { type: 'empresarial' })}
          >
            <View style={styles.optionContent}>
              <Text style={styles.optionIcon}>🏢</Text>
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionTitle}>Empresarial</Text>
                <Text style={styles.optionSubtitle}>Acesso corporativo</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.45,
    paddingTop: 20,
  },
  logoVideo: {
    width: 600,
    height: 500,
    borderRadius: 12,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  welcomeTextContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#1E293B',
    borderRadius: 12,
    padding: 4,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#334155',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    backgroundColor: '#2E90FA',
    borderRadius: 8,
  },
  tabText: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  optionsContainer: {
    gap: 15,
    paddingBottom: 40,
  },
  optionButton: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 2,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  optionTextContainer: {
    flex: 1,
  },
  optionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  optionSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
    lineHeight: 18,
  },
});

export default WelcomeScreen;