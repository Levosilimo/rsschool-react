import './gallery.css';
import * as React from 'react';
import { IProductsResponse, IResponse } from '../../types';
import Card from '../card/card';

type GalleryProps = {
  search: string;
};

type GalleryState = {
  data: IResponse;
  isDataLoading: boolean;
};

class Gallery extends React.Component<GalleryProps, GalleryState> {
  state = { data: {} as IResponse, isDataLoading: true };
  componentDidMount() {
    fetch('https://dummyjson.com/products').then(async (data) => {
      const state = { data: (await data.json()) as IResponse, isDataLoading: false };
      this.setState(state);
    });
  }

  getFilteredProducts(): IProductsResponse[] | null {
    const products = this.state.data.products;
    let result: Array<IProductsResponse> = [];
    if (products && products.length) {
      result = products.filter(
        (productsResponse) =>
          !this.props.search.length ||
          productsResponse.title.toLowerCase().includes(this.props.search) ||
          productsResponse.brand.toLowerCase().includes(this.props.search) ||
          productsResponse.category.toLowerCase().includes(this.props.search) ||
          productsResponse.description.toLowerCase().includes(this.props.search) ||
          productsResponse.price.toString(10).includes(this.props.search) ||
          productsResponse.discountPercentage.toString(10).includes(this.props.search) ||
          productsResponse.rating.toString(10).includes(this.props.search)
      );
      if (result.length) return result;
    }
    return null;
  }

  render() {
    const filteredProducts = this.getFilteredProducts();
    return (
      <div className="gallery">
        {filteredProducts ? (
          filteredProducts.map((product) => <Card key={product.id} product={product} />)
        ) : this.state.isDataLoading ? (
          <h3>Loading...</h3>
        ) : (
          <h3>Products not found</h3>
        )}
      </div>
    );
  }
}

export default Gallery;
