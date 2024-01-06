import { render, screen } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import SignUp from '@/pages/signup/';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

describe('SignUp Page', () => {
  it('renders SignUp Page', () => {
    render(
      <RootLayout>
        <SignUp />
      </RootLayout>
    );
    const titleElement = screen.getByRole('heading', {
      name: /Sign Up/i,
    });
    expect(titleElement).toBeInTheDocument();
  });
});
