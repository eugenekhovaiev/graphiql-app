import { render, screen, waitFor } from '@testing-library/react';
import Documentation from '@/components/editorPageComponents/Documentation';
import userEvent from '@testing-library/user-event';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('Documentation Component', () => {
  it('renders Documentation Component', () => {
    render(<Documentation />);
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Docs');
  });

  it('toggles the side menu when the button is clicked', async () => {
    render(<Documentation />);
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
