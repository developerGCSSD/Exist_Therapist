// components/SuccessModal.js

import React from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SuccessModal({
  visible,
  message = 'Your request has been submitted successfully',
}) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.circle}>
            <Ionicons name="checkmark" size={40} color="#fff" />
          </View>
          {message.split('\n').map((line, index) => (
            <Text style={styles.text} key={index}>
              {line}
            </Text>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
    width: 300,
    elevation: 5,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,

    // Shadow (iOS + Android)
    shadowColor: '#22C55E',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 10,
  },
  text: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
    textAlign: 'center',
  },
});
