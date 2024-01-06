import { render, screen, waitFor } from '@testing-library/react';
import DocsInfo from '@/components/editorPageComponents/Documentation/DocsInfo';
import { GQLType } from '@/types';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

const mockAllTypes: GQLType[] = [
  {
    name: 'Type',
    fields: [],
  },
];

vi.doMock('@/api/GQL/getSchemaTypes', async () => {
  return mockAllTypes;
});

describe('DocsInfo Component', () => {
  it('renders DocsInfo with correct data', async () => {
    render(<DocsInfo isOpen={true} />);

    expect(screen.getByText('Docs')).toBeInTheDocument();

    waitFor(() => expect(screen.getByText('All Types')).toBeInTheDocument());
  });
});
