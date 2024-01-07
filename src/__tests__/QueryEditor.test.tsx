import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QueryEditor from '@/components/editorPageComponents/QueryEditor';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(() => ({
      style: {
        fontFamily: 'inconsolata',
      },
    })),
  };
});

describe('QueryEditor Component', () => {
  it('renders QueryEditor component correctly', () => {
    render(<QueryEditor />);
    expect(screen.getByTestId('run-button')).toBeInTheDocument();
    expect(screen.getByTestId('prettify-button')).toBeInTheDocument();
  });
  it('handles prettify call', async () => {
    render(<QueryEditor />);
    await userEvent.click(screen.getByTestId('prettify-button'));
    expect(screen.getByTestId('prettify-button')).toBeInTheDocument();
  });
});
