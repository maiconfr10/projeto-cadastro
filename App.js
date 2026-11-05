import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import Home from './src/pages/Home';
import { cores } from './src/styles/cores';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={cores.fundo} />
      <Home />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: cores.fundo },
});
