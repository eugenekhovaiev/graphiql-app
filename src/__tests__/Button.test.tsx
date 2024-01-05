import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Button from '@/components/ui/Button';

describe('Button component', () => {
  it('renders the Button with necessary props', () => {
    const mockCallBack = vi.fn();
    render(
      <Button
        title="Click me"
        callback={mockCallBack}
        styleType="secondary"
        type={'button'}
      />
    );
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the Button with styleType="long"', () => {
    const mockCallBack = vi.fn();
    render(
      <Button
        title="Click me"
        callback={mockCallBack}
        styleType="long"
        type={'button'}
      />
    );
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders the Button with styleType="light"', () => {
    const mockCallBack = vi.fn();
    render(
      <Button
        title="Click me"
        callback={mockCallBack}
        styleType="light"
        type={'button'}
      />
    );
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls the callback function', async () => {
    const mockCallBack = vi.fn();
    render(<Button title="Click me" callback={mockCallBack} type="button" />);
    const buttonElement = screen.getByRole('button', { name: 'Click me' });
    await userEvent.click(buttonElement);
    expect(mockCallBack).toHaveBeenCalled();
  });
});
