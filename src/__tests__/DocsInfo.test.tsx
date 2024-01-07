import { render, screen, waitFor } from '@testing-library/react';
import DocsInfo from '@/components/editorPageComponents/Documentation/DocsInfo';
import LOCAL_STORAGE_VALUES from '@/consts/LOCAL_STORAGE_VALUES';
import GQL_SCHEMA from '@/consts/GQL_SCHEMA';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

const { mockGetSchemaTypes } = vi.hoisted(() => {
  return {
    mockGetSchemaTypes: vi.fn().mockResolvedValue([
      { name: 'Root', fields: [] },
      { name: 'Query', fields: [] },
    ]),
  };
});

vi.mock('@/api/GQL/getSchemaTypes', () => {
  return { default: mockGetSchemaTypes };
});

describe('DocsInfo Component', () => {
  it('renders DocsInfo with correct data', async () => {
    const localStorageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key === LOCAL_STORAGE_VALUES.ENDPOINT) {
          return '/endpoint';
        } else {
          return null;
        }
      });
    render(<DocsInfo isOpen={true} />);

    waitFor(() => {
      expect(localStorageSpy).toHaveBeenCalledWith(
        LOCAL_STORAGE_VALUES.ENDPOINT
      );
      expect(screen.getByText('All Types')).toBeInTheDocument();
      expect(screen.getByText('Root')).toBeInTheDocument();
      expect(screen.getByText('Query')).toBeInTheDocument();
    });
  });
  it('renders DocsInfo when types are not specified', async () => {
    mockGetSchemaTypes.mockResolvedValue(null);
    const localStorageSpy = vi
      .spyOn(Storage.prototype, 'getItem')
      .mockImplementation((key: string) => {
        if (key === LOCAL_STORAGE_VALUES.ENDPOINT) {
          return '/endpoint';
        } else {
          return null;
        }
      });
    render(<DocsInfo isOpen={true} />);
    waitFor(() => {
      expect(localStorageSpy).toHaveBeenCalledWith(
        LOCAL_STORAGE_VALUES.ENDPOINT
      );
      expect(screen.getByRole('heading', { name: GQL_SCHEMA.WRONG_URL_TITLE }));
    });
  });
});
