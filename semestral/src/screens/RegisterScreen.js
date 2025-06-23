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

const RegisterScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [loading, setLoading] = useState(false);

  // URL do seu servidor - ajuste conforme necessário
  const API_BASE_URL = 'http://10.136.23.234:3000'; // Para emulador Android use: http://10.0.2.2:3000
  // Para dispositivo físico, use o IP da sua máquina: http://SEU_IP:3000

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const registerUser = async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro no servidor');
      }

      return data;
    } catch (error) {
      console.error('Erro na requisição:', error);
      throw error;
    }
  };

  const handleRegister = async () => {
    const { name, email, password, confirmPassword } = formData;

    // Validações básicas
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Campos obrigatórios', 'Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('E-mail inválido', 'Por favor, insira um e-mail válido');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Senha inválida', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Senhas não coincidem', 'As senhas digitadas não são iguais');
      return;
    }

    setLoading(true);

    try {
      // Preparar dados para envio
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        confirmPassword: confirmPassword,
        tipo_conta: 'pessoal' // Valor padrão conforme seu servidor
      };

      // Fazer requisição para o servidor
      const response = await registerUser(userData);

      if (response.success) {
        // Salvar token e dados do usuário
        await AsyncStorage.setItem('userToken', response.data.token);
        await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));

        // Mostrar mensagem de sucesso
        Alert.alert(
          'Cadastro realizado! 🎉',
          response.message || 'Sua conta foi criada com sucesso!',
          [
            {
              text: 'OK',
              onPress: () => {
                // Limpar formulário
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                });
                
                // Navegar para a tela principal ou de login
                navigation.navigate('Home'); // ou navigation.replace('Home')
              }
            }
          ]
        );
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
      
      let errorMessage = 'Erro ao criar conta. Tente novamente.';
      
      if (error.message.includes('email já está em uso')) {
        errorMessage = 'Este e-mail já está em uso. Tente fazer login ou use outro e-mail.';
      } else if (error.message.includes('senha deve ter pelo menos')) {
        errorMessage = 'A senha deve ter pelo menos 6 caracteres.';
      } else if (error.message.includes('Email inválido')) {
        errorMessage = 'Por favor, insira um e-mail válido.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      Alert.alert('Erro no cadastro', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A1628" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          disabled={loading}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastro</Text>
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
              <Text style={styles.welcomeTitle}>Criar Conta</Text>
              <View style={styles.signupTypeContainer}>
                <View style={styles.signupTypeInfo}>
                  <Text style={styles.signupTypeTitle}>Nova Conta</Text>
                  <Text style={styles.signupTypeSubtitle}>Crie sua conta e comece a aprender</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Form Section */}
        <View style={styles.formCard}>
          <View style={styles.formContainer}>
            {/* Name Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Nome completo</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu nome completo..."
                  placeholderTextColor="#94A3B8"
                  value={formData.name}
                  onChangeText={(value) => updateFormData('name', value)}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Email Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>E-mail</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="Digite um email..."
                  placeholderTextColor="#94A3B8"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                />
              </View>
            </View>

            {/* Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Sua senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Crie uma senha (mín. 6 caracteres)"
                  placeholderTextColor="#94A3B8"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  secureTextEntry={!passwordVisibility.password}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => togglePasswordVisibility('password')}
                  disabled={loading}
                >
                  <Text style={styles.eyeIcon}>
                    {passwordVisibility.password ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Confirm Password Input */}
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Confirme sua senha</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Digite a senha novamente"
                  placeholderTextColor="#94A3B8"
                  value={formData.confirmPassword}
                  onChangeText={(value) => updateFormData('confirmPassword', value)}
                  secureTextEntry={!passwordVisibility.confirmPassword}
                  editable={!loading}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => togglePasswordVisibility('confirmPassword')}
                  disabled={loading}
                >
                  <Text style={styles.eyeIcon}>
                    {passwordVisibility.confirmPassword ? '👁️' : '👁️‍🗨️'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Password Requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Requisitos da senha:</Text>
              <Text style={styles.requirementsText}>• Mínimo de 6 caracteres</Text>
              <Text style={styles.requirementsText}>• Recomenda-se usar letras, números e símbolos</Text>
            </View>

            {/* Register Button */}
            <TouchableOpacity 
              style={[styles.registerButton, loading && styles.registerButtonDisabled]} 
              onPress={handleRegister}
              activeOpacity={0.8}
              disabled={loading}
            >
              {loading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.registerButtonText}>Criando conta...</Text>
                </View>
              ) : (
                <Text style={styles.registerButtonText}>Criar Conta</Text>
              )}
            </TouchableOpacity>

            {/* Terms */}
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                Ao criar uma conta, você concorda com nossos{' '}
                <Text style={styles.termsLink}>Termos de Uso</Text> e{' '}
                <Text style={styles.termsLink}>Política de Privacidade</Text>
              </Text>
            </View>
          </View>
        </View>

        {/* Footer Links */}
        <View style={styles.footerCard}>
          <View style={styles.footerContent}>
            <Text style={styles.footerText}>
              Já possui uma conta?{' '}
              <Text 
                style={[styles.linkText, loading && styles.linkTextDisabled]} 
                onPress={() => !loading && navigation.navigate('Welcome')}
              >
                Faça login
              </Text>
            </Text>
            
            <View style={styles.divider} />
            
            <TouchableOpacity 
              style={styles.backLinkButton}
              onPress={() => navigation.goBack()}
              disabled={loading}
            >
              <Text style={[styles.backLinkText, loading && styles.linkTextDisabled]}>
                ← Voltar para opções anteriores
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
  signupTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupTypeIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  signupTypeInfo: {
    flex: 1,
  },
  signupTypeTitle: {
    color: '#2E90FA',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  signupTypeSubtitle: {
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
  requirementsContainer: {
    backgroundColor: '#334155',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#2E90FA',
  },
  requirementsTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  requirementsText: {
    color: '#94A3B8',
    fontSize: 13,
    marginBottom: 2,
  },
  registerButton: {
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
  registerButtonDisabled: {
    backgroundColor: '#475569',
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  termsContainer: {
    marginTop: 15,
    paddingHorizontal: 10,
  },
  termsText: {
    color: '#94A3B8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#2E90FA',
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

export default RegisterScreen;