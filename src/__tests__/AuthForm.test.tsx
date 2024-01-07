import { render, screen, waitFor } from '@testing-library/react';
import AuthForm from '@/components/AuthForm';
import userEvent from '@testing-library/user-event';
import ERROR_CODES from '@/consts/AUTH_ERROR_CODES';
import RESPONSE_STATUS from '@/consts/STATUS_CODES';
import { AuthFormData } from '@/types';
import NOTIFICATION from '@/consts/NOTIFICATION';

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
  };
});

const mockOnFormSubmit = vi.fn(async (data: AuthFormData) => {
  if (data.email === 'existing@example.com') {
    throw ERROR_CODES.USER_ALREADY_EXISTS;
  } else if (data.email === 'nonexistent@example.com') {
    throw ERROR_CODES.USER_DOESNT_EXIST;
  } else if (data.password === 'incorrectPassword123!') {
    throw ERROR_CODES.WRONG_PASSWORD;
  } else {
    return RESPONSE_STATUS.SUCCESS;
  }
});

describe('AuthForm Component', () => {
  it('renders Login form correctly', () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
  });

  it('renders Signup form correctly', () => {
    render(
      <AuthForm
        isSignUp
        onFormSubmit={mockOnFormSubmit}
        title="Sign up"
        subtitle="Already have an account? "
        linkTitle="Login"
        linkHref="/login"
      />
    );

    expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  });

  it('submits form with valid data', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123!');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() =>
      expect(mockOnFormSubmit).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123!',
      })
    );
  });

  it('handles form submissions for the scenario where login is successful', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(
      screen.getByLabelText('Password'),
      'correctPassword123!'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(screen.getByAltText('notification')).toBeInTheDocument();
      expect(
        screen.getByText(NOTIFICATION.en.LOGIN_SUCCESS.trim())
      ).toBeInTheDocument();
    });
  });

  it('handles form submissions for the scenario where signup is successful', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        isSignUp
        title="Sign Up"
        subtitle="Already a user?"
        linkTitle="Log In"
        linkHref="/login"
      />
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(
      screen.getByLabelText('Password'),
      'correctPassword123!'
    );
    await userEvent.type(
      screen.getByLabelText('Confirm Password'),
      'correctPassword123!'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(screen.getByAltText('notification')).toBeInTheDocument();
      expect(
        screen.getByText(NOTIFICATION.en.SIGNUP_SUCCESS.trim())
      ).toBeInTheDocument();
    });
  });

  it('handles form submissions for the scenario where a user does not exist', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );
    await userEvent.type(
      screen.getByLabelText('Email'),
      'nonexistent@example.com'
    );
    await userEvent.type(screen.getByLabelText('Password'), 'password123!');
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockOnFormSubmit).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
        password: 'password123!',
      });
      expect(screen.getByAltText('notification')).toBeInTheDocument();
      expect(
        screen.getByText(NOTIFICATION.en.USER_DOESNT_EXIST.trim())
      ).toBeInTheDocument();
    });
  });

  it('handles form submissions for the scenario where a user already exists', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        isSignUp
        title="Sign Up"
        subtitle="Already a user?"
        linkTitle="Log In"
        linkHref="/login"
      />
    );
    await userEvent.type(
      screen.getByLabelText('Email'),
      'existing@example.com'
    );
    await userEvent.type(screen.getByLabelText('Password'), 'password123!');
    await userEvent.type(
      screen.getByLabelText('Confirm Password'),
      'password123!'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(mockOnFormSubmit).toHaveBeenCalledWith({
        email: 'existing@example.com',
        password: 'password123!',
        confirmPassword: 'password123!',
      });
      expect(screen.getByAltText('notification')).toBeInTheDocument();
      expect(
        screen.getByText(NOTIFICATION.en.USER_ALREADY_EXISTS.trim())
      ).toBeInTheDocument();
    });
  });

  it('handles form submissions for the scenario where a password is wrong', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );
    await userEvent.type(
      screen.getByLabelText('Email'),
      'incorrect_password@example.com'
    );
    await userEvent.type(
      screen.getByLabelText('Password'),
      'incorrectPassword123!'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(mockOnFormSubmit).toHaveBeenCalledWith({
        email: 'incorrect_password@example.com',
        password: 'incorrectPassword123!',
      });
      expect(screen.getByAltText('notification')).toBeInTheDocument();
      expect(
        screen.getByText(NOTIFICATION.en.WRONG_PASSWORD.trim())
      ).toBeInTheDocument();
    });
  });

  it('handles password validation', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        title="Login"
        subtitle="Don't have an account? "
        linkTitle="Sign up"
        linkHref="/signup"
      />
    );

    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(
      screen.getByLabelText('Password'),
      'correctPassword123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Login' }));

    await waitFor(() => {
      expect(
        screen.getByText(
          'Password should include at least one special character'
        )
      ).toBeInTheDocument();
    });
  });

  it('handles cofirmation password validation', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        isSignUp
        title="Sign Up"
        subtitle="Already a user?"
        linkTitle="Log In"
        linkHref="/login"
      />
    );
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.type(screen.getByLabelText('Password'), 'password123!');
    await userEvent.type(
      screen.getByLabelText('Confirm Password'),
      'password123'
    );
    await userEvent.click(screen.getByRole('button', { name: 'Sign Up' }));

    await waitFor(() => {
      expect(
        screen.getByText('Make sure your passwords match')
      ).toBeInTheDocument();
    });
  });

  it('handles password visibility', async () => {
    render(
      <AuthForm
        onFormSubmit={mockOnFormSubmit}
        isSignUp
        title="Sign Up"
        subtitle="Already a user?"
        linkTitle="Log In"
        linkHref="/login"
      />
    );

    const iconPasswordElement = screen.getByLabelText('Password').nextSibling;
    const iconConfirmPasswordElement =
      screen.getByLabelText('Confirm Password').nextSibling;

    expect(iconPasswordElement).toBeInTheDocument();
    expect(iconConfirmPasswordElement).toBeInTheDocument();

    if (iconPasswordElement instanceof HTMLImageElement) {
      await userEvent.click(iconPasswordElement);
      await waitFor(() => {
        const inputPassword = screen.getByLabelText('Password');
        if (inputPassword instanceof HTMLInputElement) {
          expect(inputPassword.type).toBe('text');
        }
      });
    }
    if (iconConfirmPasswordElement instanceof HTMLImageElement) {
      await userEvent.click(iconConfirmPasswordElement);
      await waitFor(() => {
        const inputPassword = screen.getByLabelText('Confirm Password');
        if (inputPassword instanceof HTMLInputElement) {
          expect(inputPassword.type).toBe('text');
        }
      });
    }
  });
});
