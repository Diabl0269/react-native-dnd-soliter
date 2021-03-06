import { StyleSheet } from 'react-native'
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp
// } from 'react-native-responsive-screen'

const { innerWidth } = window

const wp = (num) => {
  const res = innerWidth % num
  return `${res}px`
}

const tileSize = 15
const hovered = 10
const boardSize = 90

export default StyleSheet.create({
  displayContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  gameContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '80%',
    backgroundColor: '#b34a30'
  },
  boardContainer: {
    width: '40%',
    height: '90%',
    backgroundColor: '#525456',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  tileContainer: {
    margin: 5,
    borderRadius: 10,
    width: '90px',
    height: '90px',
    backgroundColor: '#c4c6d4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hovered: {
    zIndex: 2,
    backgroundColor: '#ff0000',
    width: '80px',
    height: '80px',
    borderRadius: 10
  },
  piece: {
    borderRadius: 10,
    width: '90px',
    height: '90px',
    backgroundColor: '#5c6ff1',
    zIndex: 1000,
    elevation: 300
  },
  arsenalContainer: {
    height: '20%',
    width: '100%',
    backgroundColor: '#3f662d',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    textAlign: 'center'
  }
})
