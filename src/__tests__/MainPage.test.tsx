import { render, screen } from '@testing-library/react';
import Main from '@/pages/Main';
import RootLayout from '@/components/RootLayout';

describe('Main Page', () => {
  it('renders StartScreen component', () => {
    render(
      <RootLayout>
        <Main />
      </RootLayout>
    );

    const titleElement = screen.getByRole('heading', {
      name: /Your playground for GraphQL requests/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders AboutProject component', () => {
    render(
      <RootLayout>
        <Main />
      </RootLayout>
    );

    const titleElement = screen.getByRole('heading', {
      name: /About Project/i,
    });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders AboutUs component', () => {
    render(
      <RootLayout>
        <Main />
      </RootLayout>
    );

    const titleElement = screen.getByRole('heading', { name: /About Us/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders AboutCourse component', () => {
    render(
      <RootLayout>
        <Main />
      </RootLayout>
    );

    const titleElement = screen.getByRole('heading', { name: /React Course/i });
    expect(titleElement).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    render(
      <RootLayout>
        <Main />
      </RootLayout>
    );
    const rsLogo = screen.getByAltText('Rolling Scopes School logo');
    expect(rsLogo).toBeInTheDocument();
  });
});
