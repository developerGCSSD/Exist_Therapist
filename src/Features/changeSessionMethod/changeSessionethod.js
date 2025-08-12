import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TopNavBar from '../../components/topNavBar';
import RequestBox from '../../components/requestBox';
import PrimaryButton from '../../components/primaryButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SuccessModal from '../../components/successModal';

export default function ChangeMethodRequestScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientId, clientName, method } = route.params ?? {};

  // Determine alternative method
  const newMethod = method === 'Online' ? 'Face to Face' : 'Online';

  // Modal for request type
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRequestType, setSelectedRequestType] = useState(null);
  const [tempSelectedRequestType, setTempSelectedRequestType] = useState(null);
  const [modalStep, setModalStep] = useState(1);
  const [sessionCount, setSessionCount] = useState('');
  const [successVisible, setSuccessVisible] = useState(false);

  const requestOptions = [
    { label: 'Permanent', value: 'Permanent' },
    { label: 'Number of sessions', value: 'Number of sessions' },
  ];
  const handleSubmit = () => {
    if (modalStep === 1 && tempSelectedRequestType === 'Number of sessions') {
      setModalStep(2);
    } else {
      setSelectedRequestType(tempSelectedRequestType);
      setModalVisible(false);
      setModalStep(1);

      if (tempSelectedRequestType === 'Permanent') {
        console.log('Submit permanent request');
      } else if (tempSelectedRequestType === 'Number of sessions') {
        console.log('Submit with sessions:', sessionCount);
      }
    }
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar
        title="Change Session Method"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        {/* Row layout for Client Name and Method */}
        <View style={styles.row}>
          <View style={[styles.field, styles.fieldSpacing]}>
            <Text style={styles.label}>Client Name</Text>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{clientName}</Text>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Change To</Text>
            <View style={styles.valueBox}>
              <Text style={styles.valueText}>{newMethod}</Text>
            </View>
          </View>
        </View>

        {/* Request type field */}
        <View style={[styles.field, { marginTop: 24 }]}>
          <Text style={styles.specialLabel}>
            How would you like to apply this change?
          </Text>
          <TouchableOpacity
            style={[styles.valueBox, styles.touchableBox]}
            onPress={() => {
              setTempSelectedRequestType(selectedRequestType);
              setModalVisible(true);
            }}
          >
            <View style={styles.rowBetween}>
              <Text
                style={[
                  styles.valueText,
                  selectedRequestType && { color: '#111827' }, // Apply dark color only when selected
                ]}
              >
                {selectedRequestType || 'Select Request Type'}
              </Text>

              <Ionicons name="chevron-down" size={20} color="#A9A9BC" />
            </View>
          </TouchableOpacity>

          {selectedRequestType === 'Number of sessions' && sessionCount ? (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.specialLabel}>Number of sessions</Text>
              <View style={styles.valueBox}>
                <Text style={styles.valueTextDark}>{sessionCount}</Text>
              </View>
            </View>
          ) : null}
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Submit"
            onPress={() => {
              console.log('Final submission:', {
                clientId,
                clientName,
                method,
                newMethod,
                selectedRequestType,
                sessionCount:
                  selectedRequestType === 'Number of sessions'
                    ? sessionCount
                    : null,
              });

              setSuccessVisible(true); // <-- Show success modal
              setTimeout(() => {
                setSuccessVisible(false);
                navigation.goBack(); // Or navigate elsewhere
              }, 2000);
            }}
            disabled={
              !selectedRequestType ||
              (selectedRequestType === 'Number of sessions' && !sessionCount)
            }
          />
        </View>
      </View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
          setModalStep(1);
          setSessionCount('');
        }}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        />

        <View style={styles.modalContainer}>
          {modalStep === 1 ? (
            <>
              <Text style={styles.modalTitle}>Select Request Type</Text>
              <RequestBox
                options={requestOptions}
                selected={tempSelectedRequestType}
                onSelect={setTempSelectedRequestType}
              />
              <PrimaryButton
                title={
                  tempSelectedRequestType === 'Number of sessions'
                    ? 'Next'
                    : 'Submit'
                }
                onPress={handleSubmit}
                disabled={!tempSelectedRequestType}
              />
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Number of sessions</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={sessionCount}
                onChangeText={setSessionCount}
                placeholder="Enter number"
                placeholderTextColor="#A9A9BC"
              />
              <PrimaryButton
                title="Submit"
                onPress={handleSubmit}
                disabled={!sessionCount}
              />
            </>
          )}
        </View>
      </Modal>
      <SuccessModal visible={successVisible} />
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
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    position: 'relative',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  field: {
    flex: 1,
  },
  fieldSpacing: {
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    color: '#A9A9BC',
    marginBottom: 6,
    fontWeight: '500',
  },
  specialLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827', // darker, more prominent
    marginBottom: 6,
  },
  valueBox: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  touchableBox: {
    // for press feedback
  },
  valueText: {
    fontSize: 16,
    color: '#A9A9BC',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 16,
    backgroundColor: '#F9FAFB',
  },
  valueTextDark: {
    fontSize: 16,
    color: '#111827',
  },
  buttonContainer: {
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
