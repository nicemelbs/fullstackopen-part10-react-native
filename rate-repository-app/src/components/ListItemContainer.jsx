import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { onedark } from './theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: onedark.colors.black,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'column',
    rowGap: 10,
  },
});

const ListItemContainer = (props) => {
  return <View style={styles.container} {...props} />;
};

export default ListItemContainer;
