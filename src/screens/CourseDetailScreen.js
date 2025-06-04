import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const CourseDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Recebe os dados do curso da navegação com validação
  const curso = route.params?.curso;

  useEffect(() => {
    // Verifica se os dados do curso foram passados corretamente
    if (!curso) {
      Alert.alert(
        'Erro',
        'Não foi possível carregar os dados do curso.',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
      return;
    }
    setIsLoading(false);
  }, [curso, navigation]);

  const handleInscricao = () => {
    setShowModal(true);
  };

  const confirmarInscricao = () => {
    setShowModal(false);
    Alert.alert(
      'Inscrição Realizada!',
      'Sua inscrição foi realizada com sucesso. Você receberá um e-mail com os detalhes do curso.',
      [
        {
          text: 'OK',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  // Mostra loading enquanto valida os dados
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#2E90FA" />
          <Text style={styles.loadingText}>Carregando...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Se curso não existe, não renderiza nada (o useEffect já mostrou o erro)
  if (!curso) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detalhes do Curso</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Course Image */}
        <View style={styles.imageContainer}>
          <Image source={curso.imagem} style={styles.courseImage} />
          <View style={styles.priceTag}>
            <Text style={styles.priceText}>{curso.preco}</Text>
          </View>
        </View>

        {/* Course Info */}
        <View style={styles.contentContainer}>
          <Text style={styles.courseTitle}>{curso.titulo}</Text>
          <Text style={styles.instructor}>Por {curso.instrutor}</Text>

          {/* Quick Info Cards */}
          <View style={styles.quickInfoContainer}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={20} color="#2E90FA" />
              <Text style={styles.infoText}>{curso.cargaHoraria}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="calendar-outline" size={20} color="#2E90FA" />
              <Text style={styles.infoText}>{curso.duracao}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="location-outline" size={20} color="#2E90FA" />
              <Text style={styles.infoText}>{curso.modalidade}</Text>
            </View>
            <View style={styles.infoCard}>
              <Ionicons name="medal-outline" size={20} color="#2E90FA" />
              <Text style={styles.infoText}>{curso.nivel}</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Descrição</Text>
            <Text style={styles.description}>{curso.descricao}</Text>
          </View>

          {/* Course Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações do Curso</Text>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Data de Início:</Text>
              <Text style={styles.detailValue}>{curso.dataInicio}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Local:</Text>
              <Text style={styles.detailValue}>{curso.local}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vagas Disponíveis:</Text>
              <Text style={styles.detailValue}>{curso.vagas} vagas</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Certificado:</Text>
              <Text style={styles.detailValue}>{curso.certificado}</Text>
            </View>
          </View>

          {/* Requirements */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Requisitos</Text>
            {curso.requisitos && curso.requisitos.map((req, index) => (
              <View key={index} style={styles.listItem}>
                <Ionicons name="checkmark-circle-outline" size={16} color="#2E90FA" />
                <Text style={styles.listText}>{req}</Text>
              </View>
            ))}
          </View>

          {/* Program */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Programa do Curso</Text>
            {curso.programa && curso.programa.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <Text style={styles.listNumber}>{index + 1}.</Text>
                <Text style={styles.listText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.enrollButton} onPress={handleInscricao}>
          <Text style={styles.enrollButtonText}>Inscrever-se no Curso</Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Confirmation Modal */}
      <Modal
        visible={showModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Ionicons name="school-outline" size={40} color="#2E90FA" />
              <Text style={styles.modalTitle}>Confirmar Inscrição</Text>
            </View>
            
            <Text style={styles.modalText}>
              Deseja confirmar sua inscrição no curso "{curso.titulo}"?
            </Text>
            
            <View style={styles.modalInfo}>
              <Text style={styles.modalInfoText}>Valor: {curso.preco}</Text>
              <Text style={styles.modalInfoText}>Início: {curso.dataInicio}</Text>
            </View>

            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setShowModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.confirmButton}
                onPress={confirmarInscricao}
              >
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#0A1628',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A1628',
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 12,
  },
  header: {
    backgroundColor: '#0A1628',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  courseImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  priceTag: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: '#2E90FA',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  priceText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contentContainer: {
    backgroundColor: '#0A1628',
    padding: 20,
  },
  courseTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  instructor: {
    color: '#94A3B8',
    fontSize: 16,
    marginBottom: 20,
  },
  quickInfoContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  infoCard: {
    backgroundColor: '#1E293B',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: '48%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: '#2E90FA',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
  },
  detailLabel: {
    color: '#94A3B8',
    fontSize: 14,
    flex: 1,
  },
  detailValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  listText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 8,
    flex: 1,
  },
  listNumber: {
    color: '#2E90FA',
    fontSize: 14,
    fontWeight: 'bold',
    width: 20,
  },
  bottomContainer: {
    backgroundColor: '#0A1628',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  enrollButton: {
    backgroundColor: '#2E90FA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
  },
  enrollButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    width: '90%',
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
  },
  modalText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  modalInfo: {
    backgroundColor: '#0A1628',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalInfoText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#64748B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  cancelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#2E90FA',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CourseDetailScreen;