import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import { NativeRouter } from 'react-router-native';

const App = () => {
  return (
    <>
      <NativeRouter>
        <Main />

        <StatusBar style="auto" />
      </NativeRouter>
    </>
  );
};

export default App;
