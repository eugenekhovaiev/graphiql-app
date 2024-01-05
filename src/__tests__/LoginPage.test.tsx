import { render, screen } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import LogIn from '@/pages/login/';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      // get: vi.fn(),
    })),
    usePathname: vi.fn(),
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
