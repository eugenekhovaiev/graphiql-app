import { render, screen, waitFor } from '@testing-library/react';
import Documentation from '@/components/editorPageComponents/Documentation';
import userEvent from '@testing-library/user-event';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('Documentation Component', () => {
  const mockSetSideMenuOpen = vi.fn();
  it('renders Documentation Component', () => {
    render(
      <Documentation
        isSideMenuOpen={false}
        setSideMenuOpen={mockSetSideMenuOpen}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
  it('renders Documentation Component with correct data', () => {
    render(
      <Documentation
        isSideMenuOpen={true}
        setSideMenuOpen={mockSetSideMenuOpen}
      />
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
  it('toggles the side menu when the button is clicked', async () => {
    let mockIsSideMenuOpen = false;
    const mockSetSideMenuOpen = vi.fn((value) => (mockIsSideMenuOpen = value));

    render(
      <Documentation
        isSideMenuOpen={mockIsSideMenuOpen}
        setSideMenuOpen={mockSetSideMenuOpen}
      />
    );
    const openDocsButton = screen.getByRole('button');
    await userEvent.click(openDocsButton);
    waitFor(() => {
      expect(openDocsButton.classList).toContain(
        'documentation__button_active'
      );
      expect(screen.getByTestId('divider')).toBeInTheDocument();
    });
    await userEvent.click(openDocsButton);
    waitFor(() => {
      expect(openDocsButton.classList).not.toContain(
        'documentation__button_active'
      );
      expect(screen.getByTestId('divider')).not.toBeInTheDocument();
    });
  });
});
