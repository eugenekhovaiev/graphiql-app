import { render, screen } from '@testing-library/react';
import DocsError from '@/components/editorPageComponents/Documentation/DocsError';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('DocsError Component', () => {
  it('renders DocsError Component', () => {
    render(<DocsError title="Error" message="Message" />);
    expect(screen.getByRole('heading')).toHaveTextContent('Error');
    expect(screen.getByText('Message')).toBeInTheDocument();
  });
});
