import '@testing-library/jest-native/extend-expect';
import 'react-native-gesture-handler/jestSetup';
import '@testing-library/jest-dom';
import '@testing-library/react-native';

//suppress React v7 warnings
const originalWarn = console.warn;

beforeAll(() => {
  console.warn = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('React Router Future Flag Warning')
    ) {
      return;
    }
    originalWarn(...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
});
