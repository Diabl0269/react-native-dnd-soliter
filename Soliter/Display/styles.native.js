import { StyleSheet } from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

const tileSize = '15%'
const hovered = '10%'
const boardSize = '90%'

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
    width: wp(boardSize),
    height: wp(boardSize),
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
    width: wp(tileSize),
    height: wp(tileSize),
    backgroundColor: '#c4c6d4',
    justifyContent: 'center',
    alignItems: 'center'
  },
  hovered: {
    zIndex: 2,
    backgroundColor: '#ff0000',
    width: wp(hovered),
    height: wp(hovered),
    borderRadius: 10
  },
  piece: {
    borderRadius: 10,
    width: wp(tileSize),
    height: wp(tileSize),
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
