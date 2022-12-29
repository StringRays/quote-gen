import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Random Quote Generator/i);
  expect(titleElement).toBeInTheDocument();
});