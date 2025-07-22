/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

export default function SecondaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  width = '100%',
}) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        {
          width,
          opacity: isDisabled ? 0.6 : 1,
          backgroundColor: '#FFFFFF',
          borderColor: '#D7D7D7',
          borderWidth: 1,
        },
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#121217" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#121217',
    fontWeight: '600',
    fontSize: 16,
  },
});
