import { render, screen } from '@testing-library/react';
import LinkElement from '@/components/ui/LinkElement';

describe('LinkElement component', () => {
  it('renders the LinkElement with necessary props', () => {
    render(
      <LinkElement title="Go to Example" href="/example" styleType="light" />
    );
    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveTextContent('Go to Example');
  });
});
