import { render, screen, waitFor } from '@testing-library/react';
import DocsTypeCategories from '@/components/editorPageComponents/Documentation/DocsTypeCategories/DocsTypeCategories';
import { GQLType, GQLField } from '@/types';
import userEvent from '@testing-library/user-event';

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
const mockRootFields: GQLField[] = [
  {
    name: 'Root Type',
    description: 'Root Type Description',
    type: {
      name: 'Type',
    },
  },
];
const mockQueryFields: GQLField[] = [
  {
    name: 'Query Type',
    description: 'Query Type Description',
    type: {
      name: 'Type',
    },
  },
];

describe('DocsTypeCategories Component', () => {
  it('renders DocsTypeCategories with correct data', () => {
    const mockEditLists = vi.fn();

    render(
      <DocsTypeCategories
        allTypes={mockAllTypes}
        rootFields={mockRootFields}
        queryFields={mockQueryFields}
        editLists={mockEditLists}
      />
    );

    expect(screen.getByRole('heading')).toHaveTextContent('Docs');
    expect(screen.getByText('All Types')).toBeInTheDocument();
    expect(screen.getByText('Root')).toBeInTheDocument();
    expect(screen.getByText('Query')).toBeInTheDocument();
  });

  it('checks if editLists is called with correct arguments', async () => {
    const mockEditLists = vi.fn();

    render(
      <DocsTypeCategories
        allTypes={mockAllTypes}
        rootFields={mockRootFields}
        queryFields={mockQueryFields}
        editLists={mockEditLists}
      />
    );

    await userEvent.click(screen.getByText('All Types'));
    waitFor(() => expect(mockEditLists).toHaveBeenCalledWith(mockAllTypes));
    await userEvent.click(screen.getByText('Root'));
    waitFor(() => expect(mockEditLists).toHaveBeenCalledWith(mockRootFields));
    await userEvent.click(screen.getByText('Query'));
    waitFor(() => expect(mockEditLists).toHaveBeenCalledWith(mockQueryFields));
  });
});
