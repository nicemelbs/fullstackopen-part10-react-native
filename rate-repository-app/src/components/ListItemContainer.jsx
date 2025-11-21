import { StyleSheet, View } from 'react-native'
import theme, { onedark } from './theme'

const styles = StyleSheet.create({
  // backgroundColor: onedark.colors.black,
  marginLeft: 10,
})

const ListItemContainer = (props) => {
  return <View style={styles} {...props} />
}

export default ListItemContainer
