import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const handleRegister = () => {
    // Validações básicas
    if (email.trim() === '' || password.trim() === '' || confirmPassword.trim() === '') {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }
    
    // Aqui você implementaria a lógica de cadastro
    navigation.navigate('Home');
  };
  
  return (
    <SafeAreaView style={styles.container}>
      
      <View style={styles.welcomeContainer}>
        <Image 
          source={require('../../assets/logo-small.png')} 
          style={styles.smallLogo}
          resizeMode="contain"
        />
        <Text style={styles.welcomeText}>Sign up</Text>
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.inputLabel}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite um email..."
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.inputLabel}>Sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Sua senha"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <Text style={styles.inputLabel}>Confirme sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          placeholderTextColor="#000"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.accessButton} onPress={handleRegister}>
          <Text style={styles.accessButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        
        <View style={styles.footerLinks}>
          <Text style={styles.forgotPasswordText}>
            Já possui uma conta? <Text style={styles.linkText} onPress={() => navigation.navigate('Welcome')}>Login</Text>
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
    width: 100,
    height: 100,
    marginTop: 25,
    right: 25,

  },
  
  welcomeText: {
    color: '#2E90FA',
    fontSize: 25,
    fontWeight: '500',
    marginTop: 25,
    right: 40,
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

export default RegisterScreen;