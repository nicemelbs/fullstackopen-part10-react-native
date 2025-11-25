import { Platform, Text, StyleSheet, View } from 'react-native';
// import RepositoryList from './RepositoryList';
import { Route, Routes, Navigate } from 'react-router-native';

import theme, { onedark } from './theme';
import AppBar from './AppBar';
import { colord } from 'colord';
import SignIn from './SignIn';
import RepositoryListContainer from './RepositoryListContainer';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: colord(onedark.colors.black).darken(0.05).toHex(),
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryListContainer />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
