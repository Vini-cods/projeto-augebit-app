-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 23/06/2025 às 20:13
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `augebit`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `augebit`
--

CREATE TABLE `augebit` (
  `id` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `status` enum('ativo','inativo') DEFAULT 'ativo',
  `tipo_conta` enum('pessoal','empresarial') DEFAULT 'pessoal',
  `ultimo_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `augebit`
--

INSERT INTO `augebit` (`id`, `nome`, `email`, `senha`, `telefone`, `status`, `tipo_conta`, `ultimo_login`, `created_at`, `updated_at`) VALUES
(4, 'vinicius santos briches', 'vinibriches@augebit.com', '$2b$10$pC1NyrK/2Car1fBMCvk/TOj2sPqqg4JTVMnu2VAyD0x9.d8/nU5jS', NULL, 'ativo', 'pessoal', '2025-06-23 17:01:02', '2025-06-23 14:09:43', '2025-06-23 17:01:02'),
(5, 'bruno arthur', 'bruno@augebit.com', '$2b$10$QPm6bA3SKNPFqsspIOeTgeS2fhnMaqxaTFqz.44zZM/mjCsW8Rc7G', NULL, 'ativo', 'pessoal', '2025-06-23 18:05:07', '2025-06-23 14:28:04', '2025-06-23 18:05:07'),
(6, 'Joao Almeida Freitas', 'joao@augebit.com', '$2b$10$pW/c4GdoviqPvCGFXdfsmON4vwru4zQ2AzazI8EJyNwVelLyc1wze', NULL, 'ativo', 'pessoal', NULL, '2025-06-23 16:08:33', '2025-06-23 16:08:33'),
(7, 'marcos', 'marcos@augebit.com', '$2b$10$W.DV4kwjiseV3OPTf2mkj.8dniNaC76GmzLukl1p/HNxYTZ7l0CZu', NULL, 'ativo', 'pessoal', NULL, '2025-06-23 17:08:36', '2025-06-23 17:08:36');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `augebit`
--
ALTER TABLE `augebit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_tipo_conta` (`tipo_conta`),
  ADD KEY `idx_created_at` (`created_at`),
  ADD KEY `idx_ultimo_login` (`ultimo_login`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `augebit`
--
ALTER TABLE `augebit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
