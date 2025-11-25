import {
  fireEvent,
  screen,
  render,
  waitFor,
} from '@testing-library/react-native';
import SignInForm from '../../components/SignIn/SignInForm';

describe('SignIn', () => {
  it('calls onSubmit once with correct arguments passed', async () => {
    const onSubmit = jest.fn();
    const initialValues = {
      username: '',
      password: '',
    };
    render(<SignInForm initialValues={initialValues} onSubmit={onSubmit} />);

    fireEvent.changeText(
      screen.getByPlaceholderText('username'),
      'leeroyjenkins'
    );
    fireEvent.changeText(screen.getByPlaceholderText('password'), 'password');
    await waitFor(() => {
      fireEvent.press(screen.getByText('Submit'));
    });

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toEqual({
      username: 'leeroyjenkins',
      password: 'password',
    });
  });
});
