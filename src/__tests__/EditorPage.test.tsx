import { render, screen } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import Editor from '@/pages/editor';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(() => ({
      style: {
        fontFamily: 'inconsolata',
      },
    })),
  };
});

vi.mock('next/router', async () => {
  const actual = await vi.importActual('next/router');
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
    })),
  };
});

describe('Editor Page', () => {
  it('renders Editor Page', () => {
    render(
      <RootLayout>
        <Editor />
      </RootLayout>
    );
    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
  });
});
