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
    const { container } = render(<Card product={testProduct} />);
    const amountContainers = container.getElementsByClassName('amount');
    const regexNotANumber = /[^0-9,.]/g;
    const regexComa = /,/g;
    expect(amountContainers.length).toBe(2);
    expect(
      Number(amountContainers[0].textContent?.replace(regexNotANumber, '').replace(regexComa, '.'))
    ).toBe(Number(testProduct.price.toFixed(2)));
    const discountedPrice = testProduct.price * ((100 - testProduct.discountPercentage) / 100);
    expect(
      Number(amountContainers[1].textContent?.replace(regexNotANumber, '').replace(regexComa, '.'))
    ).toBe(Number(discountedPrice.toFixed(2)));
  });

  it('displays the product rating', () => {
    const { getByText, container } = render(<Card product={testProduct} />);
    const starRatingContainer = container.getElementsByClassName('star-rating__current');
    expect(starRatingContainer.length).toBe(1);
    expect((starRatingContainer[0] as HTMLElement).style.width).toBe(
      `${(testProduct.rating / 5) * 100}%`
    );
    expect(getByText('☆☆☆☆☆')).toBeInTheDocument();
    expect(getByText('★★★★★')).toBeInTheDocument();
  });

  it('displays the product ID', () => {
    const { getByText } = render(<Card product={testProduct} />);
    expect(getByText(testProduct.id)).toBeInTheDocument();
  });
});
