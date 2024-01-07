import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '@/components/Header';
import LINKS from '@/consts/LINKS';

const { mockRouterPush } = vi.hoisted(() => {
  return {
    mockRouterPush: vi.fn(),
  };
});

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: mockRouterPush,
    })),
  };
});

describe('Header Component', () => {
  it('renders Header correctly with default state', () => {
    render(<Header />);
    expect(
      screen.getByRole('link', { name: 'GraphiQl Editor' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About Us' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'EN' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeInTheDocument();
  });

  it('handles burger menu open and close', async () => {
    render(<Header />);
    const burgerElement = screen.getByTestId('burger-menu');
    const overlayElement = screen.getByTestId('overlay');

    expect(burgerElement).toBeInTheDocument();
    await userEvent.click(burgerElement);
    waitFor(() =>
      expect(overlayElement.classList).contain('header__overlay_active')
    );
    await userEvent.click(overlayElement);
    waitFor(() =>
      expect(overlayElement.classList).not.contain('header__overlay_active')
    );
  });

  it('handles redirect to Login and SignUp page', async () => {
    render(<Header />);
    const loginButton = screen.getByRole('button', { name: 'Log In' });
    const signUpButton = screen.getByRole('button', { name: 'Sign Up' });
    const burgerElement = screen.getByTestId('burger-menu');
    await userEvent.click(burgerElement);
    await userEvent.click(loginButton);
    waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(LINKS.LOGIN);
      expect(screen.getByTestId('overlay').classList).not.contain(
        'header__overlay_active'
      );
    });
    await userEvent.click(signUpButton);
    waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith(LINKS.SIGNUP);
      expect(screen.getByTestId('overlay').classList).not.contain(
        'header__overlay_active'
      );
    });
  });
});
