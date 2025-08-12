import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TopNavBar from '../../components/topNavBar';
import RequestBox from '../../components/requestBox';
import PrimaryButton from '../../components/primaryButton';
import SuccessModal from '../../components/successModal';

export default function TransferRequestScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientId, clientName, currentArea, therapistName } =
    route.params ?? {};

  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  const [showSpecialityModal, setShowSpecialityModal] = useState(false);
  const [showTherapistModal, setShowTherapistModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isButtonDisabled = !selectedSpeciality && !selectedTherapist;

  const specialityOptions = [
    { label: 'Physical Therapy', value: 'physical' },
    { label: 'Occupational Therapy', value: 'occupational' },
    { label: 'Speech Therapy', value: 'speech' },
    { label: 'Neurology', value: 'neuro' },
    { label: 'Cardiology', value: 'cardio' },
    { label: 'Orthopedics', value: 'ortho' },
    { label: 'Geriatrics', value: 'geriatrics' },
    { label: 'Pediatrics', value: 'pediatrics' },
  ];

  const therapistOptions = [
    { label: 'John Smith', value: 'john' },
    { label: 'Jane Doe', value: 'jane' },
    { label: 'Ali Hassan', value: 'ali' },
    { label: 'Mona Salem', value: 'mona' },
    { label: 'Youssef Kamal', value: 'youssef' },
    { label: 'Fatma Nabil', value: 'fatma' },
    { label: 'Mohamed Ibrahim', value: 'mohamed' },
    { label: 'Laila Omar', value: 'laila' },
  ];

  const getLabelByValue = (options, value) =>
    options.find(o => o.value === value)?.label ?? '';

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar
        title="Transfer Request"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>
            Transfer Request for :{' '}
            <Text style={styles.clientName}>{clientName}</Text>
          </Text>

          {/* Speciality */}
          <Text style={styles.label}>Speciality</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowSpecialityModal(true)}
          >
            <Text style={styles.selectText}>
              {getLabelByValue(specialityOptions, selectedSpeciality) ||
                currentArea ||
                'Select Speciality'}
            </Text>
          </TouchableOpacity>

          {/* Therapist */}
          <Text style={styles.label}>Therapist Name</Text>
          <TouchableOpacity
            style={styles.selectBox}
            onPress={() => setShowTherapistModal(true)}
          >
            <Text style={styles.selectText}>
              {getLabelByValue(therapistOptions, selectedTherapist) ||
                therapistName ||
                'Select Therapist'}
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Button fixed at bottom */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Submit Transfer Request"
            onPress={() => {
              setShowSuccessModal(true);

              // Optional: Auto-close modal after 2.5 seconds and navigate back
              setTimeout(() => {
                setShowSuccessModal(false);
                navigation.goBack(); // or navigate somewhere else
              }, 2500);
            }}
            disabled={isButtonDisabled}
          />
        </View>
      </View>

      {/* Speciality Modal */}
      {showSpecialityModal && (
        <Modal
          visible
          transparent
          animationType="slide"
          hardwareAccelerated={true}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select a Speciality</Text>
                <TouchableOpacity onPress={() => setShowSpecialityModal(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <RequestBox
                  options={specialityOptions}
                  selected={selectedSpeciality}
                  onSelect={value => {
                    setSelectedSpeciality(value);
                    setShowSpecialityModal(false);
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}

      {/* Therapist Modal */}
      {showTherapistModal && (
        <Modal
          visible={showTherapistModal}
          transparent
          animationType="slide"
          hardwareAccelerated={true}
          onRequestClose={() => setShowTherapistModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select a Therapist</Text>
                <TouchableOpacity onPress={() => setShowTherapistModal(false)}>
                  <Text style={styles.closeButton}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView>
                <RequestBox
                  options={therapistOptions}
                  selected={selectedTherapist}
                  onSelect={value => {
                    setSelectedTherapist(value);
                    setShowTherapistModal(false);
                  }}
                />
              </ScrollView>
            </View>
          </View>
        </Modal>
      )}
      <SuccessModal visible={showSuccessModal} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    zIndex: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 16,
  },
  clientName: {
    fontSize: 16,
    color: '#3463E9',
    fontWeight: '500',
    marginTop: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
    color: '#111827',
  },
  selectBox: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
  },
  selectText: {
    fontSize: 16,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    width: '100%',
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    elevation: 6,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  closeButton: {
    fontSize: 22,
    color: '#9CA3AF',
    padding: 4,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1.5,
    borderColor: '#E5E7EB',
  },
});
