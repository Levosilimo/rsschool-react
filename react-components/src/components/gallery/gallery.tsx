import './gallery.css';
import React from 'react';
import { IProductsResponse, IResponse } from '../../types';
import Card from '../card/card';

type GalleryProps = {
  search: string;
};

type GalleryState = {
  data: IResponse;
};

class Gallery extends React.Component<GalleryProps, GalleryState> {
  state = { data: {} as IResponse };
  componentDidMount() {
    fetch('https://dummyjson.com/products')
      .then(async (data) => (await data.json()) as IResponse)
      .then((data) => this.setState({ data }));
  }

  getFilteredProducts(): IProductsResponse[] | null {
    const products = this.state.data.products;
    console.log(products);
    let result: Array<IProductsResponse> = [];
    if (products && products.length) {
      result = products.filter(
        (productsResponse) =>
          !this.props.search.length ||
          productsResponse.discountPercentage.toString(10).includes(this.props.search) ||
          productsResponse.price.toString(10).includes(this.props.search) ||
          productsResponse.rating.toString(10).includes(this.props.search) ||
          productsResponse.brand.toLowerCase().includes(this.props.search) ||
          productsResponse.category.toLowerCase().includes(this.props.search) ||
          productsResponse.description.toLowerCase().includes(this.props.search) ||
          productsResponse.title.toLowerCase().includes(this.props.search)
      );
      if (result.length) return result;
    }
    return null;
  }

  render() {
    return (
      <div className="gallery">
        {this.getFilteredProducts()?.map((product) => (
          <Card key={product.id} product={product} />
        )) ?? <h3>Products not found</h3>}
      </div>
    );
  }
}

export default Gallery;
