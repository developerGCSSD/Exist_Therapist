import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ControlTabs({ tabs, selectedIndex, onTabPress }) {
  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = selectedIndex === index;
        return (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, isActive && styles.activeTab]}
            onPress={() => onTabPress(index)}
          >
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
              {tab}
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
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#3463E9',
  },
  tabText: {
    fontSize: 16,
    color: '#6C6C89',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '500',
  },
});
