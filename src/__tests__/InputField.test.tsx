import { render, screen } from '@testing-library/react';
import InputField from '@/components/ui/InputField';
import userEvent from '@testing-library/user-event';
import viewIcon from '../../public/view.svg';

describe('InputField Component', () => {
  it('renders InputField with basic props', () => {
    render(
      <InputField
        label="Username"
        placeholder="Enter your username"
        registeredName="username"
        autoComplete="off"
      />
    );

    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter your username')
    ).toBeInTheDocument();
  });

  it('renders InputField with endIcon and handles click', async () => {
    const handleEndIconClick = vi.fn();

    render(
      <InputField
        label="Password"
        placeholder="Enter your password"
        registeredName="password"
        autoComplete="current-password"
        endIcon={viewIcon}
        handleEndIconClick={handleEndIconClick}
      />
    );

    const endIcon = screen.getByAltText('decoration icon');
    expect(endIcon).toBeInTheDocument();

    await userEvent.click(endIcon);
    expect(handleEndIconClick).toHaveBeenCalled();
  });

  it('renders InputField with error and helper text', () => {
    render(
      <InputField
        label="Email"
        placeholder="Enter your email"
        registeredName="email"
        autoComplete="email"
        hasError={true}
        helperText="Invalid email format"
      />
    );
    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});
