import React, { useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const { height } = Dimensions.get('window');

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

      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabActive} onPress={() => { }}>
          <Text style={styles.tabTextActive}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.tabText}>Cadastro</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => navigation.navigate('LoginForm', { type: 'pessoal' })}
        >
          <Text style={styles.optionText}>Pessoal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.optionButton}
          onPress={() =>
            navigation.navigate('LoginForm', { type: 'empresarial' })
          }
        >
          <Text style={styles.optionText}>Empresarial</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091836',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height * 0.5,
    marginBottom: 20,
  },
  logoVideo: {
    width: 650,
    height: 900,
    borderRadius: 12,
    justifyContent: 'center',


  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1E3A70',
  },
  tab: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  tabActive: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderLeftWidth: 2,
    borderLeftColor: '#2E90FA',
  },
  tabText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  tabTextActive: {
    color: '#2E90FA',
    fontSize: 16,
    fontWeight: '500',
  },
  optionsContainer: {
    padding: 20,
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#2E90FA',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginBottom: 5,
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default WelcomeScreen;
