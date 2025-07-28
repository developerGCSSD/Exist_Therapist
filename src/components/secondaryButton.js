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
  height = 50, // ✅ default height
  fontSize = 16, // ✅ default font size
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
          height,
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
        <Text style={[styles.text, { fontSize }]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#121217',
    fontWeight: '600',
  },
});
