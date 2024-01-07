import { render, screen } from '@testing-library/react';
import DocsDetails from '@/components/editorPageComponents/Documentation/DocsDetails';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('DocsDetails Component', () => {
  it('renders DocsDetails Component', () => {
    render(
      <DocsDetails name="Title" description="Details" type={{ name: null }} />
    );
    expect(screen.getByRole('heading')).toHaveTextContent('Title');
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Type:')).toBeInTheDocument();
  });
});
