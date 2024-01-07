import { render, screen, waitFor } from '@testing-library/react';
import DocsList from '@/components/editorPageComponents/Documentation/DocsList';
import { GQLType, GQLField } from '@/types';
import userEvent from '@testing-library/user-event';
import GQL_SCHEMA from '@/consts/GQL_SCHEMA';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(),
  };
});

describe('DocsList Component', () => {
  it('renders DocsList with correct data(list: GQLType[])', async () => {
    const mockSetCurrentItem = vi.fn();
    const mockSetCurrentList = vi.fn();
    const mockSetPrevList = vi.fn();

    const mockList: GQLType[] = [
      {
        name: 'Type_1',
        fields: [
          {
            name: 'Item',
            description: 'Description',
            type: {
              name: 'Type',
            },
          },
        ],
      },
      {
        name: 'Type_2',
      },
    ];

    const mockCurrentList: GQLType[] = [
      {
        name: 'Current_Type_1',
      },
      {
        name: 'Current_Type_2',
        fields: [],
      },
    ];

    render(
      <DocsList
        list={mockList}
        setCurrentItem={mockSetCurrentItem}
        setCurrentList={mockSetCurrentList}
        setPrevList={mockSetPrevList}
        currentList={mockCurrentList}
      />
    );
    expect(screen.getByText(mockList[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockList[1].name)).toBeInTheDocument();

    await userEvent.click(screen.getByText(mockList[0].name));
    waitFor(() =>
      expect(mockSetCurrentList).toHaveBeenCalledWith(mockList[0].fields)
    );
    await userEvent.click(screen.getByText(mockList[1].name));
    waitFor(() => expect(mockSetCurrentList).toHaveBeenCalledWith([]));
  });

  it('renders DocsList with correct data(list: GQLField[])', async () => {
    const mockSetCurrentItem = vi.fn();
    const mockSetCurrentList = vi.fn();
    const mockSetPrevList = vi.fn();
    const mockList: GQLField[] = [
      {
        name: 'Type_1',
        description: 'Description',
        type: { name: null },
      },
      {
        name: 'Type_2',
        description: 'Description',
        type: { name: null },
      },
    ];

    const mockCurrentList: GQLType[] = [
      {
        name: 'Current_Type_1',
        fields: [],
      },
      {
        name: 'Current_Type_2',
        fields: [],
      },
    ];

    render(
      <DocsList
        list={mockList}
        setCurrentItem={mockSetCurrentItem}
        setCurrentList={mockSetCurrentList}
        setPrevList={mockSetPrevList}
        currentList={mockCurrentList}
      />
    );
    expect(screen.getByText(mockList[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockList[1].name)).toBeInTheDocument();

    await userEvent.click(screen.getByText(mockList[0].name));
    waitFor(() => expect(mockSetCurrentItem).toHaveBeenCalledWith(mockList[0]));
  });

  it('renders DocsList with empty list', async () => {
    const mockSetCurrentItem = vi.fn();
    const mockSetCurrentList = vi.fn();
    const mockSetPrevList = vi.fn();
    const mockList: GQLType[] = [];

    const mockCurrentList: GQLType[] = [
      {
        name: 'Current_Type_1',
        fields: [],
      },
      {
        name: 'Current_Type_2',
        fields: [],
      },
    ];

    render(
      <DocsList
        list={mockList}
        setCurrentItem={mockSetCurrentItem}
        setCurrentList={mockSetCurrentList}
        setPrevList={mockSetPrevList}
        currentList={mockCurrentList}
      />
    );
    expect(
      screen.getByText(GQL_SCHEMA.NO_FIELDS_TITLE.trim())
    ).toBeInTheDocument();
    expect(
      screen.getByText(GQL_SCHEMA.NO_FIELDS_MESSAGE.trim())
    ).toBeInTheDocument();
  });
});
