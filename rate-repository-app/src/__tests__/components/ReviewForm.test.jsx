import { MemoryRouter } from 'react-router-native';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react-native';

import { Routes, Route } from 'react-router-native';
import Review from '../../components/Review';

describe('ReviewForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/review']}>
        <Routes>
          <Route path="/review" element={<Review />} />
        </Routes>
      </MemoryRouter>
    );
  });

  it('renders when going to /review route when logged in', () => {
    screen.debug();
  });
  it('redirects to home page when not logged in', () => {});

  it('shows all the fields', () => {});

  it('shows errors on incomplete data and does not call the submit handler', () => {});

  it('calls the submit handler method when given valid data', () => {});
});
