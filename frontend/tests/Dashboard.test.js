// tests/Dashboard.test.js

import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../src/components/Dashboard';

test('renders Dashboard component', () => {
  const { getByText } = render(<Dashboard />);
  const dashboardTitle = getByText('Dashboard');
  expect(dashboardTitle).toBeInTheDocument();
});
