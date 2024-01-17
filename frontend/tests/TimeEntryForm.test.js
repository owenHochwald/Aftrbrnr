// tests/TimeEntryForm.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TimeEntryForm from '../src/components/TimeEntryForm';

test('renders TimeEntryForm component', () => {
  const { getByText } = render(<TimeEntryForm />);
  const createButton = getByText('Create Time Entry');
  expect(createButton).toBeInTheDocument();
});

test('calls onCreateEntry when button is clicked', () => {
  const mockCreateEntry = jest.fn();
  const { getByText } = render(<TimeEntryForm onCreateEntry={mockCreateEntry} />);
  const createButton = getByText('Create Time Entry');

  fireEvent.click(createButton);

  expect(mockCreateEntry).toHaveBeenCalled();
});
