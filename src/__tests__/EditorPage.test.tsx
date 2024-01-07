import { render, screen, waitFor } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
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

const { mockfetchUserRequest } = vi.hoisted(() => {
  return {
    mockfetchUserRequest: vi.fn().mockResolvedValue('{value: Response}'),
  };
});

vi.mock('@/api/GQL/fetchUserRequest', () => {
  return { default: mockfetchUserRequest };
});

describe('Editor Page', () => {
  it('renders Editor Page', async () => {
    const localStorageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key === LOCAL_STORAGE_VALUES.ENDPOINT) {
          return '/endpoint';
        } else {
          return null;
        }
      });
    render(
      <RootLayout>
        <Editor />
      </RootLayout>
    );
    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
    waitFor(() => {
      expect(localStorageSpy).toHaveBeenCalledWith(
        LOCAL_STORAGE_VALUES.ENDPOINT
      );
    });
  });
});
