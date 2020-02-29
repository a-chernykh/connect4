import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

import logo from './assets/connect4-logo.png';

function Cell() {
}

function Row() {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      {cells}
    </View>
  );
}

function Board() {
  return (
    <View>
    </View>
  );
}

function Logo() {
  return (
    <Image source={logo} style={styles.logo} />
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Logo />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  logo: {
    width: 305,
    height: 96,
  },
});
