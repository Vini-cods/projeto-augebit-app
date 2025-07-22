<div align="center">
  
  # Augebit App
</div>

> Aplicação full-stack desenvolvida com arquitetura RESTful, implementando padrões de segurança OAuth 2.0/JWT, componentização modular React Native e otimizações de performance para aplicações móveis enterprise.

## 🎯 Sobre o Projeto

Solução mobile enterprise construída com arquitetura de microserviços, implementando padrões de design SOLID e Clean Architecture. O sistema utiliza autenticação stateless com JWT, gerenciamento de estado otimizado e renderização condicional para máxima performance.

### ⚡ Arquitetura Técnica

- **Backend RESTful**: API Node.js/Express com middleware chain personalizado e error handling global
- **Autenticação Stateless**: Implementação JWT com refresh tokens e bcrypt salt rounds otimizados
- **Database Layer**: MySQL com connection pooling, prepared statements e índices compostos
- **Frontend Modular**: Componentes React Native com hooks customizados e context providers
- **Performance**: Lazy loading, memoização e otimizações de bundle size

## 🚀 Tecnologias

### Frontend (React Native)
```
├── React Navigation (Drawer Navigator)
├── Expo (BlurView, LinearGradient)
├── Ionicons
├── Animations API
└── StyleSheet avançado
```

### Backend (Node.js/Express)
```
├── Express.js
├── MySQL2 com pool de conexões
├── Bcrypt
├── JWT
├── CORS
└── Sistema de logs personalizado
```

## 🔐 Recursos de Autenticação

| Funcionalidade | Descrição |
|---|---|
| **Registro** | Validação completa e hash seguro de senhas |
| **Login** | JWT com expiração de 24h |
| **Perfil** | Atualização de dados pessoais |
| **Segurança** | Alteração de senha com validações |
| **Desativação** | Soft delete para preservar dados |

## 🎨 Componentes Destacados

### `CustomDrawer.js`
Implementação avançada de drawer navigation com:
- **Render Props Pattern**: Componente HOC com children render functions
- **Hardware Acceleration**: Transform3d e GPU-accelerated animations via Animated API
- **Gesture Handling**: PanGestureHandler integration com react-native-gesture-handler
- **Memory Optimization**: useCallback e useMemo para prevent unnecessary re-renders
- **CSS-in-JS**: StyleSheet.create com platform-specific optimizations

### `Header.js`
Component system baseado em composition pattern:
- **Props Drilling Prevention**: Context API para theme e navigation state
- **Responsive Design**: Dimensions API com orientation change listeners
- **Accessibility**: Screen reader support com semantic labels

### `SearchBar.js`
Input component com debounce implementation:
- **Performance**: useDebounce hook para throttling de API calls
- **TextInput Optimization**: Native driver animations e autoCorrect tuning
- **Cross-platform**: Platform-specific keyboard types e return key handling

## 💾 Estrutura do Banco

**Tabela `augebit`**
```sql
├── id (Primary Key)
├── nome
├── email (Unique)
├── senha (Hash bcrypt)
├── status (ativo/inativo)
├── tipo_conta (pessoal/empresarial)
├── created_at
└── updated_at
```

## 📋 Pré-requisitos

- Node.js (v14 ou superior)
- MySQL (v8.0 ou superior)
- Expo CLI
- npm ou yarn

## 🛠️ Instalação e Execução

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/augebit-app.git
cd augebit-app
```

### 2. Configure o Backend
```bash
cd backend
npm install
# Configure as variáveis de ambiente no .env
cp .env.example .env
npm start
```

### 3. Execute o Frontend
```bash
cd ../frontend
npm install
expo start
```

### 4. Configuração do Banco
```bash
# O banco será criado automaticamente na primeira execução
# Configure as credenciais no arquivo .env do backend
```

## 📱 Funcionalidades Implementadas

- [x] Sistema de autenticação completo
- [x] CRUD de usuários
- [x] Drawer de navegação personalizado
- [x] Design responsivo
- [x] Validações de formulário
- [x] Sistema de logs
- [x] Tratamento de erros

## 🔮 Roadmap Técnico

- [ ] **WebSocket Integration**: Real-time notifications com Socket.io e reconnection logic
- [ ] **GraphQL Migration**: Apollo Client implementation com caching strategies
- [ ] **Payment Gateway**: Stripe SDK integration com webhook handling
- [ ] **Microservices**: Docker containerization com Kubernetes orchestration
- [ ] **Analytics**: Custom event tracking com batch processing
- [ ] **Theme System**: Dynamic theming com CSS variables e color schemes

</div>
