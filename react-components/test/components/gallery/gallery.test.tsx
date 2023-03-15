import * as React from 'react';
import { render, waitFor } from '@testing-library/react';
import Gallery from '../../../src/components/gallery/gallery';
import { emptyRes, testProductRes } from '../../__mocks__/productsMocks';

beforeEach(() => {
  jest
    .spyOn(global, 'fetch')
    .mockResolvedValue(new Response(JSON.stringify(emptyRes), { status: 200 }));
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Gallery', () => {
  it('should render loading text when data is not loaded', async () => {
    jest.restoreAllMocks();
    const { getByText } = render(<Gallery search="" />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render "Products not found" text when data is loaded but no products match the search', async () => {
    const { getByText } = render(<Gallery search="test" />);
    await waitFor(() => expect(getByText('Products not found')).toBeInTheDocument());
  });

  it('should render the filtered products when data is loaded and some products match the search', async () => {
    jest.restoreAllMocks();
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(testProductRes),
      } as Response)
    );
    const { getByText } = render(<Gallery search="test" />);
    await waitFor(() => expect(getByText('Test product')).toBeInTheDocument());
  });
});
