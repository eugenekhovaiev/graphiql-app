import { render, screen, waitFor } from '@testing-library/react';
import EndpointInput from '@/components/editorPageComponents/EndpointInput';
import userEvent from '@testing-library/user-event';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(() => ({
      style: {
        fontFamily: 'inconsolata',
      },
    })),
  };
});

const mockEndpoint = 'endpoint';
const mockSetEndpoint = vi.fn();
const mocksetSideMenuOpen = vi.fn();

describe('EndpointInput Component', () => {
  it('renders EndpointInput component correctly', () => {
    render(
      <EndpointInput
        endpoint={mockEndpoint}
        setEndpoint={mockSetEndpoint}
        setSideMenuOpen={mocksetSideMenuOpen}
      />
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Change' })).toBeInTheDocument();
  });
  it('handles input change', async () => {
    const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(
      <EndpointInput
        endpoint={mockEndpoint}
        setEndpoint={mockSetEndpoint}
        setSideMenuOpen={mocksetSideMenuOpen}
      />
    );
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, '/endpoint');
    await userEvent.click(screen.getByRole('button', { name: 'Change' }));
    waitFor(() => {
      if (inputElement instanceof HTMLInputElement) {
        expect(inputElement.value).toBe('endpoint');
        expect(localStorageSpy).toHaveBeenCalledWith('/endpoint');
        expect(mockSetEndpoint).toHaveBeenCalledWith('/endpoint');
        expect(mocksetSideMenuOpen).toHaveBeenCalledWith(false);
      }
    });
  });
  it('handles input unchange', async () => {
    render(
      <EndpointInput
        endpoint={mockEndpoint}
        setEndpoint={mockSetEndpoint}
        setSideMenuOpen={mocksetSideMenuOpen}
      />
    );
    const inputElement = screen.getByRole('textbox');
    await userEvent.click(screen.getByRole('button', { name: 'Change' }));
    waitFor(() => {
      if (inputElement instanceof HTMLInputElement) {
        expect(inputElement.value).toBe('endpoint');
      }
      expect(screen.getByAltText('notification')).toBeInTheDocument();
    });
  });
});
