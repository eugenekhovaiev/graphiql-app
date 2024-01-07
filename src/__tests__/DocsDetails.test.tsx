import { render, screen } from '@testing-library/react';
import DocsDetails from '@/components/editorPageComponents/Documentation/DocsDetails';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('DocsDetails Component', () => {
  it('renders DocsDetails Component', () => {
    const mockType = { name: 'Int' };

    render(<DocsDetails name="Title" description="Details" type={mockType} />);
    expect(screen.getByRole('heading')).toHaveTextContent('Title');
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText(`Type: ${mockType.name}`)).toBeInTheDocument();
  });
});
