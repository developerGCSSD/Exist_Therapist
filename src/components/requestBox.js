// components/RequestBox.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const RequestBox = ({ options, selected, onSelect }) => {
  return (
    <View>
      {options.map((item, index) => {
        const isSelected = selected === item.value;
        return (
          <TouchableOpacity
            key={item.value}
            onPress={() => onSelect(item.value)}
            style={[
              styles.optionContainer,
              isSelected && styles.selectedOption,
              index === 0 && { marginTop: 0 },
            ]}
          >
            <Ionicons
              name={isSelected ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={isSelected ? '#2563EB' : '#6B7280'} // Blue when selected, gray otherwise
              style={styles.radioIcon}
            />
            <Text
              style={[styles.optionText, isSelected && styles.selectedText]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RequestBox;

// styles can be defined inline or in a separate file
const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB', // neutral border
    borderRadius: 12,
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  selectedOption: {
    backgroundColor: '#EEF2FF',
    borderColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 4, // for Android
  },
  radioIcon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
    color: '#111827', // neutral
  },
  selectedText: {
    fontWeight: '500',
    color: '#2563EB',
  },
});
