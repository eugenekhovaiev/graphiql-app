import { render, screen, waitFor } from '@testing-library/react';
import ArrowBack from '@/components/ui/ArrowBack';
import { GQLField } from '@/types';
import userEvent from '@testing-library/user-event';

const mockSetCurrentList = vi.fn();
const mockSetCurrentItem = vi.fn();

describe('ArrowBack Component', () => {
  const mockPrevList: GQLField[] = [
    {
      name: 'Root Type',
      description: 'Root Type Description',
      type: {
        name: 'Type',
      },
    },
  ];
  it('renders ArrowBack Component with correct data', () => {
    render(
      <ArrowBack
        setCurrentList={mockSetCurrentList}
        setCurrentItem={mockSetCurrentItem}
        currentItem={{
          name: 'exampleField',
          description: 'example',
          type: { name: 'String' },
        }}
        prevList={mockPrevList}
      />
    );
    const arrowBackIcon = screen.getByAltText('Arrow back');
    expect(arrowBackIcon).toBeInTheDocument();
  });

  it('handles click event when currenItem is not null', async () => {
    render(
      <ArrowBack
        setCurrentList={mockSetCurrentList}
        setCurrentItem={mockSetCurrentItem}
        currentItem={{
          name: 'exampleField',
          description: 'example',
          type: { name: 'String' },
        }}
        prevList={mockPrevList}
      />
    );
    const arrowBackIcon = screen.getByAltText('Arrow back');
    const containerElement = arrowBackIcon.parentElement;
    if (containerElement) {
      await userEvent.click(containerElement);
      waitFor(() => {
        expect(mockSetCurrentItem).toHaveBeenCalledWith(null);
        expect(mockSetCurrentList).not.toHaveBeenCalled();
      });
    }
  });

  it('handles click event when currenItem is null', async () => {
    render(
      <ArrowBack
        setCurrentList={mockSetCurrentList}
        setCurrentItem={mockSetCurrentItem}
        currentItem={null}
        prevList={mockPrevList}
      />
    );
    const arrowBackIcon = screen.getByAltText('Arrow back');
    const containerElement = arrowBackIcon.parentElement;
    if (containerElement) {
      await userEvent.click(containerElement);
      waitFor(() => {
        expect(mockSetCurrentItem).not.toHaveBeenCalled();
        expect(mockSetCurrentList).toHaveBeenCalledWith(mockPrevList);
      });
    }
  });

  it('handles click event when currenItem is null and prevList is null', async () => {
    render(
      <ArrowBack
        setCurrentList={mockSetCurrentList}
        setCurrentItem={mockSetCurrentItem}
        currentItem={null}
        prevList={null}
      />
    );
    const arrowBackIcon = screen.getByAltText('Arrow back');
    const containerElement = arrowBackIcon.parentElement;
    if (containerElement) {
      await userEvent.click(containerElement);
      waitFor(() => {
        expect(mockSetCurrentItem).not.toHaveBeenCalled();
        expect(mockSetCurrentList).toHaveBeenCalledWith(null);
      });
    }
  });
});
