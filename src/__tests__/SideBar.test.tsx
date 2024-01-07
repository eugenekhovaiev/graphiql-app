import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SideBar from '@/components/editorPageComponents/QueryEditor/SideBar';

vi.mock('next/font/google', async () => {
  return {
    Inconsolata: vi.fn(() => ({
      style: {
        fontFamily: 'inconsolata',
      },
    })),
  };
});

const mockCode = '{code}';
const mockSetCode = vi.fn();
const mockGQLRequest = 'request';
const mockSetGQLRequest = vi.fn();

describe('SideBar Component', () => {
  it('renders SideBar component correctly', () => {
    render(
      <SideBar
        code={mockCode}
        setCode={mockSetCode}
        GQLRequest={mockGQLRequest}
        setGQLRequest={mockSetGQLRequest}
      />
    );
    expect(screen.getByTestId('run-button')).toBeInTheDocument();
    expect(screen.getByTestId('prettify-button')).toBeInTheDocument();
  });
  it('handles prettify call', async () => {
    render(
      <SideBar
        code={mockCode}
        setCode={mockSetCode}
        GQLRequest={mockGQLRequest}
        setGQLRequest={mockSetGQLRequest}
      />
    );
    await userEvent.click(screen.getByTestId('prettify-button'));
    expect(screen.getByTestId('prettify-button')).toBeInTheDocument();
  });

  it('handles run call when code !== GQLResponse', async () => {
    render(
      <SideBar
        code={mockCode}
        setCode={mockSetCode}
        GQLRequest={mockGQLRequest}
        setGQLRequest={mockSetGQLRequest}
      />
    );
    await userEvent.click(screen.getByTestId('run-button'));
    expect(screen.getByTestId('run-button')).toBeInTheDocument();
  });

  it('handles run call when code === GQLResponse', async () => {
    const mockCode = 'request';
    const mockGQLRequest = 'request';

    render(
      <SideBar
        code={mockCode}
        setCode={mockSetCode}
        GQLRequest={mockGQLRequest}
        setGQLRequest={mockSetGQLRequest}
      />
    );
    await userEvent.click(screen.getByTestId('run-button'));
    expect(screen.getByTestId('run-button')).toBeInTheDocument();
    waitFor(() =>
      expect(screen.getByAltText('notification')).toBeInTheDocument()
    );
  });
});
