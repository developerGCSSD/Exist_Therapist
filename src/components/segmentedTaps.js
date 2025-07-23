// components/SegmentedTabs.js

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SegmentedTabs({ tabs = [], selected, onSelect }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = selected === tab.value;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(tab.value)}
            style={[
              styles.tab,
              isActive ? styles.activeTab : styles.inactiveTab,
            ]}
          >
            <Text
              style={[
                styles.text,
                isActive ? styles.activeText : styles.inactiveText,
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    marginHorizontal: 6,
  },
  activeTab: {
    borderColor: '#3463E9',
    backgroundColor: '#fff',
  },
  inactiveTab: {
    borderColor: '#D1D1DB',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  activeText: {
    color: '#3463E9',
  },
  inactiveText: {
    color: '#6C6C89',
  },
});
