import React, { Component } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, TouchableHighlight } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import { Player, CellState, getWinner } from './game';
// import Sound from 'react-native-sound';

import logo from './assets/connect4-logo.png';

const rowsCount = 6,
      colsCount = 7,
      player1Color = 'red',
      player2Color = 'yellow';


type GameFieldState = {
  field: CellState[][],
  currentPlayer: Player,
  winner: Player,
};

type CellProps = {
  row: number,
  col: number,
  value: CellState,
  onPress: CellPress,
}

interface CellPress {
  (col: number): void,
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
  resetButton: {
    marginTop: 20,
    backgroundColor: "black",
    padding: 16,
    borderRadius: 5,
  },
  resetButtonText: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },
  gameOverText: {
    fontSize: 30,
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
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
    margin: 2,
  },
  emptyCell: {
    backgroundColor: 'white',
  },
  player1Cell: {
    backgroundColor: player1Color,
  },
  player2Cell: {
    backgroundColor: player2Color,
  },
  gameOver: {
    alignItems: 'center',
  },
});

function getCellStyle(cellState : CellState) {
  switch(cellState) {
    case CellState.Empty:
      return styles.emptyCell;

    case CellState.Player1:
      return styles.player1Cell;

    case CellState.Player2:
      return styles.player2Cell;
  }
}


class Cell extends Component<CellProps> {
  render() {
    let currentStyle = getCellStyle(this.props.value);

    return (
      <TouchableHighlight onPress={() => this.props.onPress(this.props.col)}>
        <View style={[styles.cell, currentStyle]} />
      </TouchableHighlight>
    );
  }
}

class GameField extends Component<{}, GameFieldState> {
  makeAIMove() {
    let col = Math.floor(Math.random() * colsCount);
    this.dropChip(col);
  }

  dropChip = (col : number) => {
    if (this.state.winner) {
      return;
    }

    let value: CellState = null;

    if (this.state.currentPlayer == Player.Player1) {
      value = CellState.Player1;
    } else {
      value = CellState.Player2;
    }

    let row = null;

    for (let i=rowsCount-1; i >= 0; i--) {
      if (this.state.field[i][col] == CellState.Empty) {
        row = i;
        break;
      }
    }

    if (row != null) {
      this.state.field[row][col] = value;

      let newState = {
        field: this.state.field,
      };

      if (this.state.currentPlayer == Player.Player1) {
        newState['currentPlayer'] = Player.Player2;
      } else {
        newState['currentPlayer'] = Player.Player1;
      }

      newState['winner'] = getWinner(this.state.field);

      this.setState(newState);
    }
  }

  resetField = () => {
    for (let i=0; i < rowsCount; i++) {
      let row = [];
      for (let j=0; j < colsCount; j++) {
        row.push(CellState.Empty);
      }
      this.state.field[i] = row;
    }
    this.setState({
      field: this.state.field,
      winner: null,
    })
  }

  constructor(props) {
    super(props);
    this.state = {
      field: [[]],
      currentPlayer: Player.Player1,
      winner: null,
    };
    this.resetField();
  }

  render() {
    if (this.state.currentPlayer == Player.Player2) {
      this.makeAIMove();
    }

    let rows = [];

    for (let i=0; i < rowsCount; i++) {
      let cells = [];

      for (let j=0; j < colsCount; j++) {
        cells.push(<Cell key={j}
                         row={i}
                         col={j}
                         value={this.state.field[i][j]}
                         onPress={this.dropChip} />);
      }

      rows.push(<View style={styles.row} key={i}>{cells}</View>);
    }

    return (
      <View>
        <TouchableOpacity onPress={this.resetField} style={styles.resetButton}>
          <Text style={styles.resetButtonText}>New Game</Text>
        </TouchableOpacity>

        <View style={styles.gameField}>{rows}</View>

        {this.state.winner && <GameOver winner={this.state.winner} />}
      </View>
    );
  }
}

class GameOver extends Component {
  render() {
    return (
      <View style={styles.gameOver}>
         <Text style={styles.gameOverText}>Game Over</Text>
         <Text style={styles.gameOverText}>Winner: </Text>
         <View style={[styles.cell, getCellStyle(this.props.winner)]} />
      </View>
    );
  }
}

function Logo() {
  return (
    <Image source={logo} style={styles.logo} />
  );
}

class App extends Component {
  constructor(props) {
    super(props);
    // Sound.setCategory('Playback');
  }

  render() {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Logo />
            <GameField />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    );
  }
}

export default App;
