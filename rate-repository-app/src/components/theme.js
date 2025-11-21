import Constants from 'expo-constants'
import { colord } from 'colord'
export const onedark = {
  colors: {
    white: '#abb2bf',
    black: '#282c34',
    red: '#e06c75',
    green: '#98c379',
    yellow: '#e5c07b',
    blue: '#61afef',
    purple: '#c678dd',
    cyan: '#56b6c2',
  },
}
const theme = {
  colors: {
    textPrimary: onedark.colors.black,
    textSecondary: colord(onedark.colors.black).lighten(0.2).toHex(),
    primary: onedark.colors.blue,
  },

  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },

  appBar: {
    container: {
      backgroundColor: onedark.colors.black,
      paddingTop: Constants.statusBarHeight,
    },

    tab: {
      color: onedark.colors.green,
    },
  },
}

export default theme
