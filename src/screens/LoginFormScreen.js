import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const LoginFormScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = route.params || { type: 'pessoal' };
  
  const handleLogin = () => {
    // Aqui você implementaria a lógica de autenticação
    if (email.trim() === '' || password.trim() === '') {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    navigation.navigate('Home');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.loginText}>Login</Text>
      </View>
      
      <View style={styles.welcomeContainer}>
        <Image 
          source={require('../../assets/logo-small.png')} 
          style={styles.smallLogo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Bem-vindo(a)</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um email..."
          placeholderTextColor="#7A869A"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.inputLabel}>Sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#7A869A"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.accessButton} onPress={handleLogin}>
          <Text style={styles.accessButtonText}>Acessar</Text>
        </TouchableOpacity>
        
        <View style={styles.footerLinks}>
          <Text style={styles.forgotPasswordText}>
            Não possui uma conta? <Text style={styles.linkText} onPress={() => navigation.navigate('Register')}>Cadastre-se</Text>
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.linkText}>Clique aqui para voltar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#091836',
  },
  header: {
    padding: 15,
    backgroundColor: '#f0f0f0',
  },
  loginText: {
    color: '#777',
    fontSize: 16,
  },
  welcomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  smallLogo: {
    width: 90,
    height: 90,
  },
  welcomeText: {
    color: '#2E90FA',
    fontSize: 30,
    fontWeight: '500',
  },
  formContainer: {
    padding: 20,
  },
  inputLabel: {
    color: '#2E90FA',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2E90FA',
    borderRadius: 5,
    padding: 15,
    color: '#FFFFFF',
    marginBottom: 15,
  },
  accessButton: {
    backgroundColor: '#23395D',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  accessButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  footerLinks: {
    marginTop: 20,
    alignItems: 'center',
  },
  forgotPasswordText: {
    color: '#FFFFFF',
    marginBottom: 10,
  },
  linkText: {
    color: '#2E90FA',
  },
});

export default LoginFormScreen;