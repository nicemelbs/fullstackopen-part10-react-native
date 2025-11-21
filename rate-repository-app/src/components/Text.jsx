import { Text as NativeText, StyleSheet } from 'react-native'

import theme, { onedark } from './theme'

const styles = StyleSheet.create({
  text: {
    // color: theme.colors.textPrimary,
    color: onedark.colors.white,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextScondary: {
    // color: theme.colors.textSecondary,
    color: onedark.colors.yellow,
  },
  colorPrimary: {
    // color: theme.colors.primary,
    color: onedark.colors.blue,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
})

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextScondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ]

  return <NativeText style={textStyle} {...props} />
}

export default Text
