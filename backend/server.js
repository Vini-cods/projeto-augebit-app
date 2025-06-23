// ========================================
// IMPORTS E CONFIGURAÇÕES INICIAIS
// ========================================
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ========================================
// CONFIGURAÇÃO DO SERVIDOR
// ========================================
const app = express();
const PORT = 3000;
const JWT_SECRET = 'augebit_secret_key_2024'; // Em produção, use uma chave mais segura

// ========================================
// CONFIGURAÇÃO DO BANCO DE DADOS
// ========================================
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'augebit',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Criação do pool de conexões
const pool = mysql.createPool(dbConfig);

// ========================================
// MIDDLEWARES
// ========================================
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ========================================
// MIDDLEWARE DE AUTENTICAÇÃO
// ========================================
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Token de acesso requerido' 
    });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        error: 'Token inválido ou expirado' 
      });
    }
    req.user = user;
    next();
  });
};

// ========================================
// FUNÇÕES UTILITÁRIAS
// ========================================
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  return password && password.length >= 6;
};

const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      nome: user.nome,
      tipo_conta: user.tipo_conta 
    },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// ========================================
// INICIALIZAÇÃO DO BANCO DE DADOS
// ========================================
const initializeDatabase = async () => {
  try {
    console.log('🔄 Iniciando conexão com o banco de dados...');
    
    const connection = await pool.getConnection();
    console.log('✅ Conectado ao banco MySQL com sucesso!');

    // Criação da tabela augebit
    const createAugebitTable = `
      CREATE TABLE IF NOT EXISTS augebit (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL,
        telefone VARCHAR(20) NULL,
        status ENUM('ativo', 'inativo') DEFAULT 'ativo',
        tipo_conta ENUM('pessoal', 'empresarial') DEFAULT 'pessoal',
        ultimo_login TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_email (email),
        INDEX idx_status (status),
        INDEX idx_tipo_conta (tipo_conta)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;

    await connection.execute(createAugebitTable);
    console.log('✅ Tabela "augebit" criada/verificada com sucesso');
    
    connection.release();
    console.log('🎉 Banco de dados inicializado com sucesso!');
    
  } catch (error) {
    console.error('❌ Erro ao conectar ao banco:', error.message);
    console.error('🔧 Verifique se o MySQL está rodando e as configurações estão corretas');
    process.exit(1);
  }
};

// ========================================
// ROTAS DE AUTENTICAÇÃO
// ========================================

// 🔐 POST - Login do usuário
app.post('/api/login', async (req, res) => {
  try {
    const { email, password, tipo_conta } = req.body;
    
    console.log('🔐 Tentativa de login:', { email, tipo_conta });

    // Validações básicas
    if (!email || !password) {
      console.log('❌ Validação falhou: campos obrigatórios não preenchidos');
      return res.status(400).json({ 
        success: false, 
        error: 'Email e senha são obrigatórios' 
      });
    }

    if (!validateEmail(email)) {
      console.log('❌ Email inválido:', email);
      return res.status(400).json({ 
        success: false, 
        error: 'Email inválido' 
      });
    }

    // Buscar usuário no banco
    const [rows] = await pool.execute(
      'SELECT * FROM augebit WHERE email = ? AND status = "ativo"',
      [email.trim().toLowerCase()]
    );

    if (rows.length === 0) {
      console.log('❌ Usuário não encontrado:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Email ou senha incorretos' 
      });
    }

    const user = rows[0];

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      console.log('❌ Senha incorreta para usuário:', email);
      return res.status(401).json({ 
        success: false, 
        error: 'Email ou senha incorretos' 
      });
    }

    // Verificar tipo de conta se fornecido
    if (tipo_conta && user.tipo_conta !== tipo_conta) {
      console.log('❌ Tipo de conta incorreto:', { fornecido: tipo_conta, esperado: user.tipo_conta });
      return res.status(401).json({ 
        success: false, 
        error: 'Tipo de conta incorreto' 
      });
    }

    // Atualizar último login
    await pool.execute(
      'UPDATE augebit SET ultimo_login = NOW() WHERE id = ?',
      [user.id]
    );

    // Gerar token
    const token = generateToken(user);

    console.log('✅ Login realizado com sucesso! ID:', user.id);

    res.status(200).json({
      success: true,
      message: 'Login realizado com sucesso! 🎉',
      data: {
        user: {
          id: user.id,
          nome: user.nome,
          email: user.email,
          telefone: user.telefone,
          tipo_conta: user.tipo_conta,
          ultimo_login: new Date().toISOString()
        },
        token: token
      }
    });
    
  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// 📝 POST - Registro de novo usuário
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword, tipo_conta = 'pessoal' } = req.body;
    
    console.log('📝 Tentativa de registro:', { name, email, tipo_conta });

    // Validações básicas
    if (!name || !email || !password || !confirmPassword) {
      console.log('❌ Validação falhou: campos obrigatórios não preenchidos');
      return res.status(400).json({ 
        success: false, 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    if (!validateEmail(email)) {
      console.log('❌ Email inválido:', email);
      return res.status(400).json({ 
        success: false, 
        error: 'Email inválido' 
      });
    }

    if (!validatePassword(password)) {
      console.log('❌ Senha inválida - deve ter pelo menos 6 caracteres');
      return res.status(400).json({ 
        success: false, 
        error: 'A senha deve ter pelo menos 6 caracteres' 
      });
    }

    if (password !== confirmPassword) {
      console.log('❌ Senhas não coincidem');
      return res.status(400).json({ 
        success: false, 
        error: 'As senhas não coincidem' 
      });
    }

    // Verificar se email já existe
    const [existingUsers] = await pool.execute(
      'SELECT id FROM augebit WHERE email = ?',
      [email.trim().toLowerCase()]
    );

    if (existingUsers.length > 0) {
      console.log('❌ Email já está em uso:', email);
      return res.status(400).json({ 
        success: false, 
        error: 'Este email já está em uso' 
      });
    }

    // Criptografar senha
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Inserir novo usuário
    const [result] = await pool.execute(
      'INSERT INTO augebit (nome, email, senha, tipo_conta, status) VALUES (?, ?, ?, ?, "ativo")',
      [name.trim(), email.trim().toLowerCase(), hashedPassword, tipo_conta]
    );

    console.log('✅ Usuário registrado com sucesso! ID:', result.insertId);

    // Buscar usuário criado para gerar token
    const [newUser] = await pool.execute(
      'SELECT id, nome, email, tipo_conta FROM augebit WHERE id = ?',
      [result.insertId]
    );

    const token = generateToken(newUser[0]);

    res.status(201).json({
      success: true,
      message: 'Conta criada com sucesso! 🎉',
      data: {
        user: {
          id: newUser[0].id,
          nome: newUser[0].nome,
          email: newUser[0].email,
          tipo_conta: newUser[0].tipo_conta
        },
        token: token
      }
    });
    
  } catch (error) {
    console.error('❌ Erro no registro:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// ========================================
// ROTAS DA API - CRUD AUGEBIT
// ========================================

// ✅ Health Check - Verificar status do servidor
app.get('/api/health', (req, res) => {
  try {
    res.status(200).json({ 
      success: true, 
      message: 'Servidor Augebit funcionando perfeitamente! 🚀',
      timestamp: new Date().toISOString(),
      status: 'online',
      version: '1.0.0'
    });
  } catch (error) {
    console.error('❌ Erro no health check:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor' 
    });
  }
});

// 👤 GET - Buscar perfil do usuário logado
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    console.log('👤 Buscando perfil do usuário ID:', req.user.id);
    
    const [rows] = await pool.execute(
      'SELECT id, nome, email, telefone, tipo_conta, status, ultimo_login, created_at FROM augebit WHERE id = ?',
      [req.user.id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Usuário não encontrado' 
      });
    }

    console.log('✅ Perfil encontrado com sucesso');

    res.status(200).json({ 
      success: true, 
      data: rows[0] 
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar perfil:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// 📋 GET - Listar todos os usuários (apenas para admin)
app.get('/api/augebit', authenticateToken, async (req, res) => {
  try {
    console.log('📋 Buscando lista de usuários...');
    
    const [rows] = await pool.execute(
      'SELECT id, nome, email, telefone, tipo_conta, status, ultimo_login, created_at FROM augebit ORDER BY created_at DESC'
    );
    
    console.log(`✅ ${rows.length} usuários encontrados`);
    
    res.status(200).json({ 
      success: true, 
      data: rows, 
      total: rows.length,
      message: `${rows.length} usuários encontrados`
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar usuários:', error.message);
    
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// ✏️ PUT - Atualizar perfil do usuário logado
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { nome, telefone } = req.body;
    const userId = req.user.id;

    console.log(`✏️ Tentativa de atualizar perfil do usuário ID: ${userId}`, { nome, telefone });

    // Validação
    if (!nome) {
      console.log('❌ Validação falhou: nome é obrigatório');
      return res.status(400).json({ 
        success: false, 
        error: 'Nome é obrigatório' 
      });
    }

    // Atualização no banco de dados
    const [result] = await pool.execute(
      'UPDATE augebit SET nome = ?, telefone = ? WHERE id = ?',
      [nome.trim(), telefone?.trim() || null, userId]
    );

    if (result.affectedRows === 0) {
      console.log(`❌ Usuário com ID ${userId} não encontrado`);
      return res.status(404).json({ 
        success: false, 
        error: 'Usuário não encontrado' 
      });
    }

    console.log(`✅ Perfil do usuário ID ${userId} atualizado com sucesso!`);

    res.status(200).json({ 
      success: true, 
      message: 'Perfil atualizado com sucesso! 🎉' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao atualizar perfil:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// 🔑 PUT - Alterar senha do usuário logado
app.put('/api/change-password', authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const userId = req.user.id;

    console.log(`🔑 Tentativa de alterar senha do usuário ID: ${userId}`);

    // Validações
    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'Todos os campos de senha são obrigatórios' 
      });
    }

    if (!validatePassword(newPassword)) {
      return res.status(400).json({ 
        success: false, 
        error: 'A nova senha deve ter pelo menos 6 caracteres' 
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ 
        success: false, 
        error: 'As senhas não coincidem' 
      });
    }

    // Buscar senha atual
    const [userRows] = await pool.execute(
      'SELECT senha FROM augebit WHERE id = ?',
      [userId]
    );

    if (userRows.length === 0) {
      return res.status(404).json({ 
        success: false, 
        error: 'Usuário não encontrado' 
      });
    }

    // Verificar senha atual
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, userRows[0].senha);
    if (!isCurrentPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        error: 'Senha atual incorreta' 
      });
    }

    // Criptografar nova senha
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Atualizar senha
    await pool.execute(
      'UPDATE augebit SET senha = ? WHERE id = ?',
      [hashedNewPassword, userId]
    );

    console.log(`✅ Senha alterada com sucesso para usuário ID ${userId}`);

    res.status(200).json({ 
      success: true, 
      message: 'Senha alterada com sucesso! 🔑' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao alterar senha:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// 🗑️ DELETE - Desativar conta do usuário logado
app.delete('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    
    console.log(`🗑️ Tentativa de desativar conta do usuário ID: ${userId}`);

    // Desativar ao invés de deletar
    const [result] = await pool.execute(
      'UPDATE augebit SET status = "inativo" WHERE id = ?',
      [userId]
    );

    if (result.affectedRows === 0) {
      console.log(`❌ Usuário com ID ${userId} não encontrado`);
      return res.status(404).json({ 
        success: false, 
        error: 'Usuário não encontrado' 
      });
    }

    console.log(`✅ Conta do usuário ID ${userId} desativada com sucesso!`);

    res.status(200).json({ 
      success: true, 
      message: 'Conta desativada com sucesso! 🗑️' 
    });
    
  } catch (error) {
    console.error('❌ Erro ao desativar conta:', error.message);
    res.status(500).json({ 
      success: false, 
      error: 'Erro interno do servidor', 
      message: error.message 
    });
  }
});

// ========================================
// INICIALIZAÇÃO DO SERVIDOR
// ========================================
const startServer = async () => {
  try {
    // Inicializar banco de dados primeiro
    await initializeDatabase();
    
    // Iniciar servidor
    app.listen(PORT, '0.0.0.0', () => {
      console.log('\n🚀 ========================================');
      console.log('🎉 SERVIDOR AUGEBIT INICIADO COM SUCESSO!');
      console.log('🚀 ========================================');
      console.log(`📍 Porta: ${PORT}`);
      console.log(`🌐 URL Local: http://localhost:${PORT}`);
      console.log('');
      console.log('📋 ROTAS DISPONÍVEIS:');
      console.log(`🔧 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🔐 Login: POST http://localhost:${PORT}/api/login`);
      console.log(`📝 Registro: POST http://localhost:${PORT}/api/register`);
      console.log(`👤 Perfil: GET http://localhost:${PORT}/api/profile`);
      console.log(`📋 Usuários: GET http://localhost:${PORT}/api/augebit`);
      console.log('🚀 ========================================\n');
    });
    
  } catch (error) {
    console.error('❌ Falha crítica ao iniciar servidor:', error.message);
    process.exit(1);
  }
};

// ========================================
// TRATAMENTO DE ERROS GLOBAIS
// ========================================
process.on('uncaughtException', (error) => {
  console.error('❌ Erro não capturado:', error.message);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Promise rejeitada não tratada:', reason);
  process.exit(1);
});

// ========================================
// INICIAR APLICAÇÃO
// ========================================
startServer();