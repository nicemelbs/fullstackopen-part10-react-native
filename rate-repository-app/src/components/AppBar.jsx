import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Text from './Text';
import theme from './theme';
import { Link } from 'react-router-native';

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
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Pressable style={styles.tab}>
          <Link to="/">
            <View>
              <Text style={styles.linkText}>Repositories</Text>
            </View>
          </Link>
        </Pressable>
        <Pressable style={styles.tab}>
          <Link to="/signin">
            <View>
              <Text style={styles.linkText}>Sign in</Text>
            </View>
          </Link>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AppBar;
