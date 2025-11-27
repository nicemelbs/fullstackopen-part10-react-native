import { Platform, Text, StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';

import { onedark } from './theme';
import AppBar from './AppBar';
import { colord } from 'colord';
import SignIn from './SignIn';
import RepositoryList from './RepositoryList';
import SingleRepositoryItem from './SingleRepositoryItem';
import SignUp from './SignUp';
import Review from './Review';

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
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/review" element={<Review />} />
        <Route path="/:id" element={<SingleRepositoryItem />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
