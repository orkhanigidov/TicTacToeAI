import React, { Component } from 'react';
import './App.css';
import Result from './Result';
import Reset from './Reset';
import Tile from './Tile';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    }
  }

  tie(board) {
    var moves = board.join('').replace(/ /g, '');
    if (moves.length === 9) {
      return true;
    }
    return false;
  }

  winner(board, player) {
      if (
        (board[0] === player && board[1] === player && board[2] === player) ||
        (board[3] === player && board[4] === player && board[5] === player) ||
        (board[6] === player && board[7] === player && board[8] === player) ||
        (board[0] === player && board[3] === player && board[6] === player) ||
        (board[1] === player && board[4] === player && board[7] === player) ||
        (board[2] === player && board[5] === player && board[8] === player) ||
        (board[0] === player && board[4] === player && board[8] === player) ||
        (board[2] === player && board[4] === player && board[6] === player)
      ) {
        return true;
      }
    else {
      return false;
    }
  }

  copyBoard(board) {
    return board.slice(0);
  }

  validMove(move, player, board) {
    var newBoard = this.copyBoard(board);
    if (newBoard[move] === ' ') {
      newBoard[move] = player;
      return newBoard;
    }
    else {
      return null;
    }
  }

  findAiMove(board) {
    var bestMoveScore = 10;
    let move = null;
    if (this.winner(board, 'x') || this.winner(board, 'o')|| this.tie(board)) {
      return null;
    }
    for (var i = 0; i < board.length; i++) {
      let newBoard = this.validMove(i, this.state.minPlayer, board);
      if (newBoard) {
        var moveScore = this.maxScore(newBoard);
        if (moveScore < bestMoveScore) {
          bestMoveScore = moveScore;
          move = i;
        }
      }
    }
    return move;
  }

  minScore(board) {
    if (this.winner(board, 'x')) {
      return 1;
    }
    else if (this.winner(board, 'o')) {
      return -1;
    }
    else if (this.tie(board)) {
      return 0;
    }
    else {
      var bestMoveValue = 10;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.minPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.maxScore(newBoard);
          if (predictedMoveValue < bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  maxScore(board) {
    if (this.winner(board, 'x')) {
      return 1;
    }
    else if (this.winner(board, 'o')) {
      return -1;
    }
    else if (this.tie(board)) {
      return 0;
    }
    else {
      var bestMoveValue = -10;
      for (var i = 0; i < board.length; i++) {
        var newBoard = this.validMove(i, this.state.maxPlayer, board);
        if (newBoard) {
          var predictedMoveValue = this.minScore(newBoard);
          if (predictedMoveValue > bestMoveValue) {
            bestMoveValue = predictedMoveValue;
          }
        }
      }
      return bestMoveValue;
    }
  }

  gameLoop(move) {
    let player = this.state.turn;
    let currentGameBoard = this.validMove(move, player, this.state.gameBoard);
    if (this.winner(currentGameBoard, player)) {
      this.setState({
        // gameBoard: currentGameBoard,
        // winner: player
      });
      return;
    }
    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'draw'
      });
      return;
    }
    player = 'o';
    currentGameBoard = this.validMove(this.findAiMove(currentGameBoard), player, currentGameBoard);
    if (this.winner(currentGameBoard, player)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: player
      });
      return;
    }
    if (this.tie(currentGameBoard)) {
      this.setState({
        gameBoard: currentGameBoard,
        winner: 'draw'
      });
      return;
    }
    this.setState({
      gameBoard: currentGameBoard
    });
  }

  resetBoard() {
    this.setState({
      gameBoard: [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
      ],
      turn: 'x',
      winner: null,
      maxPlayer: 'x',
      minPlayer: 'o'
    })
  }

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe with AI</h1>
          {this.state.gameBoard.map(function(value, i) {
            return (
              <Tile
                key={i}
                loc={i}
                value={value}
                gameLoop={this.gameLoop.bind(this)}
                />
            );
          }.bind(this))}
        <Reset reset={this.resetBoard.bind(this)}/>
        <Result winner={this.state.winner}/>
      </div>
    );
  }
}

export default App;
