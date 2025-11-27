/**
 * OTR Milestone Tracker - Main App Component
 * 
 * Entry point for the React Native application
 */

import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.content}>
        <Text style={styles.title}>Our Time Recovered</Text>
        <Text style={styles.subtitle}>Milestone Tracker</Text>
        <Text style={styles.description}>
          App is ready for development
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 20,
    color: '#666666',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
  },
});

export default App;

