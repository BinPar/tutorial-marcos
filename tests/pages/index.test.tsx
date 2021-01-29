import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';
import Index from '../../pages/index';

export default test('Render Home Page', async () => {
  render(<Index title="Hello BinPar" />);
  await waitFor(() => screen.getByRole('heading'))
  expect(screen.getByRole('heading')).toHaveTextContent('Hello');
});
