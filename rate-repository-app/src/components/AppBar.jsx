import { View, StyleSheet, Pressable } from 'react-native'
import Text from './Text'
import theme from './theme'

const styles = StyleSheet.create({
  container: {
    ...theme.appBar.container,
    display: 'flex',
    alignItems: 'flex-start',
    flexDirection: 'row',
    columnGap: 10,
  },
  tab: {
    ...theme.appBar.tab,
    marginVertical: 15,
    paddingLeft: 10,
  },

  linkText: {
    fontSize: 20,
    fontWeight: theme.fontWeights.bold,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab}>
        <View>
          <Text style={styles.linkText}>Repositories</Text>
        </View>
      </Pressable>
      <Pressable style={styles.tab}>
        <View>
          <Text style={styles.linkText}>Ratings</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default AppBar
