import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from '.';

describe('<TextInput />', () => {
  it('should have a value of searchValue', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testando'} />);
    const input = screen.getByPlaceholderText('Type your search here...');
    expect(input).toBeInTheDocument();
    expect(input.value).toBe('testando');
  });

  it('should call handleChange function on each key press', () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue="o valor da busca" />);
    const input = screen.getByPlaceholderText('Type your search here...');

    const value = 'o valor da busca';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });

  it('should macth the snapshot', () => {
    const fn = jest.fn();
    const { container } = render(
      <TextInput type="search" searchValue="" placeholder="Type your search here" handleChange={fn} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
