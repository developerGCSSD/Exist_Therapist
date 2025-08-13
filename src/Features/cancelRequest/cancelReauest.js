// CancelRequestScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TopNavBar from '../../components/topNavBar';
import RequestBox from '../../components/requestBox';
import PrimaryButton from '../../components/primaryButton';
import SuccessModal from '../../components/successModal';

export default function CancelRequestScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientName, therapistName, date } = route.params ?? {};

  const [reasonModalVisible, setReasonModalVisible] = useState(false);
  const [selectedReason, setSelectedReason] = useState('');
  const [tempReason, setTempReason] = useState('');
  const [comment, setComment] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const cancellationOptions = [
    { label: 'Not feeling well', value: 'not_well' },
    { label: 'Schedule conflict', value: 'conflict' },
    { label: 'Personal reason', value: 'personal' },
  ];

  const renderField = (label, value, onPress) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.label}>
        {label} <Text style={styles.required}>*</Text>
      </Text>
      <TouchableOpacity
        style={styles.valueBox}
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
      >
        <Text
          style={[
            styles.valueText,
            !value && { color: '#9CA3AF', fontStyle: 'italic' },
          ]}
        >
          {value || 'Select a reason'}
        </Text>
        {onPress && (
          <Ionicons
            name="chevron-down"
            size={20}
            color="#6B7280"
            style={styles.arrowIcon}
          />
        )}
      </TouchableOpacity>
    </View>
  );

  const formatDate = dateObj => {
    if (!dateObj) return '-';
    try {
      const d = dateObj instanceof Date ? dateObj : new Date(dateObj);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}-${month}-${year}`;
    } catch {
      return '-';
    }
  };

  const openReasonModal = () => {
    setTempReason(selectedReason);
    setReasonModalVisible(true);
  };

  const handleReasonSubmit = () => {
    setSelectedReason(tempReason);
    setReasonModalVisible(false);
  };

  const handleSubmit = () => {
    // Trigger success modal
    setShowSuccessModal(true);

    // Optional: hide modal after a delay
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.goBack(); // Or navigate elsewhere
    }, 2000);
  };

  const isFormValid = clientName && therapistName && date && selectedReason;

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar
        title="Cancel Request"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {renderField('Client Name', clientName)}

        <View style={styles.row}>
          <View style={[styles.flexItem, { marginRight: 8 }]}>
            {renderField('Therapist Name', therapistName)}
          </View>
          <View style={styles.flexItem}>
            {renderField('Date', formatDate(date))}
          </View>
        </View>

        {renderField(
          'Cancellation Reasons',
          cancellationOptions.find(o => o.value === selectedReason)?.label,
          openReasonModal,
        )}

        <View style={styles.fieldContainer}>
          <Text style={styles.label}>Comment</Text>
          <TextInput
            style={[styles.valueBox, styles.textArea]}
            placeholder="Leave a comment"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={comment}
            onChangeText={setComment}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.submitButtonContainer}>
          <PrimaryButton
            title="Submit"
            onPress={handleSubmit}
            disabled={!isFormValid}
          />
        </View>
      </View>

      {/* Reason Modal */}
      <Modal
        visible={reasonModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setReasonModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalSheet}>
            <View style={styles.dragHandle} />
            <Text style={styles.modalTitle}>Select Reason</Text>
            <RequestBox
              options={cancellationOptions}
              selected={tempReason}
              onSelect={value => setTempReason(value)}
            />
            <View style={{ marginTop: 20 }}>
              <PrimaryButton
                title="Submit"
                onPress={handleReasonSubmit}
                disabled={!tempReason}
              />
            </View>
          </View>
        </View>
      </Modal>
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
    padding: 16,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 6,
    fontWeight: '500',
  },
  required: {
    color: 'red',
  },
  valueBox: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    color: '#6B7280',
  },
  arrowIcon: {
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
  },
  flexItem: {
    flex: 1,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    height: '40%',
  },
  dragHandle: {
    width: 50,
    height: 5,
    backgroundColor: '#D1D5DB',
    borderRadius: 3,
    alignSelf: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  submitButtonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderColor: '#E5E7EB',
  },
});
