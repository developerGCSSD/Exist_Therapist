import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import TopNavBar from '../../components/topNavBar';
import RequestBox from '../../components/requestBox';
import PrimaryButton from '../../components/primaryButton';
import SuccessModal from '../../components/successModal';

export default function ScheduleRequestScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientId, clientName } = route.params ?? {};

  const frequencyOptions = [
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'bi-weekly' },
    { label: 'Monthly', value: 'monthly' },
  ];

  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleConfirm = () => {
    // Trigger success modal
    setShowSuccessModal(true);

    // Optional: hide modal after a delay
    setTimeout(() => {
      setShowSuccessModal(false);
      navigation.goBack(); // Or navigate elsewhere
    }, 2000);
  };

  return (
    <LinearGradient
      colors={['#0C3862', '#5AA5EE']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradientBackground}
    >
      <TopNavBar
        title="Schedule Upcoming Sessions"
        showBack={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <Text style={styles.header}>Select Session Frequency:</Text>
        <Text style={styles.client}>
          Client: <Text style={styles.clientName}>{clientName}</Text>
        </Text>

        <RequestBox
          options={frequencyOptions}
          selected={selectedFrequency}
          onSelect={setSelectedFrequency}
        />

        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Submit"
            onPress={handleConfirm}
            disabled={!selectedFrequency}
          />
        </View>
      </View>

      {/* ✅ Success Modal */}
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
    padding: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    zIndex: 10,
    position: 'relative',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  client: {
    fontSize: 16,
    color: '#111827',
    marginVertical: 20,
  },
  clientName: {
    color: '#3463E9',
    fontWeight: '500',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
});
