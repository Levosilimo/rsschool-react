import './card.css';
import React from 'react';
import { IProductsResponse } from '../../types';

type CardProps = {
  product: IProductsResponse;
};

class Card extends React.Component<CardProps, Readonly<Record<string, never>>> {
  render() {
    return (
      <div key={this.props.product.id} className="card">
        <img src={this.props.product.thumbnail} alt={`${this.props.product.title} image`} />
        <span>{this.props.product.title}</span>
        <span>{`${this.props.product.price}€`}</span>
      </div>
    );
  }
}

export default Card;
