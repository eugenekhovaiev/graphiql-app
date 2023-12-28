import { render, screen } from '@testing-library/react';
import RootLayout from '@/components/RootLayout';
import NotFound from '@/pages/404/';

describe('404 Page', () => {
  it('renders 404 page content', () => {
    render(
      <RootLayout>
        <NotFound />
      </RootLayout>
    );

    const titleElement = screen.getByRole('heading', {
      name: /404/i,
    });
    const subtitleElement = screen.getByRole('heading', {
      name: /Page couldn’t be found/i,
    });
    const homeLink = screen.getByRole('link', { name: /Take me Home/i });

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});