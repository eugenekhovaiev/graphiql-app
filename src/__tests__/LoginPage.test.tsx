import { render, screen } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import LogIn from '@/pages/login/';

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

describe('Login Page', () => {
  it('renders Login Page', () => {
    render(
      <RootLayout>
        <LogIn />
      </RootLayout>
    );
    const titleElement = screen.getByRole('heading', {
      name: /Log In/i,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
