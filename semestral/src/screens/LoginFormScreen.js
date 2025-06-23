import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginFormScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { type } = route.params || { type: 'pessoal' };

  // Configuração da API - substitua pela URL do seu servidor
  const API_BASE_URL = 'http://10.136.23.234:3000'; // ou sua URL de produção
  
  const handleLogin = async () => {
    // Validação básica
    if (email.trim() === '' || password.trim() === '') {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      Alert.alert('Email inválido', 'Por favor, digite um email válido');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password: password,
          tipo_conta: type
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Login bem-sucedido
        console.log('Login realizado com sucesso:', data.message);
        
        // Salvar dados do usuário e token no AsyncStorage
        await AsyncStorage.setItem('userToken', data.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(data.data.user));
        
        // Mostrar mensagem de sucesso
        Alert.alert(
          'Login realizado com sucesso! 🎉', 
          `Bem-vindo(a), ${data.data.user.nome}!`,
          [
            {
              text: 'Continuar',
              onPress: () => {
                // Navegar para a tela principal
                navigation.navigate('Home', { 
                  user: data.data.user,
                  token: data.data.token 
                });
              }
            }
          ]
        );
        
      } else {
        // Erro no login
        Alert.alert(
          'Erro no login',
          data.error || 'Credenciais inválidas. Verifique seus dados e tente novamente.'
        );
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      
      // Verificar se é erro de conexão
      if (error.message.includes('Network') || error.message.includes('fetch')) {
        Alert.alert(
          'Erro de conexão',
          'Não foi possível conectar ao servidor. Verifique sua conexão com a internet e tente novamente.'
        );
      } else {
        Alert.alert(
          'Erro inesperado',
          'Ocorreu um erro inesperado. Tente novamente em alguns instantes.'
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getAccountTypeInfo = () => {
    if (type === 'empresarial') {
      return {
        icon: '🏢',
        title: 'Acesso Empresarial',
        subtitle: 'Entre com suas credenciais corporativas'
      };
    }
    return {
      icon: '👤',
      title: 'Acesso Pessoal',
      subtitle: 'Entre com suas credenciais pessoais'
    };
  };

  const accountInfo = getAccountTypeInfo();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={isLoading}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Login</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Welcome Section */}
        <View style={styles.welcomeCard}>
          <View style={styles.welcomeContent}>
            <Image
              source={require('../../assets/logo-small.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <View style={styles.welcomeTextContainer}>
              <Text style={styles.welcomeTitle}>Bem-vindo(a)</Text>
              <View style={styles.accountTypeContainer}>
                <Text style={styles.accountTypeIcon}>{accountInfo.icon}</Text>
                <View style={styles.accountTypeInfo}>
                  <Text style={styles.accountTypeTitle}>{accountInfo.title}</Text>
                  <Text style={styles.accountTypeSubtitle}>{accountInfo.subtitle}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formCard}>
          <View style={styles.formContainer}>
            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, isLoading && styles.inputDisabled]}
                  placeholder="Digite seu email..."
                  placeholderTextColor="#94A3B8"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Sua senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput, isLoading && styles.inputDisabled]}
                  placeholder="Sua senha"
                  placeholderTextColor="#94A3B8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  editable={!isLoading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  disabled={isLoading}
                >
                  <Text style={styles.eyeIcon}>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Login Button */}
            <TouchableOpacity 
              style={[styles.loginButton, isLoading && styles.loginButtonDisabled]} 
              onPress={handleLogin}
              activeOpacity={0.8}
              disabled={isLoading}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.loadingText}>Entrando...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>Acessar</Text>
              )}
            </TouchableOpacity>

            {/* Forgot Password */}
            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              disabled={isLoading}
            >
              <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Footer Links */}
        <View style={styles.footerCard}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              Não possui uma conta?{' '}
              <Text 
                style={[styles.linkText, isLoading && styles.linkTextDisabled]} 
                onPress={() => !isLoading && navigation.navigate('Register')}
              >
                Cadastre-se
              </Text>
            </Text>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.backLinkButton}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Text style={[styles.backLinkText, isLoading && styles.linkTextDisabled]}>
                ← Voltar para opções de login
              </Text>
            </TouchableOpacity>
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
    paddingVertical: 45,
    backgroundColor: '#0A1628',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  welcomeCard: {
    margin: 20,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  welcomeContent: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginRight: 15,
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  accountTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountTypeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  accountTypeInfo: {
    flex: 1,
  },
  accountTypeTitle: {
    color: '#2E90FA',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  accountTypeSubtitle: {
    color: '#94A3B8',
    fontSize: 14,
  },
  formCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 4,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },
  inputWrapper: {
    position: 'relative',
  },
  input: {
    backgroundColor: '#334155',
    borderRadius: 12,
    padding: 16,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#475569',
  },
  inputDisabled: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
    opacity: 0.6,
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  eyeIcon: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: '#2E90FA',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    elevation: 2,
    shadowColor: '#2E90FA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  loginButtonDisabled: {
    backgroundColor: '#475569',
    elevation: 0,
    shadowOpacity: 0,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 15,
    padding: 10,
  },
  forgotPasswordText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '500',
  },
  footerCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  footerContent: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#94A3B8',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  linkText: {
    color: '#2E90FA',
    fontWeight: '600',
  },
  linkTextDisabled: {
    color: '#475569',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 15,
  },
  backLinkButton: {
    padding: 10,
  },
  backLinkText: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  bottomPadding: {
    height: 20,
  },
});

export default LoginFormScreen;