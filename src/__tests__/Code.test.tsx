import { render, screen, waitFor } from '@testing-library/react';
import Code from '@/components/editorPageComponents/Code';
import userEvent from '@testing-library/user-event';
import TAB from '@/consts/TAB';
vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(() => ({
      style: {
        fontFamily: 'inconsolata',
      },
    })),
  };
});

describe('Code Component', () => {
  it('renders Code component correctly', () => {
    render(<Code />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('handles code changes correctly', async () => {
    render(<Code />);
    const editorElement = screen.getByRole('textbox');
    if (editorElement instanceof HTMLTextAreaElement) {
      await userEvent.type(editorElement, '{value}');
      waitFor(() => expect(editorElement.value).toBe('{value}'));
    }
  });

  it('handles keyboard events correctly', async () => {
    render(<Code value="" />);
    const editorElement = screen.getByRole('textbox');
    if (editorElement instanceof HTMLTextAreaElement) {
      await userEvent.type(editorElement, '{tab}');
      waitFor(() => expect(editorElement.value).toBe(`${TAB}`));
      await userEvent.type(editorElement, '{\\{}');
      waitFor(() => expect(editorElement.value).toBe('{}'));
      await userEvent.type(editorElement, '{\\(}');
      waitFor(() => expect(editorElement.value).toBe('()'));
      await userEvent.type(editorElement, '{\\[}');
      waitFor(() => expect(editorElement.value).toBe('[]'));
    }
  });
});
