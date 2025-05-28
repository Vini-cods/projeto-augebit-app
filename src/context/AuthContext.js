import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar se existe usuário salvo ao iniciar o app
  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('@AugeBit:user');
      const token = await AsyncStorage.getItem('@AugeBit:token');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log('Erro ao verificar autenticação:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password, type = 'pessoal') => {
    try {
      setIsLoading(true);
      
      // Aqui você faria a chamada para sua API
      // Por enquanto, simulando login
      const mockUser = {
        id: '1',
        email: email,
        name: 'Usuário Teste',
        type: type,
        avatar: null
      };
      
      const mockToken = 'mock_jwt_token_123';
      
      // Salvar dados do usuário
      await AsyncStorage.setItem('@AugeBit:user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@AugeBit:token', mockToken);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.log('Erro no login:', error);
      return { success: false, error: 'Erro ao fazer login' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, confirmPassword) => {
    try {
      setIsLoading(true);
      
      // Validações
      if (!email || !password || !confirmPassword) {
        return { success: false, error: 'Por favor, preencha todos os campos' };
      }
      
      if (password !== confirmPassword) {
        return { success: false, error: 'As senhas não coincidem' };
      }
      
      // Aqui você faria a chamada para sua API
      // Por enquanto, simulando cadastro
      const mockUser = {
        id: '1',
        email: email,
        name: 'Novo Usuário',
        type: 'pessoal',
        avatar: null
      };
      
      const mockToken = 'mock_jwt_token_123';
      
      // Salvar dados do usuário
      await AsyncStorage.setItem('@AugeBit:user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('@AugeBit:token', mockToken);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.log('Erro no cadastro:', error);
      return { success: false, error: 'Erro ao fazer cadastro' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      
      // Remover dados salvos
      await AsyncStorage.removeItem('@AugeBit:user');
      await AsyncStorage.removeItem('@AugeBit:token');
      
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log('Erro no logout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...user, ...userData };
      await AsyncStorage.setItem('@AugeBit:user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (error) {
      console.log('Erro ao atualizar usuário:', error);
      return { success: false, error: 'Erro ao atualizar dados' };
    }
  };

  const contextValue = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateUser,
    checkAuthState
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve estar dentro de um AuthProvider');
  }
  return context;
};