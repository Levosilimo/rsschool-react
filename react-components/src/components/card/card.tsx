import './card.css';
import * as React from 'react';
import { IProductsResponse } from '../../types';

type CardProps = {
  product: IProductsResponse;
};

type Price = {
  main: string;
  cent: string;
};

type CardState = {
  fullPrice: Price;
  discountedPrice: Price;
};

class Card extends React.Component<CardProps, CardState> {
  state = { fullPrice: this.getPrice(true), discountedPrice: this.getPrice(false) };
  getPrice(full: boolean): Price {
    let main: string;
    if (full) main = this.props.product.price.toString(10);
    else
      main = (
        this.props.product.price *
        ((100 - this.props.product.discountPercentage) / 100)
      ).toString(10);
    let cent = '00';
    const separatorIndex = main.indexOf('.');
    if (separatorIndex > -1) {
      cent = Number('0.' + main.substring(separatorIndex + 1, separatorIndex + 3))
        .toFixed(2)
        .substring(2);
      main = main.substring(0, separatorIndex);
    }
    return { main, cent };
  }

  render() {
    return (
      <div key={this.props.product.id} className="card">
        <div className="card-top">
          <div className="star-rating">
            <span>☆☆☆☆☆</span>
            <div
              className="star-rating__current"
              style={{ width: (this.props.product.rating / 5) * 100 + '%' }}
            >
              <span>★★★★★</span>
            </div>
          </div>
          <span className="product-id">{this.props.product.id}</span>
        </div>
        <img src={this.props.product.thumbnail} alt={`${this.props.product.title} image`} />
        <span>{this.props.product.title}</span>
        <div className="price">
          <del>
            <span className="amount">
              {`€${this.state.fullPrice.main},`}
              <sup>{this.state.fullPrice.cent}</sup>
            </span>
          </del>
          <ins>
            <span className="amount">
              {`€${this.state.discountedPrice.main},`}
              <sup>{this.state.discountedPrice.cent}</sup>
            </span>
          </ins>
        </div>
      </div>
    );
  }
}

export default Card;
