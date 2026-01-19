import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayGrid from './displaygrid';

test('renders all category buttons', () => {
  const mockOnFilterChange = jest.fn();
  render(<DisplayGrid onFilterChange={mockOnFilterChange} />);

  expect(screen.getByText('Vegetables')).toBeInTheDocument();
  expect(screen.getByText('Fruits')).toBeInTheDocument();
  expect(screen.getByText('Dry Store')).toBeInTheDocument();
  expect(screen.getByText('Condiments and Oils')).toBeInTheDocument();
  expect(screen.getByText('Bakery')).toBeInTheDocument();
  expect(screen.getByText('Household')).toBeInTheDocument();
  expect(screen.getByText('Show All')).toBeInTheDocument();
});

test('calls onFilterChange with correct category when button clicked', () => {
  const mockOnFilterChange = jest.fn();
  render(<DisplayGrid onFilterChange={mockOnFilterChange} />);

  userEvent.click(screen.getByText('Vegetables'));

  expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  expect(mockOnFilterChange).toHaveBeenCalledWith('Vegetable');
});

test('calls onFilterChange with null when Show All is clicked', () => {
  const mockOnFilterChange = jest.fn();
  render(<DisplayGrid onFilterChange={mockOnFilterChange} />);

  userEvent.click(screen.getByText('Show All'));

  expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
  expect(mockOnFilterChange).toHaveBeenCalledWith(null);
});
