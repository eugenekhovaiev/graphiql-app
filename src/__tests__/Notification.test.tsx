import { render, screen } from '@testing-library/react';
import Notification from '@/components/ui/Notification';

describe('Notification Component', () => {
  it('renders Notification with success message', () => {
    render(<Notification text="Success message" />);
    expect(screen.getByAltText('notification')).toBeInTheDocument();
    expect(screen.getByText('Success message')).toBeInTheDocument();
  });

  it('renders Notification with error message', () => {
    render(<Notification isError text="Error message" />);

    expect(screen.getByAltText('notification')).toBeInTheDocument();
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('renders Notification with link', () => {
    render(
      <Notification
        text="Message with link"
        hasLink
        linkHref="/some-link"
        linkTitle="Link Title"
      />
    );

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/some-link');
    expect(link).toHaveTextContent('link title');
  });
});
