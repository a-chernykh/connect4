import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';

import logo from './assets/connect4-logo.png';

const rowsCount : number = 6,
      colsCount : number = 7;

function Cell() {
  return (
    <View style={styles.cell} />
  );
}

function Row() {
  let cells = [];
  for (let i=0; i < colsCount; i++) {
    cells.push(<Cell key={i} />);
  }
  return (
    <View style={styles.row}>
      {cells}
    </View>
  );
}

function GameField() {
  let rows = [];
  for (let i=0; i < rowsCount; i++) {
    rows.push(<Row key={i} />);
  }

  return (
    <View style={styles.gameField}>
      {rows}
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

          <TouchableOpacity onPress={() => alert('Hello, world!')} style={styles.button}>
            <Text style={styles.buttonText}>Restart</Text>
          </TouchableOpacity>

          <GameField />
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
  button: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 16,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  gameField: {
    backgroundColor: 'black',
    marginTop: 20,
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'grey',
    backgroundColor: 'white',
    margin: 2,
  },
});
