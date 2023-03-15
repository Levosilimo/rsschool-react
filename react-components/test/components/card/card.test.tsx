import * as React from 'react';
import { render } from '@testing-library/react';
import Card from '../../../src/components/card/card';
import { testProduct } from '../../__mocks__/productsMocks';

describe('Card', () => {
  it('renders the product image', () => {
    const { getByAltText } = render(<Card product={testProduct} />);
    const image = getByAltText(`${testProduct.title} image`);
    expect(image).toBeInTheDocument();
    expect(image.getAttribute('src')).toBe(testProduct.thumbnail);
  });

  it('displays the product title', () => {
    const { getByText } = render(<Card product={testProduct} />);
    expect(getByText(testProduct.title)).toBeInTheDocument();
  });

  it('displays the full and discounted prices', () => {
    const { getByText, getByRole } = render(<Card product={testProduct} />);
    expect(getByText(`€${testProduct.price},`)).toBeInTheDocument();
    expect(
      getByText(`€${(testProduct.price * (100 - testProduct.discountPercentage)) / 100},`)
    ).toBeInTheDocument();
  });

  it('displays the product rating', () => {
    const { getByText } = render(<Card product={testProduct} />);
    expect(getByText('☆☆☆☆☆')).toBeInTheDocument();
    expect(getByText('★★★★★')).toBeInTheDocument();
  });

  it('displays the product ID', () => {
    const { getByText } = render(<Card product={testProduct} />);
    expect(getByText(testProduct.id)).toBeInTheDocument();
  });
});
